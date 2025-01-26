import Ship from "./ship";

export default class Gameboard {
  #ships;
  #misses;

  constructor() {
    this.#ships = [];
    this.#misses = new Set();

    // (Ship name, [Ship object, Ship coordinates])
    this.#ships.set("carrier", [new Ship(5), new Set()]);
    this.#ships.set("battleship", [new Ship(4), new Set()]);
    this.#ships.set("cruiser", [new Ship(3), new Set()]);
    this.#ships.set("submarine", [new Ship(3), new Set()]);
    this.#ships.set("destroyer", [new Ship(2), new Set()]);
  }

  placeShip(shipSize, x, y, isVertical) {
    this.#ships.push([new Ship(shipSize), new Set()]);
    const shipCoordinates = this.#ships[this.#ships.length - 1][1];

    if (isVertical) {
      for (let i = 0; i < shipSize; i++) {
        shipCoordinates.add(`${x},${y + i}`);
      }

      return true;
    }

    for (let i = 0; i < shipSize; i++) {
      shipCoordinates.add(`${x + i},${y}`);
    }
  }

  receiveAttack(x, y) {
    for (const ship of this.#ships) {
      if (ship[1].has(`${x},${y}`)) {
        ship[0].hit();
        return true;
      }
    }

    this.#misses.add(`${x},${y}`);
    return false;
  }

  isAllSunk() {
    for (const ship of this.#ships) {
      if (!ship[0].isSunk()) return false;
    }

    return true;
  }
}
