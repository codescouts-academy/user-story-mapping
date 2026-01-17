import React from 'react';
import { Trophy, Star, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ScoreBoardProps {
  score: number;
  totalScore: number;
  hintsUsed: number;
  currentLevel: number;
  totalLevels: number;
  onUseHint: () => void;
  onValidate: () => void;
  canValidate: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  totalScore,
  hintsUsed,
  currentLevel,
  totalLevels,
  onUseHint,
  onValidate,
  canValidate,
}) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Score Display */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-game-valuable/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-game-valuable" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Puntos Nivel</p>
              <p className="text-lg font-bold text-game-valuable">{score}</p>
            </div>
          </div>

          <div className="w-px h-10 bg-border" />

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-primary">{totalScore + score}</p>
            </div>
          </div>

          <div className="w-px h-10 bg-border" />

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Nivel</p>
              <p className="text-lg font-bold">{currentLevel} / {totalLevels}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onUseHint}
            className="gap-2 border-game-valuable/50 text-game-valuable hover:bg-game-valuable/10"
          >
            <Lightbulb className="w-4 h-4" />
            Pista ({hintsUsed})
            <span className="text-xs opacity-70">-5 pts</span>
          </Button>

          <Button
            onClick={onValidate}
            disabled={!canValidate}
            className={cn(
              "gap-2 bg-gradient-to-r from-game-done to-green-500",
              "hover:from-game-done/90 hover:to-green-500/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Trophy className="w-4 h-4" />
            Validar Mapa
          </Button>
        </div>
      </div>
    </div>
  );
};
