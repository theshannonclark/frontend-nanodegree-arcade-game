
/**
 * Ends the level when the player collides with it.
 * @constructor
 * @extends Entity
 * @param {string} sprite - Path to sprite image.
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 */
let EndTrigger = function(sprite, x, y, height, width) {
  Entity.call(this, sprite, x, y, height, width);
};

EndTrigger.prototype = Object.create(Entity.prototype);
EndTrigger.prototype.constructor = EndTrigger;

/**
 * Checks if this trigger is colliding with the player.
 * @returns {boolean} Whether there is a collision or not.
 */
EndTrigger.prototype.checkCollisions = function() {
  let player = App.game.player;
  if (typeof this.bounds !== 'undefined' && typeof player.bounds !== 'undefined') {
    if (this.bounds.intersects(player.bounds)) {
      // Should load the next level, but just reloads this one for now.
      player.die();
      return true;
    }
  }
  return false;
};
