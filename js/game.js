class Game {
  constructor() {
    this.mainMenu = document.getElementById("mainMenu");
    this.gameContainer = document.getElementById("gameContainer");
    this.endGame = document.getElementById("endGame");
    this.winnerScreen = document.getElementById("winnerScreen");
    this.scoreElm = document.querySelector(".score");
    this.livesElm = document.querySelector(".lives");
    this.score = 0;
    this.lives = 3;
    this.spawn = null;
    this.height = 600;
    this.width = 500;
    this.position = [
      { top: 120, left: 320, isActivated: false },
      { top: 500, left: 250, isActivated: false },
      { top: 190, left: 750, isActivated: false },
      { top: 460, left: 750, isActivated: false },
      { top: 200, left: 1100, isActivated: false },
      { top: 500, left: 1100, isActivated: false },
    ];
    this.gmaIntervalId = null;
    this.obstacleInterval = null;
  }

  startGame() {
    this.score = 0;
    this.lives = 3;
    this.scoreElm.innerText = `score: ${this.score}`;
    this.livesElm.innerText = `lives: ${this.lives}`;
    this.mainMenu.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.usedPositions = [];
    this.gmaIntervalId = setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));

    this.spawnCountVillans = 0;
    this.spawnVillanInterval = setInterval(() => {
      this.spawnVillan();
      this.spawnCountVillans++;
      if (this.spawnCountVillans >= 100) {
        clearInterval(this.spawnVillanInterval);
      }
    }, 1000);

    this.spawnCountCivilian = 0;
    this.spawnCivilianInterval = setInterval(() => {
      this.spawnCivilian();
    }, 3000);
  }
  gameLoop() {
    this.update();
    if (this.gameOver) {
      clearInterval(this.gmaIntervalId);
    }
  }
  spawnVillan() {
    const place =
      this.position[Math.floor(Math.random() * this.position.length)];
    if (place.isActivated === false) {
      const img = document.createElement("img");
      img.src = "/styles/cowboy.PNG";
      img.alt = "Cowboy";
      img.style.position = "absolute";
      img.style.top = place.top + "px";
      img.style.left = place.left + "px";
      img.style.width = "75px";
      img.classList.add("cowboy");
      this.gameContainer.appendChild(img);
      const timeout = setTimeout(() => {
        if (img.isConnected) {
          place.isActivated = false;
          img.remove();
          this.lives--;
          this.livesElm.innerText = `lives: ${this.lives}`;
          if (this.lives <= 0) {
            this.gameOver();
          }
        }
      }, 5000);
      img.addEventListener("click", () => {
        clearTimeout(timeout);
        place.isActivated = false;
        img.remove();
        this.score += 10;
        this.scoreElm.innerText = `score: ${this.score}`;
        if (this.score >= 100) {
          this.winner();
        }
      });
      place.isActivated = true;
    } else {
      this.spawnVillan();
    }
  }

  spawnCivilian() {
    const place =
      this.position[Math.floor(Math.random() * this.position.length)];
    if (place.isActivated === false) {
      const img = document.createElement("img");
      img.src = "/styles/civilian.avif";
      img.alt = "civilian";
      img.style.position = "absolute";
      img.style.top = place.top + "px";
      img.style.left = place.left + "px";
      img.style.width = "75px";
      img.classList.add("civilian");
      this.gameContainer.appendChild(img);
      place.isActivated = true;
      img.addEventListener("click", () => {
        place.isActivated = false;
        img.remove();
        this.lives--;
        this.livesElm.innerText = `lives: ${this.lives}`;
        if (this.lives <= 0) {
          this.gameOver();
        }
      });
      setTimeout(() => {
        if (img.isConnected) {
          img.remove();
          place.isActivated = false;
        }
      }, 5000);
    } else {
      this.spawnCivilian();
    }
  }
  winner() {
    this.gameContainer.style.display = "none";
    this.endGame.style.display = "none";
    this.winnerScreen.style.display = "block";
    clearInterval(this.spawnVillanInterval);
    clearInterval(this.spawnCivilianInterval);
  }
  gameOver() {
    this.endGame.style.display = "block";
    this.gameContainer.style.display = "none";
    this.winnerScreen.style.display = "none";
    clearInterval(this.spawnVillanInterval);
    clearInterval(this.spawnCivilianInterval);
  }
  clearSpawn() {
    this.position = [
      { top: 120, left: 320, isActivated: false },
      { top: 500, left: 250, isActivated: false },
      { top: 190, left: 750, isActivated: false },
      { top: 460, left: 750, isActivated: false },
      { top: 200, left: 1100, isActivated: false },
      { top: 500, left: 1100, isActivated: false },
    ];
    const cowboy = document.querySelectorAll(".cowboy");
    cowboy.forEach((img) => {
      img.remove();
    });
    const civilian = document.querySelectorAll(".civilian");
    civilian.forEach((img) => {
      img.remove();
      this.position.forEach((Element) => (Element.isActivated = false));
    });
  }
}
