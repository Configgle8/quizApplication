const startButton = document.getElementById("start");
const allButtons = document.querySelectorAll('.button-56');
const buttonGrid = document.getElementsByClassName("grid");
const logoLoop = document.getElementsByClassName(".Logo");
const logo = Array.from(logoLoop);
var container = document.getElementsByClassName("Container");


addGlobalEventListener("click", "#start", e => {
    startGame();
})

//Global Listener
function addGlobalEventListener(type, selector, callback){
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

//Will use start game to remove button collection and logo this is where the error occurs. Buttons go away but not logo.
function startGame(){
    [...buttonGrid].forEach(button => button.remove());
    displayQA();
}

function displayQA(){
    var questionField = document.createElement("H1");
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

}