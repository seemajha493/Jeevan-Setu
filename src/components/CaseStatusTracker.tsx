import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CaseStatus = 
  | "registered" 
  | "verified" 
  | "connected_to_ngo" 
  | "training_in_progress" 
  | "employed";

interface CaseStatusTrackerProps {
  currentStatus: CaseStatus;
  className?: string;
}

const statusSteps: { key: CaseStatus; label: string }[] = [
  { key: "registered", label: "Registered" },
  { key: "verified", label: "Verified" },
  { key: "connected_to_ngo", label: "Connected to NGO" },
  { key: "training_in_progress", label: "Training in Progress" },
  { key: "employed", label: "Employed" },
];

const getStatusIndex = (status: CaseStatus): number => {
  return statusSteps.findIndex((step) => step.key === status);
};

const CaseStatusTracker = ({ currentStatus, className }: CaseStatusTrackerProps) => {
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative">
              {/* Connector Line */}
              {index > 0 && (
                <div 
                  className={cn(
                    "absolute top-4 right-1/2 w-full h-0.5 -z-10",
                    isCompleted ? "bg-success" : "bg-border"
                  )}
                />
              )}
              
              {/* Status Circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isCompleted && "bg-success border-success text-success-foreground",
                  isCurrent && "bg-primary border-primary text-primary-foreground animate-pulse-subtle",
                  isPending && "bg-muted border-border text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Label */}
              <span
                className={cn(
                  "text-[10px] md:text-xs text-center mt-2 max-w-[60px] md:max-w-[80px] leading-tight",
                  isCompleted && "text-success font-medium",
                  isCurrent && "text-primary font-semibold",
                  isPending && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStatusTracker;
