import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Level } from '@/data/levels';
import { PlacedCard } from '@/hooks/useGameState';
import { cn } from '@/lib/utils';

interface ValidationResult {
  correct: number;
  total: number;
  details: Array<{ card: PlacedCard; isCorrect: boolean }>;
}

interface LevelCompleteModalProps {
  isOpen: boolean;
  level: Level;
  result: ValidationResult;
  score: number;
  bonus: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
  onClose: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  isOpen,
  level,
  result,
  score,
  bonus,
  hasNextLevel,
  onNextLevel,
  onRetry,
  onClose,
}) => {
  const percentage = Math.round((result.correct / result.total) * 100);
  const isPassing = percentage >= 70;
  const isPerfect = percentage === 100;

  const getStars = () => {
    if (percentage === 100) return 3;
    if (percentage >= 80) return 2;
    if (percentage >= 70) return 1;
    return 0;
  };

  const stars = getStars();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className={cn("w-6 h-6", isPassing ? "text-game-valuable" : "text-muted-foreground")} />
            {isPerfect ? '¡Perfecto!' : isPassing ? '¡Nivel Completado!' : 'Sigue Intentando'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Stars */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={cn(
                  "w-10 h-10 transition-all",
                  i <= stars 
                    ? "text-game-valuable fill-game-valuable animate-pulse" 
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{score + bonus}</div>
            <div className="text-sm text-muted-foreground">
              {score} puntos + {bonus} bonus
            </div>
          </div>

          {/* Stats */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Correctas</span>
              <span className="font-bold text-game-done">{result.correct}/{result.total}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  isPerfect ? "bg-game-done" : isPassing ? "bg-game-valuable" : "bg-destructive"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-right text-xs text-muted-foreground mt-1">
              {percentage}% de precisión
            </div>
          </div>

          {/* Explanation */}
          {isPassing && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-primary">Lo que aprendiste:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {level.explanation}
              </p>
            </div>
          )}

          {/* Errors Summary */}
          {!isPerfect && (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <h4 className="text-sm font-semibold text-muted-foreground">Revisión:</h4>
              {result.details.slice(0, 5).map(({ card, isCorrect }) => (
                <div 
                  key={card.id}
                  className={cn(
                    "flex items-start gap-2 text-xs p-2 rounded",
                    isCorrect ? "bg-game-done/10" : "bg-destructive/10"
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-game-done flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <span className="line-clamp-2">{card.content}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onRetry} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reintentar
          </Button>
          {isPassing && hasNextLevel && (
            <Button onClick={onNextLevel} className="gap-2 bg-gradient-to-r from-primary to-secondary">
              Siguiente Nivel
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
