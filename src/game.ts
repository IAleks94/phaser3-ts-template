/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Setup game
 * @license      CatOstrovsky
 */

// Add basic phaser namespaces
// <reference path="../typescript/phaser.d.ts"/>

import "phaser";
import { Boot } from './scenes/Boot'
import FirstMenu from './scenes/FirstMenu'
import newGame from './scenes/newGame';
import Shop from './scenes/Shop';
import Settings from './scenes/Settings';

import Config from './const/config'

const config = {
  ...Config,
  scene: [Boot, FirstMenu, newGame, Shop, Settings]
};

export class SuperGame extends Phaser.Game {
  constructor(config: any) {
    super(config);
  }
}

window.onload = () => {
  var game = new SuperGame(config);
};
