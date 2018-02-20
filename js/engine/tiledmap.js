
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
  if (typeof this._map === 'undefined') {
    this._map = new Entity(null, 0, 0, 0, 0);
    Engine.addEntity(this._map);
  } else {
    // TODO: clear map first
  }
  this._parseMap(levelData.background);
};

TiledMap.prototype._parseMap = function(map) {
  let mapArray = []
  for (let i = 0; i < map.length; i++) {
    let rowImage = map[i];

    mapArray[i] = [];
    this.world.rows++;

    for (let j = 0; j < this.columns; j++) {
      let tileX = j * this.tileWidth;
      let tileY = (i + 1) * this.tileHeight + 90;

      let tile = new Tile(rowImage, tileX, tileY, this.tileHeight, this.tileWidth);

      mapArray[i].push(tile);
    }
  }
  this._addTiles(mapArray);
};

TiledMap.prototype._addTiles = function(mapArray) {
  for (let i = mapArray.length - 1; i >= 0; i--)  {
    let row = mapArray[i];

    if (Array.isArray(row)) {
      Engine.addEntities(row, this._map);
    }
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

TiledMap.prototype.pointInBounds = function(x, y, includeOffset = true) {
  let worldWidth = (this.world.columns * this.tileWidth) + this.offset.left;
  let worldHeight = (this.world.rows * this.tileHeight) + this.offset.bottom;

  let offsetLeft = (includeOffset) ? this.offset.left : 0;
  let offsetBottom = (includeOffset) ? this.offset.bottom : 0;

  return (x >= offsetLeft && x <= worldWidth) &&
         (y >= offsetBottom && y <= worldHeight);
};



// TODO:

TiledMap.prototype.canStand = function(x, y) {};

TiledMap.prototype.coordsToTileIndices = function(x, y) {};

TiledMap.prototype.tileIndicesToCoords = function(i, j) {};

TiledMap.prototype.nFromTheEnd = function(n) {
  let index = (this._map.length - 1) - (n - 1);
  return (index < 0) ? 0 : index;
};
