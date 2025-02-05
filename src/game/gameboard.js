import Ship from "./ship";

export default class Gameboard {
  #ships;
  #misses;

  constructor() {
    this.#ships = [];
    this.#misses = new Set();
  }

  placeShip(shipSize, x, y, isVertical) {
    const shipCoordinates = new Set();

    if (isVertical) {
      for (let i = 0; i < shipSize; i++) {
        if (x < 0 || y < 0 || x > 9 || y > 9)
          throw new Error(`Coordinate (${x}, ${y}) is out of bounds`);

        for (const ship of this.#ships) {
          if (ship[1].has(`${x},${y}`))
            throw new Error(`Coordinate (${x}, ${y}) is taken`);
        }

        shipCoordinates.add(`${x},${y}`);
        y++;
      }

      this.#ships.push([new Ship(shipSize), shipCoordinates]);
      return true;
    }

    for (let i = 0; i < shipSize; i++) {
      if (x < 0 || y < 0 || x > 9 || y > 9)
        throw new Error(`Coordinate (${x}, ${y}) is out of bounds`);

      for (const ship of this.#ships) {
        if (ship[1].has(`${x},${y}`))
          throw new Error(`Coordinate (${x}, ${y}) is taken`);
      }

      shipCoordinates.add(`${x},${y}`);
      x++;
    }

    this.#ships.push([new Ship(shipSize), shipCoordinates]);
    return true;
  }

  receiveAttack(x, y) {
    if (x < 0 || y < 0 || x > 9 || y > 9)
      throw new Error(`Coordinate (${x}, ${y}) is out of bounds`);

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
