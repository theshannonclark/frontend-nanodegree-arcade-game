let Entity = function() {
  this.id = uuidv4();
  this.components = {};
};

Entity.prototype.addComponent = function(name, component) {
  this.components[name] = component;
};

Entity.prototype.hasComponent = function(name) {
  return this.components.hasOwnProperty(name);
};

// "Borrowed" from https://stackoverflow.com/a/2117523
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}