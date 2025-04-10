// Pertanyaan
const questions = [
      // 1
      { question: "What is the capital city of France?", 
        options: ["Paris", "London", "Berlin", "Madrid"], 
        correct: 0 },
    // 2
    { question: "Which planet is known as the Red Planet?", 
        options: ["Earth", "Mars", "Jupiter", "Venus"], 
        correct: 1 },
    // 3
    { question: "Who wrote the play 'Romeo and Juliet'?", 
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"], 
        correct: 0 },
    // 4
    { question: "What is the largest ocean on Earth?", 
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3 },
    // 5
    { question: "Which country is known as the Land of the Rising Sun?", 
        options: ["China", "Japan", "South Korea", "Thailand"],
        correct: 1 },
    // 6
    { question: "What is the tallest mountain in the world?", 
        options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
        correct: 1 },
    // 7
    { question: "Who painted the Mona Lisa?", 
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
        correct: 0 },
    // 8
    { question: "What is the smallest country in the world by area?", 
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: 1 },
    // 9
    { question: "Which is the longest river in the world?", 
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correct: 1 },
    // 10
    { question: "What is the chemical symbol for water?", 
        options: ["H2O", "O2", "CO2", "NaCl"],
        correct: 0 }
];

// variabel
let currentQuestionIndex = -1;
let score = 0;
let totalQuestions = questions.length;
let timer;
let timeLeft = 20;


// fungsi 
function showScreen(screenId) {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('quiz-screen').classList.add('d-none');
    document.getElementById('result-screen').classList.add('d-none');
    document.getElementById(screenId).classList.remove('d-none');
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = -1;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex + 1 >= totalQuestions) {
        showResults();
        return;
    }
    currentQuestionIndex++;
    timeLeft = 20;
    startTimer();

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('question-counter').innerText = `${currentQuestionIndex + 1} dari ${totalQuestions}`;
    document.getElementById('progress-bar').style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    document.getElementById('next-question').disabled = true;

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-light', 'btn-option');
        button.innerText = option;
        button.onclick = () => checkAnswer(index, questionData.correct, button);
        optionsContainer.appendChild(button);
    });
}

function startTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('timer').classList.remove('text-danger', 'text-warning', 'text-success');
    document.getElementById('timer').classList.add('text-success');

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 5) {
            document.getElementById('timer').classList.remove('text-success', 'text-warning');
            document.getElementById('timer').classList.add('text-danger');
        } else if (timeLeft <= 10) {
            document.getElementById('timer').classList.remove('text-success');
            document.getElementById('timer').classList.add('text-warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            loadQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex, correctIndex, button) {
    clearInterval(timer);
    document.querySelectorAll('.btn-option').forEach(btn => btn.disabled = true);
    document.getElementById('next-question').disabled = false;

    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
    }
}

function showResults() {
    clearInterval(timer);
    document.getElementById('final-score').innerText = `Skor Anda: ${score} / ${totalQuestions}`;
    showScreen('result-screen');
}

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('next-question').addEventListener('click', loadQuestion);
document.getElementById('retry-quiz').addEventListener('click', () => showScreen('start-screen'));