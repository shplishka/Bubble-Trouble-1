import { StartScreen } from "./StartScreen";
import { UIManager } from "./UIManager";
import { updateCanvasDimensions } from "./constants";
import "./style/style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

// Initialize mobile-first layout
const initializeGame = () => {
  const uiManager = UIManager.getInstance();
  
  // Get optimal canvas size from UI manager
  const { width, height } = uiManager.getOptimalCanvasSize();
  
  // Update canvas dimensions
  canvas.width = width;
  canvas.height = height;
  updateCanvasDimensions(width, height);
  
  // Remove old border style, styling is now handled by CSS
  canvas.style.border = 'none';
  
  console.log(`Canvas initialized: ${width}x${height}`);
  
  // Start the game
  new StartScreen(canvas);
};

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Add a small delay to ensure CSS layout is complete
  setTimeout(initializeGame, 100);
});

// Handle window resize for responsive canvas
let resizeTimeout: NodeJS.Timeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const uiManager = UIManager.getInstance();
    const { width, height } = uiManager.getOptimalCanvasSize();
    
    canvas.width = width;
    canvas.height = height;
    updateCanvasDimensions(width, height);
    
    console.log(`Canvas resized: ${width}x${height}`);
  }, 250);
});
