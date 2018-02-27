
let TiledMap = function(mapDimensions) {
  this.rows = mapDimensions.rows;
  this.columns = mapDimensions.columns;

  this.tileHeight = mapDimensions.tileHeight;
  this.tileWidth = mapDimensions.tileWidth;

  this.offset = mapDimensions.offset;

  this.world = {
    rows: 0,
    columns: this.columns
  };
};

TiledMap.prototype.loadMap = function(levelData) {
  if (typeof this._map !== 'undefined') {
    this._map.delete();
    this._map = this._mapRows = this._spawnPoints = this._triggers = undefined;
    this.world.rows = 0;
  }

  this._map = new NullEntity();
  Engine.addEntity(this._map);

  this._parseMap(levelData.background);
};

TiledMap.prototype._parseMap = function(map) {
  let rows = [];
  for (let i = 0; i < map.length; i++) {
    let rowImage = map[i];

    let rowY = (i + 1) * this.tileHeight + 90;
    let rowParent = new NullEntity(null, 0, rowY);

    rows.push(rowParent);

    this.world.rows++;

    let pointer = rowParent;
    for (let j = 0; j < this.columns; j++) {
      let tileX = j * this.tileWidth;
      let tileY = (i + 1) * this.tileHeight + 90;

      let tile = new Tile(rowImage, tileX, tileY, this.tileHeight, this.tileWidth);
      Engine.addEntity(tile, pointer);
      pointer = tile;
    }
  }
  this._addRows(rows);
};

TiledMap.prototype._addRows = function(rows) {
  if (typeof this._mapRows === 'undefined') {
    this._mapRows = new NullEntity();
    Engine.addEntity(this._mapRows, this._map)
  }
  for (let i = rows.length - 1; i >= 0; i--) {
    Engine.addEntity(rows[i], this._mapRows);
  }
};

TiledMap.prototype.addSpawnPoint = function(spawnPoint) {
  if (typeof this._spawnPoints === 'undefined') {
    this._spawnPoints = new NullEntity();
    Engine.addEntity(this._spawnPoints, this._map);
  }
  if (spawnPoint instanceof Entity) {
    Engine.addEntity(spawnPoint, this._spawnPoints);
  }
};

TiledMap.prototype.addTrigger = function(trigger) {
  if (typeof this._triggers === 'undefined') {
    this._triggers = new NullEntity();
    Engine.addEntity(this._triggers, this._map);
  }
  if (trigger instanceof Entity) {
    Engine.addEntity(trigger, this._triggers);
  }
};

/*  If things are positioned relative to the canvas, then their
 *  positions need to be updated when the screen "scrolls". Using
 *  a separate virtual coordinate system, and converting to "screen
 *  coordinates" when rendering solved this problem. Screen coordinates
 *  update, but world coordinates stay the same.
 */
TiledMap.prototype.worldCoordsToScreenCoords = function(x, y) {
  let screenOrigin = { x: Engine.camera.position.x, y: Engine.camera.position.y };
  return {
    x: screenOrigin.x + x,
    y: screenOrigin.y - y
  };
};

TiledMap.prototype.getWorldDimensions = function() {
  return {
    height: (this.world.rows * this.tileHeight) + this.offset.bottom,
    width:  (this.world.columns * this.tileWidth) + this.offset.left
  };
};

TiledMap.prototype.pointInBounds = function(x, y, includeOffset = true) {
  let worldSize = this.getWorldDimensions();

  let offsetLeft = (includeOffset) ? this.offset.left : 0;
  let offsetBottom = (includeOffset) ? this.offset.bottom : 0;

  return (x >= offsetLeft && x <= worldSize.width) &&
         (y >= offsetBottom && y <= worldSize.height);
};



// TODO:

TiledMap.prototype.canStand = function(x, y) {};

TiledMap.prototype.tileIndicesToCoords = function(i, j) {};

TiledMap.prototype.coordsToTileIndices = function(x, y) {};

TiledMap.prototype.nFromTheEnd = function(n) {
  let index = (this._map.length - 1) - (n - 1);
  return (index < 0) ? 0 : index;
};
