import React from 'react';
import { StoryCard } from '@/data/levels';
import { DraggableCard } from './DraggableCard';
import { Package } from 'lucide-react';

interface CardBankProps {
  cards: StoryCard[];
}

export const CardBank: React.FC<CardBankProps> = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <Package className="w-12 h-12 text-game-done mb-3" />
          <h3 className="font-semibold text-game-done">¡Todas las tarjetas colocadas!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Revisa tu mapa y valida cuando estés listo
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Banco de Historias</h3>
        <span className="ml-auto text-sm text-muted-foreground">
          {cards.length} restantes
        </span>
      </div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {cards.map((card) => (
          <DraggableCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
