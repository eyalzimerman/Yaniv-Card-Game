/*-----------------All Classes-----------------*/

// card class
class Card {
  constructor(id, suit, rank, cardValue, isJoker = false) {
    this.id = id;
    this.suit = suit;
    this.rank = rank;
    this.cardValue = cardValue;
    this.isJoker = isJoker;
  }
}

//main deck class
class Deck {
  constructor() {
    this.cards = [];
  }
  addCard(...card) {
    this.cards.push(...card);
  }

  useCard() {
    return this.cards.pop();
  }
}

// playerdeck class
class PlayerDeck extends Deck {
  constructor() {
    super();
  }
  points() {
    let sum = 0;
    for (let i = 0; i < this.cards.length; i++) {
      sum = sum + this.cards[i].cardValue;
    }
    return sum;
  }
}

// tabledeck class
class TableDeck extends Deck {
  constructor() {
    super();
  }
  createFullDeck() {
    this.cards = getDeck();
  }
  shuffleMethod() {
    shuffle(this.cards);
  }

  dealCardsTo(players) {
    for (let j = 0; j < players.length; j++) {
      for (let i = 0; i < 5; i++) {
        players[j].playersDeck.addCard(this.useCard());
      }
    }
  }

  refill(pileDeck) {
    for (let i = 0; i <= pileDeck.sets.length; i++) {
      this.addCard(...pileDeck.useSet());
    }
    this.addCard(...pileDeck.useSet());
  }
}

// piledeck class
class PileDeck extends Deck {
  constructor() {
    super();
    this.sets = [];
  }
  addSet([...set]) {
    this.sets.push([...set]);
  }

  useSet() {
    return this.sets.pop();
  }
}

// player class
class Player {
  constructor(name, playersDeck) {
    this.name = name;
    this.playersDeck = playersDeck;
    this.points = 0;
    this.score = 0;
  }
  takeCardFromTableDeck(playerDeck, tableDeck) {
    const newCard = tableDeck.useCard();
    playerDeck.addCard(newCard);
  }

  dropSetToPileDeck(pileDeck, [...set]) {
    pileDeck.addSet([...set]);
  }

  takeCardFromPileDeck(playerDeck, pileDeck) {
    const takenCard = pileDeck.useSet();

    if (takenCard.length > 1) {
      playerDeck.addCard(takenCard.splice(takenCard, 1));
      pileDeck.addSet(takenCard);
    } else {
      playerDeck.addCard(takenCard[0]);
    }
  }
}

/*-----------------Helper Functions-----------------*/

// Create new Deck
function getDeck() {
  const suits = ["spades", "diamonds", "clubs", "hearts"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  let deck = new Array();
  let card;
  let cardId = 1;
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < ranks.length; x++) {
      if (x < 10) {
        card = new Card(cardId, suits[i], ranks[x], x + 1);
        deck.push(card);
        cardId++;
      } else {
        card = new Card(cardId, suits[i], ranks[x], 10);
        deck.push(card);
        cardId++;
      }
    }
  }
  deck.push(new Card(cardId, null, null, 0, true));
  cardId++;
  deck.push(new Card(cardId, null, null, 0, true));
  return deck;
}

// shuffle array of cards
function shuffle(deck) {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

/*-----------------Play Ground-----------------*/

// const t = new TableDeck();
// const playercards = new PlayerDeck();
// const player1 = new Player("eyal", playercards);
// const pile = new PileDeck();

// console.log(player1);
// t.createFullDeck();
// t.shuffleMethod();
// console.log(t);
// t.dealCardsTo(player1);
// console.log(player1.playersDeck);

// console.log(t.cards.length);
// console.log(player1.playersDeck);

// console.log(pile.sets);
// console.log(player1.playersDeck);

// player1.takeCardFromTableDeck(playercards, t);
// console.log(t.cards.length);
// console.log(player1.playersDeck);

// player1.dropSetToPileDeck(pile, [playercards.useCard()]); //לשנות את use למחיקה לפי id
// console.log(player1.playersDeck);

// console.log(pile.sets);
// player1.takeCardFromPileDeck(playercards,pile)
// console.log(pile.sets);
// console.log(player1.playersDeck);
// console.log(player1.playersDeck);
// console.log(t.cards.length);
// console.log(pile);
// t.refill(pile);
// console.log(pile.sets);
// console.log(t);
// player1.dropSetToPileDeck(pile, [playercards.useCard()]);
// player1.dropSetToPileDeck(pile, [playercards.useCard()]);
// player1.dropSetToPileDeck(pile, [playercards.useCard()]);
// console.log(pile);
// t.refill(pile);
// console.log(pile.sets);
