import { CustomGamesCreator } from "./CustomGameCreator";
import { LevelSelector } from "./LevelSelector";
import { CANVAS_DIMENSIONS } from "./constants";
import backgroundImgSrc from "/wall.jpg";
import foregroundImgSrc from "/start-screen.png";


/* The `StartScreen` class in TypeScript creates a start screen UI with buttons for one player, two
players, and creating a game, along with event listeners for each button. */
export class StartScreen {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  onePlayerButton!: HTMLButtonElement;
  twoPlayersButton!: HTMLButtonElement;
  settingsButton!: HTMLButtonElement;
  createGameButton!: HTMLButtonElement;
  backgroundWallImg: HTMLImageElement;
  foregroundImg: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;

    this.backgroundWallImg = new Image();
    this.backgroundWallImg.src = backgroundImgSrc;

    this.foregroundImg = new Image();
    this.foregroundImg.src = foregroundImgSrc;

    this.createUI();
    this.addEventListeners();
  }
  createUI() {
    this.clearCanvas();

    this.backgroundWallImg.onload = () => {
      this.ctx.drawImage(
        this.backgroundWallImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    };

    this.foregroundImg.onload = () => {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Scale and position for mobile
        const size = Math.min(CANVAS_DIMENSIONS.CANVAS_WIDTH * 0.8, 300);
        const x = (CANVAS_DIMENSIONS.CANVAS_WIDTH - size) / 2;
        const y = CANVAS_DIMENSIONS.CANVAS_HEIGHT - size - 20;
        
        this.ctx.drawImage(
          this.foregroundImg,
          x,
          y,
          size,
          size
        );
      } else {
        // Desktop positioning
        this.ctx.drawImage(
          this.foregroundImg,
          CANVAS_DIMENSIONS.CANVAS_WIDTH - 400,
          CANVAS_DIMENSIONS.CANVAS_HEIGHT - 400,
          400,
          400
        );
      }
      
      this.drawTitle();
    };

    const isMobile = window.innerWidth <= 768;
    const baseY = isMobile ? 250 : 300;
    const spacing = isMobile ? 80 : 100;
    
    this.onePlayerButton = this.createButton("One Player", 400, baseY);
    this.twoPlayersButton = this.createButton("Two Players", 400, baseY + spacing);
    this.createGameButton = this.createButton("Create Game", 400, baseY + spacing * 2);
  }
  drawTitle() {
    const isMobile = window.innerWidth <= 768;
    const fontSize = isMobile ? 48 : 80;
    const yPosition = isMobile ? 100 : 150;
    
    this.ctx.font = `${fontSize}px "Comic Sans MS", sans-serif`;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 3;
    this.ctx.textAlign = "center";
    this.ctx.fillText("Benpo Trouble", this.canvas.width / 2, yPosition);
    this.ctx.strokeText("Benpo Trouble", this.canvas.width / 2, yPosition);
  }
  createButton(text: string, x: number, y: number): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.position = "absolute";
    
    // Make buttons responsive for mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Center buttons horizontally and adjust vertically for mobile
      button.style.left = "50%";
      button.style.transform = "translateX(-50%)";
      button.style.top = `${y + 50}px`; // Adjust position for mobile
      button.style.padding = "15px 25px";
      button.style.fontSize = "18px";
      button.style.minWidth = "200px";
    } else {
      // Desktop positioning
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
      button.style.padding = "20px";
      button.style.fontSize = "24px";
    }
    
    button.style.border = "2px solid #8B4513"; // Wooden look
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.borderRadius = "10px";
    button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";
    button.style.fontFamily = "'Bubblegum Sans', cursive";
    button.style.fontWeight = "bold";
    
    document.body.appendChild(button);
    return button;
  }
  addEventListeners() {
    this.onePlayerButton.addEventListener("click", () => {
      this.clearUI();
      new LevelSelector(this.canvas, 1);
    });
    this.twoPlayersButton.addEventListener("click", () => {
      this.clearUI();
      new LevelSelector(this.canvas, 2);
    });
    this.createGameButton.addEventListener("click", () => {
      this.clearUI();
      new CustomGamesCreator(this.canvas);
    });
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  clearUI() {
    document.body.removeChild(this.onePlayerButton);
    document.body.removeChild(this.twoPlayersButton);
    document.body.removeChild(this.createGameButton);
    this.onePlayerButton = undefined!;
    this.twoPlayersButton = undefined!;
    this.createGameButton = undefined!;
  }
}
