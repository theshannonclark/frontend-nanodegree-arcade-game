
let Enemy = function(sprite, x, y, height, width) {
  Entity.call(this, sprite, x, y, height, width);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.updateThis = function(dt) {
  // todo: Update enemy
};
