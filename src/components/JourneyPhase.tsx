import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface JourneyPhaseProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive?: boolean;
  isCompleted?: boolean;
  phaseNumber: number;
}

export const JourneyPhase = ({
  icon: Icon,
  title,
  description,
  isActive = false,
  isCompleted = false,
  phaseNumber,
}: JourneyPhaseProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center p-4 rounded-xl transition-all duration-500 group",
        isActive && "bg-primary/10 scale-105",
        isCompleted && "opacity-80"
      )}
    >
      {/* Phase number badge */}
      <div
        className={cn(
          "absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
          isCompleted
            ? "bg-done text-done-foreground"
            : isActive
            ? "bg-primary text-primary-foreground animate-pulse"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isCompleted ? "✓" : phaseNumber}
      </div>

      {/* Icon container */}
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300",
          isCompleted
            ? "bg-gradient-to-br from-done to-done/70 shadow-done"
            : isActive
            ? "bg-gradient-to-br from-primary to-accent shadow-game animate-float"
            : "bg-muted group-hover:bg-primary/20"
        )}
      >
        <Icon
          className={cn(
            "w-8 h-8 transition-colors",
            isCompleted || isActive ? "text-white" : "text-muted-foreground"
          )}
        />
      </div>

      {/* Text */}
      <h3
        className={cn(
          "font-bold text-center mb-1 transition-colors",
          isActive ? "text-primary" : "text-foreground"
        )}
      >
        {title}
      </h3>
      <p className="text-xs text-muted-foreground text-center max-w-[120px]">
        {description}
      </p>
    </div>
  );
};
