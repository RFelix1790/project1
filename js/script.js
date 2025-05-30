window.onload = function () {
  const game = new Game();
  const startButton = document.getElementById("start-button");
  const restartButton = document.querySelectorAll(".restart-button");
  const backToMainMenu = document.querySelectorAll(".backToMainMenu");

  startButton.addEventListener("click", () => {
    game.startGame();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      game.player.directionX += 2;
      game.player.move();
    }
    if (e.key === "ArrowLeft") {
      game.player.directionX += -2;
      game.player.move();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      game.player.directionX = 0;
      game.player.move();
    }
  });

  restartButton.forEach((element) => {
    element.addEventListener("click", () => {
      clearInterval(game.spawnVillanInterval);
      clearInterval(game.spawnCivilianInterval);
      game.clearSpawn();
      game.startGame();
      game.endGame.style.display = "none";
      game.winnerScreen.style.display = "none";
      if (game.player && game.player.element) {
        game.player.element.remove();
      }
      game.player = new Player(game.gameContainer, 1200, 1100, 150, 150);
    });
    game.winAudio.pause();
    game.gameOverAudio.pause();
  });

  backToMainMenu.forEach((element) => {
    element.addEventListener("click", () => {
      game.clearSpawn();
      game.mainMenu.style.display = "flex";
      game.gameContainer.style.display = "none";
      game.endGame.style.display = "none";
      game.winnerScreen.style.display = "none";
      game.winAudio.pause();
      game.gameOverAudio.pause();
    });
  });
};
