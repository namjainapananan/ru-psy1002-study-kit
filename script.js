import { quizRegistry, getMarathonQuestions } from './registeredquestions.js';

// State
let activeQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = []; // Tracks selected index for each question: [index or null]

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const chapterList = document.getElementById('chapter-list');
const marathonBtn = document.getElementById('marathon-btn');

const quizTitleText = document.getElementById('quiz-title-text');
const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const statusBar = document.getElementById('status-bar');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const summaryContainer = document.getElementById('summary-container');
const scoreBadge = document.getElementById('score-badge');
const summaryText = document.getElementById('summary-text');
const reviewContainer = document.getElementById('review-container');
const reviewList = document.getElementById('review-list');
const backToMenuBtn = document.getElementById('back-to-menu-btn');

// --- 1. Populate Selection Screen ---
function initMenu() {
  chapterList.innerHTML = '';
  
  quizRegistry.forEach((quiz) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `${quiz.title} (${quiz.questions.length} ข้อ)`;
    btn.addEventListener('click', () => startQuiz(quiz.questions, quiz.title));
    chapterList.appendChild(btn);
  });
}

marathonBtn.addEventListener('click', () => {
  const allQuestions = getMarathonQuestions();
  startQuiz(allQuestions, "🏃‍♂️ Marathon Mode (ทุกบทเรียน)");
});

// --- 2. Quiz Lifecycle ---
function startQuiz(questions, title) {
  activeQuestions = questions;
  quizTitleText.textContent = title;
  currentQuestionIndex = 0;
  userAnswers = new Array(questions.length).fill(null);

  selectionScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  summaryContainer.classList.add('hidden');
  statusBar.classList.remove('hidden');

  loadQuestion();
}

function calculateScore() {
  return userAnswers.reduce((score, selectedIdx, qIdx) => {
    if (selectedIdx !== null && selectedIdx === activeQuestions[qIdx].answer) {
      return score + 1;
    }
    return score;
  }, 0);
}

function loadQuestion() {
  feedbackEl.textContent = '';
  optionsEl.innerHTML = '';

  const total = activeQuestions.length;
  progressText.textContent = `ข้อที่ ${currentQuestionIndex + 1}/${total}`;
  scoreText.textContent = `Score: ${calculateScore()}`;

  // Toggle Previous Button
  if (currentQuestionIndex > 0) {
    prevBtn.classList.remove('hidden');
  } else {
    prevBtn.classList.add('hidden');
  }

  const currentQ = activeQuestions[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;

  const hasAnswered = userAnswers[currentQuestionIndex] !== null;

  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = optionText;

    if (hasAnswered) {
      button.disabled = true;
      const selectedIndex = userAnswers[currentQuestionIndex];
      if (index === currentQ.answer) {
        button.classList.add('correct');
      }
      if (index === selectedIndex && selectedIndex !== currentQ.answer) {
        button.classList.add('wrong');
      }
    } else {
      button.addEventListener('click', () => selectOption(index));
    }

    optionsEl.appendChild(button);
  });

  if (hasAnswered) {
    const selectedIndex = userAnswers[currentQuestionIndex];
    if (selectedIndex === currentQ.answer) {
      feedbackEl.textContent = "ถูกต้อง! :)";
      feedbackEl.style.color = "#28a745";
    } else {
      feedbackEl.textContent = "ผิด :c";
      feedbackEl.style.color = "#dc3545";
    }
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.add('hidden');
  }
}

function selectOption(selectedIndex) {
  userAnswers[currentQuestionIndex] = selectedIndex;
  loadQuestion();
}

prevBtn.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  const total = activeQuestions.length;
  const score = calculateScore();
  const percentage = Math.round((score / total) * 100);

  questionEl.textContent = "ตอบคำถามครบแล้ว!";
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  statusBar.classList.add('hidden');
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');

  scoreBadge.textContent = `${percentage}%`;
  summaryText.textContent = `คุณตอบถูก ${score} ข้อ จากคำถามทั้งหมด ${total} ข้อ`;

  reviewList.innerHTML = '';
  
  // Filter incorrect responses for review summary
  const incorrectAnswers = [];
  activeQuestions.forEach((q, idx) => {
    const selected = userAnswers[idx];
    if (selected !== q.answer) {
      incorrectAnswers.push({
        question: q.question,
        userSelected: selected !== null ? q.options[selected] : 'ไม่ได้ตอบ',
        correctAnswer: q.options[q.answer]
      });
    }
  });

  if (incorrectAnswers.length > 0) {
    reviewContainer.classList.remove('hidden');
    incorrectAnswers.forEach(item => {
      const div = document.createElement('div');
      div.className = 'review-item';
      div.innerHTML = `
        <p><strong>Q:</strong> ${item.question}</p>
        <p class="your-ans"><strong>ที่คุณเลือก:</strong> ✖ ${item.userSelected}</p>
        <p class="correct-ans"><strong>ที่ถูกต้อง:</strong> ✔ ${item.correctAnswer}</p>
      `;
      reviewList.appendChild(div);
    });
  } else {
    reviewContainer.classList.add('hidden');
  }

  summaryContainer.classList.remove('hidden');
}

backToMenuBtn.addEventListener('click', () => {
  quizScreen.classList.add('hidden');
  selectionScreen.classList.remove('hidden');
});

// Boot application
initMenu();