/**
 * Mobile-First UI Manager
 * Handles all UI elements in the new mobile layout
 */
export class UIManager {
  private static instance: UIManager;
  private livesP1Element: HTMLElement;
  private livesP2Element: HTMLElement;
  private scoreP1Element: HTMLElement;
  private scoreP2Element: HTMLElement;
  private levelElement: HTMLElement;
  private timerElement: HTMLElement;

  private constructor() {
    // Get all UI elements
    this.livesP1Element = document.getElementById('lives-p1')!;
    this.livesP2Element = document.getElementById('lives-p2')!;
    this.scoreP1Element = document.getElementById('score-p1')!;
    this.scoreP2Element = document.getElementById('score-p2')!;
    this.levelElement = document.getElementById('level-display')!;
    this.timerElement = document.getElementById('timer-display')!;

    // Verify all elements exist
    if (!this.livesP1Element || !this.scoreP1Element || !this.levelElement || !this.timerElement) {
      console.error('UI Manager: Some UI elements not found in DOM');
    }
  }

  public static getInstance(): UIManager {
    if (!UIManager.instance) {
      UIManager.instance = new UIManager();
    }
    return UIManager.instance;
  }

  /**
   * Update player lives display
   */
  updateLives(playerIndex: number, lives: number): void {
    const element = playerIndex === 0 ? this.livesP1Element : this.livesP2Element;
    if (element) {
      element.textContent = `Lives: ${lives}`;
    }
  }

  /**
   * Update player score display
   */
  updateScore(playerIndex: number, score: number): void {
    const element = playerIndex === 0 ? this.scoreP1Element : this.scoreP2Element;
    if (element) {
      element.textContent = `Score: ${score}`;
    }
  }

  /**
   * Update level display
   */
  updateLevel(level: number): void {
    if (this.levelElement) {
      this.levelElement.textContent = `Level ${level}`;
    }
  }

  /**
   * Update timer display
   */
  updateTimer(timeRemaining: number): void {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    if (this.timerElement) {
      this.timerElement.textContent = timeString;
    }
  }

  /**
   * Show/hide player 2 UI elements for multiplayer
   */
  setMultiplayerMode(isMultiplayer: boolean): void {
    const display = isMultiplayer ? 'block' : 'none';
    
    if (this.livesP2Element) {
      this.livesP2Element.style.display = display;
    }
    if (this.scoreP2Element) {
      this.scoreP2Element.style.display = display;
    }
  }

  /**
   * Initialize UI with starting values
   */
  initialize(numberOfPlayers: number, initialLives: number, initialLevel: number): void {
    // Set multiplayer mode
    this.setMultiplayerMode(numberOfPlayers > 1);
    
    // Initialize player 1
    this.updateLives(0, initialLives);
    this.updateScore(0, 0);
    
    // Initialize player 2 if present
    if (numberOfPlayers > 1) {
      this.updateLives(1, initialLives);
      this.updateScore(1, 0);
    }
    
    // Initialize level and timer
    this.updateLevel(initialLevel);
    this.updateTimer(40000); // Default timer
    
    console.log('UI Manager initialized for', numberOfPlayers, 'player(s)');
  }

  /**
   * Reset all UI elements
   */
  reset(): void {
    this.updateLives(0, 3);
    this.updateLives(1, 3);
    this.updateScore(0, 0);
    this.updateScore(1, 0);
    this.updateLevel(1);
    this.updateTimer(40000);
  }

  /**
   * Get canvas container for proper sizing
   */
  getCanvasContainer(): HTMLElement | null {
    return document.querySelector('.game-canvas-container');
  }

  /**
   * Calculate optimal canvas size based on container
   */
  getOptimalCanvasSize(): { width: number; height: number } {
    const container = this.getCanvasContainer();
    if (!container) {
      return { width: 400, height: 300 };
    }

    const containerRect = container.getBoundingClientRect();
    const padding = 20; // Account for container padding
    
    const maxWidth = containerRect.width - padding;
    const maxHeight = containerRect.height - padding;
    
    // Maintain aspect ratio (4:3 or similar)
    const aspectRatio = 4 / 3;
    
    let width = maxWidth;
    let height = width / aspectRatio;
    
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
    
    return {
      width: Math.floor(width),
      height: Math.floor(height)
    };
  }
} 