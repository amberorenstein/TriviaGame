$(document).ready(function() {
//VARIABLES
var startGame;
var gameDisplay;
var gameImage;
var counter = 20;
var questionCounter = 0;
var questionArray = ["Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!", "Name that cheese!"];
var questionImage = ["<img src='assets/images/gouda.jpg'>","<img src='assets/images/asiago.jpg'>","<img src='assets/images/chevre.jpg'>","<img src='assets/images/feta.jpg'>","<img src='assets/images/manchego.jpg'>", "<img src='assets/images/mascarpone.jpg'>", "<img src='assets/images/mozarella.jpg'>", "<img src='assets/images/parm.jpg'>", "<img src='assets/images/roquefort.jpg'>", "<img src='assets/images/whiz.jpg'>"];
var answerArray = [["Mozarella", "Cheddar", "Gouda", "Parmesan"],["Asiago", "Gouda", "Brie", "Parmesan"],["Asiago", "Camembert", "Gouda", "Chevre"],["Feta", "Asiago", "Camembert", "Romano"],["Cheddar", "Manchego", "Chevre", "Parmesan"],["Mascarpone", "Manchego", "Roquefort", "Gouda"],["Asiago", "Mozarella", "Manchego", "Camembert"],["Asiago", "Roquefort", "Camembert", "Parmesan"],["Roquefort", "Mozarella", "Camembert", "Gouda"],["Chevre", "Cheddar", "Parmesan", "Not a real cheese food"]];
var correctAnswers= ["Gouda","Asiago","Chevre","Feta","Manchego","Mascarpone","Mozarella","Parmesan","Roquefort","Not a real cheese food"];
var answerPicked;
var countdownTimer;
var correctTotal = 0;
var incorrectTotal = 0;


//Function that creates the Start Button
function startTrivia() {
	startGame = "<p><a class='btn btn-primary btn-lg btn-block start-button' href ='#' role='button'>Click Here to Start</a></p>" + "<p><img src = 'assets/images/mouse.jpg'></p>";
	$(".row-2").html(startGame);
}

startTrivia();

//Start game click event
$(".start-button").on("click", function(event){
	fillDisplay();
	runTimer();
	$(".jumbotron").hide();
	$(".row-2").hide();
});



//Function to provides question
function fillDisplay() {
	gameDisplay = "<p class='text-center timer-p'>Time Remaining: <span class ='timer'>20</span></p><p class = 'text-center'>" + questionArray[questionCounter] + "</p>" + "<p class ='answer btn btn-primary btn-lg btn-block'>" + answerArray[questionCounter][0] + "</p><p class ='answer btn btn-primary btn-lg btn-block'>" + answerArray[questionCounter][1] + "</p><p class ='answer btn btn-primary btn-lg btn-block'>" + answerArray[questionCounter][2] + "</p><p class ='answer btn btn-primary btn-lg btn-block'>" + answerArray[questionCounter][3] + "</p>";
	gameImage = "<p>" + "<img>" + questionImage[questionCounter];
	$(".picture").html(gameImage);
	$(".main-space").html(gameDisplay);
	console.log("?index#: "+ questionCounter);
}

//Function for the end of the game
function endGame() {
	gameDisplay = 
	"<p class = 'text-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>GAME OVER: RESULTS" + "</p>" + "<p class = 'text-center totals'>Correct Answers : " + correctTotal + "</p>" + "<p class = 'text-center totals'>Incorrect Answers: " + incorrectTotal + "</p>" + "<p>" + "<a class='btn btn-success btn-lg btn-block restart-button' href ='#' role='button'>Play Again</a>" + "</p>";
	$(".main-space").html(gameDisplay);
}


//Function to switch to next question 
function nextQuestion(){
	if(questionCounter <= 8) {
		questionCounter++;
		fillDisplay();
		counter = 20;
		runTimer();
	}
//Conditional that identifies when the game is over, displays the results and allows the user to restart
	else if (questionCounter == 9) {
		endGame();

		$(".restart-button").on("click", function(event){
		incorrectTotal = 0;
		correctTotal = 0;
		questionCounter = 0;
		fillDisplay();
		runTimer();
		});
	}
}

//Function to count correct answer choice
function countCorrect() {
	correctTotal++;
	// gameDisplay = "<p class= 'text-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>Correct! The answer is : " + correctAnswers[questionCounter] + "</p>";
	// $(".main-space").html(gameDisplay);
	console.log("correct answers = " + correctTotal);
	alert("CORRECT!");
	setTimeout(3000);
	nextQuestion();
}

//Function to count incorrect answer choice
function countIncorrect() {
	incorrectTotal++;
	console.log("incorrect total = " + incorrectTotal);
	// gameDisplay = "<p class= 'text-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>Incorrect! The correct answer is : " + correctAnswers[questionCounter] + "</p>";
	// $(".main-space").html(gameDisplay);
	alert("NOPE!");
	setTimeout(3000);
	nextQuestion();
}

//Function when time runs out
function timeoutLoss() {
	// gameDisplay = "<p class = 'test-center timer-p'>Time Remaining: <span class = 'timer'>" + counter + "</span></p>" + "<p class = 'text-center'>Time's up! The correct answer was: "+correctAnswers[questionCounter] + "</p>";
	incorrectTotal++;
	// $(".main-space").html(gameDisplay);
	console.log("incorrect total = " + incorrectTotal);
	alert("TIME'S UP!");
	setTimeout(3000);
	nextQuestion();
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


//Click events for picking answers
$("body").on("click", ".answer", function(event){
	answerPicked = $(this).text();
	console.log("answer picked:" + answerPicked);
	console.log("correct answer: " + correctAnswers[questionCounter]);
	if(answerPicked == correctAnswers[questionCounter]) {
		clearInterval(countdownTimer);
		countCorrect();
	}

	else {
		clearInterval(countdownTimer);
		countIncorrect();
	}

});



});

