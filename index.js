var userColor;
var randomNumber;
var randomColor;
var gamePattern=[];
var userPattern=[];
var color=["red","green","blue","yellow"];
var started=false;
var level=0;

$(document).keydown(start);

function start(){
    if(!started){
        $("h1").text("Level-"+level);
        nextSequence();
        started=true;
    }
}

function nextSequence(){
    level++;
    $("h1").text("Level-"+level);
    randomNumber=Math.floor(Math.random()*4);
    randomColor=color[randomNumber];
    gamePattern.push(randomColor);

    $("."+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio(randomColor+".mp3");
    audio.play();
}

$("button").click(userSelection);

function userSelection(e){
    userColor=e.target.classList[1];
    userPattern.push(userColor);

    console.log(userPattern);

    $("."+userColor).addClass("pressed");

    setTimeout(function(){
        $("."+userColor).removeClass("pressed");
    },100);

    var audio=new Audio(userColor+".mp3");
    audio.play();

    if(gamePattern[userPattern.length-1]==userPattern[userPattern.length-1]){
        if(gamePattern.length==userPattern.length){
            userPattern=[];
            setTimeout(nextSequence,1000);
        }
    }
    else{
        $("h1").text("Game-Over!! Max-level achieved:"+level);

        var audio_wrong=new Audio("wrong.mp3");
        audio_wrong.play();

        $("body").addClass("wrong-pressed");
        setTimeout(function(){
            $("body").removeClass("wrong-pressed");
        },200);
        restart();
    }
}

function restart(){
    level=0;
    started=false;
    gamePattern=[];
    userPattern=[];
}