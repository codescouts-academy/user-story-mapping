import { cn } from "@/lib/utils";
import { Trophy, Star, Zap } from "lucide-react";

interface ProgressBarProps {
  progress: number; // 0-100
  level: number;
  xp: number;
  xpToNext: number;
  className?: string;
}

export const ProgressBar = ({
  progress,
  level,
  xp,
  xpToNext,
  className,
}: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-game">
            <Trophy className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Nivel {level}</p>
            <p className="text-xs text-muted-foreground">Story Master</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 bg-valuable/20 rounded-full">
            <Star className="w-4 h-4 text-valuable" />
            <span className="text-sm font-semibold text-valuable">{xp} XP</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-accent/20 rounded-full">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Main progress bar */}
      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-done rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>

        {/* Milestone markers */}
        {[25, 50, 75].map((milestone) => (
          <div
            key={milestone}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-1 h-3 rounded-full transition-colors",
              progress >= milestone ? "bg-white/50" : "bg-foreground/20",
            )}
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>

      {/* XP to next level */}
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">
          {xp} / {xpToNext} XP para nivel {level + 1}
        </span>
        <span className="text-xs text-accent font-medium">
          {xpToNext - xp} XP restantes
        </span>
      </div>
    </div>
  );
};
