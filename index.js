//Stores Game Pattern
var gamePattern = [];
//Stores User's Pattern
var userClickedPattern = [];
//Keep track of level
var level = 0;

var started = false;

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
  console.log(gamePattern);
}

//Handles Clicks
$(".btn").click(function() {

  if (started === false) {

  } else {
    var userChosenColor = $(this).attr("id");
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
  }


});

//Handle keyboard input
$(document).keypress(function() {
  if (started === false) {
    nextSequence();
    started = true;
  }
});


//WIN/LOSE CONDITIONS
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("correct");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
          nextSequence();
        },
        1000
      );

    }
  } else {
    console.log("wrong");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();

  }
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}

//Plays sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animate the button presses
function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
