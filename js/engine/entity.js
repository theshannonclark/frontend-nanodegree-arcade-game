/*
 * Using a scene graph to store entities in the game.
 *
 * Every node in the graph is an Entity.
 *
 * Each entity is positioned relative to its parent, and its coordinates can be converted
 * into absolute coordinates, which are in world coordinates.
 *
 * I was going to have moving platforms, and using a scene graph would have made it easier
 * to move the player with the platform, but I've run out of time.
 */

/**
 * Represents a generic entity in the scene graph.
 * @constructor
 * @param {string} sprite - Path to sprite image.
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 */
let Entity = function(sprite, x, y, height, width) {
  this._parent = null;
  this._children = [];

  this.sprite = sprite;
  this.position = { x: x, y: y };
  this.dimensions = { height: height, width: width };
};

/**
 * Adds a child node below this node in the scene graph.
 * @param {Entity} child - The entity to add as a child.
 */
Entity.prototype.addChild = function(child) {
  let relativeCoords = this.getCoordsRelativeToThisOf(child);

  child.position = { x: relativeCoords.x, y: relativeCoords.y };
  this._children.push(child);
  child._parent = this;
};

/**
 * Removes a child node below this node in the scene graph.
 * @param {Entity} childToDelete - The entity to remove.
 */
Entity.prototype.removeChild = function(childToDelete) {
  this._children = this._children.filter(child => child !== childToDelete);
};

/**
 * Deletes this node and all its descendant nodes from the scene graph.
 */
Entity.prototype.delete = function() {
  if (this._parent !== null) {
    this._parent.removeChild(this);
  }
  this._children.forEach(child => child.delete());
  this._parent = null;
  this._children = [];
};

/**
 * Sets the hitbox for this entity.
 * @param {Rect} bounds
 */
Entity.prototype.setBounds = function(bounds) {
  if (typeof this.bounds !== 'undefined') {
    this.bounds.delete();
    this.bounds = undefined;
  }
  this.bounds = bounds;
  this.addChild(this.bounds);
};

/**
 * Finds all descendant nodes that pass the test implemented in callback.
 * @param {findCallback} callback - Returns true if the right node was found.
 * @returns {Entity[]} All found nodes.
 */
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

/**
 * Gets the entity's position in screen coordinates.
 * @returns {object}
 */
Entity.prototype.getScreenCoords = function() {
  let absoluteCoords = this.getAbsoluteCoords();
  return Engine.camera.worldCoordsToScreenCoords(absoluteCoords.x, absoluteCoords.y);
};

/**
 * Converts from relative to absolute coordinates.
 * @returns {object}
 */
Entity.prototype.getAbsoluteCoords = function() {
  // Add this entity's position to all of its ancestors' positions
  if (this._parent === null) {
    return this.position;
  }
  let parentCoords = this._parent.getAbsoluteCoords();
  return {
    x: this.position.x + parentCoords.x,
    y: this.position.y + parentCoords.y
  };
};

/**
 * Used to get the absolute coordinates of a point before moving an entity to that point.
 * @returns {object}
 */
Entity.prototype.getAbsoluteCoordsOf = function(x, y) {
  // Update the position temporarily, calculate absolute coordinates, then change it back
  let currentCoords = { x: this.position.x, y: this.position.y };

  this.position.x = x;
  this.position.y = y;

  let result = this.getAbsoluteCoords();

  this.position = currentCoords;
  return result;
};

/**
 * Used to get the position of one entity relative to another.
 * @returns {object}
 */
Entity.prototype.getCoordsRelativeToThisOf = function(entity) {
  // First get absolute coordinates in case the entity is already positioned
  // relative to a different node.
  let absoluteCoords = entity.getAbsoluteCoords();
  return this.getCoordsRelativeToParent(absoluteCoords.x, absoluteCoords.y);
};

/**
 * Takes absolute coordinates and makes them relative to this entity.
 * @returns {object}
 */
Entity.prototype.getCoordsRelativeToParent = function(x, y) {
  // Subtract these coordinates from all ancestors' coordinates
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

/**
 * Updates this node and all descendant nodes.
 * @param {number} dt - Seconds that have passed since the last update.
 */
Entity.prototype.update = function(dt) {
  this.updateThis(dt);
  this._children.forEach((child) => {
    child.update(dt);
  });
};

/**
 * Override this in subclasses that need to be updated.
 * @param {number} dt - Seconds that have passed since the last update.
 */
Entity.prototype.updateThis = function(dt) {};

/**
 * Renders this node and all descendant nodes.
 */
Entity.prototype.render = function() {
  this.renderThis();
  this._children.forEach((child) => {
    child.render();
  });
};

/**
 * Override this in subclasses that need to be rendered.
 */
Entity.prototype.renderThis = function() {
  if (this.sprite !== null) {
    let screenCoords = this.getScreenCoords();

    // Only render if all or part of the entity is on screen
    if (Engine.camera.onScreen(screenCoords.x, screenCoords.y, this.dimensions.height, this.dimensions.width)) {
      ctx.drawImage(Resources.get(this.sprite), screenCoords.x, screenCoords.y);
    }
  }
};

/**
 * Checks if the provided coordinates are within the map's bounds {@see TiledMap#pointInBounds}.
 * @param {number} x
 * @param {number} y
 * @returns {boolean} Whether the point is in bounds or not.
 */
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




/**
 * Represents an entity that's just used to contain other entities.
 * @constructor
 * @param {string} [sprite=null] - Path to sprite image.
 * @param {number} [startX=0]
 * @param {number} [startY=0]
 * @param {number} [height=0]
 * @param {number} [width=0]
 */
let NullEntity = function(sprite = null, x = 0, y = 0, height = 0, width = 0) {
  Entity.call(this, sprite, x, y, height, width);
};

NullEntity.prototype = Object.create(Entity.prototype);
NullEntity.prototype.constructor = NullEntity;

NullEntity.prototype.renderThis = function() {};

NullEntity.prototype.updateThis = function(dt) {};
