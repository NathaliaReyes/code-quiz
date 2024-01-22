var timeEl = document.querySelector(".timer");
var mainEl = document.getElementById("main");
var startBtn = document.querySelector(".btn-start")
var endEl = document.getElementById("end");
var quizEl = document.getElementById("quiz");
var btnSubmit = document.querySelector(".btn-submit")
var userInitials = document.getElementById("initials");
var formEl = document.getElementById("initials-form");
var score = 0;
var questionIndex = 0;
var secondsLeft = 90;
var timerInterval;

var questions = [
    {
        question: 'Which of the following is not a data type in JavaScript?',
        answers: ['String', 'Boolean', 'Float', 'Object'],
        correctAnswer: 'Float'
    },
    {
        question: 'How is a variable declared in JavaScript?',
        answers: ['let myVar;', 'variable myVar;', 'var myVar;', 'const myVar;'],
        correctAnswer: 'var myVar;'
    },
    {
        question: 'What is the strict comparison operator in JavaScript?',
        answers: ['=', '==', '===', '!='],
        correctAnswer: '==='
    },
    {
        question: 'What function is used to print to the console in JavaScript?',
        answers: ['console.log()', 'print()', 'log()', 'console()'],    
        correctAnswer: 'console.log()'
    },
    {
        question: 'How is a for loop written in JavaScript?',
        answers: ['for (i = 0; i < 5; i++)', 'for (i = 0; i < 5)', 'for (i = 0; i < 5; i--)', 'for (i = 0, i < 5, i++)'],
        correctAnswer: 'for (i = 0; i < 5; i++)'
    },
    {
        question: 'What is the result of 10 + "5" in JavaScript?',
        answers: ['"105"', '105', '15', 'Error'],
        correctAnswer: '"105"'
    },
    {
        question: 'What method is used to add an element to the end of an array in JavaScript?',
        answers: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()'
    },
    {
        question: 'What does JSON stand for in JavaScript?',
        answers: ['Java Standard Object Notation', 'Just Simple Object Naming', 'JavaScript Object Notation', 'JavaScript Oriented Notation'],
        correctAnswer: 'JavaScript Object Notation'
    },
    {
        question: 'How can you prevent a form from being submitted automatically when clicking the submit button?',
        answers: ['event.preventDefault()', 'event.stopPropagation()', 'event.stop()', 'event.stopImmediatePropagation()'],
        correctAnswer: 'event.preventDefault()'
    }
];

function startGame() {
    mainEl.style.display = "none";
    secondsLeft = 90;
    setTime();
    showQuestions();
}

startBtn.addEventListener("click", startGame);

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        document.querySelector(".timer").textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function showQuestions() {

    document.getElementById("question").innerHTML = questions[questionIndex].question;
    var answers = document.getElementById("answers");
    answers.innerHTML = '';
    questions[questionIndex].answers.forEach(function(answer) {
        var button = document.createElement("button");
        button.style.display = "block";
        button.textContent = answer;
        button.className = "btn-answer";
        button.addEventListener("click", checkAnswer);
        answers.appendChild(button);
    });
}

function checkAnswer() {
    if (this.textContent === questions[questionIndex].correctAnswer) {
        document.getElementById("result").innerHTML = "Correct!";
        score++;
        console.log()
    } else {
        document.getElementById("result").innerHTML = "Wrong!";
        secondsLeft -= 10;
    }
    questionIndex++;
    
    if (questionIndex < questions.length) {
        showQuestions();
    } else {
        endGame(); 
    }
}

// Function that ends the game
function endGame() {
    clearInterval(timerInterval);
    timeEl.innerHTML = '';
    document.getElementById("end").style.display = "block"; // show the end screen
    document.getElementById("final-score").textContent = score;// show the final score
    quizEl.style.display = "none"; 
}

function saveLastScore() {
    //Save related form data as an object
    var userScore = {
        user: userInitials.value,
        score : score
    };

    // Get the existing scores
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    // Add the new score
    scores.push(userScore);
    // Save the scores
    localStorage.setItem('scores', JSON.stringify(scores));
};

function renderLastScore() {
    // Get the scores
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    // Get the list
    var list = document.getElementById('showScores');
    // Clear the list
    list.innerHTML = '';
    // Add each score to the list
    for (var i = 0; i < scores.length; i++) {
        var li = document.createElement('li'); // create a list item
        li.textContent = scores[i].user + ': ' + scores[i].score; // set the text
        li.className = 'score-item';
        list.appendChild(li); // add the list item to the list
    }
    var btnBack = document.createElement('button');
    btnBack.textContent = "Go back";
    btnBack.className = "btn-back";
    document.querySelector(".final").appendChild(btnBack);

    var btnClean = document.createElement('button');
    btnClean.textContent = "Clear all scores";
    btnClean.className = "btn-clean";
    document.querySelector(".final").appendChild(btnClean);

    var cleanButton = document.querySelector(".btn-clean");

    cleanButton.addEventListener('click', function(){
        localStorage.clear();
        list.innerHTML = '';
    });

    var backButton = document.querySelector(".btn-back");

    backButton.addEventListener('click', function(){
        location.reload();
    });
}

btnSubmit.addEventListener('click', function(event){
    event.preventDefault();
    formEl.style.display = "none";
    saveLastScore();
    renderLastScore();
})



