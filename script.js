window.onload = function () {
    const game = new Game ()
    const startButton = document.getElementById("start-button")
        const restartButton = document.getElementById("restart-button")
        startButton.addEventListener("click", () => {
            game.startGame()
        })
        restartButton.addEventListener("click", ()=> {
            game.mainMenu.style.display = "block"
            game.endGame.style.display = "none"
        })

}