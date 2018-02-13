
let Game = function() {
  this.level = 0;

  this.levelData = config.mapData.levels[this.level];

  this.resources = config.resources;
  this.screen = this.levelData.background;
  this.mapDimensions = config.mapData.mapDimensions;
};

Game.prototype.init = function() {
  Engine.init(this.resources, this.screen, this.mapDimensions);

  let spawnX = this.levelData.playerSpawn.x; 
  let spawnY = this.levelData.playerSpawn.y;
  let player = new Player('char-boy.png', spawnX, spawnY);

  Engine.addEntity(player);
};

// 200, 380