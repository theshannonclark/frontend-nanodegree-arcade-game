
let Tile = function(sprite, x, y, height, width) {
  Entity.call(this, sprite, x, y, height, width);
};

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile;

// Tiles don't need to update
Tile.prototype.updateThis = function(dt) {};
