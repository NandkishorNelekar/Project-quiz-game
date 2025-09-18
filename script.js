
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style System", "Creative Style System"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Highlevel Text Machine Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1997"],
    answer: "1995"
  },
  {
    question: "Which HTML tag is used to link JavaScript code?",
    options: ["<link>", "<script>", "<js>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "#"
  },
  {
    question: "Which company developed the Java programming language?",
    options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
    answer: "Sun Microsystems"
  },
  {
    question: "What will be the output of 5 % 2 in C?",
    options: ["2.5", "1", "2", "Error"],
    answer: "1"
  },
  {
    question: "Which SQL command is used to remove all records but keep the table?",
    options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    answer: "TRUNCATE"
  },
  {
    question: "Which of the following is NOT an OOP concept?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    answer: "Compilation"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  startTimer();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.textContent = opt;
    btn.className = "option";
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => {
    opt.onclick = null;
    if (opt.textContent === correctAnswer) {
      opt.classList.add("correct");
    }
  });

  if (selected.textContent === correctAnswer) {
    score++;
  } else {
    selected.classList.add("wrong");
  }
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
