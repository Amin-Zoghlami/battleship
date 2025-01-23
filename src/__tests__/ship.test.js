import Ship from "../game/ship.js";

test("Sunk", () => {
  const destroyer = new Ship(2);
  const carrier = new Ship(5);

  for (let i = 0; i < 5; i++) {
    if (i < 2) destroyer.hit();
    carrier.hit();
  }

  expect(destroyer.isSunk()).toBe(true);
  expect(carrier.isSunk()).toBe(true);
});

test("Not Sunk", () => {
  const submarine = new Ship(3);
  const battleship = new Ship(4);

  for (let i = 0; i < 3; i++) {
    if (i < 2) submarine.hit();
    battleship.hit();
  }

  expect(submarine.isSunk()).toBe(false);
  expect(battleship.isSunk()).toBe(false);
});

test("Hit Sunk", () => {
  const cruiser = new Ship(3);
  const battleship = new Ship(4);

  for (let i = 0; i < 4; i++) {
    if (i < 3) cruiser.hit();
    battleship.hit();
  }

  expect(() => cruiser.hit()).toThrow("Hit a sunken ship");
  expect(() => battleship.hit()).toThrow("Hit a sunken ship");
});
