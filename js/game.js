class Game {
  constructor() {
    this.mainMenu = document.getElementById("mainMenu");
    this.gameContainer = document.getElementById("gameContainer");
    this.endGame = document.getElementById("endGame");
    this.winnerScreen = document.getElementById("winnerScreen");
    this.scoreElm = document.querySelector(".score");
    this.livesElm = document.querySelector(".lives");
    this.killCountElm = document.querySelector(".kills");
    this.innocentsElm = document.querySelector(".innocents");
    this.dodgeElm = document.querySelector(".dodge");
    this.score = 0;
    this.lives = 3;
    this.killCount = 0;
    this.innocents = 0;
    this.dodge = 0;
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
    this.obstacleArray = [];
    this.player = new Player(this.gameContainer, 1200, 1100, 150, 150);
    this.backgroundMusic = new Audio("./images/music.wav");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.1;
    this.shot = new Audio("./images/gun.wav");
    this.shot.volume = 0.2;
    this.bestShot = new Audio("./images/bestshot.wav");
    this.gameOverAudio = new Audio("./images/audio-Game-Over.wav");
    this.gameOverAudio.volume = 0.3;
    this.isGameOver = false;
    this.winAudio = new Audio("./images/winAudio.wav");
    this.winAudio.volume = 0.3;
    this.isWIN = false;
  }

  startGame() {
    this.backgroundMusic.play();
    this.bestShot.play();
    this.score = 0;
    this.lives = 3;
    this.killCount = 0;
    this.innocents = 0;
    this.dodge = 0;
    this.scoreElm.innerText = `score: ${this.score}`;
    this.livesElm.innerText = `lives: ${this.lives}`;
    this.killCountElm.innerText = `kills :${this.killCount}`;
    this.innocentsElm.innerText = `innocents: ${this.innocents}`;
    this.dodgeElm.innerText = `objects dodge: ${this.dodge}`;
    this.mainMenu.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.usedPositions = [];
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));
    this.player.move();
    this.obstacleInterval = setInterval(() => {
      const newObstacle = new Obstacle(this.gameContainer);
      this.obstacleArray.push(newObstacle);
    }, 3000);

    this.spawnCountVillans = 0;
    this.spawnVillanInterval = setInterval(() => {
      this.spawnVillan();
      this.spawnCountVillans++;
    }, 1000);
    this.spawnCountCivilian = 0;
    this.spawnCivilianInterval = setInterval(() => {
      this.spawnCivilian();
    }, 2000);
    this.isGameOver = false;
    this.isWIN = false;
  }
  gameLoop() {
    this.obstacleArray.forEach((obstacle, index) => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        this.lives--;
        this.livesElm.innerText = `lives: ${this.lives}`;
        obstacle.element.remove();
        this.obstacleArray.splice(index, 1);
        const hit = document.createElement("img");
        hit.src = "./images/obstaclegif.png";
        hit.style.width = "100px";
        hit.style.height = "100px";
        hit.style.position = "absolute";
        const containerRect = this.gameContainer.getBoundingClientRect();

        hit.style.left = obstacle.left + "px";
        hit.style.top = obstacle.top + "px";
        this.gameContainer.appendChild(hit);
        setTimeout(() => {
          hit.remove();
        }, 1000);

        if (this.lives <= 0) {
          this.gameOver();
        }
      } else if (obstacle.top > 1200) {
        this.dodge++;
        this.dodgeElm.innerText = `objects dodge: ${this.dodge}`;
        obstacle.element.remove();
        this.obstacleArray.splice(index, 1);
      }
    });
    if (this.isGameOver) {
      this.backgroundMusic.pause();
      clearInterval(this.gameIntervalId);
    }
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
          this.shot.play();
          const bang = document.createElement("img");
          bang.src =
            "https://bridgetregankolek.wordpress.com/wp-content/uploads/2013/09/bang.gif";
          bang.style.width = "150px";
          bang.style.height = "150px";
          bang.style.position = "absolute";
          const containerRect = this.gameContainer.getBoundingClientRect();

          bang.style.left = this.player.left + "px";
          bang.style.top = this.player.top - 100 + "px";
          this.gameContainer.appendChild(bang);
          setTimeout(() => {
            bang.remove();
          }, 1000);
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
        this.shot.play();
        const bang = document.createElement("img");
        bang.src =
          "https://bridgetregankolek.wordpress.com/wp-content/uploads/2013/09/bang.gif";
        bang.style.width = "150px";
        bang.style.height = "150px";
        bang.style.position = "absolute";
        const containerRect = this.gameContainer.getBoundingClientRect();

        bang.style.left = event.clientX - containerRect.left - 100 + "px";
        bang.style.top = event.clientY - containerRect.top - 100 + "px";
        this.gameContainer.appendChild(bang);
        setTimeout(() => {
          bang.remove();
        }, 1000);
        place.isActivated = false;
        img.remove();
        this.score += 10;
        this.scoreElm.innerText = `score: ${this.score}`;
        this.killCount += 1;
        this.killCountElm.innerText = `kills :${this.killCount}`;
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
        this.shot.play();
        const bang = document.createElement("img");
        bang.src =
          "https://cdn.pixabay.com/photo/2022/05/02/16/15/oops-7169963_1280.png";
        bang.style.width = "100px";
        bang.style.height = "100px";
        bang.style.position = "absolute";
        const containerRect = this.gameContainer.getBoundingClientRect();

        bang.style.left = event.clientX - containerRect.left - 100 + "px";
        bang.style.top = event.clientY - containerRect.top - 100 + "px";
        this.gameContainer.appendChild(bang);
        setTimeout(() => {
          bang.remove();
        }, 1000);
        img.remove();
        this.lives--;
        this.livesElm.innerText = `lives: ${this.lives}`;
        this.innocents += 1;
        this.innocentsElm.innerText = `innocents: ${this.innocents}`;
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
    if (this.isWIN) return;
    this.isWIN = true;
    this.gameContainer.style.display = "none";
    this.winnerScreen.style.display = "block";
    clearInterval(this.spawnVillanInterval);
    clearInterval(this.spawnCivilianInterval);
    clearInterval(this.obstacleInterval);
    this.shot.pause();
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
    this.winAudio.play();
  }
  gameOver() {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.endGame.style.display = "block";
    this.gameContainer.style.display = "none";
    clearInterval(this.spawnVillanInterval);
    clearInterval(this.spawnCivilianInterval);
    clearInterval(this.obstacleInterval);
    this.shot.pause();
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
    this.gameOverAudio.play();
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
    });
    this.position.forEach((Element) => (Element.isActivated = false));
    const obstacle = document.querySelectorAll(".obstacle");
    obstacle.forEach((img) => {
      img.remove();
    });
    this.obstacleArray = [];
  }
}
