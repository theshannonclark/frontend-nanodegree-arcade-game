/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 */

(function() {
  let map = null;

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  let entities = [];

  let onInputCallback = (event) => { 
    console.warn('Set an input handler using Engine#setOnInputHandler');
  };

  let lastTime;

  function init(resources, firstScreen, mapDimensions) {
    initMap(firstScreen, mapDimensions);
    initCanvas();

    Resources.onReady(function() {
      lastTime = Date.now();
      main();
    });
    Resources.load(resources);
  }

  function initMap(firstScreen, mapDimensions) {
    map = new TiledMap(mapDimensions);
    map.initMap(firstScreen);
  }

  function initCanvas() {
    let transparencyTop = 50;
    let extraBottom = 40;

    canvas.width = map.tileWidth * map.columns;
    canvas.height = (map.tileHeight * map.rows) + 
      transparencyTop + extraBottom;

    document.body.appendChild(canvas);
  }

  function main() {
    // The number of seconds that passed between the last frame and this one.
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    // Call our update/render functions.
    update(dt);
    render();

    // Used to determine the time delta.
    lastTime = now;

    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    window.requestAnimationFrame(main);
  }

  // Updates the game's state
  function update(dt) {
    updateEntities(dt);
  }

  // Update the position of all entities
  function updateEntities(dt) {
    entities.forEach(function(entity) {
      entity.update(dt);
    });
  }

  // Draws the "game level", then draws other entities.
  function render() {
    map.render();
    renderEntities();
  }

  /* Call the render functions you have defined
   * on your enemy and player entities.
   */
  function renderEntities() {
    entities.forEach(function(entity) {
      entity.render();
    });
  }

  /* Add an entity to the game
   */
  function addEntity(entity) {
    if (typeof entity === 'object') {
      entities.push(entity);
    }
  }

  /* Add a callback function to be called when
   * a key is pressed.
   */
  function setOnInputHandler(callback) {
    if (typeof callback === 'function') {
      onInputCallback = callback;
    }
  }

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method.
  document.addEventListener('keyup', function(event) {
    onInputCallback(event);
  });

  window.ctx = ctx;
  window.Engine = {
    init: init,
    canvas: canvas,
    addEntity: addEntity,
    setOnInputHandler: setOnInputHandler
  };
})();
