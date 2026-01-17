import { useState, useCallback } from 'react';
import { StoryCard, Level, levels } from '@/data/levels';

export interface PlacedCard extends StoryCard {
  placedActivity: string;
  placedRelease: 'mvp' | 'release1' | 'release2';
}

interface GameState {
  currentLevel: number;
  score: number;
  totalScore: number;
  hintsUsed: number;
  placedCards: PlacedCard[];
  unplacedCards: StoryCard[];
  isLevelComplete: boolean;
  showHint: boolean;
  currentHint: string;
  feedback: { cardId: string; isCorrect: boolean; message: string } | null;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    totalScore: 0,
    hintsUsed: 0,
    placedCards: [],
    unplacedCards: [],
    isLevelComplete: false,
    showHint: false,
    currentHint: '',
    feedback: null,
  });

  const getCurrentLevel = useCallback((): Level | undefined => {
    return levels.find(l => l.id === gameState.currentLevel);
  }, [gameState.currentLevel]);

  const initializeLevel = useCallback((levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;

    // Shuffle cards
    const shuffledCards = [...level.cards].sort(() => Math.random() - 0.5);

    setGameState(prev => ({
      ...prev,
      currentLevel: levelId,
      placedCards: [],
      unplacedCards: shuffledCards,
      isLevelComplete: false,
      showHint: false,
      currentHint: '',
      feedback: null,
      hintsUsed: 0,
    }));
  }, []);

  const placeCard = useCallback((
    cardId: string, 
    activityId: string, 
    release: 'mvp' | 'release1' | 'release2'
  ) => {
    setGameState(prev => {
      const card = prev.unplacedCards.find(c => c.id === cardId);
      if (!card) return prev;

      const isCorrect = card.correctActivity === activityId && card.correctRelease === release;
      const points = isCorrect ? card.points : Math.floor(card.points * 0.3);
      
      const placedCard: PlacedCard = {
        ...card,
        placedActivity: activityId,
        placedRelease: release,
      };

      const newUnplacedCards = prev.unplacedCards.filter(c => c.id !== cardId);
      const newPlacedCards = [...prev.placedCards, placedCard];
      const isLevelComplete = newUnplacedCards.length === 0;

      let feedback = null;
      if (!isCorrect) {
        const level = levels.find(l => l.id === prev.currentLevel);
        const correctActivity = level?.activities.find(a => a.id === card.correctActivity);
        feedback = {
          cardId: card.id,
          isCorrect: false,
          message: `Esta historia encaja mejor en "${correctActivity?.name}" durante el ${card.correctRelease === 'mvp' ? 'MVP' : card.correctRelease === 'release1' ? 'Release 1' : 'Release 2'}.`
        };
      }

      return {
        ...prev,
        placedCards: newPlacedCards,
        unplacedCards: newUnplacedCards,
        score: prev.score + points,
        isLevelComplete,
        feedback,
      };
    });
  }, []);

  const moveCard = useCallback((
    cardId: string,
    newActivityId: string,
    newRelease: 'mvp' | 'release1' | 'release2'
  ) => {
    setGameState(prev => {
      const cardIndex = prev.placedCards.findIndex(c => c.id === cardId);
      if (cardIndex === -1) return prev;

      const card = prev.placedCards[cardIndex];
      const updatedCard: PlacedCard = {
        ...card,
        placedActivity: newActivityId,
        placedRelease: newRelease,
      };

      const newPlacedCards = [...prev.placedCards];
      newPlacedCards[cardIndex] = updatedCard;

      return {
        ...prev,
        placedCards: newPlacedCards,
      };
    });
  }, []);

  const returnCardToBank = useCallback((cardId: string) => {
    setGameState(prev => {
      const card = prev.placedCards.find(c => c.id === cardId);
      if (!card) return prev;

      const originalCard: StoryCard = {
        id: card.id,
        content: card.content,
        type: card.type,
        correctActivity: card.correctActivity,
        correctRelease: card.correctRelease,
        points: card.points,
      };

      return {
        ...prev,
        placedCards: prev.placedCards.filter(c => c.id !== cardId),
        unplacedCards: [...prev.unplacedCards, originalCard],
        score: Math.max(0, prev.score - card.points),
      };
    });
  }, []);

  const useHint = useCallback(() => {
    const level = getCurrentLevel();
    if (!level) return;

    const hintIndex = gameState.hintsUsed % level.tips.length;
    
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      showHint: true,
      currentHint: level.tips[hintIndex],
      score: Math.max(0, prev.score - 5),
    }));
  }, [getCurrentLevel, gameState.hintsUsed]);

  const hideHint = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showHint: false,
    }));
  }, []);

  const clearFeedback = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      feedback: null,
    }));
  }, []);

  const nextLevel = useCallback(() => {
    const nextLevelId = gameState.currentLevel + 1;
    if (nextLevelId <= levels.length) {
      setGameState(prev => ({
        ...prev,
        totalScore: prev.totalScore + prev.score,
        score: 0,
      }));
      initializeLevel(nextLevelId);
    }
  }, [gameState.currentLevel, initializeLevel]);

  const validateLevel = useCallback((): { correct: number; total: number; details: Array<{ card: PlacedCard; isCorrect: boolean }> } => {
    const details = gameState.placedCards.map(card => ({
      card,
      isCorrect: card.correctActivity === card.placedActivity && card.correctRelease === card.placedRelease,
    }));

    return {
      correct: details.filter(d => d.isCorrect).length,
      total: details.length,
      details,
    };
  }, [gameState.placedCards]);

  const calculateBonus = useCallback((): number => {
    if (gameState.hintsUsed === 0) {
      return 50;
    }
    return Math.max(0, 50 - (gameState.hintsUsed * 10));
  }, [gameState.hintsUsed]);

  return {
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
  };
};
