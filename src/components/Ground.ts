import { GROUND_X, GROUND_HEIGHT } from "../constants";
import { CANVAS_DIMENSIONS } from "../constants";
import { WALL_WIDTH } from "../constants";
import groundImage from "/wall.jpg";

/* The GroundWalls class in TypeScript represents the ground walls in a canvas game, including drawing
the walls and displaying player information. */
export class GroundWalls {
  posX: number;
  posY: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  groundImg: HTMLImageElement;
  level: number;
  constructor(ctx: CanvasRenderingContext2D, level: number) {
    this.ctx = ctx;
    this.posX = GROUND_X;
    this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
    this.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
    this.height = GROUND_HEIGHT;

    this.groundImg = new Image();
    this.groundImg.src = groundImage;

    this.level = level;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.drawImage(
      this.groundImg,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.closePath();
    
    // Ground labels are no longer drawn here - UI is handled by UIManager in the top bar
  }

  drawTexts(text: string, posX: number, posY: number) {
    this.ctx.font = "24px Luckiest Guy";
    this.ctx.fillStyle = "red";
    const TEXT = text;
    const textMetrics = this.ctx.measureText(TEXT);
    const textWidth = textMetrics.width;
    const textHeight = parseInt(this.ctx.font, 7);
    const PADDING = 7;

    const rectX = posX - PADDING;
    const rectY = posY - textHeight - PADDING;
    const rectWidth = textWidth + 2 * PADDING;
    const rectHeight = textHeight + 2 * PADDING;

    this.ctx.fillStyle = "#D3D3D3";
    this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    this.ctx.strokeStyle = "grey";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    this.ctx.fillStyle = "red";
    this.ctx.fillText(TEXT, posX, posY);
  }

  drawMobileTexts(text: string, posX: number, posY: number) {
    this.ctx.font = "18px Luckiest Guy";
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.textAlign = "center";
    
    this.ctx.strokeText(text, posX, posY);
    this.ctx.fillText(text, posX, posY);
    
    this.ctx.textAlign = "start"; // Reset alignment
  }
}
