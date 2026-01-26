import { GAME_CHOICES } from './constants.js';

export function getComputerChoice() {
  const choices = [GAME_CHOICES.ROCK, GAME_CHOICES.PAPER, GAME_CHOICES.SCISSORS];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

export function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) return 'tie';

  if (userChoice === GAME_CHOICES.ROCK && computerChoice === GAME_CHOICES.SCISSORS) return 'win';
  if (userChoice === GAME_CHOICES.PAPER && computerChoice === GAME_CHOICES.ROCK) return 'win';
  if (userChoice === GAME_CHOICES.SCISSORS && computerChoice === GAME_CHOICES.PAPER) return 'win';

  return 'lose';
}
