import { GroundWalls } from "./components/Ground";
import { Bubble } from "./components/Bubble";
import { Wall } from "./components/Wall";
import { GameManager } from "./GameManager";
import { CANVAS_DIMENSIONS, GROUND_HEIGHT } from "./constants";
import { LEVEL_FIVE, LEVEL_ONE } from "./utils/levels";
import groundImg from "/wall.jpg";

/* The `CustomGamesCreator` class in TypeScript creates a custom game level with bubbles, walls, and
interactive elements on a canvas. */
export class CustomGamesCreator {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bgImage: HTMLImageElement;
  ground!: GroundWalls;
  groundImg: HTMLImageElement;
  bubble?: Bubble;
  gamemanager?: GameManager;
  selectedBubbleRadius: number = 30;
  draggingBubble: boolean = false;
  currentBubble?: Bubble;
  addBubbleButton?: HTMLButtonElement;
  playButton?: HTMLButtonElement;
  bubbleOptions?: HTMLSelectElement;
  wallOptions?: HTMLSelectElement;
  walls: Wall[] = [];
  wall?: Wall;
  draggingWall: boolean = false;
  resizingWall: boolean = false;
  currentWall?: Wall;
  addWallButton?: HTMLButtonElement;
  selectedWallIndex: number = -1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.bgImage = new Image();
    this.bgImage.src = LEVEL_FIVE.imageSrc;
    this.ground = new GroundWalls(this.ctx, 6);
    this.groundImg = new Image();
    this.groundImg.src = groundImg;
    this.wall = new Wall(this.ctx, 0);

    GameManager.bubbleArray = [];

