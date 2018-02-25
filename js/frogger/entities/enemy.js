
let Enemy = function(sprite, x, y, height, width, step) {
  Entity.call(this, sprite, x, y, height, width);

  this.step = step;
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.updateThis = function(dt) {
  let newX = this.position.x + (this.step.x * dt);
  let newY = this.position.y + (this.step.y * dt)

  if (this.inBounds(newX, this.position.y)) {
  	this.position.x = newX;
  } else {
  	this.delete();
  }
};

Enemy.prototype.checkCollisions = function(dt) {
  let player = App.game.player;
  if (typeof this.bounds !== 'undefined' && typeof player.bounds !== 'undefined') {
    if (this.bounds.intersects(player.bounds)) {
      player.die();
      return true;
    }
  }
  return false;
};

Enemy.prototype.renderThis = function() {
  if (typeof this.bounds !== 'undefined') {
    Object.getPrototypeOf(Enemy.prototype).renderThis.call(this);
    let screenCoords = this.bounds.getScreenCoords();
    ctx.strokeRect(screenCoords.x, screenCoords.y, this.bounds.dimensions.width, this.bounds.dimensions.height);
  }
};
