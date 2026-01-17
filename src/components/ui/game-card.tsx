import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gameCardVariants = cva(
  "rounded-xl border-2 p-4 transition-all duration-300 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-card border-border hover:border-primary/50 hover:shadow-game",
        epic: "bg-gradient-to-br from-epic/10 to-epic/5 border-epic/30 hover:border-epic hover:shadow-epic",
        story: "bg-gradient-to-br from-story/10 to-story/5 border-story/30 hover:border-story hover:shadow-story",
        task: "bg-gradient-to-br from-task/10 to-task/5 border-task/30 hover:border-task hover:shadow-task",
        valuable: "bg-gradient-to-br from-valuable/10 to-valuable/5 border-valuable/30 hover:border-valuable",
        done: "bg-gradient-to-br from-done/10 to-done/5 border-done/30 hover:border-done",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-4",
        lg: "p-6 text-lg",
      },
      dragging: {
        true: "scale-105 shadow-2xl rotate-2 z-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      dragging: false,
    },
  }
);

export interface GameCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gameCardVariants> {
  dragging?: boolean;
}

const GameCard = React.forwardRef<HTMLDivElement, GameCardProps>(
  ({ className, variant, size, dragging, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gameCardVariants({ variant, size, dragging, className }))}
        {...props}
      />
    );
  }
);
GameCard.displayName = "GameCard";

const GameCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 mb-2", className)}
    {...props}
  />
));
GameCardHeader.displayName = "GameCardHeader";

const GameCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-bold text-foreground", className)}
    {...props}
  />
));
GameCardTitle.displayName = "GameCardTitle";

const GameCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
GameCardDescription.displayName = "GameCardDescription";

const GameCardBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { variant?: "epic" | "story" | "task" | "valuable" | "done" }
>(({ className, variant = "story", ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "px-2 py-0.5 rounded-full text-xs font-semibold",
      {
        "bg-epic/20 text-epic": variant === "epic",
        "bg-story/20 text-story": variant === "story",
        "bg-task/20 text-task": variant === "task",
        "bg-valuable/20 text-valuable": variant === "valuable",
        "bg-done/20 text-done": variant === "done",
      },
      className
    )}
    {...props}
  />
));
GameCardBadge.displayName = "GameCardBadge";

export { GameCard, GameCardHeader, GameCardTitle, GameCardDescription, GameCardBadge, gameCardVariants };
