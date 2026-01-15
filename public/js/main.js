// src/js/main.js
import { GAME_CHOICES } from './constants.js';
import { gameState, loadScores } from './state.js';
import { cacheDOM, domElements } from './dom.js';
import {
  playRound,
  resetGameDisplay,
  showRulesDialog,
  closeRulesDialog,
  showCelebrationScreen,
  returnToMainGame,
  updateRulesButtonPosition,
  updateScoreDisplay
} from './uiHandlers.js';

function setupEventListeners() {
  domElements.rulesBtn?.addEventListener('click', showRulesDialog);
  domElements.rulesClose?.addEventListener('click', closeRulesDialog);

  domElements.playBtn?.addEventListener('click', resetGameDisplay);
  domElements.nextBtn?.addEventListener('click', showCelebrationScreen);

  domElements.playAgainLink?.addEventListener('click', e => {
    e.preventDefault();
    returnToMainGame();
  });

  domElements.rockBtn?.addEventListener('click', () => playRound(GAME_CHOICES.ROCK));
  domElements.paperBtn?.addEventListener('click', () => playRound(GAME_CHOICES.PAPER));
  domElements.scissorBtn?.addEventListener('click', () => playRound(GAME_CHOICES.SCISSORS));
}

function init() {
  if (!cacheDOM()) {
    console.error('Failed to cache DOM elements');
    return;
  }

  loadScores();
  updateScoreDisplay();
  setupEventListeners();
  updateRulesButtonPosition();

  gameState.isGameRunning = false;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
