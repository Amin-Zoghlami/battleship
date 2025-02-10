import Player from "./player.js";

export default class Display {
  #realPlayer;
  #computerPlayer;
  #realGameboard;
  #computerGameboard;
  #realGrid = document.getElementById("real");
  #computerGrid = document.getElementById("computer");
  #endScreen = document.querySelector("dialog");
  #hitIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Hit</title><path d="M14.66 14.18C14.69 14.29 14.7 14.4 14.7 14.5C14.73 15.15 14.44 15.85 13.97 16.28C13.75 16.47 13.39 16.67 13.11 16.75C12.23 17.06 11.35 16.62 10.83 16.11C11.77 15.89 12.32 15.21 12.5 14.5C12.62 13.89 12.37 13.38 12.27 12.78C12.17 12.2 12.19 11.71 12.4 11.18C12.55 11.47 12.71 11.77 12.9 12C13.5 12.78 14.45 13.12 14.66 14.18M22 12C22 17.5 17.5 22 12 22S2 17.5 2 12 6.5 2 12 2 22 6.5 22 12M17.16 12.56L17.06 12.36C16.9 12 16.45 11.38 16.45 11.38C16.27 11.15 16.05 10.94 15.85 10.74C15.32 10.27 14.73 9.94 14.22 9.45C13.05 8.31 12.79 6.44 13.54 5C12.79 5.18 12.14 5.58 11.58 6.03C9.55 7.65 8.75 10.5 9.71 12.95C9.74 13.03 9.77 13.11 9.77 13.21C9.77 13.38 9.65 13.53 9.5 13.6C9.31 13.67 9.13 13.63 9 13.5C8.93 13.46 8.9 13.42 8.87 13.37C8 12.26 7.84 10.66 8.43 9.39C7.12 10.45 6.41 12.24 6.5 13.92C6.56 14.31 6.6 14.7 6.74 15.09C6.85 15.56 7.06 16 7.3 16.44C8.14 17.78 9.61 18.75 11.19 18.94C12.87 19.15 14.67 18.85 15.96 17.7C17.4 16.4 17.9 14.33 17.16 12.56Z" /></svg>';
  #missIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Miss</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';

  constructor() {
    this.#startNewGame();
    this.#addPlayAgainInput();
  }

  #startNewGame() {
    this.#createPlayers();
    this.#createRealGameboard();
    this.#createSetup();
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
    const main = document.querySelector(".main");

    this.#computerGrid = document.createElement("div");
    this.#computerGrid.classList.add("gameboard");
    this.#computerGrid.id = "computer";
    main.appendChild(this.#computerGrid);

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
        this.#realAttack(computerCoordinate);

        if (this.#computerGameboard.isAllSunk()) {
          this.#displayEndScreen("You win!");
          return;
        }

        this.#toggleGridInputs();

        setTimeout(() => {
          this.#computerAttack();

          if (this.#realGameboard.isAllSunk()) {
            this.#displayEndScreen("You lose!");
            return;
          }

          this.#toggleGridInputs();
        }, 1500);
      },
      { once: true }
    );
  }

  #realAttack(computerCoordinate) {
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
      computerCoordinate.innerHTML = this.#hitIcon;
    } else {
      computerCoordinate.style.backgroundColor = "#008000";
      computerCoordinate.innerHTML = this.#missIcon;
    }
  }

  #computerAttack() {
    const [isRealHit, realXY] = this.#computerPlayer.attack(
      this.#realGameboard
    );

    const realCoordinate = this.#realGrid.querySelector(
      `[data-coordinate="${realXY}"]`
    );

    if (isRealHit) {
      realCoordinate.style.backgroundColor = "#880808";
      realCoordinate.innerHTML = this.#hitIcon;
    } else {
      realCoordinate.style.backgroundColor = "#008000";
      realCoordinate.innerHTML = this.#missIcon;
    }
  }

  #displayEndScreen(text) {
    const endText = this.#endScreen.querySelector("p");
    endText.textContent = text;
    this.#endScreen.showModal();
  }

  #toggleGridInputs() {
    const coordinates = this.#computerGrid.querySelectorAll(".coordinate");
    for (const coordinate of coordinates) {
      coordinate.disabled = !coordinate.disabled;
    }
  }

  #createSetup() {
    const setup = document.querySelector(".setup");

    const randomizeButton = document.createElement("button");
    randomizeButton.classList.add("setup");
    randomizeButton.id = "random";
    randomizeButton.textContent = "Shuffle";
    setup.appendChild(randomizeButton);

    const startButton = document.createElement("button");
    startButton.classList.add("setup");
    startButton.id = "start";
    startButton.textContent = "Start";
    setup.appendChild(startButton);

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
    const playAgainButton = this.#endScreen.querySelector("button");
    playAgainButton.addEventListener("click", () => {
      this.#realGrid.innerHTML = "";
      this.#computerGrid.remove();

      this.#endScreen.close();
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
