
/**
 * Represents a tile in a map.
 * @constructor
 * @extends Entity
 * @param {string} sprite - Path to sprite image.
 * @param {number} x
 * @param {number} y
 * @param {number} height
 * @param {number} width
 */
let Tile = function(sprite, x, y, height, width) {
  Entity.call(this, sprite, x, y, height, width);
};

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile;
