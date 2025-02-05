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
    return gameboard.receiveAttack(x, y);
  }
}
