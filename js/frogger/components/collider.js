let Collider = function(id) {
  this.entityID = id;
  this.boundingRect = [];
};

Collider.prototype.checkCollision = function(otherCollider) {};