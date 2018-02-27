
let Game = function() {
  this.level = 0;

  this.levelData = config.mapData.levels[this.level];

  this.resources = config.resources;
  this.mapDimensions = config.mapData.mapDimensions;

  this.enemies = config.enemies;
  this.triggers = config.triggers;
};

Game.prototype.init = function() {
  Engine.init(this.resources, this.mapDimensions);
  this.initLevel();
};

Game.prototype.initLevel = function() {
  Engine.map.loadMap(this.levelData);
  this.initSpawnPoints();
  this.initTriggers();
  this.initPlayer();
};

Game.prototype.initSpawnPoints = function() {
  this.levelData.spawnPoints.forEach((spawnPoint) => {
    let enemy = this.enemies[spawnPoint.type];
    let sprite = spawnPoint.sprite;

    if (typeof enemy !== 'undefined') {
      let spawn = new SpawnPoint(spawnPoint.x, spawnPoint.y, sprite, enemy, spawnPoint.timeBetweenSpawns, spawnPoint.step);
      Engine.map.addSpawnPoint(spawn);
    }
  });
};

Game.prototype.initTriggers = function() {
  this.levelData.triggers.forEach((trigger) => {
    let conf = this.triggers[trigger.type];

    if (typeof conf !== 'undefined') {
      let newTrigger = new conf.Constructor(conf.sprite, trigger.x, trigger.y, conf.height, conf.width);

      let boundsX = newTrigger.position.x + conf.bounds.x;
      let boundsY = newTrigger.position.y + conf.bounds.y
      newTrigger.setBounds(new Rect(boundsX, boundsY, conf.bounds.height, conf.bounds.width));

      Engine.map.addTrigger(newTrigger);
    }
  });
};

Game.prototype.initPlayer = function() {
  let spawnX = this.levelData.playerSpawn.x; 
  let spawnY = this.levelData.playerSpawn.y;

  let player = new Player('char-boy.png', spawnX, spawnY, 90, 72);
  player.setBounds(new Rect(player.position.x + 15, player.position.y - 86, player.dimensions.height - 32, player.dimensions.width))

  Engine.addEntity(player);
  App.game.player = player;
};

Game.prototype.restartLevel = function() {
  if (typeof App.game.player !== 'undefined') {
    App.game.player.delete();
  }
  this.initLevel();
  Engine.initCamera(this.mapDimensions.maxY);
}
