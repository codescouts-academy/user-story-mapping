import { cn } from "@/lib/utils";
import { GameCard, GameCardTitle, GameCardDescription, GameCardBadge } from "./ui/game-card";
import { Plus, GripVertical } from "lucide-react";
import { useState } from "react";

export interface Story {
  id: string;
  title: string;
  description: string;
  type: "epic" | "story" | "task";
  points?: number;
}

interface StoryColumnProps {
  title: string;
  stories: Story[];
  phase: string;
  onAddStory: () => void;
  className?: string;
}

export const StoryColumn = ({
  title,
  stories,
  phase,
  onAddStory,
  className,
}: StoryColumnProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "flex flex-col min-w-[280px] max-w-[320px] bg-card/50 backdrop-blur-sm rounded-2xl border-2 border-border p-4 transition-all duration-300 hover:border-primary/30",
        className
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{stories.length} items</p>
        </div>
        <button
          onClick={onAddStory}
          className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110 group"
        >
          <Plus className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Stories list */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {stories.map((story) => (
          <GameCard
            key={story.id}
            variant={story.type}
            className="group"
            onMouseEnter={() => setHoveredCard(story.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start gap-2">
              <GripVertical
                className={cn(
                  "w-4 h-4 text-muted-foreground/50 mt-1 transition-opacity cursor-grab",
                  hoveredCard === story.id ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <GameCardBadge variant={story.type}>
                    {story.type.toUpperCase()}
                  </GameCardBadge>
                  {story.points && (
                    <span className="text-xs font-bold text-valuable">
                      {story.points} pts
                    </span>
                  )}
                </div>
                <GameCardTitle className="text-sm">{story.title}</GameCardTitle>
                <GameCardDescription className="line-clamp-2">
                  {story.description}
                </GameCardDescription>
              </div>
            </div>
          </GameCard>
        ))}

        {stories.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <Plus className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Arrastra una historia aquí
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
