
import Helper from "../classes/Helper"

export default class FirstMenu extends Phaser.Scene {
  constructor() {
    super("FirstMenu");
  }
  
  preload() {
  }

  create() : void {
    Helper.createText(this,100, 'Название игры', 30);
   
    const startButton = Helper.createText(this, 0, 'игра', 20);
    Helper.ButtonCreator(startButton, this, 'game')
   
    const shopButton = Helper.createText(this,-50, 'магазин', 20);
    Helper.ButtonCreator(shopButton, this, 'shop')

    const settingsButton = Helper.createText(this, -100, 'настройки', 20);
    Helper.ButtonCreator(settingsButton, this, 'settings')

    Helper.drawCoins(this);
    Helper.drawBestScore(this);
  }

  update() : void {

  }

}
