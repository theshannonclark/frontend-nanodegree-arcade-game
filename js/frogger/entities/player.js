
var Player = function(sprite, startX, startY, height, width) {
  Entity.call(this, sprite, startX, startY, height, width);

  this.nextMove = '';
  this.allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  Engine.setOnInputHandler(this.handleInput.bind(this));
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.updateThis = function(dt) {
  if (this.nextMove !== '') {
    let scrolled = false;

    // Scroll the map when the player is at the top or the bottom of the screen
    let screenCoords = Engine.map.worldCoordsToScreenCoords(this.position.x, this.position.y);
    if (this.nextMove === 'up' && screenCoords.y < (Engine.canvas.height * 0.25)) {
      scrolled = Engine.camera.scrollUp();
    } else if (this.nextMove === 'down' && screenCoords.y > (Engine.canvas.height * 0.50)) {
      scrolled = Engine.camera.scrollDown();
    }

    this.move(this.nextMove);
    this.nextMove = '';
  }
};

Player.prototype.move = function(move) {
  let newX = this.position.x;
  let newY = this.position.y;

  switch(move) {
    case 'up':
      newY = this.position.y + this.step.y;
      break;
    case 'right':
      newX = this.position.x + this.step.x;
      break;
    case 'down':
      newY = this.position.y - this.step.y;
      break;
    case 'left':
      newX = this.position.x - this.step.x;
      break;
  }
  this._move(newX, newY);
};

Player.prototype._move = function(x, y) {
  console.log("player starting:",
    "top-left:", this.position.x, this.position.y,
    "top-right:", this.position.x + this.dimensions.width, this.position.y, 
    "bottom-right:", this.position.x + this.dimensions.width, this.position.y - this.dimensions.height,
    "bottom-left:", this.position.x, this.position.y - this.dimensions.height
  );
  console.log("player new:",
    "top-left:", x, y,
    "top-right:", x + this.dimensions.width, y, 
    "bottom-right:", x + this.dimensions.width, y - this.dimensions.height,
    "bottom-left:", x, y - this.dimensions.height
  );
  console.log();

  if (this.inBounds(x, y)) {
    this.position.x = x;
    this.position.y = y;
  }
};

Player.prototype.handleInput = function(event) {
  var input = this.allowedKeys[event.keyCode];
  if (typeof input !== 'undefined') {
    this.nextMove = input;
  }
};

Player.prototype.inBounds = function(x, y) {
  let height = this.dimensions.height;
  let width = this.dimensions.width;

  let yOffset = 42;

  return Engine.map.pointInBounds(x, y - yOffset) &&          // top-left corner
         Engine.map.pointInBounds(x + width, y - yOffset) &&  // top-right corner
         Engine.map.pointInBounds(x + width, y - height) &&   // bottom-right corner
         Engine.map.pointInBounds(x, y - height);             // bottom-left corner
};
