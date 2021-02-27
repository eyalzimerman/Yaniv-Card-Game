/*-----------------Game Flow-----------------*/

const playersArr = [];
function startGame() {
  for (let i = 1; i < 5; i++) {
    const playerDeck = new PlayerDeck();
    playersArr.push(new Player(`player ${i}`, playerDeck));
  }
}

startGame();

function round() {
  const tableDeck = new TableDeck();
  const pileDeck = new PileDeck();

  tableDeck.createFullDeck();
  tableDeck.shuffleMethod();

  tableDeck.dealCardsTo(playersArr);

  pileDeck.addCard(tableDeck.useCard());
}

round();
