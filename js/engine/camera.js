/*
 * The reason a camera class is needed is because I wanted to be able to "scoll" the screen.
 *
 * If things were positioned relative to the canvas, I would need to update the position of
 * everything on the screen every time the game scrolled. Having a virtual coordinate system to
 * position things in the "world", and converting to screen (canvas) coordinates on render meant
 * that the positions didn't need to be updated. 
 *
 * The camera represents the section of the "world" in world coordinates that needs to be rendered.
 */

/**
 * Represents the section of the world that gets rendered.
 * @constructor
 * @extends Entity
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 * @param {number} maxY
 */
let Camera = function(x, y, height, width, maxY) {
  Entity.call(this, null, x, y, height, width);

  /** Don't render past this point (in screen coordinates) */
  this.maxY = maxY;
};

Camera.prototype = Object.create(Entity.prototype);
Camera.prototype.constructor = Camera;

/**
 * Scrolls the viewport up.
 * @returns {boolean} Whether the scroll was successful or not.
 */
Camera.prototype.scrollUp = function() {
  return this._scroll(this.position.x, this.position.y + Engine.map.tileHeight);
};

/**
 * Scrolls the viewport down.
 * @returns {boolean} Whether the scroll was successful or not.
 */
Camera.prototype.scrollDown = function() {
  return this._scroll(this.position.x, this.position.y - Engine.map.tileHeight);
};

/**
 * Scrolls the viewport to given coordinates.
 * @private
 * @returns {boolean} Whether the scroll was successful or not.
 */
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

/**
 * Converts between coordinate systems when rendering {@see TiledMap}.
 * @param {number} x
 * @param {number} y
 * @returns {object} Screen coordinates.
 */
Camera.prototype.worldCoordsToScreenCoords = function(x, y) {
  return {
    x: this.position.x + x,
    y: this.position.y - y
  };
};

/**
 * Checks if the given coordinates are within the camera's bounds.
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 * @returns {boolean} Whether or not the coordinates are on screen.
 */
Camera.prototype.onScreen = function(x, y, height, width) {
  // Assuming x and y are in screen coordinates
  return this.pointOnScreen(x, y) ||                   // top-left corner
         this.pointOnScreen(x + width, y) ||           // top-right corner
         this.pointOnScreen(x + width, y + height) ||  // bottom-right corner
         this.pointOnScreen(x, y + height);            // bottom-left corner
};

/**
 * Checks if an individual point is within the camera's bounds.
 * @param {number} x
 * @param {number} y
 * @returns {boolean} Whether or not the point is on screen.
 */
Camera.prototype.pointOnScreen = function(x, y) {
  return (x >= 0 && x <= this.dimensions.width) &&
         (y >= 0 && y <= this.maxY);
};

/**
 * Checks if the provided coordinates are within the map's bounds {@see TiledMap#pointInBounds}.
 * @override
 * @param {number} x
 * @param {number} y
 * @returns {boolean} Whether the point is in bounds or not.
 */
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
