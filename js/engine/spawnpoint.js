
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
    let coords = { x: this.position.x, y: this.position.y };
    let size = { height: this.toSpawn.height, width: this.toSpawn.width};

    let entity = new this.toSpawn.Constructor(this.entitySprite, coords.x, coords.y, size.height, size.width, this.step);
    entity.setBounds(new Rect(
      coords.x + this.toSpawn.bounds.x,
      coords.y + this.toSpawn.bounds.y,
      this.toSpawn.bounds.height,
      this.toSpawn.bounds.width
    ));
    Engine.addEntity(entity, this);

    this.lastSpawnTime = time;
  }
};
