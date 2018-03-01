
/**
 * Spawns the given entity at the specified rate.
 * @constructor
 * @extends Entity
 * @param {number} x
 * @param {number} y
 * @param {string} entitySprite - Sprite of entity to spawn.
 * @param {number} height
 * @param {number} width
 * @param {number} timeBetweenSpawns - Milliseconds between spawns.
 * @param {object} step - The distance to move on each update.
 */
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

/**
 * Called on each iteration of the game loop from {@link Entity#update}.
 * @override
 * @param {number} dt - Number of seconds that have passed since this was last called.
 */
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
