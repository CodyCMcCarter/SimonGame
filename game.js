//Hold color options
var buttonColors = ["red", "blue", "green", "yellow"];
//Hold pattern for current game
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

function NextSequence() {
    userPattern = [];
    //Generate random number from 0-4 and add the corresponding color to the game pattern
    var randomNumber = Math.floor(Math.random()*4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);

    //Animate the button to indicate the next button in the pattern
    gamePattern.forEach(function (color, index) {
        setTimeout(function () {
            $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
        PlaySound(color);
        }, 300 * index);
        
    });
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(event){
    if(userPattern.length < gamePattern.length){
        //Store the button the user clicked
        var clicked = event.target.id;
        userPattern.push(clicked);

        //Play a sound on click
        PlaySound(clicked);
        //Animate the button on click
        AnimateClicked(clicked);

        CheckAnswer(userPattern.length-1);
    }
});

function PlaySound(color) {
    //play a sound with the animation
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function AnimateClicked(color) {
    var button = $("#"+color);
    button.addClass("pressed");
    setTimeout(() => {$(button.removeClass("pressed"))}, 100);
}

$(document).on("keydown", function() {
    if(!started) {
        started = true;
        NextSequence();
    }
});

function CheckAnswer(currentLevel) {
    console.log(userPattern);

    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(() => {NextSequence()}, 1000);
        }
        console.log("correct");
    }else {
        PlaySound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        StartOver();
        console.log("wrong");
    }
}

function StartOver() {
    gamePattern = [];
    level = 0;
    started = false;
}