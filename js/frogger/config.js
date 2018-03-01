
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
        x: 0,
        y: -74,
        height: 70,
        width: 100,
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
