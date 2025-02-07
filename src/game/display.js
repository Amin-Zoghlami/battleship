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
    const computerGameboard = this.#computerPlayer.getGameboard();

    const realGrid = document.getElementById("real");
    const computerGrid = document.getElementById("computer");

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const realCoordinate = document.createElement("div");
        realCoordinate.classList.add("coordinate");
        realCoordinate.setAttribute("data-coordinate", `${x},${y}`);
        realGrid.appendChild(realCoordinate);

        const computerCoordinate = document.createElement("button");
        computerCoordinate.classList.add("coordinate");
        computerCoordinate.setAttribute("data-coordinate", `${x},${y}`);
        this.#addCoordinateInput(
          computerCoordinate,
          realGameboard,
          computerGameboard,
          realGrid
        );
        computerGrid.appendChild(computerCoordinate);
      }
    }

    this.#renderShips(realGameboard, realGrid);
  }

  #addCoordinateInput(coordinate, realGameboard, computerGameboard, realGrid) {
    coordinate.addEventListener("click", (event) => {
      const computerCoordinate = event.currentTarget;
      const computerXY = computerCoordinate.dataset.coordinate.split(",");
      const x = computerXY[0];
      const y = computerXY[1];

      const isComputerHit = this.#realPlayer.attack(computerGameboard, x, y)[0];

      if (isComputerHit) {
        computerCoordinate.style.backgroundColor = "#880808";
      } else {
        computerCoordinate.style.backgroundColor = "#008000";
      }

      const [isRealHit, realXY] = this.#computerPlayer.attack(realGameboard);

      const realCoordinate = realGrid.querySelector(
        `[data-coordinate="${realXY}"]`
      );

      console.log(isRealHit);
      console.log(realXY);
      console.log(realCoordinate);

      if (isRealHit) {
        realCoordinate.style.backgroundColor = "#880808";
      } else {
        realCoordinate.style.backgroundColor = "#008000";
      }
    });
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
