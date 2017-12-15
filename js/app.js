// Enemies our player must avoid
var Enemy = function() {
  // The sprite for our enemies
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(sprite = 'images/char-boy.png', startX = 0, startY = 0) {
  this.sprite = sprite;
  this.position = {x: startX, y: startY};
  this.nextMove = '';
  this.step = {x: 100, y: 83};
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

Player.prototype.handleInput = function(input) {
  if (input !== undefined) {
    this.nextMove = input;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player('images/char-boy.png', 200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
