
let Entity = function(sprite, x, y, height, width) {
  this._parent = null;
  this._children = [];

  this.sprite = sprite;
  this.position = { x: x, y: y };
  this.dimensions = { height: height, width: width };
  this.step = {
    x: Engine.map.tileWidth,
    y: Engine.map.tileHeight
  };
};

Entity.prototype.addChild = function(child) {
  if (child instanceof Entity) {
    this._children.push(child);
    child._parent = this;
  }
};

Entity.prototype.find = function(callback) {
  let found = [];
  if (callback(this)) {
    found.push(this);
  } else {
    this._children.forEach((child) => {
      found.concat(child.find(callback));
    });
  }
  return found;
};

Entity.prototype.update = function(dt) {
  this.updateThis();
  this._children.forEach((child) => {
    child.update();
  });
};

Entity.prototype.updateThis = function(dt) {};

Entity.prototype.render = function() {
  this.renderThis();
  this._children.forEach((child) => {
    child.render();
  });
};

Entity.prototype.renderThis = function() {
  if (this.sprite !== null) {
    let screenCoords = Engine.map.worldCoordsToScreenCoords(this.position.x, this.position.y);

    if (Engine.camera.onScreen(screenCoords.x, screenCoords.y, this.dimensions.height, this.dimensions.width)) {
      ctx.drawImage(Resources.get(this.sprite), screenCoords.x, screenCoords.y);
    }
  }
};

// Some entities have different bounds
// e.g. the camera and the player
Entity.prototype.inBounds = function(x, y) {
  let height = this.dimensions.height;
  let width = this.dimensions.width;

  return Engine.map.pointInBounds(x, y) &&                   // top-left corner
         Engine.map.pointInBounds(x + width, y) &&           // top-right corner
         Engine.map.pointInBounds(x + width, y - height) &&  // bottom-right corner
         Engine.map.pointInBounds(x, y - height);            // bottom-left corner
};
