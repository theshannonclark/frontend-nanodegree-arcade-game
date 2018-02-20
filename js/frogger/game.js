
let Game = function() {
  this.level = 0;

  this.levelData = config.mapData.levels[this.level];

  this.resources = config.resources;
  this.mapDimensions = config.mapData.mapDimensions;
};

Game.prototype.init = function() {
  Engine.init(this.resources, this.mapDimensions);
  Engine.map.loadMap(this.levelData);

  let spawnX = this.levelData.playerSpawn.x; 
  let spawnY = this.levelData.playerSpawn.y;
  let player = new Player('char-boy.png', spawnX, spawnY, 90, 72);

  Engine.addEntity(player);
};
