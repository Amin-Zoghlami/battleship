import Gameboard from "../gameboard.test.js";

test("All Sunk", () => {
  const gameboard1 = new Gameboard();

  gameboard1.placeShip("Carrier", [0, 0], "Column");
  gameboard1.placeShip("Battleship", [4, 2], "Row");
  gameboard1.placeShip("Cruiser", [9, 7], "Row");
  gameboard1.placeShip("Submarine", [1, 6], "Column");
  gameboard1.placeShip("Destroyer", [8, 8], "Row");

  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      gameboard1.receiveAttack([8, 8 + i]);
    }

    if (i < 3) {
      gameboard1.receiveAttack([1 + i, 6]);
    }

    if (i < 3) {
      gameboard1.receiveAttack([9, 7 + i]);
    }

    if (i < 4) {
      gameboard1.receiveAttack([4, 2 + i]);
    }

    gameboard1.receiveAttack([0 + i, 0]);
  }

  expect(isShipsSunk()).toBe(true);

  const gameboard2 = new Gameboard();

  gameboard2.placeShip("Carrier", [2, 4], "Row");
  gameboard2.placeShip("Battleship", [0, 9], "Column");
  gameboard2.placeShip("Cruiser", [9, 1], "Row");
  gameboard2.placeShip("Submarine", [8, 7], "Row");
  gameboard2.placeShip("Destroyer", [5, 5], "Row");

  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      gameboard2.receiveAttack([5, 5 + i]);
    }

    if (i < 3) {
      gameboard2.receiveAttack([8, 7 + i]);
    }

    if (i < 3) {
      gameboard2.receiveAttack([9, 1 + i]);
    }

    if (i < 4) {
      gameboard2.receiveAttack([0 + i, 9]);
    }

    gameboard2.receiveAttack([2, 4 + i]);
  }

  expect(isShipsSunk()).toBe(true);
});

test("All Sunk", () => {
  const gameboard1 = new Gameboard();

  gameboard1.placeShip("Carrier", [0, 0], "Column");
  gameboard1.placeShip("Battleship", [4, 2], "Row");
  gameboard1.placeShip("Cruiser", [9, 7], "Row");
  gameboard1.placeShip("Submarine", [1, 6], "Column");
  gameboard1.placeShip("Destroyer", [8, 8], "Row");

  for (let i = 0; i < 2; i++) {
    gameboard1.receiveAttack([8, 8 + i]);
    gameboard1.receiveAttack([1 + i, 6]);
    gameboard1.receiveAttack([9, 7 + i]);
    gameboard1.receiveAttack([4, 2 + i]);
    gameboard1.receiveAttack([0 + i, 0]);
  }

  expect(isShipsSunk()).toBe(false);

  const gameboard2 = new Gameboard();

  gameboard2.placeShip("Carrier", [2, 4], "Row");
  gameboard2.placeShip("Battleship", [0, 9], "Column");
  gameboard2.placeShip("Cruiser", [9, 1], "Row");
  gameboard2.placeShip("Submarine", [8, 7], "Row");
  gameboard2.placeShip("Destroyer", [5, 5], "Row");

  for (let i = 0; i < 5; i++) {
    gameboard2.receiveAttack([0, 0 + i]);
    gameboard2.receiveAttack([2, 4 + i]);
  }

  expect(isShipsSunk()).toBe(false);
});
