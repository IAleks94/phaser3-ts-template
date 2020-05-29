import Helper from "../classes/Helper"

export default class Shop extends Phaser.Scene {
  constructor(){
    super('shop')
  }
  preload() {
    // Preload all files here
  }

  create() : void {
    Helper.createText(this, 0, 'магазин', 20)
    Helper.createText(this, 20, '234234', 20)
    Helper.createText(this, -50, 'маг23432азин', 20)
    Helper.createText(this, -100, 'werwer', 20)

  }

  update() : void {
    // Callback of update every frame
  }
}