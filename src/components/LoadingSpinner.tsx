import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({
  size = "md",
  className,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-2 border-ngo-color4/20 rounded-full"></div>

        {/* Spinning ring */}
        <div className="absolute inset-0 border-2 border-transparent border-t-ngo-color4 rounded-full animate-spin"></div>

        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-ngo-color4 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-ngo-color6 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export const SectionLoader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <LoadingSpinner size="md" />
    </div>
  );
};
