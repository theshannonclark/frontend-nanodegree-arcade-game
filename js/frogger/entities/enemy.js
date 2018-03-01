
/**
 * Represents an enemy.
 * @constructor
 * @extends Entity
 * @param {string} sprite - Path to sprite image.
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 * @param {number} step - The distance to move on each update.
 */
let Enemy = function(sprite, x, y, height, width, step) {
  Entity.call(this, sprite, x, y, height, width);

  this.step = step;
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Called on each iteration of the game loop from {@link Entity#update}.
 * @override
 * @param {number} dt - Number of seconds that have passed since this was last called.
 */
Enemy.prototype.updateThis = function(dt) {
  if (typeof App.game.player !== 'undefined' && App.game.player.freeze) {
    return;
  }

  let newX = this.position.x + (this.step.x * dt);
  let newY = this.position.y + (this.step.y * dt)

  if (this.inBounds(newX, this.position.y)) {
  	this.position.x = newX;
  } else {
  	this.delete();
  }
};

/**
 * Checks if this enemy is colliding with the player.
 * @returns {boolean} Whether there is a collision or not.
 */
Enemy.prototype.checkCollisions = function() {
  let player = App.game.player;
  if (typeof this.bounds !== 'undefined' && typeof player.bounds !== 'undefined') {
    if (this.bounds.intersects(player.bounds)) {
      player.die();
      return true;
    }
  }
  return false;
};
