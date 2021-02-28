// variables from dom
const startBtn = document.querySelector("#start-btn");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const player3 = document.querySelector("#player3");
const player4 = document.querySelector("#player4");
const player1Div = document.querySelector("#p1");
const player2Div = document.querySelector("#p2");
const player3Div = document.querySelector("#p3");
const player4Div = document.querySelector("#p4");
const startDiv = document.querySelector("#start-info");
const fieldGame = document.querySelector("#field-game");

//event listeners
startBtn.addEventListener("click", startGame);

/*-----------------Game Flow-----------------*/

const tableDeck = new TableDeck();
const pileDeck = new PileDeck();
const playersArr = [];
const playersNames = [];
const playersDivs = [player1Div, player2Div, player3Div, player4Div];

function startGame() {
  playersNames.push(player1.value || "No Name1");
  playersNames.push(player2.value || "No Name2");
  playersNames.push(player3.value || "No Name3");
  playersNames.push(player4.value || "No Name4");
  for (let i = 0; i < playersNames.length; i++) {
    const playerDeck = new PlayerDeck();
    playersArr.push(new Player(`${playersNames[i]}`, playerDeck));
  }
  startDiv.style.display = "none";
  console.log(playersArr);

  tableDeck.createFullDeck();
  tableDeck.shuffleMethod();

  fieldGame.style.display = "block";
  round();
  printPlayersCardToDom();
  printTableDeckToDom();
}

function round() {
  tableDeck.dealCardsTo(playersArr);
  turn(playersArr[0]);
}

function turn(player) {
  // player.dropSetToPileDeck(pileDeck, [player.handDeck.useCard()]);
  const playerIndex = playersArr.indexOf(player) + 1;
  const playerHand = document.querySelector(`#p${playerIndex}`);
  playerHand.addEventListener("click", addCardToDropList);
}

function printPlayersCardToDom() {
  for (let k = 0; k < playersDivs.length; k++) {
    for (let x = 0; x < playersArr[k].handDeck.cards.length; x++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerText = playersArr[k].handDeck.cards[x].getName();
      playersDivs[k].append(card);
    }
  }
}

function printTableDeckToDom() {
  const tableCard = document.createElement("div");
  tableCard.classList.add("table-card");
  tableCard.innerText = "Table Deck";
  fieldGame.append(tableCard);
}

let cardsToDrop = [];
function addCardToDropList(event) {
  if (event.target.className !== "card") {
    return;
  }
  if (!cardsToDrop.includes(event.target)) {
    cardsToDrop.push(event.target);
  }
  console.log(cardsToDrop);
}
