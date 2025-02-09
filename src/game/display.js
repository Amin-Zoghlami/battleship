import Player from "./player.js";

export default class Display {
  #realPlayer;
  #computerPlayer;
  #realGameboard;
  #computerGameboard;
  #realGrid = document.getElementById("real");
  #computerGrid = document.getElementById("computer");
  #endDisplay = document.querySelector("dialog");

  constructor() {
    this.#startNewGame();
  }

  #startNewGame() {
    this.#createPlayers();
    this.#createRealGameboard();
    this.#createSetup();
    this.#addPlayAgainInput();
  }

  #createPlayers() {
    this.#realPlayer = new Player(false);
    this.#realPlayer.placeShipsRandom();

    this.#computerPlayer = new Player(true);
    this.#computerPlayer.placeShipsRandom();
  }

  #createRealGameboard() {
    this.#realGameboard = this.#realPlayer.getGameboard();

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const realCoordinate = document.createElement("div");
        realCoordinate.classList.add("coordinate");
        realCoordinate.setAttribute("data-coordinate", `${x},${y}`);
        this.#realGrid.appendChild(realCoordinate);
      }
    }

    this.#renderShips();
  }

  #createComputerGameboard() {
    this.#computerGameboard = this.#computerPlayer.getGameboard();

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const computerCoordinate = document.createElement("button");
        computerCoordinate.classList.add("coordinate");
        computerCoordinate.setAttribute("data-coordinate", `${x},${y}`);
        this.#addCoordinateInput(computerCoordinate);
        this.#computerGrid.appendChild(computerCoordinate);
      }
    }
  }

  #addCoordinateInput(computerCoordinate) {
    computerCoordinate.addEventListener(
      "click",
      () => {
        const computerXY = computerCoordinate.dataset.coordinate.split(",");
        const x = computerXY[0];
        const y = computerXY[1];

        const isComputerHit = this.#realPlayer.attack(
          this.#computerGameboard,
          x,
          y
        )[0];

        if (isComputerHit) {
          computerCoordinate.style.backgroundColor = "#880808";
        } else {
          computerCoordinate.style.backgroundColor = "#008000";
        }

        if (this.#computerGameboard.isAllSunk()) {
          const endText = this.#endDisplay.querySelector("p");
          endText.textContent = "You win!";
          this.#endDisplay.showModal();
          return;
        }

        const [isRealHit, realXY] = this.#computerPlayer.attack(
          this.#realGameboard
        );

        const realCoordinate = this.#realGrid.querySelector(
          `[data-coordinate="${realXY}"]`
        );

        if (isRealHit) {
          realCoordinate.style.backgroundColor = "#880808";
        } else {
          realCoordinate.style.backgroundColor = "#008000";
        }

        if (this.#realGameboard.isAllSunk()) {
          const endText = this.#endDisplay.querySelector("p");
          endText.textContent = "You lose!";
          this.#endDisplay.showModal();
        }
      },
      { once: true }
    );
  }

  #createSetup() {
    const body = document.body;

    const randomizeButton = document.createElement("button");
    randomizeButton.classList.add("setup");
    randomizeButton.id = "random";
    randomizeButton.textContent = "Randomize Ships";
    body.insertBefore(randomizeButton, body.firstChild);

    const startButton = document.createElement("button");
    startButton.classList.add("setup");
    startButton.id = "start";
    startButton.textContent = "Start Game";
    body.insertBefore(startButton, body.firstChild);

    randomizeButton.addEventListener("click", () => {
      this.#realPlayer.resetGameboard();
      this.#realPlayer.placeShipsRandom();
      this.#renderShips();
    });

    startButton.addEventListener("click", () => {
      this.#createComputerGameboard();
      randomizeButton.remove();
      startButton.remove();
    });
  }

  #addPlayAgainInput() {
    const playAgainButton = this.#endDisplay.querySelector("button");
    playAgainButton.addEventListener("click", () => {
      this.#realGrid.innerHTML = "";
      this.#computerGrid.innerHTML = "";
      this.#endDisplay.close();
      this.#startNewGame();
    });
  }

  #renderShips() {
    const allCoordinates = this.#realGrid.querySelectorAll(".coordinate");
    for (const gridCoordinate of allCoordinates) {
      gridCoordinate.style.backgroundColor = "#0f5e9c";
    }

    for (const ship of this.#realGameboard.getShips()) {
      const shipCoordinates = ship[1];
      for (const shipCoordinate of shipCoordinates) {
        const gridCoordinate = this.#realGrid.querySelector(
          `[data-coordinate="${shipCoordinate}"`
        );
        gridCoordinate.style.backgroundColor = "#808080";
      }
    }
  }
}
