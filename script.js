
import { quizRegistry, getMarathonQuestions } from 'registeredquestions.js';

// State
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let incorrectAnswers = [];

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const chapterList = document.getElementById('chapter-list');
const marathonBtn = document.getElementById('marathon-btn');

const quizTitleText = document.getElementById('quiz-title-text');
const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
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
  score = 0;
  incorrectAnswers = [];

  selectionScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  summaryContainer.classList.add('hidden');
  statusBar.classList.remove('hidden');

  loadQuestion();
}

function loadQuestion() {
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');
  optionsEl.innerHTML = '';

  const total = activeQuestions.length;
  progressText.textContent = `ข้อที่ ${currentQuestionIndex + 1}/${total}`;
  scoreText.textContent = `Score: ${score}`;

  const currentQ = activeQuestions[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;

  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = optionText;
    button.addEventListener('click', () => selectOption(index));
    optionsEl.appendChild(button);
  });
}

function selectOption(selectedIndex) {
  const currentQ = activeQuestions[currentQuestionIndex];
  const buttons = optionsEl.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQ.answer) {
    score++;
    buttons[selectedIndex].classList.add('correct');
    feedbackEl.textContent = "ถูกต้อง! :)";
    feedbackEl.style.color = "#28a745";
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[currentQ.answer].classList.add('correct');
    feedbackEl.textContent = `ผิด :c`;
    feedbackEl.style.color = "#dc3545";

    incorrectAnswers.push({
      question: currentQ.question,
      userSelected: currentQ.options[selectedIndex],
      correctAnswer: currentQ.options[currentQ.answer]
    });
  }

  scoreText.textContent = `Score: ${score}`;
  nextBtn.classList.remove('hidden');
}

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
  const percentage = Math.round((score / total) * 100);

  questionEl.textContent = "ตอบคำถามครบแล้ว!";
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  statusBar.classList.add('hidden');
  nextBtn.classList.add('hidden');

  scoreBadge.textContent = `${percentage}%`;
  summaryText.textContent = `คุณตอบถูก ${score} ข้อ จากคำถามทั้งหมด ${total} ข้อ`;

  reviewList.innerHTML = '';
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