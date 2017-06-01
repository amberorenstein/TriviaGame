$(document).ready(function() {
//VARIABLES
var startGame;
var gameDisplay;
var counter = 20;
var questionCounter = 0;
var questionArray = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8", "Question 9", "Question 10"];
var answerArray = [["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"]];
var correctAnswers= ["C","C","C","C","C","C","C","C","C","C"];
var answerPicked;
var countdownTimer;
var correctTotal = 0;
var incorrectTotal = 0;
var triesLeft = 3;


//Function that creates the Start Button
function startTrivia() {
	startGame = "<a class='btn btn-primary btn-lg btn-block start-button' href ='#' role='button'>Start Game</a>"
	$(".main-space").html(startGame);
}

startTrivia();

//Start game click event
$(".start-button").on("click", function(event){
	fillDisplay();
	runTimer();
});

//Function to provides question
function fillDisplay() {
	gameDisplay = "<p class='text-center timer-p'>Time Remaining: <span class ='timer'>20</span></p><p class = 'text-center'>" + questionArray[questionCounter] + "</p><p class = 'first answer'>1. " + answerArray[questionCounter][0] + "</p><p class = 'second answer'>2. " + answerArray[questionCounter][1] + "</p><p class = 'third answer'>3. " + answerArray[questionCounter][2] + "</p><p class = 'fourth answer'>4. " + answerArray[questionCounter][3] + "</p>";
	$(".main-space").html(gameDisplay);
}

//Function to count correct answer choice
function countCorrect() {
	correctTotal++;
	gameDisplay = "<p class= 'text-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>Correct! The answer is : " + correctAnswers[questionCounter] + "</p>";
	$(".main-space").html(gameDisplay);
	setTimeout(next(3000));
}

//Function to count incorrect answer choice
function countIncorrect() {
	incorrectTotal++;
	gameDisplay = "<p class= 'text-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>Incorrect! The correct answer is : " + correctAnswers[questionCounter] + "</p>";
	$(".main-space").html(gameDisplay);
	setTimeout(next(3000));
}

//Function when time runs out
function timeoutLoss() {
	gameDisplay = "<p class = 'test-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>Time's up! The correct answer was: "+correctAnswers[questionCounter] + "</p>";
	incorrectTotal++;
	$(".main-space").html(gameDisplay);
	setTimeout(next(3000));
}

//Function for the end of the game
function endGame() {
	gameDisplay = "<p class = 'text-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>GAME OVER: RESULTS" + "</p>" + "<p class = 'totals'>Correct Answers : " + correctTotal + "</p>" + "<p>Incorrect Answers: " + incorrectTotal + "</p>";
}

//Function for countdown timer 
function runTimer() {
	countdownTimer = setInterval(twentySeconds, 1000);
	function twentySeconds() {
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);

		if (counter === 0) {
			clearInterval(countdownTimer);
			timeoutLoss();

		}
	}
}

//Function to switch to next question
function next(){
	if(questionCounter < 10) {
		questionCounter++
		fillDisplay();
		counter = 20;
		runTimer();
	}
	else {
		endGame();
	}
}

//Click events for picking answers
$("body").on("click", ".answer", function(event){
	answerPicked = $(this).text();

	if(answerPicked === correctAnswers[questionCounter]) {
		countCorrect();
	}

	else {
		clearInterval(countdownTimer);
		countIncorrect();
	}

});


});


