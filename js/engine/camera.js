
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

  console.log("camera starting:",
    "top-left:", this.position.x, this.position.y,
    "top-right:", this.position.x + this.dimensions.width, this.position.y, 
    "bottom-right:", this.position.x + this.dimensions.width, this.position.y - this.dimensions.height,
    "bottom-left:", this.position.x, this.position.y - this.dimensions.height
  );
  console.log("camera new:",
    "top-left:", x, y,
    "top-right:", x + this.dimensions.width, y, 
    "bottom-right:", x + this.dimensions.width, y - this.dimensions.height,
    "bottom-left:", x, y - this.dimensions.height
  );
  console.log();

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
  let height = this.dimensions.height;
  let width = this.dimensions.width;

  return Engine.map.pointInBounds(x, y, false) &&                   // top-left corner
         Engine.map.pointInBounds(x + width, y, false) &&           // top-right corner
         Engine.map.pointInBounds(x + width, y - height, false) &&  // bottom-right corner
         Engine.map.pointInBounds(x, y - height, false);            // bottom-left corner
};
