import * as EasyStar from '../const/easystar'

import Helper from "../classes/Helper"

export default class newGame extends Phaser.Scene {
  static map: any;
  static scene: any;
  static finder: any;
  static checkCollision: any;
  static moveCharacter: any;
  static camera: any;
  [x: string]: any;
  constructor() {
    super('game')
    this.player = null;
  }
  preload(): void {
    this.load.tilemapTiledJSON('mapShip', 'assets/map/mapShip.json');

  }

  create(): void {
    this.input.on('pointerup', (pointer: any) => this.handleClick(this, pointer));

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, 16 * 32, 38 * 32);
    console.log('this.camera: ', this.camera);

    var phaserGuy = this.add.image(6 * 32, 5 * 32, 'phaserguy');
    phaserGuy.setDepth(1);
    phaserGuy.setOrigin(0, 0.5);
    // this.camera.startFollow(phaserGuy);
    this.player = phaserGuy;
    console.log(' this.scene: ',  this.scene);
    // Display map
    this.map = this.make.tilemap({ key: 'mapShip' });
    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    var tiles = this.map.addTilesetImage('tiles', 'tileset');
    console.log('tiles: ', tiles);
    this.map.createStaticLayer(0, tiles, 0, 0);

    // Marker that will follow the mouse
    this.marker = this.add.graphics();
    this.marker.lineStyle(3, 0xffffff, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    // ### Pathfinding stuff ###
    // Initializing the pathfinder
    console.log('EasyStar: ', EasyStar.EasyStar);
    this.finder = new EasyStar.EasyStar.js();
    

    // We create the 2D array representing all the tiles of our map
    var grid = [];
    for (var y = 0; y < this.map.height; y++) {
      var col = [];
      for (var x = 0; x < this.map.width; x++) {
        // функция по получению id плитки ("ID" field in Tiled)
        col.push(this.getTileID(x, y));
      }
      grid.push(col);
    }
    this.finder.setGrid(grid);

    const tileset = this.map.tilesets[0];
    console.log('this.map.tilesets: ', this.map.tilesets);
    tileset.tileProperties
    const properties = tileset.tileProperties
    var acceptableTiles = [];

    // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
    // and see what properties have been entered in Tiled.
    for (let i = tileset.firstgid - 1; i < tiles.total; i++) {
      // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
      if (!properties.hasOwnProperty(i)) {
        // If there is no property indicated at all, it means it's a walkable tile
        acceptableTiles.push(i + 1);
        continue;
      }
      if (!properties[i].collide) acceptableTiles.push(i + 1);
      if (properties[i].cost) this.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
    }
    this.finder.setAcceptableTiles(acceptableTiles);
    // console.log('acceptableTiles: ', acceptableTiles);
    // console.log('this.map.getTileAt(x, y): ', this.map.getTileAt(9, 9));
    console.log('this.camera: ', this.camera);
  }

  static getTileID(x: number, y: number): any {
    throw new Error("Method not implemented.");
  }

  update(): void {
    // Callback of update every frame
    const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

    // Rounds down to nearest tile
    var pointerTileX = this.map.worldToTileX((worldPoint as any).x);
    var pointerTileY = this.map.worldToTileY((worldPoint as any).y);
    this.marker.x = this.map.tileToWorldX(pointerTileX);
    this.marker.y = this.map.tileToWorldY(pointerTileY);
    this.marker.setVisible(!this.checkCollision(pointerTileX, pointerTileY));
  }

  // монструозная немного хрень вышла, а она нужна только для того что бы работао выделение...
    checkCollision(x: any, y: any) {
    const tile = this.map.getTileAt(x, y);
    const property = this.map.tilesets[0].tileProperties;
    if (!tile) {
      return true;
    } else if (tile.index - 1 in property) {
      if ('collide' in property[tile.index - 1]) {
        return true;
      }
    }
    return tile.properties.collide === true;
  };

  getTileID(x: any, y: any) {
    var tile = this.map.getTileAt(x, y);
    if (!tile) {
      return 100500;
    }
    return tile.index;
  };
  
  handleClick(context: newGame , pointer: { x: any; y: any; }) {

    console.log('this: ', this);
    var x = context.camera.scrollX + pointer.x;
    var y = context.camera.scrollY + pointer.y;
    var toX = Math.floor(x / 32);
    var toY = Math.floor(y / 32);
    var fromX = Math.floor(this.player.x / 32);
    var fromY = Math.floor(this.player.y / 32);
    console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ',' + toY + ')');

    context.finder.findPath(fromX, fromY, toX, toY, function (path: any) {
      if (path === null) {
        console.warn('Path was not found.');
      } else {
        console.log(path);
        context.moveCharacter(path);
      }
    });
    context.finder.calculate(); // don't forget, otherwise nothing happens
  };

  moveCharacter (path: string | any[]) {
    // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
    var tweens = [];
    for (var i = 0; i < path.length - 1; i++) {
      var ex = path[i + 1].x;
      var ey = path[i + 1].y;
      tweens.push({
        targets: this.player,
        x: { value: ex * this.map.tileWidth, duration: 200 },
        y: { value: ey * this.map.tileHeight, duration: 200 },
      });
    }

    this.tweens.timeline({
      tweens: tweens,
    });
  };


}

