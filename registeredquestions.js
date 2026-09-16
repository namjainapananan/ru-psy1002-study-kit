
import { ch1Pre } from './questions/ch1_pre.js';
import { ch1Post } from './questions/ch1_post.js';

// Central list of all available quiz modules
export const quizRegistry = [
  ch1Pre,
  ch1Post
];

// Helper to construct a single array containing ALL questions for Marathon Mode
export function getMarathonQuestions() {
  return quizRegistry.flatMap(quiz => quiz.questions);
}
