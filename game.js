class Game {
    constructor(){
    this.mainMenu = document.getElementById("mainMenu")
    this.gameContainer = document.getElementById("gameContainer")
    this.endGame= document.getElementById("endGame")
    this.score = 0
    this.lives = 3
    this.spawn = null
     this.height = 600
    this.width = 500
    this.position =  [
      { top: 120, left: 320, isActivated: false },
      { top: 500, left: 250,isActivated: false  },
     { top: 190, left: 750 , isActivated: false},
      {top: 460, left: 750, isActivated: false },
      { top: 200, left: 1100, isActivated: false },
      { top: 500, left: 1100, isActivated: false },
      
    ];

}

startGame(){
    this.score=0
    this.lives=3
 this.mainMenu.style.display = "none"
    this.gameContainer.style.display = "flex"
    this.usedPositions = []
    
    this.spawnCountVillans = 0
    this.spawnVillanIterval = setInterval(() => {
        this.spawnVillan()
        this.spawnCountVillans ++
        if(this.spawnCountVillans >=100){
            clearInterval(this.spawnVillanIterval)
        }
    }, 1000);

    this.spawnCountCivilian = 0
   this.spawnVillanIterval = setInterval(() => {
    this.spawnCivilian()
   },10000)

    
}
spawnVillan(){
    const place = this.position[Math.floor(Math.random() * this.position.length)]
    if(place.isActivated === false){
        const img = document.createElement("img")
        img.src = "/cowboy.PNG"
        img.alt = "Cowboy"
        img.style.position = "absolute"
        img.style.top = place.top + "px"
        img.style.left = place.left + "px"
        img.style.width = "75px"
        img.classList.add("cowboy")
        this.gameContainer.appendChild(img) 
        img.addEventListener("click",() => {
            place.isActivated = false
            img.remove()
            this.score += 10
        })
        place.isActivated = true
    }
    else{
        this.spawnVillan()
    }
        }

        spawnCivilian(){
              const place = this.position[Math.floor(Math.random() * this.position.length)]
    if(place.isActivated === false){
        const img = document.createElement("img")
        img.src = "/civilian.avif"
        img.alt = "civilian"
        img.style.position = "absolute"
        img.style.top = place.top + "px"
        img.style.left = place.left + "px"
        img.style.width = "75px"
        img.classList.add("civilian")
        this.gameContainer.appendChild(img) 
        place.isActivated = true
        img.addEventListener("click",() => {
            place.isActivated = false
            img.remove()
            this.lives --
              if (this.lives <= 0) {
                this.gameOver()}
        })
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
                place.isActivated = false;
            }
        }, 5000)
    }
    else{
        this.spawnCivilian()
    }
        }
gameOver() {
    clearInterval(this.spawnVillanIterval);
    clearInterval(this.spawnCivilianInterval);
}



}