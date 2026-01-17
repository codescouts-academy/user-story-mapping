import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { StoryCard } from "@/data/levels";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DraggableCardProps {
  card: StoryCard;
  isPlaced?: boolean;
  onRemove?: () => void;
  showFeedback?: boolean;
  feedbackCorrect?: boolean;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  isPlaced = false,
  onRemove,
  showFeedback = false,
  feedbackCorrect = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
      data: { card, isPlaced },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const getTypeStyles = () => {
    switch (card.type) {
      case "activity":
        return "bg-gradient-to-r from-game-epic/90 to-game-epic border-game-epic/50";
      case "task":
        return "bg-gradient-to-r from-game-task/90 to-game-task border-game-task/50";
      case "story":
        return "bg-gradient-to-r from-game-story/90 to-game-story border-game-story/50";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm",
        getTypeStyles(),
        isDragging && "shadow-xl scale-105 z-50",
        showFeedback &&
          feedbackCorrect &&
          "ring-2 ring-game-done ring-offset-2 ring-offset-background",
        showFeedback &&
          !feedbackCorrect &&
          "ring-2 ring-destructive ring-offset-2 ring-offset-background animate-pulse",
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 mt-0.5 text-foreground/60 flex-shrink-0" />
        <p className="text-sm text-foreground font-medium leading-snug flex-1">
          {card.content}
        </p>
        {isPlaced && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-3 h-3 text-foreground/80" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-foreground/70 capitalize px-2 py-0.5 bg-white/10 rounded-full">
          {card.type}
        </span>
        <span className="text-xs text-foreground/70 font-bold">
          +{card.points} XP
        </span>
      </div>
    </div>
  );
};
