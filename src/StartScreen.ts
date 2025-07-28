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
        // Mobile: scale and position to avoid overlapping with buttons
        const maxSize = Math.min(CANVAS_DIMENSIONS.CANVAS_WIDTH * 0.6, 200);
        const x = (CANVAS_DIMENSIONS.CANVAS_WIDTH - maxSize) / 2;
        
        // Position in bottom area, leaving space for buttons
        const buttonAreaHeight = 200; // Estimated space needed for buttons
        const availableBottomHeight = CANVAS_DIMENSIONS.CANVAS_HEIGHT - buttonAreaHeight;
        const y = Math.max(availableBottomHeight - maxSize - 20, CANVAS_DIMENSIONS.CANVAS_HEIGHT * 0.6);
        
        this.ctx.drawImage(
          this.foregroundImg,
          x,
          y,
          maxSize,
          maxSize
        );
      } else {
        // Desktop: position in corner, check if it fits
        const size = Math.min(400, CANVAS_DIMENSIONS.CANVAS_WIDTH * 0.4, CANVAS_DIMENSIONS.CANVAS_HEIGHT * 0.4);
        const x = CANVAS_DIMENSIONS.CANVAS_WIDTH - size - 20;
        const y = CANVAS_DIMENSIONS.CANVAS_HEIGHT - size - 20;
        
        this.ctx.drawImage(
          this.foregroundImg,
          x,
          y,
          size,
          size
        );
      }
      
      this.drawTitle();
    };

    const isMobile = window.innerWidth <= 768;
    
    // Calculate dynamic positioning to avoid overlaps
    const titleHeight = isMobile ? 
      Math.max(this.canvas.width * 0.12 + 40, 100) : // Title + padding
      Math.max(this.canvas.width * 0.08 + 60, 210);   // Title + padding
    
    const buttonHeight = isMobile ? 60 : 80; // Estimated button height with padding
    const spacing = isMobile ? 15 : 20; // Space between buttons
    const totalButtonsHeight = (buttonHeight + spacing) * 3;
    
    // Calculate base Y to center buttons in remaining space
    const availableHeight = this.canvas.height - titleHeight - 50; // 50px bottom margin
    const baseY = titleHeight + Math.max((availableHeight - totalButtonsHeight) / 2, 20);
    
    this.onePlayerButton = this.createButton("One Player", 400, baseY);
    this.twoPlayersButton = this.createButton("Two Players", 400, baseY + buttonHeight + spacing);
    this.createGameButton = this.createButton("Create Game", 400, baseY + (buttonHeight + spacing) * 2);
  }
  drawTitle() {
    const isMobile = window.innerWidth <= 768;
    
    // Responsive font size based on canvas width
    const fontSize = isMobile ? 
      Math.min(this.canvas.width * 0.12, 48) : // Mobile: scale with canvas width, max 48px
      Math.min(this.canvas.width * 0.08, 80);   // Desktop: scale with canvas width, max 80px
    
    // Responsive positioning - ensure title doesn't overlap with content
    const yPosition = isMobile ? 
      Math.max(fontSize + 20, 60) : // Mobile: font size + padding, minimum 60px
      Math.max(fontSize + 30, 150); // Desktop: font size + padding, minimum 150px
    
    this.ctx.font = `${fontSize}px "Comic Sans MS", sans-serif`;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = isMobile ? 2 : 3; // Thinner stroke on mobile
    this.ctx.textAlign = "center";
    this.ctx.fillText("Benpo Trouble", this.canvas.width / 2, yPosition);
    this.ctx.strokeText("Benpo Trouble", this.canvas.width / 2, yPosition);
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
      const buttonWidth = Math.min(canvasRect.width * 0.8, 250);
      const fontSize = Math.min(buttonWidth * 0.08, 18);
      
      button.style.width = `${buttonWidth}px`;
      button.style.padding = "12px 20px";
      button.style.fontSize = `${fontSize}px`;
      button.style.minHeight = "45px";
    } else {
      // Desktop positioning relative to canvas
      button.style.left = `${canvasRect.left + x}px`;
      button.style.top = `${canvasRect.top + y}px`;
      button.style.padding = "20px 30px";
      button.style.fontSize = "24px";
      button.style.minWidth = "200px";
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
