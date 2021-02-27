// variables from dom
const startBtn = document.querySelector("#start-btn");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const player3 = document.querySelector("#player3");
const player4 = document.querySelector("#player4");
const startDiv = document.querySelector("#start-info");

//event listeners
startBtn.addEventListener("click", startGame);

/*-----------------Game Flow-----------------*/

const tableDeck = new TableDeck();
const pileDeck = new PileDeck();
const playersArr = [];
const playersNames = [];

function startGame() {
  playersNames.push(player1.value);
  playersNames.push(player2.value);
  playersNames.push(player3.value);
  playersNames.push(player4.value);
  for (let i = 0; i < playersNames.length; i++) {
    const playerDeck = new PlayerDeck();
    playersArr.push(new Player(`${playersNames[i]}`, playerDeck));
  }
  startDiv.style.visibility = "hidden";
  console.log(playersArr);

  tableDeck.createFullDeck();
  tableDeck.shuffleMethod();
  round();
}

function round() {
  tableDeck.dealCardsTo(playersArr);
}

// function turn(player){
//     player.dropSetToPileDeck(pileDeck, [player.handDeck.useCard()]);
// }
