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
      { top: 950, left: 1900, isActivated: false },
      { top: 900, left: 1270, isActivated: false },
      { top: 900, left: 750, isActivated: false },
      { top: 340, left: 320, isActivated: false },
      { top: 475, left: 1270, isActivated: false },
      { top: 400, left: 1900, isActivated: false },
    ];
    this.gameIntervalId = null;
    this.obstacleInterval = null;
    this.obstacles = [];
    this.player = new Player(this.gameContainer, 1200, 1100, 150, 150);
  }

  startGame() {
    this.score = 0;
    this.lives = 3;
    this.scoreElm.innerText = `score: ${this.score}`;
    this.livesElm.innerText = `lives: ${this.lives}`;
    this.mainMenu.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.usedPositions = [];
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));
    this.player.move();
  }
  gameLoop() {
    this.update();
    if (this.gameOver) {
      clearInterval(this.gameIntervalId);
    }
  }
  update() {
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
  spawnVillan() {
    const place =
      this.position[Math.floor(Math.random() * this.position.length)];
    if (place.isActivated === false) {
      const img = document.createElement("img");
      img.src = "./images/cowboy.png";
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
    }
  }

  spawnCivilian() {
    const place =
      this.position[Math.floor(Math.random() * this.position.length)];
    if (place.isActivated === false) {
      const img = document.createElement("img");
      img.src = "./images/civilian.avif";
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
    }
  }
  winner() {
    this.gameContainer.style.display = "none";
    this.winnerScreen.style.display = "block";
    clearInterval(this.spawnVillanInterval);
    clearInterval(this.spawnCivilianInterval);
  }
  gameOver() {
    this.endGame.style.display = "block";
    this.gameContainer.style.display = "none";
    clearInterval(this.spawnVillanInterval);
    clearInterval(this.spawnCivilianInterval);
  }
  clearSpawn() {
    this.position = [
      { top: 950, left: 1900, isActivated: false },
      { top: 900, left: 1270, isActivated: false },
      { top: 900, left: 750, isActivated: false },
      { top: 340, left: 320, isActivated: false },
      { top: 475, left: 1270, isActivated: false },
      { top: 400, left: 1900, isActivated: false },
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
