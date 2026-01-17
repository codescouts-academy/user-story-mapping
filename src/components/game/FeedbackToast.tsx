import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackToastProps {
  message: string;
  isCorrect: boolean;
  onClose: () => void;
}

export const FeedbackToast: React.FC<FeedbackToastProps> = ({
  message,
  isCorrect,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 max-w-sm p-4 rounded-lg shadow-xl border animate-fade-in z-50",
        "backdrop-blur-xl",
        isCorrect
          ? "bg-game-done/90 border-game-done/50"
          : "bg-destructive/90 border-destructive/50",
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );
};
