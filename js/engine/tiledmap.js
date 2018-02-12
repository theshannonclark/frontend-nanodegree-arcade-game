let TiledMap = function(mapDimensions) {
  this.rows = mapDimensions.rows || 6;
  this.columns = mapDimensions.columns || 5;
  this.tileHeight = mapDimensions.tileHeight || 83;
  this.tileWidth = mapDimensions.tileWidth || 100;

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

  // Draw the map
  for (let row = 0; row < this.rows; row++) {
    let rowImage = Resources.get(this._map[row]);

    for (let column = 0; column < this.columns; column++) {
      let dx = column * this.tileWidth;
      let dy = row * this.tileHeight;

      ctx.drawImage(rowImage, dx, dy);
    }
  }
};

TiledMap.prototype.canStand = function(x, y) {};

TiledMap.prototype.coordsToTileIndices = function(x, y) {};

TiledMap.prototype.tileIndicesToCoords = function(i, j) {};
