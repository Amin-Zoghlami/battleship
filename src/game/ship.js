export default class Ship {
  #length;
  #hits;

  constructor(length) {
    this.#length = length;
    this.#hits = 0;
    this.sunk = false;
  }

  hit() {
    if (this.#hits === this.#length) {
      throw new Error("Hit a sunken ship");
    }

    this.#hits++;
  }

  isSunk() {
    if (this.#hits === this.#length) {
      return true;
    }

    return false;
  }
}
