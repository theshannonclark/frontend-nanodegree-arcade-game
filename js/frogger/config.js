
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
      tileWidth: 100
    },

    levels: [
      {
        background: [
          'water-block.png', 'water-block.png', 'water-block.png',
          'stone-block.png', 'stone-block.png', 'stone-block.png',
          'grass-block.png', 'grass-block.png', 'grass-block.png',
        ],
        playerSpawn: { x: 200, y: 380 },
        spawnPoints: [],
      }
    ]
  }
};