/*
 * Map tiles, spawn points, and triggers are stored in the scene graph.
 *
 * This needs to happen before adding anything else to the scene graph, because a
 * depth-first search is used for rendering and updating.
 *
 * Each row is a chain of tiles, and each tile is positioned relative to its parent tile.
 */

/**
 * Represents a tile map.
 * @constructor
 * @param {object} mapDimensions - Size data for the map.
 * @param {number} mapDimensions.rows
 * @param {number} mapDimensions.columns
 * @param {number} mapDimensions.tileHeight
 * @param {number} mapDimensions.tileWidth
 * @param {object} mapDimensions.offset - Number of pixels at the top, left, bottom, and right outside to be ignored.
 */
let TiledMap = function(mapDimensions) {
  this.rows = mapDimensions.rows;
  this.columns = mapDimensions.columns;

  this.tileHeight = mapDimensions.tileHeight;
  this.tileWidth = mapDimensions.tileWidth;

  this.offset = mapDimensions.offset;
};

/**
 * Loads a map.
 * @param {object} levelData - Map data and spawn points for the current level.
 */
TiledMap.prototype.loadMap = function(levelData) {
  if (typeof this._map !== 'undefined') {
    this._map.delete();
    this._map = this._mapRows = this._spawnPoints = this._triggers = undefined;
  }

  this._map = new NullEntity();
  Engine.addEntity(this._map);

  this._parseMap(levelData.background);
};

/**
 * Parses the map and store created tiles.
 * @private
 * @param {object} map
 */
TiledMap.prototype._parseMap = function(map) {
  let rows = [];
  for (let i = 0; i < map.length; i++) {
    let rowImage = map[i];

    let rowY = (i + 1) * this.tileHeight + 90;
    let rowParent = new NullEntity(null, 0, rowY);

    rows.push(rowParent);

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

/**
 * Adds rows of tiles to the scene graph.
 * @private
 * @param {object} rows
 */
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

TiledMap.prototype.getWorldDimensions = function() {
  return {
    height: (this._mapRows._children.length * this.tileHeight) + this.offset.bottom,
    width:  (this.columns * this.tileWidth) + this.offset.left
  };
};

TiledMap.prototype.pointInBounds = function(x, y, includeOffset = true) {
  let worldSize = this.getWorldDimensions();

  let offsetLeft = (includeOffset) ? this.offset.left : 0;
  let offsetBottom = (includeOffset) ? this.offset.bottom : 0;

  return (x >= offsetLeft && x <= worldSize.width) &&
         (y >= offsetBottom && y <= worldSize.height);
};
