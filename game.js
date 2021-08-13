const buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var gamePattern = [];
var level = 0;
var gameStarted = false;

// Game start
$(document).on("keypress", function (e) {
    // if key pressed is A or a
    if ((e.which === 65 || e.which === 97) && !gameStarted) {
        gameStarted = true;
        play();
    }
});

// On button click
$(".btn").click(function (e) {
    var butId = e.target.id;
    userClickPattern.push(butId);
    animatePress(butId);
    playSound(butId);
    checkAnswer(userClickPattern.length - 1);
});

function play() {
    userClickPattern = []; // start of new level reset input
    $("#level-title").text("Level " + ++level);
    var randomColor = buttonColors[getRandomInt(0, 3)];
    gamePattern.push(randomColor);
    $("#" + randomColor)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomColor);
}

function checkAnswer(idx) {
    if (userClickPattern[idx] === gamePattern[idx]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(() => {
                play();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over. Press A to play again.");
        startOver();
    }
}

function startOver() {
    level = 0;
    gameStarted = false;
    gamePattern = [];
}

function playSound(name) {
    // Play sound on click
    var full_name = "sounds/" + name + ".mp3";
    var audio = new Audio(full_name);
    audio.play();
}

function animatePress(color) {
    // Animate the button click
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function getRandomInt(min, max) {
    /*
    Generates a random number between an inclusive range
    https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
