/*-----------------All Classes-----------------*/

class Card {
  constructor(suit, rank, cardValue, isJoker = false) {
    this.suit = suit;
    this.rank = rank;
    this.cardValue = cardValue;
    this.isJoker = isJoker;
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }

  addNewCard(...card) {
    this.cards.push(...card);
  }

  useCard() {
    return this.cards.shift();
  }
}

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
  dealCardsTo(player) {
    for (let i = 0; i < 5; i++) {
      player.playersDeck.addNewCard(this.useCard());
    }
  }

  refill(pileDeck) {
    for (let i = 0; i < pileDeck.length; i++) {
      return pileDeck[i].useSet();
    }
    this.addCard(pileDeck.cards);
  }
}

class PileDeck extends Deck {
  constructor() {
    super();
    this.sets = [];
  }
  addSet(set) {
    this.sets.unshift(set);
    this.addCard(...set);
  }

  useSet() {
    return this.sets.shift();
  }
}

class Player {
  constructor(name, playersDeck) {
    this.name = name;
    this.points = 0;
    this.score = 0;
    this.playersDeck = playersDeck;
  }
}

/*-----------------Helper Function-----------------*/

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

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < ranks.length; x++) {
      if (x < 10) {
        card = new Card(suits[i], ranks[x], x + 1);
        deck.push(card);
      } else {
        card = new Card(suits[i], ranks[x], 10);
        deck.push(card);
      }
    }
  }
  deck.push(new Card(null, null, 0, true));
  deck.push(new Card(null, null, 0, true));
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
