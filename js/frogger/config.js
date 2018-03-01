
/**
 * Configuration options.
 * @namespace
 * @property {string[]} resources - Sprites for the game to load.
 *
 * @property {object.<object>} enemies - Information on each enemy type.
 * @property {function} enemies.<>.Constructor - Used in {@link SpawnPoint#updateThis} to construct enemies.
 * @property {number} enemies.<>.height
 * @property {number} enemies.<>.width
 * @property {object.<number>} enemies.<>.bounds - Used in collision detection.
 *
 * @property {object.<object>} triggers - Information on each trigger type.
 * @property {function} triggers.<>.Constructor - Used in {@link Game#initTriggers} to construct enemy.
 * @property {number} triggers.<>.height
 * @property {number} triggers.<>.width
 * @property {object.<number>} triggers.<>.bounds - Used in collision detection.
 *
 * @property {object} mapData - Information about tile maps used in the game.
 * @property {object} mapData.mapDimensions - Size information for all maps.
 *
 * @property {object[]} mapData.levels - Map data and spawn points for each level.
 * @property {string[]} mapData.levels.<>.background - Tiles rendered in the background of the level.
 * @property {object.<number>} mapData.levels.<>.playerSpawn - Spawn point of the player for this level.
 *
 * @property {object[]} mapData.levels.<>.spawnPoints - Spawn points for the enemies in this level.
 * @property {string} mapData.levels.<>.spawnPoints.<>.type - Corresponds to {@link config.enemies} keys.
 * @property {string} mapData.levels.<>.spawnPoints.<>.sprite - Image to draw at enemy position.
 * @property {number} mapData.levels.<>.spawnPoints.<>.x - X coordinate of enemy position.
 * @property {number} mapData.levels.<>.spawnPoints.<>.y - Y coordinate of enemy position.
 * @property {number} mapData.levels.<>.spawnPoints.<>.timeBetweenSpawns - Milliseconds between spawns.
 * @property {object.<number>} mapData.levels.<>.spawnPoints.<>.step - Distance enemy moves per second.
 *
 * @property {object[]} mapData.levels.<>.triggers - Where to put the triggers in this level.
 * @property {string} mapData.levels.<>.triggers.<>.type - Corresponds to {@link config.triggers} keys.
 * @property {number} mapData.levels.<>.triggers.<>.x - X coordinate of trigger position.
 * @property {number} mapData.levels.<>.triggers.<>.y - Y coordinate of trigger position.
 */
const config = {
  resources: [
    'stone-block.png', 'water-block.png', 'grass-block.png',
    'enemy-bug.png', 'enemy-bug-reverse.png', 'char-boy.png',
    'Selector.png'
  ],

  enemies: {
    bug: {
      Constructor: Enemy,
      height: 80,
      width: 100,
      bounds: {
        x: 20,
        y: -74,
        height: 70,
        width: 60,
      },
    },
  },

  triggers: {
    end: {
      sprite: 'Selector.png',
      Constructor: EndTrigger,
      height: 83,
      width: 100,
      bounds: {
        x: 0,
        y: -90,
        height: 83,
        width: 100,
      },
    },
  },

  mapData: {
    mapDimensions: {
      rows: 6,
      columns: 5,
      tileHeight: 83,
      tileWidth: 100,
      maxY: 408, // Why 408? I'm not sure :)
      offset: {
        left: 0,
        bottom: 83,
      },
    },

    levels: [
      {
        background: [
          'grass-block.png', 'stone-block.png', 'grass-block.png',
          'grass-block.png', 'stone-block.png', 'stone-block.png',
          'stone-block.png', 'grass-block.png', 'stone-block.png',
          'grass-block.png', 'grass-block.png', 'grass-block.png',
          'stone-block.png', 'stone-block.png', 'grass-block.png',
          'grass-block.png', 'grass-block.png', 'grass-block.png',
        ],
        // in world coordinates
        playerSpawn: { x: 200, y: 208 },
        spawnPoints: [
          {
            type: 'bug',
            sprite: 'enemy-bug.png',
            x: 0,
            y: 291,
            timeBetweenSpawns: 4500,
            step: {
              x: 100,
              y: 0,
            },
          },
          {
            type: 'bug',
            sprite: 'enemy-bug-reverse.png',
            x: 400,
            y: 540,
            timeBetweenSpawns: 4000,
            step: {
              x: -100,
              y: 0,
            },
          },
          {
            type: 'bug',
            sprite: 'enemy-bug.png',
            x: 0,
            y: 623,
            timeBetweenSpawns: 3000,
            step: {
              x: 100,
              y: 0,
            },
          },
          {
            type: 'bug',
            sprite: 'enemy-bug-reverse.png',
            x: 400,
            y: 706,
            timeBetweenSpawns: 4000,
            step: {
              x: -100,
              y: 0,
            },
          },
          {
            type: 'bug',
            sprite: 'enemy-bug.png',
            x: 0,
            y: 872,
            timeBetweenSpawns: 2000,
            step: {
              x: 150,
              y: 0,
            },
          },
          {
            type: 'bug',
            sprite: 'enemy-bug.png',
            x: 0,
            y: 1204,
            timeBetweenSpawns: 5000,
            step: {
              x: 100,
              y: 0,
            },
          },
          {
            type: 'bug',
            sprite: 'enemy-bug-reverse.png',
            x: 400,
            y: 1287,
            timeBetweenSpawns: 5000,
            step: {
              x: -100,
              y: 0,
            },
          },
        ],
        triggers: [
          {
            type: 'end',
            x: 200,
            y: 1624,
          },
        ],
      }
    ]
  }
};
