
/**
 * Represents the player.
 * @constructor
 * @extends Entity
 * @param {string} sprite - Path to sprite image.
 * @param {number} startX
 * @param {number} startY
 * @param {number} height
 * @param {number} width
 */
var Player = function(sprite, startX, startY, height, width) {
  Entity.call(this, sprite, startX, startY, height, width);

  /** Stops everything from moving when player dies or wins level. */
  this.freeze = false;
  this.nextMove = '';
  this.allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  /** The distance to move on player input. */
  this.step = {
    x: Engine.map.tileWidth,
    y: Engine.map.tileHeight
  };

  Engine.setOnInputHandler(this.handleInput.bind(this));
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * Called on each iteration of the game loop from {@link Entity#update}.
 * @override
 * @param {number} dt - Number of seconds that have passed since this was last called.
 */
Player.prototype.updateThis = function(dt) {
  if (!this.freeze && this.nextMove !== '') {
    let scrolled = false;

    // Scroll the map when the player is at the top or the bottom of the screen
    let screenCoords = this.getScreenCoords();
    if (this.nextMove === 'up' && screenCoords.y <= Math.floor(Engine.canvas.height * 0.25)) {
      scrolled = Engine.camera.scrollUp();
    } else if (this.nextMove === 'down' && screenCoords.y >= Math.floor(Engine.canvas.height * 0.50)) {
      scrolled = Engine.camera.scrollDown();
    }

    this.move(this.nextMove);
    this.nextMove = '';
  }
};

/**
 * Called when the player collides with an enemy.
 */
Player.prototype.die = function() {
  this.freeze = true;
  window.setTimeout(App.game.restartLevel.bind(App.game), 200);
};

/**
 * Updates the player's position on player input.
 * @param {string} move - Movement direction.
 */
Player.prototype.move = function(move) {
  let newX = this.position.x;
  let newY = this.position.y;

  switch(move) {
    case 'up':
      newY = this.position.y + this.step.y;
      break;
    case 'right':
      newX = this.position.x + this.step.x;
      break;
    case 'down':
      newY = this.position.y - this.step.y;
      break;
    case 'left':
      newX = this.position.x - this.step.x;
      break;
  }
  this._move(newX, newY);
};

/**
 * Moves the player to new coordinates.
 * @private
 * @param {number} x
 * @param {number} y
 */
Player.prototype._move = function(x, y) {
  if (this.inBounds(x, y)) {
    this.position.x = x;
    this.position.y = y;
  }
};

/**
 * Moves the player when the arrow keys are pressed.
 * @param {KeyboardEvent} event - the generated event object.
 */
Player.prototype.handleInput = function(event) {
  var input = this.allowedKeys[event.keyCode];
  if (typeof input !== 'undefined') {
    this.nextMove = input;
  }
};

/**
 * Checks if the provided coordinates are within the map's bounds {@see TiledMap#pointInBounds}.
 * @override
 * @param {number} x
 * @param {number} y
 * @returns {boolean} Whether the point is in bounds or not.
 */
Player.prototype.inBounds = function(x, y) {
  let absCoords = this.getAbsoluteCoordsOf(x, y);

  let absX = absCoords.x;
  let absY = absCoords.y;

  let height = this.dimensions.height;
  let width = this.dimensions.width;

  let yOffset = 42;

  return Engine.map.pointInBounds(absX, absY - yOffset) &&          // top-left corner
         Engine.map.pointInBounds(absX + width, absY - yOffset) &&  // top-right corner
         Engine.map.pointInBounds(absX + width, absY - height) &&   // bottom-right corner
         Engine.map.pointInBounds(absX, absY - height);             // bottom-left corner
};
