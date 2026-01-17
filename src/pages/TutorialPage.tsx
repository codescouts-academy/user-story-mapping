import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '@/hooks/useGameState';
import { GameBoard } from '@/components/game/GameBoard';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { HintModal } from '@/components/game/HintModal';
import { LevelCompleteModal } from '@/components/game/LevelCompleteModal';
import { FeedbackToast } from '@/components/game/FeedbackToast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TutorialPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    gameState,
    getCurrentLevel,
    initializeLevel,
    placeCard,
    moveCard,
    returnCardToBank,
    useHint,
    hideHint,
    clearFeedback,
    nextLevel,
    validateLevel,
    calculateBonus,
    levels,
  } = useGameState();

  const [showValidation, setShowValidation] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    correct: number;
    total: number;
    details: Array<{ card: any; isCorrect: boolean }>;
  } | null>(null);

  const currentLevel = getCurrentLevel();

  useEffect(() => {
    initializeLevel(1);
  }, [initializeLevel]);

  const handleValidate = () => {
    const result = validateLevel();
    setValidationResult(result);
    setShowValidation(true);
  };

  const handleNextLevel = () => {
    setShowValidation(false);
    setValidationResult(null);
    nextLevel();
  };

  const handleRetry = () => {
    setShowValidation(false);
    setValidationResult(null);
    initializeLevel(gameState.currentLevel);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-game-done/20 text-game-done border-game-done/30';
      case 'medium': return 'bg-game-valuable/20 text-game-valuable border-game-valuable/30';
      case 'hard': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return '';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  if (!currentLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando nivel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-primary/10"
          >
            <Home className="w-5 h-5" />
          </Button>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{currentLevel.name}</h1>
              <Badge className={getDifficultyColor(currentLevel.difficulty)}>
                {getDifficultyLabel(currentLevel.difficulty)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{currentLevel.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Proyecto: {currentLevel.projectName}
          </Badge>
        </div>
      </header>

      {/* Score Board */}
      <div className="mb-6">
        <ScoreBoard
          score={gameState.score}
          totalScore={gameState.totalScore}
          hintsUsed={gameState.hintsUsed}
          currentLevel={gameState.currentLevel}
          totalLevels={levels.length}
          onUseHint={useHint}
          onValidate={handleValidate}
          canValidate={gameState.unplacedCards.length === 0}
        />
      </div>

      {/* Game Board */}
      <div className="h-[calc(100vh-280px)]">
        <GameBoard
          level={currentLevel}
          placedCards={gameState.placedCards}
          unplacedCards={gameState.unplacedCards}
          onPlaceCard={placeCard}
          onMoveCard={moveCard}
          onReturnCard={returnCardToBank}
        />
      </div>

      {/* Hint Modal */}
      <HintModal
        isOpen={gameState.showHint}
        hint={gameState.currentHint}
        onClose={hideHint}
      />

      {/* Level Complete Modal */}
      {validationResult && (
        <LevelCompleteModal
          isOpen={showValidation}
          level={currentLevel}
          result={validationResult}
          score={gameState.score}
          bonus={calculateBonus()}
          hasNextLevel={gameState.currentLevel < levels.length}
          onNextLevel={handleNextLevel}
          onRetry={handleRetry}
          onClose={() => setShowValidation(false)}
        />
      )}

      {/* Feedback Toast */}
      {gameState.feedback && (
        <FeedbackToast
          message={gameState.feedback.message}
          isCorrect={gameState.feedback.isCorrect}
          onClose={clearFeedback}
        />
      )}
    </div>
  );
};

export default TutorialPage;
