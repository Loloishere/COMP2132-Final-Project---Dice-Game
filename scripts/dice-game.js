const imagePath = "../images/";
//controlling buttons
const rollDice = document.getElementById("roll-dice");
const restart = document.getElementById("restart")
//dices of players
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
//scores of each dice
const blueScore1 = document.getElementById("blue-score1");
const bluescore2 = document.getElementById("blue-score2");
const purpleScore1 = document.getElementById("purple-score1");
const purpleScore2 = document.getElementById("purple-score2");
//scores of current round
const currentBlueTotal = document.getElementById("current-blue-total");
const currentPurpleTotal = document.getElementById("current-purple-total");
//total scores of all three rounds
const finalBlueScore = document.getElementById("final-blue-score");
const finalPurpleScore = document.getElementById("final-purple-score");
//result board
const winner = document.getElementById("winner");

class Dice {
  constructor(color) {
    this.number = Math.floor(Math.random() * 6) + 1;
    this.color = color;
  }

  Presenting() {
    const diceImageSrc = `"${imagePath}${this.color}${this.number}.png"`;
    const diceImageAlt = `${this.color}${this.number}`;
    return `<img src = ${diceImageSrc} alt = ${diceImageAlt}>`;
  }
}

let blueScores = [];
let purpleScores = [];
class Gameboard {
  Rollingdice() {
    rollDice.addEventListener("click", function () {
      //display dice numbers
      const Dice1 = new Dice("blue");
      const Dice2 = new Dice("blue");
      const Dice3 = new Dice("purple");
      const Dice4 = new Dice("purple");
      player1.innerHTML = Dice1.Presenting() + Dice2.Presenting();
      player2.innerHTML = Dice3.Presenting() + Dice4.Presenting();
      blueScore1.innerHTML = `${Dice1.number}`;
      bluescore2.innerHTML = `${Dice2.number}`;
      purpleScore1.innerHTML = `${Dice3.number}`;
      purpleScore2.innerHTML = `${Dice4.number}`;

      //scores of current round
      let currentBlueScore;
      if (Dice1.number == 1 || Dice2.number == 1) {
        currentBlueScore = `0`;
      } else if (Dice1.number == Dice2.number) {
        currentBlueScore = `${(Dice1.number + Dice2.number) * 2}`;
      } else {
        currentBlueScore = `${Dice1.number + Dice2.number}`;
      }
      currentBlueTotal.innerHTML = currentBlueScore;
      blueScores.push(currentBlueScore);

      let currentPurpleScore;
      if (Dice3.number == 1 || Dice4.number == 1) {
        currentPurpleScore = `0`;
      } else if (Dice3.number == Dice4.number) {
        currentPurpleScore = `${(Dice3.number + Dice4.number) * 2}`;
      } else {
        currentPurpleScore = `${Dice3.number + Dice4.number}`;
      }
      currentPurpleTotal.innerHTML = currentPurpleScore;
      purpleScores.push(currentPurpleScore);

      //total scores of all three rounds
      let sumBlueScore = 0;
      let sumPurpleScore = 0;
      for (let i = 0; i < blueScores.length; i++) {
        if (i < 2) {
          sumBlueScore += parseInt(blueScores[i]);
          sumPurpleScore += parseInt(purpleScores[i]);
        } else {
           //compare results - to get the winner
          sumBlueScore += parseInt(blueScores[i]);
          sumPurpleScore += parseInt(purpleScores[i]);
          if (sumBlueScore > sumPurpleScore) {
            winner.innerHTML = "Oops,the computer beats you🤖";
            winner.style.display="block";
          } else if (sumBlueScore < sumPurpleScore)  {
            winner.innerHTML = "Congrats! You win👏";
            winner.style.display="block";
            confetti();
          } else{
            winner.innerHTML = "It's a tie!⚖️";
            winner.style.display="block";
          }
          rollDice.setAttribute("disabled", true);
          rollDice.classList.add("greyout")
          
        }
      }
      finalBlueScore.innerHTML = sumBlueScore;
      finalPurpleScore.innerHTML = sumPurpleScore;
      
    });
  }
}

const game = new Gameboard();
game.Rollingdice();

// restart the game
restart.addEventListener("click", ()=>{
blueScores = [];
purpleScores = [];
blueScore1.innerHTML = "";
bluescore2.innerHTML = "";
purpleScore1.innerHTML = "";
purpleScore2.innerHTML = "";
currentBlueTotal.innerHTML="";
currentPurpleTotal.innerHTML="";
finalBlueScore.innerHTML="";
finalPurpleScore.innerHTML="";
rollDice.removeAttribute("disabled")
winner.innerHTML="";
rollDice.classList.remove("greyout")
winner.style.display="none";

})


//dice animation
const animatedDice = document.getElementById("animated-dice")

let imgNumber = 1;
let diceRotation;
let changeSpeed = 5;
let timer;

rollDice.addEventListener("click", () => {
  if (!diceRotation) {
    diceRotation = requestAnimationFrame(changePic);
  }
});

restart.addEventListener("click", () => {
  cancelAnimationFrame(diceRotation);
  clearTimeout(timer);
  diceRotation = undefined;
});

changePic = () => {
  imgNumber++;
  if (imgNumber > 250) {
    imgNumber = 1;
  }
  let currentPic = `../images/dice-images/frame_${imgNumber}.png`;
  animatedDice.setAttribute("src", currentPic);
  timer = setTimeout(() => {
    diceRotation = requestAnimationFrame(changePic);
  }, changeSpeed);
};

