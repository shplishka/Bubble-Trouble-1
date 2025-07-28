import { CANVAS_DIMENSIONS, WALL_WIDTH } from "../constants";

/* The Score class in TypeScript manages and displays scores on a canvas. */
export class Score {
  ctx: CanvasRenderingContext2D;
  score: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.score = 0;
  }

  draw(score: number = 0, index: number) {
    const isMobile = window.innerWidth <= 768;
    
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.font = isMobile ? "16px Arial" : "20px Arial";
    
    // Position scores at the top for mobile, bottom for desktop
    const yPosition = isMobile ? 25 : CANVAS_DIMENSIONS.CANVAS_HEIGHT - 10;
    
    if (index == 0) {
      const xPosition = isMobile ? 20 : WALL_WIDTH + 150;
      this.ctx.strokeText(`Score: ${score}`, xPosition, yPosition);
      this.ctx.fillText(`Score: ${score}`, xPosition, yPosition);
    }
    if (index == 1) {
      const xPosition = isMobile ? CANVAS_DIMENSIONS.CANVAS_WIDTH - 120 : WALL_WIDTH + 650;
      this.ctx.strokeText(`Score: ${score}`, xPosition, yPosition);
      this.ctx.fillText(`Score: ${score}`, xPosition, yPosition);
    }
  }
}
