
import { psy1002_chapter1 } from './questions/psy1002_chapter1.js';
import { psy1002_chapter2 } from './questions/psy1002_chapter2.js';
import { psy1002_chapter3 } from './questions/psy1002_chapter3.js';
import { psy1002_chapter4 } from './questions/psy1002_chapter4.js';
import { psy1002_chapter5 } from './questions/psy1002_chapter5.js';
import { psy1002_chapter6 } from './questions/psy1002_chapter6.js';
import { psy1002_chapter7 } from './questions/psy1002_chapter7.js';
import { psy1002_chapter8 } from './questions/psy1002_chapter8.js';
import { psy1002_chapter9 } from './questions/psy1002_chapter9.js';
import { psy1002_chapter10 } from './questions/psy1002_chapter10.js';
import { psy1002_chapter11 } from './questions/psy1002_chapter11.js';
import { psy1002_chapter12 } from './questions/psy1002_chapter12.js';

// Central list of all available quiz modules
export const quizRegistry = [
  psy1002_chapter1,
  psy1002_chapter2,
  psy1002_chapter3,
  psy1002_chapter4,
  psy1002_chapter5,
  psy1002_chapter6,
  psy1002_chapter7,
  psy1002_chapter8,
  psy1002_chapter9,
  psy1002_chapter10,
  psy1002_chapter11,
  psy1002_chapter12
];

// Helper to construct a single array containing ALL questions for Marathon Mode
export function getMarathonQuestions() {
  return quizRegistry.flatMap(quiz => quiz.questions);
}
