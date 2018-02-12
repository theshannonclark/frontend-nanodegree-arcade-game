// app.js - Entry-point for the game

let resources = config.resources;
let screen = config.mapData.levels[0].layers.background;
let mapDimensions = config.mapData.mapDimensions;

Engine.init(resources, screen, mapDimensions);

let player = new Player('char-boy.png', 200, 380);
Engine.addEntity(player);