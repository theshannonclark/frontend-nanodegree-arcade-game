
/**
 * Represents an entity's hitbox.
 * @constructor
 * @extends Entity
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 */
let Rect = function(x, y, height, width) {
  Entity.call(this, null, x, y, height, width);
};

Rect.prototype = Object.create(Entity.prototype);
Rect.prototype.constructor = Rect;

/**
 * Checks if any corner of either rect crosses over into the other.
 * @param {Rect} that
 * @returns {boolean} Whether any points cross over or not.
 */
Rect.prototype.intersects = function(that) {
  return this._intersects(that) || that._intersects(this);
};

/**
 * Checks if any corner of this rect crosses over into the other rect.
 * @private
 * @param {Rect} that
 * @returns {boolean} Whether any points cross over or not.
 */
Rect.prototype._intersects = function(that) {
  let thisAbs = this.getAbsoluteCoords();

  // If any of the corners of this intersects with that, there is a collision
  return this.pointIntersects(thisAbs.x, thisAbs.y, that) ||                                                   // top-left corner
         this.pointIntersects(thisAbs.x + this.dimensions.width, thisAbs.y, that) ||                           // top-right corner
         this.pointIntersects(thisAbs.x + this.dimensions.width, thisAbs.y - this.dimensions.height, that) ||  // bottom-right corner
         this.pointIntersects(thisAbs.x, thisAbs.y - this.dimensions.height, that);                            // bottom-left corner
};

/**
 * Checks if this corner of this rect crosses over into the other rect.
 * @param {Rect} that
 * @returns {boolean} Whether any points cross over or not.
 */
Rect.prototype.pointIntersects = function(x, y, that) {
  let thatAbs = that.getAbsoluteCoords();

  return (x >= thatAbs.x && y <= thatAbs.y) &&                                                   // top-left corner
         (x <= thatAbs.x + that.dimensions.width && y <= thatAbs.y) &&                           // top-right corner
         (x <= thatAbs.x + that.dimensions.width && y >= thatAbs.y - that.dimensions.height) &&  // bottom-right corner
         (x >= thatAbs.x && y >= thatAbs.y - that.dimensions.height);                            // bottom-left corner
};
