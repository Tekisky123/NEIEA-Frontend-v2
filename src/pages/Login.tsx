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
      <section className="py-24 bg-gradient-to-br from-ngo-color4/5 to-ngo-color1/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-ngo-color6">
                  Welcome Back
                </CardTitle>

                <Tabs
                  defaultValue="donor"
                  className="w-full"
                  onValueChange={(value) => setUserType(value as UserType)}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="donor">Donor</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  </TabsList>
                </Tabs>

                <p className="text-gray-600">
                  Sign in to your {userType} account
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className={`${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-gray-700">
                        Password
                      </Label>
                      <Link
                        to={`/forgot-password?userType=${userType}`}
                        className="text-sm text-ngo-color4 hover:underline"
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
                        className={`${errors.password ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    className="w-full bg-ngo-color4 hover:bg-ngo-color4/90 py-6 text-lg"
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
