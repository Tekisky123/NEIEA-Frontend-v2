import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Shield,
  Target,
  Globe,
  CheckCircle,
  CreditCard,
  Smartphone,
  Building,
  Users,
  GraduationCap,
  Stethoscope,
  Home,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donationType, setDonationType] = useState<"once" | "monthly" | "quarterly" | "annually">("once");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const navigate = useNavigate();

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const donationTiers = {
    monthly: [
      {
        name: "Bronze Donor (Monthly)",
        amount: 500,
        benefits: [
          "Receives student details (name, location, monthly progress)",
          "Quarterly virtual connect via NEIEA intermediary",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff (2 hrs/day, Mon-Sat)",
        ],
      },
      {
        name: "Silver Donor (Monthly)",
        amount: 10000,
        benefits: [
          "Linked to sponsored Coordinator",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Gold Donor (Monthly)",
        amount: 25000,
        benefits: [
          "Can choose location for IT-enabled classroom",
          "Name placed inside the classroom",
          "Access to NEIEA website and annual audited tax returns",
          "Link to view live classroom teaching",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Platinum Donor (Monthly)",
        amount: 50000,
        benefits: [
          "Linked to sponsored Teacher",
          "Teacher answers donor's questions and invites donor to observe class",
          "Priority access to all NEIEA programs",
          "Personalized impact reports",
          "Invited to exclusive donor events",
        ],
      },
    ],
    quarterly: [
      {
        name: "Bronze Donor (Quarterly)",
        amount: 1500,
        benefits: [
          "Receives student progress reports quarterly",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff (2 hrs/day, Mon-Sat)",
        ],
      },
      {
        name: "Silver Donor (Quarterly)",
        amount: 30000,
        benefits: [
          "Linked to sponsored Coordinator",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Gold Donor (Quarterly)",
        amount: 75000,
        benefits: [
          "Can choose location for IT-enabled classroom",
          "Name recognition in annual report",
          "Access to live classroom teaching sessions",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Platinum Donor (Quarterly)",
        amount: 150000,
        benefits: [
          "Linked to sponsored Teacher",
          "Priority access to all NEIEA programs",
          "Personalized impact reports",
          "Invited to exclusive donor events",
          "Opportunity to name a classroom",
        ],
      },
    ],
    annually: [
      {
        name: "Bronze Donor (Annual)",
        amount: 6000,
        benefits: [
          "Receives annual student progress report",
          "Access to NEIEA website and annual audited tax returns",
          "Invited to annual donor appreciation event",
        ],
      },
      {
        name: "Silver Donor (Annual)",
        amount: 120000,
        benefits: [
          "Linked to sponsored Coordinator",
          "Coordinator designated as Donor's Sponsor",
          "Access to NEIEA website and annual audited tax returns",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Gold Donor (Annual)",
        amount: 300000,
        benefits: [
          "Can choose location for IT-enabled classroom",
          "Name placed inside the classroom",
          "Featured in annual report",
          "Access to live classroom teaching sessions",
          "Invited to exclusive donor events",
        ],
      },
      {
        name: "Platinum Donor (Annual)",
        amount: 600000,
        benefits: [
          "Opportunity to name a learning center",
          "Dedicated NEIEA liaison",
          "VIP access to all programs and events",
          "Personalized impact reports with video updates",
          "Featured prominently in annual report",
        ],
      },
    ],
  };

  const formatAmount = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDonateClick = () => {
    const donationData = {
      type: donationType,
      amount: selectedAmount,
      tier: selectedTier,
      customAmount: customAmount && !selectedAmount ? parseFloat(customAmount) : null,
    };
    
    navigate("/donation/form", { state: donationData });
  };

  const handleTierSelect = (tierName: string, amount: number) => {
    setSelectedTier(tierName);
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  return (
    <Layout>

      {/* Quick Donation Form */}
      <section className="py-48 bg-white" id="donation-form">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-ngo-color6 mb-8">
                Quick Donation
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose your donation frequency and amount to see the impact you'll make.
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8 lg:p-12">
                {/* Donation Type Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-100 rounded-full p-1 flex flex-wrap justify-center">
                    {(["once", "monthly", "quarterly", "annually"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setDonationType(type);
                          setSelectedTier(null);
                          setSelectedAmount(null);
                        }}
                        className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all ${
                          donationType === type
                            ? "bg-ngo-color4 text-white shadow-lg"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {type === "once" && "Give Once"}
                        {type === "monthly" && "Give Monthly"}
                        {type === "quarterly" && "Give Quarterly"}
                        {type === "annually" && "Give Annually"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tier Selection */}
                {(donationType === "monthly" || donationType === "quarterly" || donationType === "annually") && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-ngo-color6 mb-6 text-center">
                      Select Donor Tier
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {donationTiers[donationType]?.map((tier) => (
                        <div
                          key={tier.name}
                          className={`border-2 rounded-xl overflow-hidden transition-all ${
                            selectedTier === tier.name
                              ? "border-ngo-color4 shadow-lg"
                              : "border-gray-200 hover:border-ngo-color4/50"
                          }`}
                        >
                          <div
                            className="p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => handleTierSelect(tier.name, tier.amount)}
                          >
                            <div>
                              <h4 className="font-bold text-lg">{tier.name}</h4>
                              <p className="text-ngo-color4 font-semibold">
                                {formatINR(tier.amount)} ({formatAmount(tier.amount * 0.012)})
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTier(expandedTier === tier.name ? null : tier.name);
                              }}
                              className="text-ngo-color4 p-2"
                            >
                              {expandedTier === tier.name ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {expandedTier === tier.name && (
                            <div className="px-4 pb-4 pt-2 bg-gray-50">
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {tier.benefits.map((benefit, i) => (
                                  <li key={i}>{benefit}</li>
                                ))}
                              </ul>
                              <button
                                onClick={() => handleTierSelect(tier.name, tier.amount)}
                                className={`mt-4 w-full py-2 rounded-lg font-medium ${
                                  selectedTier === tier.name
                                    ? "bg-ngo-color4 text-white"
                                    : "bg-gray-100 text-ngo-color4 hover:bg-gray-200"
                                }`}
                              >
                                {selectedTier === tier.name ? "Selected" : "Select This Tier"}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-ngo-color6 mb-6 text-center">
                    {selectedTier ? "Confirm Amount" : "Select Amount"}
                  </h3>
                  
                  {!selectedTier && (
                    <>
                      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                        {quickAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                              setSelectedTier(null);
                            }}
                            className={`p-4 rounded-xl font-semibold transition-all border-2 ${
                              selectedAmount === amount
                                ? "border-ngo-color4 bg-ngo-color4 text-white shadow-lg"
                                : "border-gray-200 text-gray-700 hover:border-ngo-color4 hover:text-ngo-color4"
                            }`}
                          >
                            {formatINR(amount)}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Custom amount (INR)"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(parseFloat(e.target.value) || null);
                            setSelectedTier(null);
                          }}
                          className="text-center text-xl py-6 border-2 border-gray-200 focus:border-ngo-color4 rounded-xl"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                          ₹
                        </div>
                      </div>
                    </>
                  )}

                  {selectedTier && (
                    <div className="text-center p-6 bg-ngo-color8/10 rounded-xl">
                      <div className="flex justify-center mb-2">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          selectedTier.includes("Bronze") ? "bg-amber-600/20 text-amber-800" :
                          selectedTier.includes("Silver") ? "bg-gray-300/20 text-gray-600" :
                          selectedTier.includes("Gold") ? "bg-yellow-500/20 text-yellow-700" :
                          "bg-blue-400/20 text-blue-700"
                        }`}>
                          {selectedTier.includes("Bronze") && "🥉"}
                          {selectedTier.includes("Silver") && "🥈"}
                          {selectedTier.includes("Gold") && "🥇"}
                          {selectedTier.includes("Platinum") && "💎"}
                        </div>
                      </div>
                      <p className="text-lg font-semibold">
                        {donationTiers[donationType]?.find(t => t.name === selectedTier)?.name}
                      </p>
                      <p className="text-2xl font-bold text-ngo-color4 mt-2">
                        {formatINR(selectedAmount || 0)} ({formatAmount((selectedAmount || 0) * 0.012)})
                      </p>
                      <p className="text-gray-600 mt-2">
                        {donationType === "monthly" && "per month"}
                        {donationType === "quarterly" && "per quarter"}
                        {donationType === "annually" && "per year"}
                      </p>
                      <button
                        onClick={() => setSelectedTier(null)}
                        className="mt-4 text-ngo-color4 underline text-sm"
                      >
                        Choose different amount
                      </button>
                    </div>
                  )}
                </div>

                {/* Impact Preview */}
                <div className="mb-8 p-6 bg-ngo-color8/20 rounded-xl border border-ngo-color8/30">
                  <h4 className="font-semibold text-ngo-color6 mb-3 text-center">
                    Your Impact
                  </h4>
                  <p className="text-gray-700 text-center">
                    {selectedTier ? (
                      `As a ${selectedTier}, your contribution will support ${donationType === "monthly" ? "monthly" : donationType === "quarterly" ? "quarterly" : "annual"} ${selectedTier.includes("Gold") || selectedTier.includes("Platinum") ? "IT-enabled classroom development and teacher training" : "digital literacy programs and student scholarships"} for underserved communities.`
                    ) : selectedAmount ? (
                      `Your ${formatINR(selectedAmount)} ${donationType === "once" ? "one-time" : donationType} donation will support digital literacy training and educational innovation.`
                    ) : (
                      "Select an amount to see your potential impact."
                    )}
                  </p>
                </div>

                {/* Donate Button */}
                <Button
                  size="lg"
                  className="w-full bg-ngo-color4 hover:bg-ngo-color4/90 text-white font-bold py-6 text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={handleDonateClick}
                  disabled={!selectedAmount && !customAmount}
                >
                  {selectedTier ? (
                    <>
                      Become {selectedTier.split(" ")[0]} Donor
                      <Heart className="ml-3 w-6 h-6" />
                    </>
                  ) : (
                    <>
                      Donate {selectedAmount ? formatINR(selectedAmount) : customAmount ? formatINR(parseFloat(customAmount)) : ""}
                      {donationType === "monthly" && " Monthly"}
                      {donationType === "quarterly" && " Quarterly"}
                      {donationType === "annually" && " Annually"}
                      <Heart className="ml-3 w-6 h-6" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Secure SSL encryption. Tax-deductible receipt provided.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Donate;