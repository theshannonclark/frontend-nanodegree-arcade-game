var Enemy = function() {
  this.sprite = 'enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  // todo: Update enemy
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
