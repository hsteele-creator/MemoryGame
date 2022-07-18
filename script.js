const gameContainer = document.getElementById("game");
const body = document.querySelector("body");
const divs = document.querySelectorAll("div");
const gamePieces = gameContainer.children;
const scoreKeeper =  document.createElement("div");
const matchesHolder =  document.createElement("div");
let gameRestarted = false;
let matches= 0;



// Initializing score, matches, clickedcards array
let score = 0;
let clickedCards = [];



//// creating start game button
const startGameButton = document.createElement("button");
startGameButton.innerText = "start game";
body.append(startGameButton);



startGameButton.addEventListener("click", function startGame() {

  // gameContainer.classList.remove("hidden");

  console.log(gameContainer.classList);

  score = 0;
  clickedCards = [];

  // create game board
  createDivsForColors(shuffledColors);

  // dont allow start button to create more divs once the game is created

  startGameButton.removeEventListener("click", startGame);
})

// creating restart game button
const restartGame = document.createElement("button");
restartGame.textContent = "restart game";
body.append(restartGame);

restartGame.addEventListener("click", function() {

  scoreKeeper.textContent = "";
  matchesHolder.textContent = "";

  gameRestarted = true;


  // remove pieces when restart button is clicked
  for(let piece of gamePieces) {
    piece.remove();
  }

  gameContainer.innerHTML = "";

  console.log("game restarted");
  score = 0;
  matches = 0; 

  // gameContainer.classList.add("hidden");

})



// checking cards for match array
function checkForMatch(array) {
  if(array[0].classList.value === array[1].classList.value) {
    console.log("ITS A MATCH");
    score++;
    matches++;


  } else {

    // adding back the event listeners if they are not a match
    array[0].addEventListener("click", handleCardClick);
    array[1].addEventListener("click", handleCardClick);

    setTimeout(function() {
      
    console.log("ITS NOT A MATCH");

      array[0].style.backgroundColor = "white";
      array[1].style.backgroundColor = "white";
    }, 500);

    score++;
  }

}




const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div

    const newDiv = document.createElement("div");

    for(let i = 0; i < COLORS.length; i++) {
      newDiv.index = i;
    }    

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}








// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  

  // set background color to events class color
  event.target.style.backgroundColor = event.target.classList;

  // make element unclickable once its been clicked
  event.target.removeEventListener("click", handleCardClick);

  // event.target.classList.add("clicked");
  console.log(event.target);
  console.log(event.target.classList);
  
  
  clickedCards.push(event.target);

  if(clickedCards.length === 2) {
    checkForMatch(clickedCards);

    console.log(score);


    scoreKeeper.textContent = `YOUR SCORE: ${score + 1}` ;
  

    matchesHolder.textContent = `CURRENT MATCHES: ${matches}`;
    
    clickedCards = [];

    body.append(scoreKeeper);
    body.append(matchesHolder);
  }


  if(matches === 5) {

    localStorage.setItem("score", score);

    if(score > localStorage.getItem("score")) {
      localStorage.setItem("score", score);
    }
    
    startGameButton.addEventListener("click", function startGame() {

      console.log(gameContainer.classList);

      score = 0;
      clickedCards = [];

      // create game board
      createDivsForColors(shuffledColors);

      // dont allow start button to create more divs once the game is created


    startGameButton.removeEventListener("click", startGame);
    });   
  } 
}

// when the DOM loads


/* */