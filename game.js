class Game {
    constructor(){
    this.mainMenu = document.getElementById("mainMenu")
    this.gameContainer = document.getElementById("gameContainer")
    this.gameScreen = document.getElementById("gameScreen")
    this.endGame= document.getElementById("endGame")
    this.score = 0
    this.lives = 3
    this.spawn = null
}

startGame(){
    console.log("hello")
    this.score=0
    this.lives=3
 this.mainMenu.style.display = "none"
    this.gameContainer.style.display = "block"
    this.spawn = setInterval(() => {
        this.spawnImages()
    }, 1000);

}
spawnImages(){
   const positions = [
      { top: 500, left: 50 },
      { top: 1000, left: 300 },
      { top: 2000, left: 600 },
      { top: 3500, left: 150 },
      { top: 4500, left: 400 },
      { top: 5000, left: 700 }
    ];
      const place = positions[Math.floor(Math.random() * positions.length)]
      const img = document.createElement("img")
      img.src = "/cowboy.PNG"
      img.alt = "Cowboy"
      img.style.postion = "absolute"
      img.style.top = place.top + "px"
            img.style.left = place.left + "px"
            img.style.width = "100px"
            img.classList.add("cowboy")
            this.gameScreen.appendChild(img)


}









}