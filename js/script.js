window.onload = function () {
  const game = new Game();
  const startButton = document.getElementById("start-button");
  const restartButton = document.querySelectorAll(".restart-button");
  const backToMainMenu = document.querySelectorAll(".backToMainMenu");

  startButton.addEventListener("click", () => {
    game.startGame();
  });

  restartButton.forEach((element) => {
    element.addEventListener("click", () => {
      clearInterval(game.spawnVillanInterval);
      clearInterval(game.spawnCivilianInterval);
      game.clearSpawn();
      game.startGame();
    });
  });

  backToMainMenu.forEach((element) => {
    element.addEventListener("click", () => {
      game.clearSpawn();
      game.mainMenu.style.display = "flex";
      game.gameContainer.style.display = "none";
      game.endGame.style.display = "none";
      game.winnerScreen.style.display = "none";
    });
  });
};
