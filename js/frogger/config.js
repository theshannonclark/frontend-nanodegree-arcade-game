
const config = {
  resources: [
    'stone-block.png', 'water-block.png', 'grass-block.png',
    'enemy-bug.png', 'char-boy.png'
  ],

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
          'grass-block.png', 'grass-block.png', 'grass-block.png',
          'stone-block.png', 'stone-block.png', 'stone-block.png',
          'water-block.png', 'water-block.png', 'water-block.png',
        ],
        // in world coordinates
        playerSpawn: { x: 200, y: 208 },
        spawnPoints: [],
      }
    ]
  }
};
