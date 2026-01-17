import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { Level, StoryCard, getReleaseLabel } from '@/data/levels';
import { PlacedCard } from '@/hooks/useGameState';
import { DroppableZone } from './DroppableZone';
import { DraggableCard } from './DraggableCard';
import { CardBank } from './CardBank';
import { Flag, Rocket, Zap } from 'lucide-react';

interface GameBoardProps {
  level: Level;
  placedCards: PlacedCard[];
  unplacedCards: StoryCard[];
  onPlaceCard: (cardId: string, activityId: string, release: 'mvp' | 'release1' | 'release2') => void;
  onMoveCard: (cardId: string, activityId: string, release: 'mvp' | 'release1' | 'release2') => void;
  onReturnCard: (cardId: string) => void;
}

const releases: Array<{ id: 'mvp' | 'release1' | 'release2'; icon: React.ReactNode; color: string }> = [
  { id: 'mvp', icon: <Rocket className="w-4 h-4" />, color: 'text-game-valuable' },
  { id: 'release1', icon: <Zap className="w-4 h-4" />, color: 'text-primary' },
  { id: 'release2', icon: <Flag className="w-4 h-4" />, color: 'text-secondary' },
];

export const GameBoard: React.FC<GameBoardProps> = ({
  level,
  placedCards,
  unplacedCards,
  onPlaceCard,
  onMoveCard,
  onReturnCard,
}) => {
  const [activeCard, setActiveCard] = React.useState<StoryCard | PlacedCard | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = active.data.current?.card;
    if (card) {
      setActiveCard(card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const isPlaced = active.data.current?.isPlaced;
    const dropData = over.data.current;

    if (dropData?.activityId && dropData?.release) {
      if (isPlaced) {
        onMoveCard(cardId, dropData.activityId, dropData.release);
      } else {
        onPlaceCard(cardId, dropData.activityId, dropData.release);
      }
    }
  };

  const getCardsForZone = (activityId: string, release: 'mvp' | 'release1' | 'release2') => {
    return placedCards.filter(
      card => card.placedActivity === activityId && card.placedRelease === release
    );
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="flex gap-6 h-full">
        {/* Card Bank */}
        <div className="w-80 flex-shrink-0">
          <CardBank cards={unplacedCards} />
        </div>

        {/* Game Board */}
        <div className="flex-1 overflow-x-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 min-w-max">
            {/* Activities Header */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `repeat(${level.activities.length}, minmax(200px, 1fr))` }}>
              {level.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-gradient-to-r from-game-epic/80 to-game-epic/60 rounded-lg p-3 text-center"
                >
                  <span className="text-white font-bold text-sm uppercase tracking-wide">
                    {activity.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Release Rows */}
            {releases.map((release) => (
              <div key={release.id} className="mb-4">
                <div className={`flex items-center gap-2 mb-2 ${release.color}`}>
                  {release.icon}
                  <span className="font-semibold text-sm">{getReleaseLabel(release.id)}</span>
                  <div className="flex-1 h-px bg-current opacity-30" />
                </div>
                <div 
                  className="grid gap-4" 
                  style={{ gridTemplateColumns: `repeat(${level.activities.length}, minmax(200px, 1fr))` }}
                >
                  {level.activities.map((activity) => (
                    <DroppableZone
                      key={`${activity.id}-${release.id}`}
                      id={`${activity.id}-${release.id}`}
                      activityId={activity.id}
                      release={release.id}
                    >
                      {getCardsForZone(activity.id, release.id).map((card) => (
                        <DraggableCard
                          key={card.id}
                          card={card}
                          isPlaced
                          onRemove={() => onReturnCard(card.id)}
                        />
                      ))}
                    </DroppableZone>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeCard ? (
          <div className="opacity-90 rotate-3 scale-105">
            <DraggableCard card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
