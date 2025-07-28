import { GameManager } from "./GameManager";
import { CANVAS_DIMENSIONS } from "./constants";
import backgroundImgSrc from "/wall.jpg";

/* The `LevelSelector` class creates a user interface for selecting game levels and handles event
listeners for loading selected levels in a game manager. */
export class LevelSelector {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  levelButtons: HTMLButtonElement[] = [];
  numberofPlayers: number;
  backgroundWallImg: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, numberofPlayers: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.numberofPlayers = numberofPlayers;
    
    this.backgroundWallImg = new Image();
    this.backgroundWallImg.src = backgroundImgSrc;
    
    this.createUI();
    this.addEventListeners();
  }

  createUI() {
    this.clearCanvas();
    this.drawBackground();
    this.drawTitle();
    
    const isMobile = window.innerWidth <= 768;
    
    // Calculate responsive positioning - start after title
    const titleHeight = isMobile ? 100 : 150;
    const startY = titleHeight + 20;
    const spacing = isMobile ? 60 : 80;
    const baseX = 400; // Will be adjusted in createButton for mobile
    
    for (let i = 1; i <= 5; i++) {
      const button = this.createButton(`Level ${i}`, baseX, startY + (i - 1) * spacing);
      this.levelButtons.push(button);
    }
  }

  drawBackground() {
    this.backgroundWallImg.onload = () => {
      this.ctx.drawImage(
        this.backgroundWallImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    };
    
    // If already loaded
    if (this.backgroundWallImg.complete) {
      this.ctx.drawImage(
        this.backgroundWallImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }

  drawTitle() {
    const isMobile = window.innerWidth <= 768;
    
    // Responsive font size based on canvas width
    const fontSize = isMobile ? 
      Math.min(this.canvas.width * 0.1, 36) : // Mobile: scale with canvas width, max 36px
      Math.min(this.canvas.width * 0.06, 60);  // Desktop: scale with canvas width, max 60px
    
    // Responsive positioning
    const yPosition = isMobile ? 
      Math.max(fontSize + 15, 50) : // Mobile: font size + padding, minimum 50px
      Math.max(fontSize + 25, 100); // Desktop: font size + padding, minimum 100px
    
    this.ctx.font = `${fontSize}px "Comic Sans MS", sans-serif`;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = isMobile ? 2 : 3;
    this.ctx.textAlign = "center";
    
    const titleText = `Select Level (${this.numberofPlayers} Player${this.numberofPlayers > 1 ? 's' : ''})`;
    this.ctx.fillText(titleText, this.canvas.width / 2, yPosition);
    this.ctx.strokeText(titleText, this.canvas.width / 2, yPosition);
  }
  createButton(text: string, x: number, y: number): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.position = "fixed"; // Changed to fixed for better mobile positioning
    
    // Make buttons fully responsive
    const isMobile = window.innerWidth <= 768;
    const canvasRect = this.canvas.getBoundingClientRect();
    
    if (isMobile) {
      // Mobile: center horizontally relative to canvas
      const canvasCenterX = canvasRect.left + canvasRect.width / 2;
      button.style.left = `${canvasCenterX}px`;
      button.style.transform = "translateX(-50%)";
      button.style.top = `${canvasRect.top + y}px`;
      
      // Responsive mobile button styling
      const buttonWidth = Math.min(canvasRect.width * 0.7, 200);
      const fontSize = Math.min(buttonWidth * 0.08, 16);
      
      button.style.width = `${buttonWidth}px`;
      button.style.padding = "12px 15px";
      button.style.fontSize = `${fontSize}px`;
      button.style.minHeight = "45px";
    } else {
      // Desktop positioning relative to canvas
      button.style.left = `${canvasRect.left + x}px`;
      button.style.top = `${canvasRect.top + y}px`;
      button.style.padding = "20px 50px";
      button.style.fontSize = "20px";
      button.style.minWidth = "180px";
    }
    
    // Common button styles
    button.style.border = "2px solid #8B4513";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.borderRadius = "10px";
    button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";
    button.style.fontFamily = "'Bubblegum Sans', cursive";
    button.style.fontWeight = "bold";
    button.style.textAlign = "center";
    button.style.transition = "all 0.2s ease";
    
    // Hover effects
    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = "#cc0000";
      button.style.transform = isMobile ? "translateX(-50%) scale(1.05)" : "scale(1.05)";
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = "red";
      button.style.transform = isMobile ? "translateX(-50%)" : "scale(1)";
    });
    
    document.body.appendChild(button);
    return button;
  }

  addEventListeners() {
    this.levelButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.clearUI();
        new GameManager(
          this.canvas,
          this.numberofPlayers
        ).levelLoader.loadLevel(index);
      });
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearUI() {
    this.levelButtons.forEach((button) => {
      document.body.removeChild(button);
    });
  }
}
