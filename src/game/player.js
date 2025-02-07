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

  attack(gameboard, x, y) {
    if (this.#isComputer) {
      while (
        gameboard.getMisses().has(`${x},${y}`) ||
        gameboard.getHits().has(`${x},${y}`)
      ) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }

    return gameboard.receiveAttack(x, y);
  }
}
