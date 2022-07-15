
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var keyDisable = false;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});

$(document).keydown(function () {
    if (!keyDisable) {
        nextSequence();
        keyDisable = true;
    }

});
function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + level);

    level++;
    setTimeout(function () {
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];

        gamePattern.push(randomChosenColour);

        playSound(randomChosenColour);
    }, 500);

}

function playSound(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(50);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 90);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over!");
        setTimeout(function () {
            $("h1").text("Press Any Key to Restart");
        }, 1200);

        startOver();

    }

}

function startOver() {
    gamePattern = [];
    level = 1;
    keyDisable = false;
}