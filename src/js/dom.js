// src/js/dom.js
import { DOM_IDS, CSS_CLASSES } from './constants.js';

export const domElements = {};

export function cacheDOM() {
  domElements.rockBtn = document.getElementById(DOM_IDS.ROCK_BTN);
  domElements.paperBtn = document.getElementById(DOM_IDS.PAPER_BTN);
  domElements.scissorBtn = document.getElementById(DOM_IDS.SCISSOR_BTN);

  domElements.userRockWin = document.getElementById(DOM_IDS.USER_ROCK_WIN);
  domElements.userPaperWin = document.getElementById(DOM_IDS.USER_PAPER_WIN);
  domElements.userScissorWin = document.getElementById(DOM_IDS.USER_SCISSOR_WIN);

  domElements.pcRockWin = document.getElementById(DOM_IDS.PC_ROCK_WIN);
  domElements.pcPaperWin = document.getElementById(DOM_IDS.PC_PAPER_WIN);
  domElements.pcScissorWin = document.getElementById(DOM_IDS.PC_SCISSOR_WIN);

  domElements.footer = document.getElementById(DOM_IDS.FOOTER);
  domElements.left = document.getElementById(DOM_IDS.LEFT_SECTION);
  domElements.right = document.getElementById(DOM_IDS.RIGHT_SECTION);
  domElements.resultText = document.getElementById(DOM_IDS.RESULT_TEXT);
  domElements.playBtn = document.getElementById(DOM_IDS.PLAY_BTN);
  domElements.nextBtn = document.getElementById(DOM_IDS.NEXT_BTN);
  domElements.cont1 = document.getElementById(DOM_IDS.CONT1);
  domElements.cont2 = document.getElementById(DOM_IDS.CONT2);
  domElements.rulesBtn = document.getElementById(DOM_IDS.RULES_BTN);
  domElements.rulesDialog = document.getElementById(DOM_IDS.RULES_DIALOG);
  domElements.rulesClose = document.getElementById(DOM_IDS.RULES_CLOSE);
  domElements.resultTitle = document.getElementById('text1');
  domElements.playAgainLink = document.getElementById('playagain');
  domElements.userScoreDisplay = document.getElementById('mscore');
  domElements.pcScoreDisplay = document.getElementById('cscore');

  return Object.values(domElements).every(Boolean);
}

export function hide(element) {
  if (element) element.classList.add(CSS_CLASSES.HIDDEN);
}

export function show(element) {
  if (element) element.classList.remove(CSS_CLASSES.HIDDEN);
}
