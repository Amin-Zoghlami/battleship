import Gameboard from "../game/gameboard.js";

test("All Sunk", () => {
  const gameboard1 = new Gameboard();

  // (shipSize, x, y, isVertical)
  gameboard1.placeShip(2, 8, 9, false);
  gameboard1.placeShip(3, 3, 5, true);
  gameboard1.placeShip(3, 5, 3, false);
  gameboard1.placeShip(4, 0, 1, true);
  gameboard1.placeShip(5, 0, 0, false);

  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      expect(gameboard1.receiveAttack(8 + i, 9)).toBe(true);
    }

    if (i < 3) {
      expect(gameboard1.receiveAttack(3, 5 + i)).toBe(true);
    }

    if (i < 3) {
      expect(gameboard1.receiveAttack(5 + i, 3)).toBe(true);
    }

    if (i < 4) {
      expect(gameboard1.receiveAttack(0, 1 + i)).toBe(true);
    }

    expect(gameboard1.receiveAttack(0 + i, 0)).toBe(true);
  }

  expect(gameboard1.getHits().size).toBe(17);
  expect(gameboard1.getHits().has("0,1")).toBe(true);
  expect(gameboard1.getHits().has("4,7")).toBe(false);
  expect(gameboard1.getMisses().size).toBe(0);
  expect(gameboard1.isAllSunk()).toBe(true);

  const gameboard2 = new Gameboard();

  // (shipSize, x, y, isVertical)
  gameboard2.placeShip(2, 7, 5, false);
  gameboard2.placeShip(3, 0, 7, true);
  gameboard2.placeShip(3, 9, 0, true);
  gameboard2.placeShip(4, 4, 4, true);
  gameboard2.placeShip(5, 5, 4, true);

  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      expect(gameboard2.receiveAttack(7 + i, 5)).toBe(true);
    }

    if (i < 3) {
      expect(gameboard2.receiveAttack(0, 7 + i)).toBe(true);
    }

    if (i < 3) {
      expect(gameboard2.receiveAttack(9, 0 + i)).toBe(true);
    }

    if (i < 4) {
      expect(gameboard2.receiveAttack(4, 4 + i)).toBe(true);
    }

    expect(gameboard2.receiveAttack(5, 4 + i)).toBe(true);
  }

  expect(gameboard2.getHits().size).toBe(17);
  expect(gameboard2.getHits().has("0,1")).toBe(false);
  expect(gameboard2.getHits().has("4,7")).toBe(true);
  expect(gameboard2.getMisses().size).toBe(0);
  expect(gameboard2.isAllSunk()).toBe(true);
});

test("Not All Sunk", () => {
  const gameboard1 = new Gameboard();

  // (shipSize, x, y, isVertical)
  gameboard1.placeShip(2, 8, 9, false);
  gameboard1.placeShip(3, 3, 5, true);
  gameboard1.placeShip(3, 5, 3, false);
  gameboard1.placeShip(4, 0, 1, true);
  gameboard1.placeShip(5, 0, 0, false);

  for (let i = 0; i < 2; i++) {
    expect(gameboard1.receiveAttack(8 + i, 9)).toBe(true);
    expect(gameboard1.receiveAttack(3, 5 + i)).toBe(true);
    expect(gameboard1.receiveAttack(5 + i, 3)).toBe(true);
    expect(gameboard1.receiveAttack(0, 1 + i)).toBe(true);
    expect(gameboard1.receiveAttack(0 + i, 0)).toBe(true);
  }

  expect(gameboard1.getHits().size).toBe(10);
  expect(gameboard1.getHits().has("0,1")).toBe(true);
  expect(gameboard1.getHits().has("0,3")).toBe(false);
  expect(gameboard1.getMisses().size).toBe(0);
  expect(gameboard1.isAllSunk()).toBe(false);

  const gameboard2 = new Gameboard();

  // (shipSize, x, y, isVertical)
  gameboard2.placeShip(2, 7, 5, false);
  gameboard2.placeShip(3, 0, 7, true);
  gameboard2.placeShip(3, 9, 0, true);
  gameboard2.placeShip(4, 4, 4, true);
  gameboard2.placeShip(5, 5, 4, true);

  expect(gameboard2.receiveAttack(0, 0)).toBe(false);
  expect(gameboard2.receiveAttack(2, 3)).toBe(false);

  expect(gameboard2.getHits().size).toBe(0);
  expect(gameboard2.getMisses().size).toBe(2);
  expect(gameboard2.getMisses().has("2,3")).toBe(true);
  expect(gameboard2.getMisses().has("9,9")).toBe(false);
  expect(gameboard2.isAllSunk()).toBe(false);
});

test("Bad Coordinates", () => {
  const gameboard1 = new Gameboard();

  gameboard1.placeShip(5, 0, 0, true);
  expect(() => gameboard1.placeShip(4, 0, 0, true)).toThrow(
    "Coordinate (0, 0) is taken"
  );

  expect(() => gameboard1.placeShip(2, 0, 3, false)).toThrow(
    "Coordinate (0, 3) is taken"
  );

  expect(() => gameboard1.placeShip(3, 8, 4, false)).toThrow(
    "Coordinate (10, 4) is out of bounds"
  );

  expect(() => gameboard1.placeShip(3, -1, 1, true)).toThrow(
    "Coordinate (-1, 1) is out of bounds"
  );

  expect(() =>
    gameboard1
      .receiveAttack(-1, 0)
      .toThrow("Coordinate (-1, 0) is out of bounds")
  );

  expect(() =>
    gameboard1
      .receiveAttack(3, 10)
      .toThrow("Coordinate (-1, 0) is out of bounds")
  );
});
