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
    // Mobile: responsive sizing that scales with screen
    const padding = 20;
    const controlsSpace = 120; // Space reserved for mobile controls
    
    return {
      CANVAS_WIDTH: Math.min(availableWidth - padding, Math.max(350, availableWidth * 0.95)),
      CANVAS_HEIGHT: Math.min(availableHeight - controlsSpace, Math.max(400, (availableHeight - controlsSpace) * 0.9)),
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

// Make wall width responsive
const getWallWidth = () => {
  const mobile = isMobile();
  if (mobile) {
    return Math.min(40, window.innerWidth * 0.08); // Smaller walls on mobile
  } else {
    return 80; // Original desktop width
  }
};

export const WALL_WIDTH = getWallWidth();

export const POWER_UPS = {
  WIDTH : 30,
  HEIGHT : 30,
}

// Export mobile detection for use in other files
export const IS_MOBILE = isMobile();



