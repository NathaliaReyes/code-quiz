// Declaration of variables selecting elements from the DOM
var timeEl = document.querySelector(".timer");
var mainEl = document.getElementById("main");
var startBtn = document.querySelector(".btn-start")
var endEl = document.getElementById("end");
var quizEl = document.getElementById("quiz");
var btnSubmit = document.querySelector(".btn-submit")
var userInitials = document.getElementById("initials");
var formEl = document.getElementById("initials-form");
var viewScoresLink = document.getElementById("viewScoresLink");
// variable to store the score
var score = 0;
// variable to store the question index
var questionIndex = 0;
// variable to store the seconds left
var secondsLeft = 90;
// variable to store the timer interval, it will be used to clear the interval
var timerInterval;
// Array of questions
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

// Function that starts the game, it's called when the start button is clicked
function startGame() {
    mainEl.style.display = "none";
    secondsLeft = 90;
    setTime();
    showQuestions();
}

// Event listener for the start button
startBtn.addEventListener("click", startGame);

// Function that sets the time interval for the timer
function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        // Decrease secondsLeft by 1 second which is 1000 milliseconds
        secondsLeft--;
        document.querySelector(".timer").textContent = secondsLeft;
        // If secondsLeft is less than or equal to 0, clear interval and end the game
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function that shows the questions
function showQuestions() {
    // Show the question
    document.getElementById("question").innerHTML = questions[questionIndex].question;
    // Get the element that will contain the answers
    var answers = document.getElementById("answers");
    // Clear the answers
    answers.innerHTML = '';
    questions[questionIndex].answers.forEach(function(answer) {
        // Create a button for each answer
        var button = document.createElement("button");
        // Set the buttons to display as block
        button.style.display = "block";
        // Set the text of the button to the answer
        button.textContent = answer;
        // Add a class to the button
        button.className = "btn-answer";
        // Add an event listener to the button
        button.addEventListener("click", checkAnswer);
        // Add the button to the answers element
        answers.appendChild(button);
    });
}

// This function checks if the answer is correct or not
function checkAnswer() {
    // If the text content of the button is equal to the correct answer, show "Correct!" and increase the score by 1
    if (this.textContent === questions[questionIndex].correctAnswer) {
        document.getElementById("result").innerHTML = "Correct!";
        score++;
        // If the answer is correct, show "Wrong!" and decrease the seconds left by 10
    } else {
        document.getElementById("result").innerHTML = "Wrong!";
        secondsLeft -= 10;
    }
    // Increase the question index by 1
    questionIndex++;
    
    // If the question index is less than the length of the questions array, show the next question
    if (questionIndex < questions.length) {
        showQuestions();
        // Otherwise, end the game
    } else {
        endGame(); 
    }
}

// Function that ends the game
function endGame() {
    // First, clear the timer interval
    clearInterval(timerInterval);
    // Then, hide the timer to empty
    timeEl.innerHTML = '';
    // Show the end screen as a block
    document.getElementById("end").style.display = "block"; 
    // Show the final score
    document.getElementById("final-score").textContent = score;
    // Hide the quiz element which contains the questions
    quizEl.style.display = "none"; 
}

// This function saves the last score in local storage
function saveLastScore() {
    //Save related form data as an object
    var userScore = {
        user: userInitials.value,
        score : score
    };

    // Get the existing scores
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    // Add the new score to the scores array as the last item
    scores.push(userScore);
    // Save the scores and convert to a string
    localStorage.setItem('scores', JSON.stringify(scores));
};

// This function renders the last score
function renderLastScore() {
    // Get the scores
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    // Get the list
    var list = document.getElementById('showScores');
    // Clear the list
    list.innerHTML = '';
    // Add each score to the list
    for (var i = 0; i < scores.length; i++) {
        // Create a list item
        var li = document.createElement('li'); 
        // Set the text
        li.textContent = (i + 1) + "  " + scores[i].user + ': ' + scores[i].score;
        // Add a class to the list item
        li.className = 'score-item';
        // Add the list item to the list
        list.appendChild(li);
    }
    // Create a button to go back to the start screen
    var btnBack = document.createElement('button');
    btnBack.textContent = "Go back";
    btnBack.className = "btn-back";
    document.querySelector(".final").appendChild(btnBack);

    // Create a button to clear all scores
    var btnClean = document.createElement('button');
    btnClean.textContent = "Clear all scores";
    btnClean.className = "btn-clean";
    document.querySelector(".final").appendChild(btnClean);

    var cleanButton = document.querySelector(".btn-clean");
    // Add an event listener to the button btnClean, when clicked, clear the local storage and the list
    cleanButton.addEventListener('click', function(){
        localStorage.clear();
        list.innerHTML = '';
    });

    var backButton = document.querySelector(".btn-back");
    // Add an event listener to the button btnBack, when clicked, reload the page meaning go back to the start screen
    backButton.addEventListener('click', function(){
        location.reload();
    });
}

// Add an event listener to the submit button, when clicked, prevent the default action of the form, 
// hide the form, save the last score and render the last score
btnSubmit.addEventListener('click', function(event){
    event.preventDefault();
    formEl.style.display = "none";
    saveLastScore();
    renderLastScore();
})

// This event listener is for the view scores link, when clicked, prevent the default action of the <a> tag
// and show the scores with 2 different messages depending on if there are scores or not
// If there are no scores, show a message with a link to the quiz,
// If there are scores, show the top two scores
viewScoresLink.addEventListener('click', function(event) {
    // Prevent the default action of the <a> tag
    event.preventDefault();

    var scores = JSON.parse(localStorage.getItem('scores'));
    if(scores === null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There are no scores to show.",
            footer: '<a href="#" id="quizLink">Do you want to take the Code Quiz?</a>'
        });
    document.addEventListener('click', function(event) {
        if (event.target.id === 'quizLink') {
            event.preventDefault();
            Swal.close();
            location.reload();
        }
    });
    } else {
        // Sort the scores from highest to lowest
        scores.sort(function(a, b) {
            return b.score - a.score;
        });

        // Get the top two scores
        var topTwoScores = scores.slice(0, 2);
        
        // Create a message with the top two scores
        var message = '\n';
        topTwoScores.forEach(function(score, index) {
            message += (index + 1) + '. ' + score.user + ': ' + score.score + '\n';
        });

        Swal.fire({
            title: "Top two scores:",
            text: message,
            imageUrl: "https://images.unsplash.com/flagged/photo-1578928534298-9747fc52ec97?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "First and Second Places"
            });
        
        }
});

// End of coding quiz challenge


