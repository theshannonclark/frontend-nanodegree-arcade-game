
let Rect = function(x, y, height, width) {
  Entity.call(this, null, x, y, height, width);
};

Rect.prototype = Object.create(Entity.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.intersects = function(that) {
  return this._intersects(that) || that._intersects(this);
};

Rect.prototype._intersects = function(that) {
  let thisAbs = this.getAbsoluteCoords();

  // If any of the corners of this intersects with that, there is a collision
  return this.pointIntersects(thisAbs.x, thisAbs.y, that) ||                                                   // top-left corner
         this.pointIntersects(thisAbs.x + this.dimensions.width, thisAbs.y, that) ||                           // top-right corner
         this.pointIntersects(thisAbs.x + this.dimensions.width, thisAbs.y - this.dimensions.height, that) ||  // bottom-right corner
         this.pointIntersects(thisAbs.x, thisAbs.y - this.dimensions.height, that);                            // bottom-left corner
};

Rect.prototype.pointIntersects = function(x, y, that) {
  let thatAbs = that.getAbsoluteCoords();

  return (x >= thatAbs.x && y <= thatAbs.y) &&                                                   // top-left corner
         (x <= thatAbs.x + that.dimensions.width && y <= thatAbs.y) &&                           // top-right corner
         (x <= thatAbs.x + that.dimensions.width && y >= thatAbs.y - that.dimensions.height) &&  // bottom-right corner
         (x >= thatAbs.x && y >= thatAbs.y - that.dimensions.height);                            // bottom-left corner
};
