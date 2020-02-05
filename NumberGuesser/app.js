let min = 1 ,
    max = 10,
    winningNum = getRandomWinningNum(min,max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num")
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again listener
game.addEventListener("mousedown",function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})
//Listen for guess

guessBtn.addEventListener("click" ,function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}` , "red");
    }

    //Check if won
    if(guess === winningNum){
        //Game over - WON
        // //Disable input
        // guessInput.disabled = true;
        // //Chnage border to green
        // guessInput.style.borderColor = "green";
        // //Set message
        // setMessage(`${winningNum} is correct!, You win` , "green");
        gameOver(true, `${winningNum} is correct!, You win`)
    }
    else{
        //wrong number
        guessesLeft--;

        if(guessesLeft === 0){
            //game over - lost
            // guessInput.disabled = true;
            // //Chnage border to red
            // guessInput.style.borderColor = "red";
            // //Set message
            // setMessage(`Game over, you lost. The correct number was ${winningNum}` , "red");
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
        }
        else{
            //game continues - answer wrong

            //Chnage border to red
            guessInput.style.borderColor = "red";

            //clear input
            guessInput.value = "";

            //tell user its wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left` , "red");
        }
    }
});
//game over
function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color= "red";

     //Disable input
     guessInput.disabled = true;
     //Chnage border to green
     guessInput.style.borderColor = color;
     //set text color
     message.style.color = color;
     //Set message
     setMessage(msg);

     //Play again
     guessBtn.value = "Play again";
     guessBtn.className += 'play-again';
}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}


//Get winning number

function getRandomWinningNum(min,max){
    return Math.floor(Math.random()*(max - min +1)+min);
}