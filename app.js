// Single-Page Navigation
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Quiz Data Structure
const quizData = [
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["heading", "h6", "h1", "head"],
    correct: 2
  },
  {
    question: "What CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (currentQuestion >= quizData.length) {
    container.innerHTML = `<h2>Quiz Complete!</h2><p>Your score: ${score}/${quizData.length}</p>`;
    return;
  }

  const q = quizData[currentQuestion];
  container.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, idx) => `
      <button class="option-btn" onclick="checkAnswer(${idx})">${opt}</button>
    `).join('')}
  `;
}

function checkAnswer(selectedIndex) {
  if (selectedIndex === quizData[currentQuestion].correct) score++;
  currentQuestion++;
  renderQuiz();
}

// Initialize quiz on load
renderQuiz();