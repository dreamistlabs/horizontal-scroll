/*!--
 * Sideways
 * Copyright (c) 2018 Johnny Hu, Dreamist Labs
 * License: MIT
 */

export class Sideways {
  constructor(opts) {
    this.opts = opts || null;

    this.targetName = this.opts.target;
    this.targetElement = document.querySelector(this.targetName);
    this.targetFullWidth = this.targetElement.scrollWidth;
    this.targetInnerWidth = this.targetElement.offsetWidth;
    this.parentElement = this.targetElement.parentElement;
    this.parentPosition = this.parentElement.getBoundingClientRect().y;

    this.scrollableRange = this.targetFullWidth - this.targetInnerWidth;
    this.windowScrollPosition = window.pageYOffset;
    this.isActive = false;
    this.isAtBeginningOfRange = true;
    this.isAtEndOfRange = !this.isAtBeginningOfRange;
    this.mouseWheelHandler = this.handleMouseWheel.bind(this);

    // console.log(this);
    this.setScrollDetection();
  }

  setScrollDetection() {
    document.addEventListener('scroll', function() {
      let elementOnScreen = window.pageYOffset >= this.parentPosition;

      if (elementOnScreen && !this.isActive) {
        this.isActive = true;

        if (this.isAtBeginningOfRange) {
          this.targetElement.scrollLeft = 1;
          console.log('coming from the top of the page');
        } else if (this.isAtEndOfRange ) {
          console.log('coming from the bottom of the page');
        }
        window.addEventListener('wheel', this.mouseWheelHandler);
      }
    }.bind(this));
  }

  handleMouseWheel(e) {
    let scrollSpeed = event.deltaY;
    this.targetElement.scrollLeft += scrollSpeed;
    console.log(this.targetElement.scrollLeft, scrollSpeed);
    if (this.targetElement.scrollLeft >= this.scrollableRange && this.isActive) {
      this.isAtEndOfRange = true;
      this.isActive = false;
      console.log('removing, continue scrolling down...')
      window.removeEventListener('wheel', this.mouseWheelHandler);
    } else if (this.targetElement.scrollLeft === 0 && this.isActive) {
      this.isAtBeginningOfRange = true;
      this.isActive = false;
      console.log('removing, continue scrolling up...')
      window.removeEventListener('wheel', this.mouseWheelHandler);
    }

    console.log(this.isAtBeginningOfRange, this.isAtEndOfRange);
    e.preventDefault();
  }
}
