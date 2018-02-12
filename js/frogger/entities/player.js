
var Player = function(sprite = 'char-boy.png', startX = 0, startY = 0) {
  this.sprite = sprite;
  this.position = {x: startX, y: startY};
  this.nextMove = '';
  this.step = {x: 100, y: 83};

  Engine.setOnInputHandler(this.handleInput.bind(this));
};

Player.prototype.update = function(dt) {
  if (this.nextMove !== '') {
    this.move(this.nextMove);
    this.nextMove = '';
  }
};

Player.prototype.move = function(move) {
  let newX, newY;

  switch(move) {
    case 'up':
      newY = this.position.y - this.step.y;
      if (newY >= -35) this.position.y = newY;
      break;
    case 'right':
      newX = this.position.x + this.step.x;
      if (newX <= 400) this.position.x = newX;
      break;
    case 'down':
      newY = this.position.y + this.step.y;
      if (newY <= 380) this.position.y = newY;
      break;
    case 'left':
      newX = this.position.x - this.step.x;
      if (newX >= 0) this.position.x = newX;
      break;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

Player.prototype.handleInput = function(event) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  var input = allowedKeys[event.keyCode];
  if (typeof input !== 'undefined') {
    this.nextMove = input;
  }
};
