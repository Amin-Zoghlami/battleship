import Gameboard from "./gameboard.js";

export default class Player {
  #gameboard;
  #isComputer;

  constructor(isComputer) {
    this.#gameboard = new Gameboard();
    this.#isComputer = isComputer;
  }

  getGameboard() {
    return this.#gameboard;
  }

  placeShipsRandom() {
    for (let i = 2; i <= 5; i++) {
      this.#placeShipRandom(i);
      if (i == 3) this.#placeShipRandom(i);
    }
  }

  #placeShipRandom(shipSize) {
    for (;;) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const isVertical = Math.random() < 0.5 ? true : false;

      try {
        this.#gameboard.placeShip(shipSize, x, y, isVertical);
        break;
      } catch {
        continue;
      }
    }
  }

  attack(gameboard, x, y) {
    if (this.#isComputer) {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (
        gameboard.getMisses().has(`${x},${y}`) ||
        gameboard.getHits().has(`${x},${y}`)
      );
    }

    return [gameboard.receiveAttack(x, y), `${x},${y}`];
  }

  resetGameboard() {
    this.#gameboard.clear();
  }
}
