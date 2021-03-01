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

// global variables
const tableDeck = new TableDeck();
const pileDeck = new PileDeck();
const playersArr = [];
const playersNames = [];
let currentTurnPlayer;
const playersDivs = [player1Div, player2Div, player3Div, player4Div];

// start game function
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
  tableDeck.dealCardsTo(playersArr);
  const initCard = tableDeck.useCard();
  printCardToDom(
    takeCardFromPileDeck,
    "pile-deck",
    initCard.getName(),
    fieldGame
  );
  pileDeck.sets.push(initCard);
  printPlayersCardToDom();
  printCardToDom(takeCardFromTableDeck, "table-card", "Table Deck", fieldGame);
  round();
}

// round function
function round() {
  turn(playersArr[0]);
}

// turn function
function turn(player) {
  currentTurnPlayer = playersArr.indexOf(player) + 1;
  const playerHand = document.querySelector(`#p${currentTurnPlayer}`);
  playerHand.addEventListener("click", addCardToDropList);
  const tableCard = document.querySelector(".table-card");
  const pileCard = document.querySelector(".pile-deck");
  tableCard.addEventListener("click", () => {
    dropCardsToPile();
    removeCardFromDom(cardsToDrop);
    takeCardFromTableDeck(currentTurnPlayer, playerHand);
    // tableCard.removeEventListener('click');
    // pileDeck.removeEventListener();
  });
  pileCard.addEventListener("click", () => {
    dropCardsToPile();
    removeCardFromDom(cardsToDrop);
    takeCardFromPileDeck(currentTurnPlayer, playerHand);
    // pileDeck.removeEventListener();
    // tableCard.removeEventListener();
  });
}

// print players cards to dom
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

// take card after throw from table deck
function takeCardFromTableDeck(currentTurnPlayer, playerHand) {
  const takenCard = tableDeck.useCard();
  playersArr[currentTurnPlayer - 1].handDeck.cards.push(takenCard);
  printCardToDom(addCardToDropList, "card", takenCard.getName(), playerHand);
}

// take card after throw from pile deck
function takeCardFromPileDeck(currentTurnPlayer, playerHand) {
  const takenCard = pileDeck.sets[pileDeck.sets.length - 2];
  console.log(pileDeck.sets);
  playersArr[currentTurnPlayer - 1].handDeck.cards.push(takenCard);
  printCardToDom(addCardToDropList, "card", takenCard.getName(), playerHand);
}

// function that adds wanted drop cards to list
let cardsToDrop = [];
function addCardToDropList(event) {
  if (event.target.className !== "card") {
    return;
  }
  if (!cardsToDrop.includes(event.target.innerText)) {
    cardsToDrop.push(event.target.innerText);
  }
  console.log(cardsToDrop);
}

//drop cards to pile and remove from player
function dropCardsToPile() {
  filterPlayerDropCards();
  playersArr[currentTurnPlayer - 1].dropSetToPileDeck(pileDeck, selectedCards);
  console.log(pileDeck);
  const tempArr = [];
  playersArr[currentTurnPlayer - 1].handDeck.cards.forEach((card) => {
    if (!selectedCards.includes(card)) {
      tempArr.push(card);
    }
  });
  playersArr[currentTurnPlayer - 1].handDeck.cards = tempArr;
  printCardToDom(
    takeCardFromPileDeck,
    "pile-deck",
    pileDeck.sets[pileDeck.sets.length - 1].getName(),
    fieldGame
  );
}

function removeCardFromDom(cards) {
  const container = document.querySelector(`#p${currentTurnPlayer}`);
  console.log(container);
  const tempArr = [];
  container.childNodes.forEach((element) => {
    for (const card of cards) {
      console.log(card === element.innerText);
      if (card === element.innerText) {
        tempArr.push(element);
      }
    }
  });
  tempArr.forEach((deleteCard) => {
    container.removeChild(deleteCard);
  });
}

// function that prints drop card to pile deck
function printCardToDom(functionEvent, className, innerText, parent) {
  const cardOnDOm = document.createElement("div");
  cardOnDOm.addEventListener("click", functionEvent);
  cardOnDOm.classList.add(className);
  cardOnDOm.innerText = innerText;
  parent.append(cardOnDOm);
}

// function that filter the selected cards of the player new to list
const selectedCards = [];
function filterPlayerDropCards() {
  cardsToDrop.forEach((card) => {
    selectedCards.push(
      playersArr[currentTurnPlayer - 1].handDeck.cards.filter((playerCard) => {
        if (playerCard.getName() === card) {
          return true;
        }
      })[0]
    );
  });
}
