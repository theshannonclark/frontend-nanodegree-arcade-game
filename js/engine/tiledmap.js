let TiledMap = function(mapDimensions) {
  this.rows = mapDimensions.rows || 6;
  this.columns = mapDimensions.columns || 5;
  this.tileHeight = mapDimensions.tileHeight || 83;
  this.tileWidth = mapDimensions.tileWidth || 100;

  this.rowOffset = null;

  this._map = [];
};

TiledMap.prototype.initMap = function(firstScreen) {
  for (let i = 0; i < firstScreen.length; i++) {
    this._map.push(firstScreen[i]);
  }
};

TiledMap.prototype.generateRow = function() {};

TiledMap.prototype.render = function() {
  // Before drawing, clear existing canvas
  ctx.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height)

  // Show final n tiles, where n is the number of rows
  this.rowOffset = (this.rowOffset !== null) ? this.rowOffset : this.nFromTheEnd(this.rows);
  let rowOffsetCopy = this.rowOffset;

  // Draw the map
  for (let row = 0; (row < this.rows) && (rowOffsetCopy < this._map.length); row++) {
    let rowImage = Resources.get(this._map[rowOffsetCopy++]);

    for (let column = 0; column < this.columns; column++) {
      let dx = column * this.tileWidth;
      let dy = row * this.tileHeight;

      ctx.drawImage(rowImage, dx, dy);
    }
  }
};

TiledMap.prototype.scrollUp = function() {
  let initOffset = this.rowOffset;
  if (this.rowOffset !== null && (this.rowOffset - 1) >= 0) {
    this.rowOffset--;
  }
  return initOffset !== this.rowOffset;
};

TiledMap.prototype.scrollDown = function() {
  let initOffset = this.rowOffset;
  if (this.rowOffset !== null) {
    let newOffset = this.rowOffset + 1;
    if (newOffset + this.rows <= this._map.length) {
      this.rowOffset = newOffset;
    }
  }
  return initOffset !== this.rowOffset;
};

TiledMap.prototype.canStand = function(x, y) {};

TiledMap.prototype.coordsToTileIndices = function(x, y) {};

TiledMap.prototype.tileIndicesToCoords = function(i, j) {};

TiledMap.prototype.nFromTheEnd = function(n) {
  let index = (this._map.length - 1) - (n - 1);
  return (index < 0) ? 0 : index;
};