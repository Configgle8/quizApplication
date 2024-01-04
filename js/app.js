// Global Listener
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e);
    });
}

const startButton = document.getElementById("start");
const buttonGrid = document.querySelector('.grid'); // Use querySelector to get a single element
const logoLoop = document.getElementsByClassName("Logo");
const logo = Array.from(logoLoop);
const fileInput = document.getElementById("fileInput");
const nav = document.querySelector('.navbar');
const back= document.querySelector('#back');
var questions;
var currentQuestionIndex = 0;
var correctAnswers = 0;


addGlobalEventListener("click", "#start", e => {
    startGame();
});

addGlobalEventListener("click", "#contact", e => {
    showContactLinks();
});


// Function to fetch quiz data
async function fetchQuizData() {
   try {
    var response = await fetch('quizData.json');
    questions = await response.json();
    displayQuiz();
   } catch (error) {
    console.error('Error fetching questions:', error);
   }
}

// Function to display quiz questions
async function displayQuiz() {
    // Use querySelector to get a single element
    var questionDiv = document.getElementById('question');
    questionDiv.textContent = questions[currentQuestionIndex].question;
}

function submitAnswer() {
    var userAnswer = document.getElementById('answer-input').value.toLowerCase();
    var correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    var resultElement = document.getElementById('result');

    if (userAnswer === correctAnswer) {
        console.log('correct')
        setTimeout(function() {
        resultElement.innerText = 'Correct! Well done.';
        }, 10);
        correctAnswers++;
    } else {
        console.log('incorrect');
        setTimeout(function() {
        resultElement.innerText = 'Incorrect. Try again.';
        }, 10);
    }

    document.getElementById('answer-input').value = '';
    

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuiz();
        resultElement.textContent = '';
    } else {
        resultElement.textContent = 'You have completed the quiz!';
        displayTotalScore();
    }
}

function displayTotalScore() {
    var totalScoreElement = document.getElementById('total-score');
    totalScoreElement.textContent = 'Total Score: ' + correctAnswers + '/' + questions.length;
}

window.onload = fetchQuizData;

// Will use start game to remove button collection and logo this is where the error occurs. Buttons go away but not logo.
function startGame() {
    buttonGrid.remove(); // Remove the entire grid container
    logo.forEach(logoElement => logoElement.remove()); // Remove each logo element

    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;

            try {
                const quizData = JSON.parse(fileContent);
                displayQuiz(quizData);
            } catch (error) {
                console.error("Error parsing JSON file:", error);
            }
        };

        reader.readAsText(selectedFile);
    } else {
        console.error("No file selected.");
    }
    
    const quizField = document.getElementById('quiz-container');
    quizField.classList.add('show-container');

}

function showContactLinks(){
    buttonGrid.remove(); // Remove the entire grid 
    logo.forEach(logoElement => logoElement.remove()); // Remove each 
    let socialLinks = document.querySelector('.social-links');
    socialLinks.style.display='flex';
    socialLinks.style.verticalAlign='middle';
    

}
