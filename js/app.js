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

addGlobalEventListener("click", "#start", e => {
    startGame();
});

addGlobalEventListener("click", "#contact", e => {
    showContactLinks();
});

addGlobalEventListener("click", "#list", e => {
    showQuizListPage();
});
addGlobalEventListener("click", "#back", e => {
    backFunction();
});
// Function to fetch quiz data
async function fetchQuizData() {
    try {
        const response = await fetch('quizData.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

// Function to display quiz questions
async function displayQuiz() {
    const quizData = await fetchQuizData();

    if (!quizData) {
        // Handle error loading data
        return;
    }

    // Use querySelector to get a single element
    const container = document.querySelector(".Container");

    quizData.forEach((questionObj, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<p>${index + 1}. ${questionObj.question}</p>`;
        questionObj.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('input');
            optionElement.type = 'radio';
            optionElement.name = `question${index}`;
            optionElement.value = option;
            optionElement.id = `q${index}o${optionIndex}`;

            const labelElement = document.createElement('label');
            labelElement.htmlFor = `q${index}o${optionIndex}`;
            labelElement.textContent = option;

            questionElement.appendChild(optionElement);
            questionElement.appendChild(labelElement);
        });

        container.appendChild(questionElement);
    });
    console.log("Quiz data:", quizData);
}

// Call the displayQuiz function when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', displayQuiz);

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
    
}

function showContactLinks(){
    buttonGrid.remove(); // Remove the entire grid 
    logo.forEach(logoElement => logoElement.remove()); // Remove each 
    let socialLinks = document.querySelector('.social-links');
    socialLinks.style.display='flex';
    socialLinks.style.verticalAlign='middle';
    

}

function showQuizListPage() {
    buttonGrid.remove(); // Remove the entire grid 
    logo.forEach(logoElement => logoElement.remove()); // Remove each
    nav.style.display='flex';


    // Create and append elements for the Quiz List page
   
   const input = document.querySelector('.fileGrid');
   input.style.display='flex';
   input.style.verticalAlign='center';
   /*const fileInput = document.createElement('input');
   fileInput.type = 'file';
   // Add event listener to handle file upload
   fileInput.addEventListener('change', handleFileUpload);
   container.appendChild(fileInput);
   fileInput.style.display='auto' */
}

function backFunction(){
    window.history.back();
}

 








 /*   displayQA();
}

function displayQA(){
    const container = document.getElementsByClassName("Container");
    quizData.forEach((questionObj, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<p>${index + 1}. ${questionObj.question}</p>`;
        questionObj.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('input');
            optionElement.type = 'radio';
            optionElement.name = `question${index}`;
            optionElement.value = option;
            optionElement.id = `q${index}o${optionIndex}`;
            
            const labelElement = document.createElement('label');
            labelElement.htmlFor = `q${index}o${optionIndex}`;
            labelElement.textContent = option;
            
            questionElement.appendChild(optionElement);
            questionElement.appendChild(labelElement);
        });
        
        container.appendChild(questionElement);
    });
}

// Call the displayQuiz function when the page loads
window.onload = displayQA;

   /* var questionField = document.createElement("H1");
    var question = document.createTextNode("Question Here?");
    questionField.appendChild(question);
    document.body.appendChild(questionField);
    questionField.style.display = "flex";
    questionField.style.boxShadow = "10px 10px 5px #888888";
    questionField.style.textAlign =  "center";
    questionField.style.margin = "-400px";
    questionField.style.justifyContent = "center";
    questionField.style.transition = "all 12s ease-in-out";

    var answerField = document.createElement("INPUT");
    answerField.setAttribute("type", "text");
    document.body.appendChild(answerField);
*/
