
import { psy1002_chapter1 } from './questions/psy1002_chapter1.js';
import { psy1002_chapter2 } from './questions/psy1002_chapter2.js';

// Central list of all available quiz modules
export const quizRegistry = [
  psy1002_chapter1,
  psy1002_chapter2
];

// Helper to construct a single array containing ALL questions for Marathon Mode
export function getMarathonQuestions() {
  return quizRegistry.flatMap(quiz => quiz.questions);
}
