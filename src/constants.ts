// Function to determine if device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth <= 768;
};

// Calculate responsive dimensions
const getCanvasDimensions = () => {
  const mobile = isMobile();
  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight;
  
  if (mobile) {
    // Mobile: use most of the screen, leaving space for controls
    return {
      CANVAS_WIDTH: Math.min(availableWidth - 20, 500), // Increased from 400 to 500
      CANVAS_HEIGHT: Math.min(availableHeight - 180, 700), // Increased from 600 to 700, more space for controls
    };
  } else {
    // Desktop: use the original logic
    return {
      CANVAS_WIDTH: window.innerWidth - 300,
      CANVAS_HEIGHT: window.innerHeight - 10,
    };
  }
};

export const CANVAS_DIMENSIONS = getCanvasDimensions();

// Scale player size based on device
const getPlayerDimensions = () => {
  const mobile = isMobile();
  if (mobile) {
    return {
      PLAYER_WIDTH: 40, // Slightly larger on mobile
      PLAYER_HEIGHT: 70,
    };
  } else {
    return {
      PLAYER_WIDTH: 31,
      PLAYER_HEIGHT: 55,
    };
  }
};

export const PLAYER_DIMENSIONS = getPlayerDimensions();

export const BUBBLE_DY = 0.5;
export const BUBBLE_DX = 1.5;
export const BUBBLE_CENTER_X = 50;
export const BUBBLE_CENTER_Y = 150;
export const GROUND_HEIGHT = 100;
export const GROUND_X = 0;
export const MAX_BUBBLE_RADIUS = 60;
export const MIN_BUBBLE_RADIUS = 10;
export const DEFAULT_BUBBLE_MAX_POSX = 150;
export const GRAVITY = 0.1;
export const WALL_WIDTH = 80;

export const POWER_UPS = {
  WIDTH : 30,
  HEIGHT : 30,
}

// Export mobile detection for use in other files
export const IS_MOBILE = isMobile();



