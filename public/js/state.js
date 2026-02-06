import { STORAGE_KEYS } from './constants.js';

export const gameState = {
  userScore: 0,
  pcScore: 0,
  isGameRunning: false
};

// Helper to get user-specific key
function getStorageKey(key) {
  try {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.id) {
        return `${user.id}_${key}`;
      }
    }
  } catch (e) {
    // Fallback to global key if JSON parse fails
  }
  return key;
}

export function loadScores() {
  try {
    const userKey = getStorageKey(STORAGE_KEYS.USER_SCORE);
    const pcKey = getStorageKey(STORAGE_KEYS.PC_SCORE);

    const storedUserScore = localStorage.getItem(userKey);
    const storedPcScore = localStorage.getItem(pcKey);

    if (storedUserScore !== null && !isNaN(parseInt(storedUserScore, 10))) {
      gameState.userScore = parseInt(storedUserScore, 10);
    } else {
      gameState.userScore = 0; // Reset if no score found for this user
    }

    if (storedPcScore !== null && !isNaN(parseInt(storedPcScore, 10))) {
      gameState.pcScore = parseInt(storedPcScore, 10);
    } else {
      gameState.pcScore = 0; // Reset if no score found for this user
    }
  } catch (err) {
    // Silent fail
  }
}

export function saveScores() {
  try {
    const userKey = getStorageKey(STORAGE_KEYS.USER_SCORE);
    const pcKey = getStorageKey(STORAGE_KEYS.PC_SCORE);

    localStorage.setItem(userKey, gameState.userScore);
    localStorage.setItem(pcKey, gameState.pcScore);
  } catch (err) {
    // Silent fail
  }
}
