
let EndTrigger = function(sprite, x, y, height, width) {
  Entity.call(this, sprite, x, y, height, width);
};

EndTrigger.prototype = Object.create(Entity.prototype);
EndTrigger.prototype.constructor = EndTrigger;

EndTrigger.prototype.checkCollisions = function() {
  let player = App.game.player;
  if (typeof this.bounds !== 'undefined' && typeof player.bounds !== 'undefined') {
    if (this.bounds.intersects(player.bounds)) {
      player.die();
      return true;
    }
  }
  return false;
};
