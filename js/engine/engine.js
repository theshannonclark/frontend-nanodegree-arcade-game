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
  let map = {};

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  // root of scene graph
  let scene = {};

  // View into the game world
  let camera = {};

  let onInputCallback = (event) => { 
    console.warn('Set an input handler using Engine#setOnInputHandler');
  };

  let lastTime = null;

  function init(resources, mapDimensions) {
    initMap(mapDimensions);
    initCanvas();
    initCamera(mapDimensions.maxY);

    scene = new NullEntity();
    window.Engine.scene = scene;

    // Start game loop
    Resources.onReady(function() {
      window.requestAnimationFrame(main);
    });
    Resources.load(resources);
  }

  function initMap(mapDimensions) {
    map = new TiledMap(mapDimensions);
    window.Engine.map = map;
  }

  function initCanvas() {
    canvas.width = (map.tileWidth * map.columns) + map.offset.left;
    canvas.height = (map.tileHeight * map.rows) + map.offset.bottom;

    document.body.appendChild(canvas);
  }

  function initCamera(maxY) {
    let canvasHeight = Engine.canvas.height;
    let canvasWidth = Engine.canvas.width;

    camera = new Camera(0, canvasHeight, canvasHeight, canvasWidth, maxY);
    window.Engine.camera = camera;
  }

  function main(time) {
    // The number of seconds that passed between the last frame and this one
    lastTime = (lastTime === null) ? time : lastTime;
    let dt = (time - lastTime) / 1000.0;
    lastTime = time;

    // Call our update/render functions
    update(dt);
    render();

    // Call main again before the next repaint
    window.requestAnimationFrame(main);
  }

  // Updates the game's state
  function update(dt) {
    scene.update(dt);
  }

  // Draws the "game level", then draws other entities.
  function render() {
    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
    scene.render();
  }

  /* Add an entity to the game
   */
  function addEntity(entity, parent = null) {
    let newParent = (parent === null) ? scene : parent;
    if (typeof entity === 'object') {
      newParent.addChild(entity);
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
