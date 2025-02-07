import Player from "./player.js";

export default class Display {
  #realPlayer;
  #computerPlayer;

  constructor() {
    this.#createPlayers();
    this.#showGameboards();
  }

  #createPlayers() {
    this.#realPlayer = new Player(false);
    const realGameboard = this.#realPlayer.getGameboard();
    realGameboard.placeShip(2, 0, 0, true);
    realGameboard.placeShip(3, 1, 0, true);
    realGameboard.placeShip(3, 2, 0, true);
    realGameboard.placeShip(4, 3, 0, true);
    realGameboard.placeShip(5, 4, 0, true);

    this.#computerPlayer = new Player(true);
    const computerGameboard = this.#computerPlayer.getGameboard();
    computerGameboard.placeShip(2, 0, 0, false);
    computerGameboard.placeShip(3, 0, 1, false);
    computerGameboard.placeShip(3, 0, 2, false);
    computerGameboard.placeShip(4, 0, 3, false);
    computerGameboard.placeShip(5, 0, 4, false);
  }

  #showGameboards() {
    const realGameboard = this.#realPlayer.getGameboard();

    const realGrid = document.getElementById("real");
    const computerGrid = document.getElementById("computer");

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const realCoordinate = document.createElement("div");
        realCoordinate.classList.add("coordinate");
        realCoordinate.setAttribute("data-coordinate", `${x},${y}`);
        realGrid.appendChild(realCoordinate);

        const computerCoordinate = document.createElement("div");
        computerCoordinate.classList.add("coordinate");
        computerCoordinate.setAttribute("data-coordinate", `${x},${y}`);
        computerGrid.appendChild(computerCoordinate);
      }
    }

    this.#renderShips(realGameboard, realGrid);
  }

  #renderShips(gameboard, grid) {
    for (const ship of gameboard.getShips()) {
      const shipCoordinates = ship[1];
      for (const shipCoordinate of shipCoordinates) {
        const gridCoordinate = grid.querySelector(
          `[data-coordinate="${shipCoordinate}"`
        );
        gridCoordinate.style.backgroundColor = "#808080";
      }
    }
  }
}
