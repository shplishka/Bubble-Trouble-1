import { IS_MOBILE } from "./constants";
import { Movement } from "./utils/enum";

interface MobileControlsCallbacks {
  onMoveStart: (direction: Movement) => void;
  onMoveEnd: () => void;
  onShoot: () => void;
}

export class MobileControls {
  private leftBtn: HTMLElement;
  private rightBtn: HTMLElement;
  private shootBtn: HTMLElement;
  private callbacks: MobileControlsCallbacks;
  private activeTouch: { [key: string]: boolean } = {};

  constructor(callbacks: MobileControlsCallbacks) {
    this.callbacks = callbacks;
    
    // Get control elements
    this.leftBtn = document.getElementById('move-left')!;
    this.rightBtn = document.getElementById('move-right')!;
    this.shootBtn = document.getElementById('shoot-btn')!;

    // Check if elements exist
    if (!this.leftBtn || !this.rightBtn || !this.shootBtn) {
      console.warn('Mobile control elements not found', {
        leftBtn: !!this.leftBtn,
        rightBtn: !!this.rightBtn,
        shootBtn: !!this.shootBtn
      });
      return;
    }

    // Initialize mobile controls - they're always visible in the new layout
    this.initializeMobileControls();
  }

  private initializeMobileControls() {
    // Controls are now always visible in the new mobile-first layout
    console.log('Mobile controls initialized with new mobile-first design');

    // Left movement button
    this.addTouchEvents(this.leftBtn, 'left', () => {
      this.callbacks.onMoveStart(Movement.LEFT);
    });

    // Right movement button  
    this.addTouchEvents(this.rightBtn, 'right', () => {
      this.callbacks.onMoveStart(Movement.RIGHT);
    });

    // Shoot button
    this.addTouchEvents(this.shootBtn, 'shoot', () => {
      this.callbacks.onShoot();
    });

    // Handle movement end when no direction buttons are pressed
    this.leftBtn.addEventListener('touchend', () => this.handleMoveEnd('left'));
    this.leftBtn.addEventListener('touchcancel', () => this.handleMoveEnd('left'));
    this.rightBtn.addEventListener('touchend', () => this.handleMoveEnd('right'));
    this.rightBtn.addEventListener('touchcancel', () => this.handleMoveEnd('right'));

    // Also add mouse events for desktop testing
    this.addMouseEvents();
  }

  private addTouchEvents(element: HTMLElement, key: string, callback: () => void) {
    // Prevent default touch behaviors
    element.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.activeTouch[key] = true;
      element.classList.add('active');
      callback();
    }, { passive: false });

    element.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.activeTouch[key] = false;
      element.classList.remove('active');
    });

    element.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      this.activeTouch[key] = false;
      element.classList.remove('active');
    });

    // Prevent context menu on long press
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  private addMouseEvents() {
    // Left button
    this.leftBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.activeTouch['left'] = true;
      this.leftBtn.classList.add('active');
      this.callbacks.onMoveStart(Movement.LEFT);
    });

    this.leftBtn.addEventListener('mouseup', () => {
      this.activeTouch['left'] = false;
      this.leftBtn.classList.remove('active');
      this.handleMoveEnd('left');
    });

    // Right button
    this.rightBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.activeTouch['right'] = true;
      this.rightBtn.classList.add('active');
      this.callbacks.onMoveStart(Movement.RIGHT);
    });

    this.rightBtn.addEventListener('mouseup', () => {
      this.activeTouch['right'] = false;
      this.rightBtn.classList.remove('active');
      this.handleMoveEnd('right');
    });

    // Shoot button
    this.shootBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.shootBtn.classList.add('active');
      this.callbacks.onShoot();
    });

    this.shootBtn.addEventListener('mouseup', () => {
      this.shootBtn.classList.remove('active');
    });

    // Handle mouse leave events
    document.addEventListener('mouseup', () => {
      if (this.activeTouch['left']) {
        this.activeTouch['left'] = false;
        this.leftBtn.classList.remove('active');
        this.handleMoveEnd('left');
      }
      if (this.activeTouch['right']) {
        this.activeTouch['right'] = false;
        this.rightBtn.classList.remove('active');
        this.handleMoveEnd('right');
      }
    });
  }

  private handleMoveEnd(_direction: string) {
    // Only stop movement if no movement buttons are active
    if (!this.activeTouch['left'] && !this.activeTouch['right']) {
      this.callbacks.onMoveEnd();
    }
  }

  // Public method to check if mobile controls are active
  public isMobileControlsActive(): boolean {
    return IS_MOBILE && (this.activeTouch['left'] || this.activeTouch['right']);
  }

  // Public method to force show mobile controls (for testing)
  public showControls() {
    const mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
      mobileControls.style.display = 'block';
    }
  }

  // Public method to hide mobile controls  
  public hideControls() {
    const mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
      mobileControls.style.display = 'none';
    }
  }
} 