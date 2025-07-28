import { CANVAS_DIMENSIONS, WALL_WIDTH } from "./constants";

/* The `Lives` class in TypeScript is responsible for drawing the remaining lives of players on a
canvas based on the player index. */
export class Lives {
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  draw(lives: number, playerIndex: number) {
    const isMobile = window.innerWidth <= 768;
    
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.font = isMobile ? "16px Arial" : "20px Arial";
    
    // Position lives at the top for mobile, bottom for desktop
    const yPosition = isMobile ? 50 : CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50;
    
    //draw for Player 2
    if (playerIndex == 1) {
      const xPosition = isMobile ? CANVAS_DIMENSIONS.CANVAS_WIDTH - 120 : CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH - 100;
      this.ctx.strokeText(`Lives: ${lives}`, xPosition, yPosition);
      this.ctx.fillText(`Lives: ${lives}`, xPosition, yPosition);
    }

    //draw for Player 1
    if (playerIndex == 0) {
      const xPosition = isMobile ? 20 : WALL_WIDTH;
      this.ctx.strokeText(`Lives: ${lives}`, xPosition, yPosition);
      this.ctx.fillText(`Lives: ${lives}`, xPosition, yPosition);
    }
  }
}
