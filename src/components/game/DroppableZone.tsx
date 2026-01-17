import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface DroppableZoneProps {
  id: string;
  activityId: string;
  release: 'mvp' | 'release1' | 'release2';
  children?: React.ReactNode;
  className?: string;
}

export const DroppableZone: React.FC<DroppableZoneProps> = ({
  id,
  activityId,
  release,
  children,
  className,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { activityId, release },
  });

  const getReleaseStyles = () => {
    switch (release) {
      case 'mvp':
        return 'border-game-valuable/40 bg-game-valuable/5';
      case 'release1':
        return 'border-primary/40 bg-primary/5';
      case 'release2':
        return 'border-secondary/40 bg-secondary/5';
    }
  };

  const hasChildren = React.Children.count(children) > 0;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[120px] p-2 rounded-lg border-2 border-dashed transition-all duration-200",
        getReleaseStyles(),
        isOver && "border-primary bg-primary/20 scale-[1.02] shadow-lg",
        !hasChildren && "flex items-center justify-center",
        className
      )}
    >
      {hasChildren ? (
        <div className="space-y-2">
          {children}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <Plus className="w-6 h-6" />
          <span className="text-xs text-center">Arrastra aquí</span>
        </div>
      )}
    </div>
  );
};
