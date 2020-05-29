import Helper from "../classes/Helper"

export default class Settings extends Phaser.Scene {
  constructor(){
    super('settings')
  }
  preload() {
    // Preload all files here
  }

  create() : void {
    Helper.createText(this, 0, 'настройки', 20)
  }

  update() : void {
    // Callback of update every frame
  }
}