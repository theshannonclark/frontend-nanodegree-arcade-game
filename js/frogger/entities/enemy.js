var Enemy = function() {
  Entity.call(this);

  this.sprite = 'enemy-bug.png';
};

Enemy.prototype = Object.create(Entity);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
  // todo: Update enemy
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
