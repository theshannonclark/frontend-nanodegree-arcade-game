
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
  let thatAbs = that.getAbsoluteCoords();
};
