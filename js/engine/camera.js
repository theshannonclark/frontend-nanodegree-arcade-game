
let Camera = function(x, y, height, width, maxY) {
  Entity.call(this, null, x, y, height, width);

  // Don't render past this point (in screen coordinates)
  this.maxY = maxY;
};

Camera.prototype = Object.create(Entity.prototype);
Camera.prototype.constructor = Camera;

Camera.prototype.scrollUp = function() {
  return this._scroll(this.position.x, this.position.y + Engine.map.tileHeight);
};

Camera.prototype.scrollDown = function() {
  return this._scroll(this.position.x, this.position.y - Engine.map.tileHeight);
};

Camera.prototype._scroll = function(x, y) {
  let initX = this.position.x;
  let initY = this.position.y;

  if (this.inBounds(x, y)) {
    this.position.x = x;
    this.position.y = y;
  }

  return (this.position.x !== initX) ||
         (this.position.y !== initY);
};

// Assuming x and y are in screen coordinates
Camera.prototype.onScreen = function(x, y, height, width) {
  return this.pointOnScreen(x, y) ||                   // top-left corner
         this.pointOnScreen(x + width, y) ||           // top-right corner
         this.pointOnScreen(x + width, y + height) ||  // bottom-right corner
         this.pointOnScreen(x, y + height);            // bottom-left corner
};

Camera.prototype.pointOnScreen = function(x, y) {
  return (x >= 0 && x <= this.dimensions.width) &&
         (y >= 0 && y <= this.maxY);
};

Camera.prototype.inBounds = function(x, y) {
  let absCoords = this.getAbsoluteCoordsOf(x, y);

  let absX = absCoords.x;
  let absY = absCoords.y;

  let height = this.dimensions.height;
  let width = this.dimensions.width;

  return Engine.map.pointInBounds(absX, absY, false) &&                   // top-left corner
         Engine.map.pointInBounds(absX + width, absY, false) &&           // top-right corner
         Engine.map.pointInBounds(absX + width, absY - height, false) &&  // bottom-right corner
         Engine.map.pointInBounds(absX, absY - height, false);            // bottom-left corner
};
