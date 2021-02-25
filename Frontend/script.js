class Card {
  constructor(suit, rank, cardValue, isJoker = false) {
    this.suit = suit;
    this.rank = rank;
    this.cardValue = cardValue;
    this.isJoker = isJoker;
  }
  getName() {
    return `${this.rank} ${this.suit}`;
  }
}

class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  addNewCard(...card) {
    this.cards.push(...card);
  }

  useCard() {
    return this.cards.shift();
  }
  shuffleMethod() {}
}

class PlayerDeck extends Deck {
  constructor(cards) {
    super(cards);
  }
}

class TableDeck extends Deck {
  constructor(cards) {
    super(cards);
  }
}

class PileDeck extends Deck {
  constructor(cards) {
    super(cards);
  }
}

class Player {
  constructor(name) {
    this.name = name;
  }
}

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

function getDeck() {
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

const allDeck = getDeck();

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
