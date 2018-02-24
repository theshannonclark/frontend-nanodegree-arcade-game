
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
