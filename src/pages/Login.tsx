import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

type UserType = "admin" | "donor";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("donor");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      let response;
      let dashboardRoute = "/dashboard";

      if (userType === "admin") {
        response = await axiosInstance.post("/admin/auth/login", data);
        dashboardRoute = "/admin/dashboard";
      } else {
        response = await axiosInstance.post("/donor/auth/login", data);
        dashboardRoute = "/donor/dashboard";
      }

      // Store token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", userType);
      if (userType == "admin") {
        localStorage.setItem("user", JSON.stringify(response.data.admin));
      } else {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      toast.success("Login successful!");
      navigate(dashboardRoute);
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border border-gray-200 shadow-xl bg-white">
              <CardHeader className="text-center space-y-6 pb-8">
                <CardTitle className="text-4xl font-bold text-ngo-color1">
                  Welcome Back
                </CardTitle>

                <Tabs
                  defaultValue="donor"
                  className="w-full"
                  onValueChange={(value) => setUserType(value as UserType)}
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger 
                      value="donor" 
                      className="data-[state=active]:bg-ngo-color1 data-[state=active]:text-white text-black"
                    >
                      Donor
                    </TabsTrigger>
                    <TabsTrigger 
                      value="admin"
                      className="data-[state=active]:bg-ngo-color1 data-[state=active]:text-white text-black"
                    >
                      Admin
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <p className="text-gray-600 text-lg">
                  Sign in to your {userType} account
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-800 font-semibold text-base">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className={`h-12 text-base border-2 ${errors.email ? "border-red-500" : "border-gray-300 focus:border-ngo-color1"} focus:ring-2 bg-white text-black focus:ring-ngo-color1/20`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-gray-800 font-semibold text-base">
                        Password
                      </Label>
                      <Link
                        to={`/forgot-password?userType=${userType}`}
                        className="text-sm text-ngo-color1 hover:text-ngo-color5 hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        className={`bg-white text-black h-12 text-base border-2 pr-12 ${errors.password ? "border-red-500" : "border-gray-300 focus:border-ngo-color1"} focus:ring-2 focus:ring-ngo-color1/20`}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-ngo-color1 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-ngo-color1 hover:bg-ngo-color5 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
