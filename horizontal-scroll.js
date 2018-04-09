/*!--
 * Horizontal Scroll
 * Copyright (c) 2018 Johnny Hu
 * License: MIT
 */

class HScroll {
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

    this.setScrollDetection();
  }

  setScrollDetection() {
    let _this = this;
    document.addEventListener('scroll', function(e) {
      let elementOnScreen = window.pageYOffset >= _this.parentPosition;

      if (elementOnScreen && !_this.isActive) {
        _this.isActive = true;

        console.log('horizontal scroll activated');
        _this.enableHorizontalScrolling();
      }
    });
  }

  enableHorizontalScrolling() {
    let _this = this;
    let element = _this.targetElement;

    element.addEventListener('wheel', function(e) {
      let scrollSpeed = event.deltaY;
      element.scrollLeft += scrollSpeed;

      console.log(element.scrollLeft, scrollSpeed);
      e.preventDefault();
    });
  }
}

export { HScroll };
