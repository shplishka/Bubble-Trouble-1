import { PLAYER_DIMENSIONS } from "./constants";

/* The `Sprite` class in TypeScript represents a sprite object with properties for image, position, and
drawing on a canvas. */
export class Sprite {
  img: HTMLImageElement;
  posX: number;
  posY: number;
  ctx: CanvasRenderingContext2D;
  spriteWidth: number;
  spriteHeight: number;
  spriteX: number;
  spriteY: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    imgSource: string,
    spriteX: number,
    spriteY: number,
    posX: number,
    posY: number,
    customWidth?: number,
    customHeight?: number
  ) {
    this.img = new Image();
    this.img.src = imgSource;
    
    // Use custom dimensions if provided, otherwise use responsive player dimensions
    this.spriteWidth = customWidth || PLAYER_DIMENSIONS.PLAYER_WIDTH;
    this.spriteHeight = customHeight || PLAYER_DIMENSIONS.PLAYER_HEIGHT;
    
    this.ctx = ctx;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.posX = posX;
    this.posY = posY;
    this.drawSprite();
  }
  drawSprite() {
    // Use original sprite dimensions for source (sprite sheet coordinates)
    const originalSpriteWidth = 47.25;
    const originalSpriteHeight = 56;
    
    this.ctx.drawImage(
      this.img,
      this.spriteX,
      this.spriteY,
      originalSpriteWidth, // Source width from sprite sheet
      originalSpriteHeight, // Source height from sprite sheet
      this.posX,
      this.posY,
      this.spriteWidth, // Scaled width for display
      this.spriteHeight // Scaled height for display
    );
  }
}
