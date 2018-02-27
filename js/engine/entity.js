
let Entity = function(sprite, x, y, height, width) {
  this._parent = null;
  this._children = [];

  this.sprite = sprite;
  this.position = { x: x, y: y };
  this.dimensions = { height: height, width: width };
};

Entity.prototype.addChild = function(child) {
  let relativeCoords = this.getCoordsRelativeToThisOf(child);

  child.position = { x: relativeCoords.x, y: relativeCoords.y };
  this._children.push(child);
  child._parent = this;
};

Entity.prototype.removeChild = function(childToDelete) {
  this._children = this._children.filter(child => child !== childToDelete);
};

Entity.prototype.delete = function() {
  if (this._parent !== null) {
    this._parent.removeChild(this);
  }
  this._children.forEach(child => child.delete());
  this._parent = null;
  this._children = [];
};

Entity.prototype.setBounds = function(bounds) {
  if (typeof this.bounds !== 'undefined') {
    this.bounds.delete();
    this.bounds = undefined;
  }
  this.bounds = bounds;
  this.addChild(this.bounds);
};

Entity.prototype.find = function(callback) {
  let found = [];
  if (callback(this)) {
    found.push(this);
  } else {
    this._children.forEach((child) => {
      found = found.concat(child.find(callback));
    });
  }
  return found;
};

Entity.prototype.getScreenCoords = function() {
  let absoluteCoords = this.getAbsoluteCoords();
  return Engine.map.worldCoordsToScreenCoords(absoluteCoords.x, absoluteCoords.y);
};

Entity.prototype.getAbsoluteCoords = function() {
  if (this._parent === null) {
    return this.position;
  }
  let parentCoords = this._parent.getAbsoluteCoords();
  return {
    x: this.position.x + parentCoords.x,
    y: this.position.y + parentCoords.y
  };
};

Entity.prototype.getAbsoluteCoordsOf = function(x, y) {
  let currentCoords = { x: this.position.x, y: this.position.y };

  this.position.x = x;
  this.position.y = y;

  let result = this.getAbsoluteCoords();

  this.position = currentCoords;
  return result;
};

Entity.prototype.getCoordsRelativeToThisOf = function(entity) {
  let absoluteCoords = entity.getAbsoluteCoords();
  return this.getCoordsRelativeToParent(absoluteCoords.x, absoluteCoords.y);
};

Entity.prototype.getCoordsRelativeToParent = function(x, y) {
  let nodeRef = this;
  let nodes = [];
  while (nodeRef !== null) {
    nodes.push(nodeRef);
    nodeRef = nodeRef._parent
  }

  let result = { x: x, y: y };
  for (let i = nodes.length - 1; i >= 0; i--) {
    result = {
      x: result.x - nodes[i].position.x,
      y: result.y - nodes[i].position.y
    };
  }
  return result;
};

Entity.prototype.update = function(dt) {
  this.updateThis(dt);
  this._children.forEach((child) => {
    child.update(dt);
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
    let screenCoords = this.getScreenCoords();

    if (Engine.camera.onScreen(screenCoords.x, screenCoords.y, this.dimensions.height, this.dimensions.width)) {
      ctx.drawImage(Resources.get(this.sprite), screenCoords.x, screenCoords.y);
    }
  }
  if (typeof this.bounds !== 'undefined') {
    let screenCoords = this.bounds.getScreenCoords();
    ctx.strokeRect(screenCoords.x, screenCoords.y, this.bounds.dimensions.width, this.bounds.dimensions.height);
  }
};

// Some entities have different bounds
// e.g. the camera and the player
Entity.prototype.inBounds = function(x, y) {
  let absCoords = this.getAbsoluteCoordsOf(x, y);

  let absX = absCoords.x;
  let absY = absCoords.y;

  let height = this.dimensions.height;
  let width = this.dimensions.width;

  return Engine.map.pointInBounds(absX, absY) &&                   // top-left corner
         Engine.map.pointInBounds(absX + width, absY) &&           // top-right corner
         Engine.map.pointInBounds(absX + width, absY - height) &&  // bottom-right corner
         Engine.map.pointInBounds(absX, absY - height);            // bottom-left corner
};



let NullEntity = function(sprite = null, x = 0, y = 0, height = 0, width = 0) {
  Entity.call(this, sprite, x, y, height, width);
};

NullEntity.prototype = Object.create(Entity.prototype);
NullEntity.prototype.constructor = NullEntity;

NullEntity.prototype.renderThis = function() {};

NullEntity.prototype.updateThis = function(dt) {};
