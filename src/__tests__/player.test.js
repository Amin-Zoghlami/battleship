import Player from "../game/player.js";

test("Players", () => {
  const realPlayer = new Player(false);
  const computerPlayer = new Player(true);

  const realGameboard = realPlayer.getGameboard();
  const computerGameboard = computerPlayer.getGameboard();

  realGameboard.placeShip(2, 0, 0, false);
  computerGameboard.placeShip(4, 6, 3, true);

  expect(realPlayer.attack(computerGameboard, 0, 0)[0]).toBe(false);
  expect(realPlayer.attack(computerGameboard, 6, 4)[0]).toBe(true);
  expect(() => realPlayer.attack(computerGameboard, -1, 5)).toThrow(
    "Coordinate (-1, 5) is out of bounds"
  );

  expect(computerPlayer.attack(realGameboard, 0, 0)[0]).toBe(true);
  expect(realPlayer.attack(realGameboard, 6, 4)[0]).toBe(false);
  expect(() => realPlayer.attack(computerGameboard, 3, 10)).toThrow(
    "Coordinate (3, 10) is out of bounds"
  );
});
