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
    this.parentPosition = this.parentElement.offsetTop;

    this.scrollableRange = this.targetFullWidth - this.targetInnerWidth;
    this.windowScrollPosition = window.pageYOffset;
    this.isActive = false;
    this.mouseWheelHandler = this.handleMouseWheel.bind(this);

    this.setScrollEventListener();
  }

  setScrollEventListener() {
    document.addEventListener('scroll', function(e) {
      let elementIsAtTopOfScreen = (window.pageYOffset >= this.parentPosition);
      let withinAcceptablePixelRange = (window.pageYOffset - this.parentPosition) < 50;

      if (elementIsAtTopOfScreen && withinAcceptablePixelRange && !this.isActive) {
        this.isActive = true;
        this.targetElement.scrollLeft += 1;
        window.addEventListener('wheel', this.mouseWheelHandler);
      }
    }.bind(this));
  }

  handleMouseWheel(e) {
    let isAtBeginningOfRange = this.targetElement.scrollLeft === 0;
    let isAtEndOfRange = this.targetElement.scrollLeft >= this.scrollableRange;
    let scrollSpeed = event.deltaY;
    this.targetElement.scrollLeft += scrollSpeed;
    console.log(this.isActive, isAtBeginningOfRange, isAtEndOfRange);
    window.scroll({ top: this.parentPosition + 1 });
    if (this.isActive && (isAtBeginningOfRange || isAtEndOfRange)) {
      this.isActive = false;
      console.log('removing, continue scrolling...')
      window.removeEventListener('wheel', this.mouseWheelHandler);
    }
    e.preventDefault();
  }
}
