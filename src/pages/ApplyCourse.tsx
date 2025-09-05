import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { statesAndCities } from "@/lib/statesAndCities";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(10, "Phone number must be at most 10 digits").regex(/^\d+$/, "Phone number must contain only numbers"),
  motherTongue: z.string().min(1, "Mother Tongue is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  isStudent: z.string().min(1, "This field is required"),
  classStudying: z.string().optional(),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  whatsappNumber: z.string().min(10, "WhatsApp number must be at least 10 digits").max(10, "WhatsApp number must be at most 10 digits").regex(/^\d+$/, "WhatsApp number must contain only numbers"),
  referredBy: z.string().min(1, "Referred By is required"),
  convenientTimeSlot: z.string().min(1, "Convenient Time Slot is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ApplyCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [referredByOptions, setReferredByOptions] = useState([{ _id: "", name: "Choose" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);


  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`/course/getOneCourse/${id}`);
      setCourse(response.data);
    } catch (error) {
      toast.error("Failed to load course");
    }
  };

  const fetchReferredByList = async () => {
    try {
      const response = await axiosInstance.get("/course/referred-by-list");
      if (response.data.success) {
        setReferredByOptions([{ _id: "", name: "Choose" }, ...response.data.data]);
      }
    } catch (error) {
      toast.error("Failed to load referred by list");
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchReferredByList();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    if (name === "state") {
      const selectedState = statesAndCities.find((s) => s.state === value);
      setCities(selectedState ? selectedState.cities : []);
    }
  };

  const handlePhoneInput = (e) => {
    const input = e.target.value;
    if (input.length > 10) {
      e.target.value = input.slice(0, 10);
    }
  };

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
      if (!isLoaded) throw new Error('Razorpay SDK failed to load');

      const options = {
        key: 'rzp_test_HcrOflmaNTnjgB', 
        // key: 'rzp_live_R7W4B9PPioBX2X', // Replace with your test key
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'NEIEA Course Buying',
        description: `Course application for ${course.title || 'General'}`,
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verificationResponse = await axiosInstance.post('/course/verify-payment', {
              razorpayOrderId: orderData.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              courseData: orderData
            });
            console.log("verificationResponse", verificationResponse)
            if (verificationResponse.data.success) {
              // Call the apply form API after successful payment verification
              // await axiosInstance.post(`/course/apply/${id}`, orderData);
              setIsSuccessDialogOpen(true);
              reset();
              toast.success("Payment successful! Thank you for your application.");
            } else {
              toast.error("Payment verification failed. Please contact support.1");
            }
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: `${orderData.fullName}`,
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (course.fees > 0) {
        const resp = await axiosInstance.post(`/course/verify-apply-course/${id}`, data);
        if(resp.data.success == true){
          const payload = { ...data,course: course?._id };
          const orderResponse = await axiosInstance.post('/course/create-order', {
            amount: course.fees,
            currency: 'INR',
            receipt: `course_${Date.now()}`,
          });
  
          if (orderResponse.data.success) {
            await initiateRazorpayPayment({ ...payload, razorpayOrderId: orderResponse.data.orderId });
          } else {
            toast.error("Failed to create payment order. Please try again.");
          }
        }else{
          toast.error("Somthing went wrong!. Please try again.");
        }
      } else {
        await axiosInstance.post(`/course/apply/${id}`, data);
        setShowDialog(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Application submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStudent = watch("isStudent");

  if (!course) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-8 py-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Apply for {course.title}</h1>
              <p className="text-blue-100 text-lg">{course.description}</p>
            </div>
            
            {/* Course Details Section */}
            <div className="px-8 py-6 bg-gray-50 border-b">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-1"><strong>Duration:</strong> {course.duration}</p>
                  <p className="text-gray-600"><strong>Fees:</strong> {course.fees === 0 ? "Free" : `₹${course.fees}`}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600"><strong>Level:</strong> {course.level}</p>
                  <p className="text-gray-600"><strong>Target Audience:</strong> {course.targetAudience}</p>
                </div>
              </div>
              <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-2">
                  <strong>Requirements:</strong> Students are expected to commit themselves for serious learning during the whole course by attending every day (Mandatory attendance is 90%), being punctual, and completing the homework on time.
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Infrastructure Requirements:</strong> Schools/Institutions are requested to allocate 1 hour time every day for the students and provide a classroom with LED Screen and high-speed internet. Individual students should have a Smartphone/Laptop/Desktop and high-speed internet.
                </p>
                <p className="text-gray-600">
                  <strong>Certification:</strong> Certification is issued for students who complete the above course requirements.
                </p>
              </div>
            </div>
            {/* Form Section */}
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Application Form</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <Input id="fullName" {...register("fullName")} placeholder="Your Full Name" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                <Input id="email" {...register("email")} type="email" placeholder="Your Email" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onInput={handlePhoneInput}
                />
                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="motherTongue" className="block text-sm font-medium text-gray-700">Mother Tongue *</label>
                <Input id="motherTongue" {...register("motherTongue")} placeholder="Mother Tongue" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.motherTongue && <p className="mt-2 text-sm text-red-600">{errors.motherTongue.message}</p>}
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age *</label>
                <Input id="age" {...register("age")} placeholder="Age" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.age && <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                <div className="flex mt-4 items-center gap-4">
                  {["Male", "Female", "Others"].map((gender) => (
                    <div key={gender} className="flex items-center">
                      <input
                        type="radio"
                        id={gender}
                        {...register("gender")}
                        value={gender}
                        checked={watch("gender") === gender}
                        onChange={() => setValue("gender", gender)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor={gender} className="ml-2 block text-sm text-gray-700">
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Are you a student? *</label>
                <div className="flex mt-4 items-center gap-4">
                  {["Yes", "No"].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={option}
                        {...register("isStudent")}
                        value={option}
                        checked={watch("isStudent") === option}
                        onChange={() => setValue("isStudent", option)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor={option} className="ml-2 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.isStudent && <p className="mt-2 text-sm text-red-600">{errors.isStudent.message}</p>}
              </div>
              {isStudent === "Yes" && (
                <div>
                  <label htmlFor="classStudying" className="block text-sm font-medium text-gray-700">Which class are you studying in? *</label>
                  <Input id="classStudying" {...register("classStudying")} placeholder="Which class are you studying in?" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  {errors.classStudying && <p className="mt-2 text-sm text-red-600">{errors.classStudying.message}</p>}
                </div>
              )}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State *</label>
                <select id="state" {...register("state")} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select State</option>
                  {statesAndCities.map((stateData) => (
                    <option key={stateData.state} value={stateData.state}>{stateData.state}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                <select id="city" {...register("city")} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>}
              </div>
              <div>
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">WhatsApp Contact Number *</label>
                <Input
                  id="whatsappNumber"
                  {...register("whatsappNumber")}
                  placeholder="WhatsApp Contact Number"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  onInput={handlePhoneInput}
                />
                {errors.whatsappNumber && <p className="mt-2 text-sm text-red-600">{errors.whatsappNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">Referred By *</label>
                <select id="referredBy" {...register("referredBy")} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  {referredByOptions.map((option) => (
                    <option key={option._id} value={option.name}>{option.name}</option>
                  ))}
                </select>
                {errors.referredBy && <p className="mt-2 text-sm text-red-600">{errors.referredBy.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Convenient Time Slot *</label>
                {course.timeSlots && course.timeSlots.length > 0 ? (
                  <div className="space-y-3 mt-4">
                    {course.timeSlots.map((slot) => (
                      <div key={slot} className="flex items-center">
                        <input
                          type="radio"
                          id={slot}
                          {...register("convenientTimeSlot")}
                          value={slot}
                          checked={watch("convenientTimeSlot") === slot}
                          onChange={() => setValue("convenientTimeSlot", slot)}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={slot} className="ml-2 block text-sm text-gray-700">
                          {slot}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> Convenient time slots have not been added for this course yet. Please contact the administrator for scheduling information.
                    </p>
                  </div>
                )}
                {errors.convenientTimeSlot && <p className="mt-2 text-sm text-red-600">{errors.convenientTimeSlot.message}</p>}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Why are you applying for this course? (Optional)</label>
              <Textarea id="message" {...register("message")} placeholder="Why are you applying for this course?" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
                <div className="col-span-1 md:col-span-2">
                  {
                    course.fees == 0 ? (
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors duration-200">
                        Submit Application
                      </Button>
                    ) : (<Button
                      type="submit"
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
                    </Button>)
                  }
                </div>
              </form>
            </div>
          </div>
          <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#007AA4]">
                <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold text-ngo-color2">
                  Thank You for Your Application!
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Your application has been successfully processed. A confirmation email has been sent to your email address.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => {
                    setIsSuccessDialogOpen(false);
                    // if (donationData?.donorType) {
                    //   // Redirect to donor dashboard if applicable
                    // }
                    setShowDialog(true)
                  }}
                  className="bg-[#007AA4] hover:bg-[#007AA4]/90"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="text-center bg-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800">Application Submitted!</DialogTitle>
              </DialogHeader>
              <p className="text-gray-600 mt-4">
                We've received your application for <strong>{course.title}</strong>. You will hear from us soon!
              </p>
              <p className="text-gray-600 mt-4">
                You have successfully registered for the NEIEA Foundational English Course. We will inform you about the start of the class in the WhatsApp group.
              </p>
              {course.whatsappLink && (
                <p className="text-gray-600 mt-4">
                  <a href={course.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                    Join our WhatsApp group for updates
                  </a>
                </p>
              )}
              <p className="text-gray-600 mt-4">
                Best regards from Team NEIEA
              </p>
              <p className="text-gray-600 mt-4">
                For more details, please contact:
                <br />
                Ms. Taskeen - +917090770784
                <br />
                Ms. Saara - +919019431646
              </p>
              <Button
                className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  setShowDialog(false);
                  navigate("/");
                }}
              >
                Go Back to Courses
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyCourse;
