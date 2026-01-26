import { STORAGE_KEYS } from './constants.js';

export const gameState = {
  userScore: 0,
  pcScore: 0,
  isGameRunning: false
};

export function loadScores() {
  try {
    const storedUserScore = localStorage.getItem(STORAGE_KEYS.USER_SCORE);
    const storedPcScore = localStorage.getItem(STORAGE_KEYS.PC_SCORE);

    if (storedUserScore !== null && !isNaN(parseInt(storedUserScore, 10))) {
      gameState.userScore = parseInt(storedUserScore, 10);
    }

    if (storedPcScore !== null && !isNaN(parseInt(storedPcScore, 10))) {
      gameState.pcScore = parseInt(storedPcScore, 10);
    }
  } catch (err) {
    console.warn('Failed to load scores:', err);
  }
}

export function saveScores() {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SCORE, gameState.userScore);
    localStorage.setItem(STORAGE_KEYS.PC_SCORE, gameState.pcScore);
  } catch (err) {
    console.warn('Failed to save scores:', err);
  }
}
