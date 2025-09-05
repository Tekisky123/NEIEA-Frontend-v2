import { z } from "zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import Razorpay from "razorpay";

// Define the Zod schema for form validation
const donationFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().length(10, { message: "Phone number must be exactly 10 digits" }).regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  amount: z.number().min(1, { message: "Amount is required" }),
  panCard: z.string().optional(),
  donorType: z.string().optional(),
  frequency: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonationForm = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [donationData, setDonationData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
  });

  const amount = watch("amount");

  useEffect(() => {
    if (location.state) {
      const { type, amount, tier, customAmount } = location.state;
      const calculatedAmount = amount || customAmount;

      if (calculatedAmount) {
        setValue("amount", calculatedAmount);
      }

      if (type) {
        setValue("frequency", type);
      }

      if (tier) {
        setValue("donorType", tier);
      }
    }
  }, [location.state, setValue]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiateRazorpayPayment = async (orderData: any) => {
    try {
      setPaymentLoading(true);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        key: 'rzp_test_HcrOflmaNTnjgB', 
        // key: 'rzp_live_R7W4B9PPioBX2X', // Replace with your test key
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'NEIEA Donation',
        description: `Donation for ${orderData.donorType || 'General'}`,
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verificationResponse = await axiosInstance.post('/donation/verify-payment', {
              razorpayOrderId: orderData.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              donationData: orderData
            });

            if (verificationResponse.data.success) {
              setIsSuccessDialogOpen(true);
              reset();
              toast.success("Payment successful! Thank you for your donation.");
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: `${orderData.firstName} ${orderData.lastName}`,
          email: orderData.email,
          contact: orderData.phone
        },
        theme: {
          color: '#4f46e5' // Your brand color
        }
      };

      // @ts-ignore
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Failed to initiate payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        panCard: data.panCard,
      };
      setDonationData(payload);

      const orderResponse = await axiosInstance.post('/donation/create-donation', {
        amount: payload.amount,
        currency: 'INR',
        receipt: `donation_${Date.now()}`,
        notes: {
          donorType: payload.donorType,
          frequency: payload.frequency
        }
      });

      if (orderResponse.data.success) {
        await initiateRazorpayPayment({
          ...payload,
          razorpayOrderId: orderResponse.data.orderId
        });
      } else {
        toast.error("Failed to create payment order. Please try again.");
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-36 bg-white md:py-48">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-ngo-color6 mb-4 md:text-4xl lg:text-5xl">
                Donation
              </h2>
              <p className="text-lg text-ngo-color1 max-w-2xl mx-auto md:text-xl">
                Fill in your details to complete the donation process.
              </p>

              {donationData && (
                <div className="mt-6 p-4 bg-ngo-color8/20 rounded-lg">
                  <h3 className="font-semibold text-lg text-ngo-color6">Your Donation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {donationData.donorType && (
                      <p><span className="font-medium">Donor Type:</span> {donationData.donorType}</p>
                    )}
                    {donationData.frequency && (
                      <p><span className="font-medium">Frequency:</span> {donationData.frequency}</p>
                    )}
                    <p><span className="font-medium">Amount:</span> ₹{donationData.amount}</p>
                  </div>
                </div>
              )}
            </div>
            <Card className="border-2 border-ngo-color4 shadow-lg bg-white">
              <CardContent className="p-6 lg:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                      maxLength={10}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="Enter your state"
                        {...register("state")}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="Enter your zip code"
                        {...register("zipCode")}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      placeholder="Enter your country"
                      {...register("country")}
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (INR) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter donation amount"
                      {...register("amount", { valueAsNumber: true })}
                    />
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="panCard">PAN Card</Label>
                    <Input
                      id="panCard"
                      placeholder="Enter your PAN card number"
                      {...register("panCard")}
                    />
                    {errors.panCard && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.panCard.message}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 font-bold text-sm text-yellow-600">
                    Please note: For donations exceeding ₹2,000, if PAN card details are not provided, NEIEA will receive only 70% of the donated amount due to applicable regulations.
                  </p>
                  <input type="hidden" {...register("donorType")} />
                  <input type="hidden" {...register("frequency")} />
                  <Button
                    type="submit"
                    className="w-full bg-ngo-color4 hover:bg-ngo-color4/90 text-white font-bold py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting || paymentLoading}
                  >
                    {isSubmitting || paymentLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {paymentLoading ? "Redirecting to Payment..." : "Processing..."}
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ngo-color4">
            <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-ngo-color6">
              Thank You for Your Donation!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Your donation has been successfully processed. A confirmation email has been sent to your email address.
            </DialogDescription>
            {donationData?.donorType && (
              <DialogDescription className="text-gray-600 mt-2">
                As a {donationData.donorType}, you'll receive exclusive benefits. Check your email for login details.
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                setIsSuccessDialogOpen(false);
                if (donationData?.donorType) {
                  // Redirect to donor dashboard if applicable
                }
              }}
              className="bg-ngo-color4 hover:bg-ngo-color4/90"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DonationForm;