    this.initialSetup();
  }

  public initialSetup(): void {
    this.clearCanvas();
    this.bgImage.onload = () => {
      this.setupStaticLevel();
      this.selectSizeOption();
      this.createAddBubbleButton();
      this.createPlayButton();
      this.createAddWallButton();
      this.addEventListeners();
    };
  }

  private setupStaticLevel(): void {
    this.ctx.drawImage(
      this.bgImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.wall?.drawDefaultWalls();
  }

  private selectSizeOption(): void {
    const bubbleContainer = document.createElement("select");
    bubbleContainer.id = "ball-options";
    bubbleContainer.style.position = "absolute";
    bubbleContainer.style.bottom = `${GROUND_HEIGHT / 2}px`;
    bubbleContainer.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 4}px`;
    bubbleContainer.style.zIndex = "1";
    bubbleContainer.style.padding = "10px";
    bubbleContainer.style.border = "2px solid #ccc";
    bubbleContainer.style.borderRadius = "5px";
    bubbleContainer.style.backgroundColor = "#fff";
    bubbleContainer.style.fontSize = "16px";
    bubbleContainer.style.cursor = "pointer";

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Select Radius";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    bubbleContainer.appendChild(placeholderOption);

    const BUBBLE_SIZES = [10, 20, 30, 40, 50, 60];
    BUBBLE_SIZES.forEach((size) => {
      const optionElement = document.createElement("option");
      optionElement.value = size.toString();
      optionElement.textContent = size.toString();
      bubbleContainer.appendChild(optionElement);
    });
    bubbleContainer.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      this.selectedBubbleRadius = parseInt(target.value);
    });
    document.body.appendChild(bubbleContainer);
    this.bubbleOptions = bubbleContainer;
  }

  private createAddBubbleButton() {
    const button = document.createElement("button");
    button.innerText = "+";
    button.style.padding = "10px 20px";
    button.style.position = "absolute";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "green";
    button.style.bottom = `${GROUND_HEIGHT / 2}px`;
    button.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 85}px`;
    button.style.color = "#fff";
    button.style.fontSize = "20px";
    button.style.cursor = "pointer";
    button.onclick = () => {
      this.addBubble(this.canvas.width / 2, this.canvas.height / 2);
    };
    document.body.appendChild(button);
    this.addBubbleButton = button;
  }

  private createAddWallButton() {
    const wallButton = document.createElement("button");
    wallButton.innerText = "Wall +";
    wallButton.style.position = "absolute";
    wallButton.style.bottom = `${GROUND_HEIGHT / 2}px`;
    wallButton.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 300}px`;
    wallButton.style.padding = "10px 20px";
    wallButton.style.borderRadius = "5px";
    wallButton.style.backgroundColor = "blue";
    wallButton.style.color = "#fff";
    wallButton.style.fontSize = "20px";
    wallButton.style.cursor = "pointer";

    wallButton.onclick = () => {
      this.addWall(this.canvas.width / 2);
    };
    document.body.appendChild(wallButton);
    this.addWallButton = wallButton;
  }

  private addBubble(x: number, y: number) {
    const bubble = new Bubble(this.ctx, 0, this.selectedBubbleRadius, x, y);
    GameManager.bubbleArray?.push(bubble);
    this.draw();
  }

  private addWall(x: number) {
    const wall = new Wall(this.ctx, x);
    GameManager.walls.push(wall);
    this.draw();
  }

  private addEventListeners(): void {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
  }

  private removeEventListeners(): void {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
  }

  private onMouseDown = (event: MouseEvent) => {
    const { offsetX, offsetY } = event;

    this.currentBubble = GameManager.bubbleArray!.find((bubble) => {
      return (
        Math.hypot(bubble.centerX - offsetX, bubble.centerY - offsetY) <
        bubble.radius
      );
    });

    if (this.currentBubble) {
      this.draggingBubble = true;
    } else {
      this.selectedWallIndex = GameManager.walls.findIndex((wall) => {
        return (
          offsetX >= wall.posX &&
          offsetX <= wall.posX + wall.width &&
          offsetY >= wall.posY &&
          offsetY <= wall.posY + wall.height
        );
      });
      if (this.selectedWallIndex >= 0) {
        this.currentWall = GameManager.walls[this.selectedWallIndex];
        this.draggingWall = true;
        this.resizingWall =
          offsetX >= this.currentWall.posX + this.currentWall.width - 10 &&
          offsetY >= this.currentWall.posY + this.currentWall.height - 10;
      }
    }
  };

  /* This `onMouseMove` method is handling the logic for moving either a bubble or a wall on the canvas
based on user interaction. */
  private onMouseMove = (event: MouseEvent) => {
    const { offsetX, offsetY } = event;
    if (this.draggingBubble && this.currentBubble) {
      this.currentBubble.centerX = offsetX;
      this.currentBubble.centerY = offsetY;
      this.draw();
    } else if (this.draggingWall && this.currentWall) {
      if (this.resizingWall) {
        this.currentWall.width = Math.max(10, offsetX - this.currentWall.posX);
        this.currentWall.height = Math.max(10, offsetY - this.currentWall.posY);
      } else {
        this.currentWall.posX = offsetX;
      }
      GameManager.walls[this.selectedWallIndex] = this.currentWall;
      this.draw();
    }
  };

  private onMouseUp = () => {
    this.draggingBubble = false;
    this.currentBubble = undefined;
    this.draggingWall = false;
    this.resizingWall = false;
    this.currentWall = undefined;
  };

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * The `createPlayButton` function creates a play button element with specific styling and
   * functionality for a game interface.
   */
  private createPlayButton() {
    const button = document.createElement("button");
    button.innerText = "Play";
    button.style.padding = "10px 20px";
    button.style.position = "absolute";
    button.style.borderRadius = "50px";
    button.style.backgroundColor = "black";
    button.style.bottom = `${GROUND_HEIGHT / 2}px`;
    button.style.left = `${CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 500}px`;
    button.style.color = "#fff";
    button.style.fontSize = "20px";
    button.style.cursor = "pointer";
    button.onclick = () => {
      const customLevelConfig = {
        imageSrc: LEVEL_ONE.imageSrc,
        Bubbles: GameManager.bubbleArray!.map((bubble) => ({
          centerX: bubble.centerX,
          centerY: bubble.centerY,
          radius: bubble.radius,
        })),
        wallsPosX: GameManager.walls.map((wall) => wall.posX),
        isWallPresent: true,
        level: 6,
      };
      this.removeUIElements();
      this.removeEventListeners();

      this.gamemanager = new GameManager(this.canvas, 1, customLevelConfig);
    };
    document.body.appendChild(button);
    this.playButton = button;
  }

  private removeUIElements() {
    document.body.removeChild(this.addBubbleButton!);
    this.addBubbleButton = undefined;

    document.body.removeChild(this.playButton!);
    this.playButton = undefined;

    document.body.removeChild(this.bubbleOptions!);
    this.bubbleOptions = undefined;

    document.body.removeChild(this.addWallButton!);
    this.addWallButton = undefined;
  }

  /**
   * The `draw` function clears the canvas, sets up the static level, draws bubbles, and extra walls.
   */
  private draw() {
    this.clearCanvas();
    this.setupStaticLevel();
    GameManager.bubbleArray?.forEach((bubble) => {
      bubble.draw(bubble.centerX, bubble.centerY);
    });
    GameManager.walls.forEach((wall) => {
      wall.drawExtraWalls();
    });
  }
}
