
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0 ;
var started = false;
// one function used for only one time event to happen and never repeated again.
// $(document).one("keydown",function() {
//
//   nextSequence();
//   $("h1").text("Level " + level);
//
// });

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){

          setTimeout(function () {
            nextSequence();
          }, 1000);

       }

    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");

        setTimeout(function(){

            $("body").removeClass("game-over");

          }, 200);
        startOver();
      }
}

function nextSequence(){

  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  $("h1").html("Level " + level);

}


$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  // var sound1 = new Audio("sounds/" + userChosenColour + ".mp3");
  // sound1.play();
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {

  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){

      $("#" + currentColour).removeClass("pressed");

    }, 100);
}

function startOver() {

    gamePattern = [];
    level = 0;
    started = false;
}
