
let SpawnPoint = function(x, y, entitySprite, toSpawn, timeBetweenSpawns, step) {
  Entity.call(this, null, x, y, 0, 0);

  this.entitySprite = entitySprite;
  this.toSpawn = toSpawn;
  this.timeBetweenSpawns = timeBetweenSpawns;
  this.step = step

  this.lastSpawnTime = null;
};

SpawnPoint.prototype = Object.create(Entity.prototype);
SpawnPoint.prototype.constructor = SpawnPoint;

SpawnPoint.prototype.updateThis = function(dt) {
  if (this._parent === null) {
    return;
  }

  let time = Date.now();
  this.lastSpawnTime = (this.lastSpawnTime === null) ? time : this.lastSpawnTime;

  if ((time === this.lastSpawnTime) || (time - this.lastSpawnTime >= this.timeBetweenSpawns)) {
    let x = this.position.x;
    let y = this.position.y;

    let height = this.toSpawn.height;
    let width = this.toSpawn.width;

    let entity = new this.toSpawn.Constructor(this.entitySprite, x, y, height, width, this.step);
    entity.setBounds(new Rect(this.position.x, this.position.y - 74, height - 10, width));
    Engine.addEntity(entity, this);

    this.lastSpawnTime = time;
  }
};
