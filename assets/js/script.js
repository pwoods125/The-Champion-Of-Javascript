var startbtn = document.querySelector("#Startbtn");
var questionContainer = document.getElementById("question-content");
var newscorecardContainer = document.getElementById("newscorecard");
var lastscorecardContainer = document.getElementById("lastscorecard");
var questionsEl = document.getElementById("Questions");
var answerbtnsEl = document.getElementById("answerbtns");
var timeremaining = 20;
var timeinterval;
var timerEl = document.getElementById("Countdown");
var interval = 1000;
var currentQuestionIdxNum = 0;
var score = 0;
var postbtn = document.getElementById("postrecord");
var challenger = document.getElementById("newchallenger");

// GIVEN I am taking a code quiz
// WHEN I click the start button
startbtn.addEventListener("click", startgame);
answerbtnsEl.addEventListener("click", () => {
    currentQuestionIdxNum++;
    console.log(questionsArray.length)
    console.log(currentQuestionIdxNum)
    if (currentQuestionIdxNum >= questionsArray.length){
        gameover();
        countdown(0);
    } else {
        displayQuestions();
    }
});

function startgame() {
    startbtn.classList.add("hide");
    questionContainer.classList.remove("hide");
    challenger.classList.add("hide");
    timerEl.classList.remove("hide"); 
// THEN a timer starts
    countdown(interval);
    displayQuestions();
}

function countdown(interval){
    timeinterval = setInterval(() => {
        if (timeremaining > 1) {
            timerEl.textContent = timeremaining + " seconds remaining";
            timeremaining--;
          } else if (timeremaining === 1) {
            timerEl.textContent = timeremaining + " second remaining";
           timeremaining--;
          } else {
            timerEl.textContent = "";
            clearInterval(timeremaining);
            gameover();
          }       
    }, interval);
}

// I am presented with a question
function displayQuestions() {
    resetState();
    var currentQuestions = questionsArray[currentQuestionIdxNum];
    var questionNum = currentQuestionIdxNum + 1;
    questionsEl.innerHTML = questionNum + ". " + currentQuestions.question;
    currentQuestions.answers.forEach(answers => {
        var button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("ansbtn");
        button.dataset.correct = answers.correct;
        button.addEventListener("click", answerselection);
        answerbtnsEl.appendChild(button);
    });
}    

function resetState() {
    while (answerbtnsEl.firstChild) {
        answerbtnsEl.removeChild
        (answerbtnsEl.firstChild)
    }
}

// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
function answerselection(event){
    var buttonSelected = event.target;
    var correct = buttonSelected.dataset.correct;
    if (correct=="false"){
         timeremaining -= 5;
         countdown(20000);
    } else if (correct=="true"){
        score += 1;
    }
}

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
function gameover() {
    questionContainer.classList.add("hide");
    newscorecardContainer.classList.remove("hide");
    lastscorecardContainer.classList.remove("hide");
    timerEl.classList.add("hide");
    document.getElementById("totalscore").value = score;
    renderResults();
}

// WHEN the game is over
// THEN I can save my initials and my score
function renderResults() {
    var currentPlayer = localStorage.getItem("newPlayerInitials");
    var currentPlayerScore = localStorage.getItem("newPlayerScore");
    var userInitals = document.querySelector("#user-intials");
    var userScore = document.querySelector("#user-score");

    userInitals.textContent = currentPlayer;
    userScore.textContent = currentPlayerScore;
}

postbtn.addEventListener("click", function(event){
    event.preventDefault();

    var newPlayerInitials = document.querySelector("#playerinitials").value;
    var newPlayerScore = document.querySelector("#totalscore").value;

    localStorage.setItem("newPlayerInitials", newPlayerInitials);
    localStorage.setItem("newPlayerScore", newPlayerScore);

    renderResults();
});

// Array of Questions and Answers
var quizcontent = document.querySelector("#quizcontent");
var questionsArray = [
    {
        question: "The var keyword is used to:",
        answers: [
            {text: "Declare a variable", correct: true},
            {text: "Set a function", correct: false},
            {text: "Create a class", correct: false},
        ]
    },
    {
        question: "What are the two types of variables?",
        answers: [
            {text: "jSON and Node", correct: false},
            {text: "Parent and Child", correct: false},
            {text: "Primitive and Reference", correct: true},
        ]
    },
    {
        question: "The For keyword represents a:",
        answers: [
            {text: "Array", correct: false},
            {text: "Loop", correct: true},
            {text: "Object", correct: false},
        ]
    },
    {
        question: "What is the name for a single variable that is used to hold a group of related data or list of items?",
        answers: [
            {text: "Function", correct: false},
            {text: "Loop", correct: false},
            {text: "Array", correct: true},
        ]
    }
];



