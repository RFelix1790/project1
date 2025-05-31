class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * (1900 - 250 + 1) + 250);
    this.top = 0;
    this.width = 100;
    this.height = 100;
    this.element = document.createElement("img");

    this.element.src = "./images/obstacle.jpg";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.classList.add("obstacle");

    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top += 6;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
