import { CSS_CLASSES, GAME_CHOICES } from './constants.js';
import { gameState, saveScores } from './state.js';
import { domElements, hide, show } from './dom.js';
import { getComputerChoice, determineWinner } from './gameLogic.js';

export function updateScoreDisplay() {
  const animateScore = (element, score) => {
    if (!element) return;
    if (element.textContent !== score.toString()) {
      element.textContent = score;
      element.classList.remove(CSS_CLASSES.SCORE_POP);
      void element.offsetWidth; // Trigger reflow
      element.classList.add(CSS_CLASSES.SCORE_POP);
      
      // Remove class after animation finishes
      setTimeout(() => {
        element.classList.remove(CSS_CLASSES.SCORE_POP);
      }, 400);
    }
  };

  animateScore(domElements.userScoreDisplay, gameState.userScore);
  animateScore(domElements.pcScoreDisplay, gameState.pcScore);
}

function updateUserScore(newScore) {
  gameState.userScore = Math.max(0, newScore);
  updateScoreDisplay();
  saveScores();
}

function updatePcScore(newScore) {
  gameState.pcScore = Math.max(0, newScore);
  updateScoreDisplay();
  saveScores();
}

export function resetGameDisplay() {
  const winCircles = [
    domElements.userRockWin,
    domElements.userPaperWin,
    domElements.userScissorWin,
    domElements.pcRockWin,
    domElements.pcPaperWin,
    domElements.pcScissorWin
  ];

  winCircles.forEach(circle => {
    if (!circle) return;
    circle.classList.add(CSS_CLASSES.HIDDEN);
    circle.classList.remove(CSS_CLASSES.WINNER_GLOW);
    circle.classList.remove(CSS_CLASSES.POP_IN);
  });

  hide(domElements.resultText);
  hide(domElements.playBtn);
  show(domElements.footer);
  hide(domElements.resultContainer);
  hide(domElements.left);
  hide(domElements.right);

  gameState.isGameRunning = false;
}

export function showResultScreen() {
  hide(domElements.footer);
  show(domElements.resultText);
  show(domElements.playBtn);
  show(domElements.resultContainer);
  show(domElements.left);
  show(domElements.right);

  // Add pop-in animation to the result sections
  domElements.left?.classList.add(CSS_CLASSES.POP_IN);
  domElements.right?.classList.add(CSS_CLASSES.POP_IN);
  domElements.resultText?.classList.add(CSS_CLASSES.FADE_IN);

  gameState.isGameRunning = true;
}

function handleWin() {
  if (domElements.resultTitle) {
    domElements.resultTitle.textContent = 'You WIN';
  }
  if (domElements.playBtn) {
    domElements.playBtn.textContent = 'PLAY AGAIN';
  }
  if (domElements.nextBtn) {
    domElements.nextBtn.classList.remove(CSS_CLASSES.HIDDEN);
  }
  updateUserScore(gameState.userScore + 1);
  updateRulesButtonPosition();
}

function handleLose() {
  if (domElements.resultTitle) {
    domElements.resultTitle.textContent = 'You LOSE';
  }
  if (domElements.playBtn) {
    domElements.playBtn.textContent = 'PLAY AGAIN';
  }
  updatePcScore(gameState.pcScore + 1);
}

function handleTie() {
  if (domElements.resultTitle) {
    domElements.resultTitle.textContent = 'TIE UP';
  }
  if (domElements.playBtn) {
    domElements.playBtn.textContent = 'REPLAY';
  }
}

function showGameChoices(userChoice, computerChoice) {
  switch (userChoice) {
    case GAME_CHOICES.ROCK:
      show(domElements.userRockWin);
      break;
    case GAME_CHOICES.PAPER:
      show(domElements.userPaperWin);
      break;
    case GAME_CHOICES.SCISSORS:
      show(domElements.userScissorWin);
      break;
  }

  switch (computerChoice) {
    case GAME_CHOICES.ROCK:
      show(domElements.pcRockWin);
      break;
    case GAME_CHOICES.PAPER:
      show(domElements.pcPaperWin);
      break;
    case GAME_CHOICES.SCISSORS:
      show(domElements.pcScissorWin);
      break;
  }
}

function applyWinnerGlow(winningChoice, isUserWinner) {
  if (isUserWinner) {
    switch (winningChoice) {
      case GAME_CHOICES.ROCK:
        domElements.userRockWin?.classList.add(CSS_CLASSES.WINNER_GLOW);
        break;
      case GAME_CHOICES.PAPER:
        domElements.userPaperWin?.classList.add(CSS_CLASSES.WINNER_GLOW);
        break;
      case GAME_CHOICES.SCISSORS:
        domElements.userScissorWin?.classList.add(CSS_CLASSES.WINNER_GLOW);
        break;
    }
  } else {
    switch (winningChoice) {
      case GAME_CHOICES.ROCK:
        domElements.pcRockWin?.classList.add(CSS_CLASSES.WINNER_GLOW);
        break;
      case GAME_CHOICES.PAPER:
        domElements.pcPaperWin?.classList.add(CSS_CLASSES.WINNER_GLOW);
        break;
      case GAME_CHOICES.SCISSORS:
        domElements.pcScissorWin?.classList.add(CSS_CLASSES.WINNER_GLOW);
        break;
    }
  }
}

export function playRound(userChoice) {
  if (gameState.isGameRunning) return;

  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);

  showGameChoices(userChoice, computerChoice);
  showResultScreen();

  switch (result) {
    case 'win':
      applyWinnerGlow(userChoice, true);
      handleWin();
      break;
    case 'lose':
      applyWinnerGlow(computerChoice, false);
      handleLose();
      break;
    case 'tie':
      handleTie();
      break;
  }
}

export function updateRulesButtonPosition() {
  if (!domElements.rulesBtn || !domElements.nextBtn) return;

  const nextHidden = domElements.nextBtn.classList.contains(CSS_CLASSES.HIDDEN);

  if (nextHidden) {
    domElements.rulesBtn.classList.add('btn-alone');
  } else {
    domElements.rulesBtn.classList.remove('btn-alone');
  }
}

export function showRulesDialog() {
  domElements.rulesDialog?.classList.add(CSS_CLASSES.SHOW);
  domElements.modalBackdrop?.classList.add(CSS_CLASSES.SHOW);
}

export function closeRulesDialog() {
  domElements.rulesDialog?.classList.remove(CSS_CLASSES.SHOW);
  domElements.modalBackdrop?.classList.remove(CSS_CLASSES.SHOW);
}

export function showCelebrationScreen() {
  if (domElements.cont1) {
    domElements.cont1.classList.add(CSS_CLASSES.HIDDEN);
    domElements.cont1.style.display = 'none';
  }
  if (domElements.cont2) {
    domElements.cont2.classList.remove(CSS_CLASSES.HIDDEN);
    domElements.cont2.style.display = 'flex';
  }
  if (domElements.nextBtn) {
    domElements.nextBtn.classList.add(CSS_CLASSES.HIDDEN);
  }
  updateRulesButtonPosition();
}

export function returnToMainGame() {
  if (domElements.cont2) {
    domElements.cont2.classList.add(CSS_CLASSES.HIDDEN);
    domElements.cont2.style.display = 'none';
  }
  if (domElements.cont1) {
    domElements.cont1.classList.remove(CSS_CLASSES.HIDDEN);
    domElements.cont1.style.display = '';
  }
  resetGameDisplay();
  updateRulesButtonPosition();
}
