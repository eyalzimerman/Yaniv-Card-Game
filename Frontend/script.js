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
