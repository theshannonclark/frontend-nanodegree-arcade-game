let Game = function() {
  this.tiles = [
    'stone-block.png',
    'water-block.png',
    'grass-block.png'
  ];
  this.enemies = ['enemy-bug.png'];
  this.characters = ['char-boy.png'];

  this.mapDimensions = {
    rows: 6,
    columns: 5,
    tileHeight: 83,
    tileWidth: 100
  };

  this.firstScreen = [
    'water-block.png', 'stone-block.png', 'stone-block.png',
    'stone-block.png', 'grass-block.png', 'grass-block.png'
  ];
};

Game.prototype.init = function() {
  Engine.init(this.getResources(), this.firstScreen, this.mapDimensions);
};

Game.prototype.getResources = function() {
  return this.tiles
    .concat(this.enemies)
    .concat(this.characters);
};