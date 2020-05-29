/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Boot game scene. Gift is preloader :)
 * @license      CatOstrovsky
 */

const audios = [
  { name: "bump", link: "assets/audio/bump.mp3" },
  { name: "bump-1", link: "assets/audio/bump-1.mp3" },
  { name: "cash", link: "assets/audio/cash.mp3" },
  { name: "select", link: "assets/audio/select.mp3" },
  { name: "auch", link: "assets/audio/auch.mp3" },
  { name: "lose", link: "assets/audio/lose.mp3" },
  { name: "win", link: "assets/audio/win.mp3" }
]

const images = [
  { name: 'coin', link: 'assets/images/coin.png' },
  { name: 'sofa', link: 'assets/images/sofa.png' },
  { name: 'sofa_1', link: 'assets/images/sofa_1.png' },
  { name: 'sofa_2', link: 'assets/images/sofa_2.png' },
  { name: 'sofa_3', link: 'assets/images/sofa_3.png' },
  { name: 'sofa_4', link: 'assets/images/sofa_4.png' },
  { name: 'arrow', link: 'assets/images/arrow.png' },
  { name: 'sofa_4', link: 'assets/images/sofa_4.png' },
  { name: 'phaserguy', link: 'assets/images/phaserguy.png' },
  { name: 'tileset', link: 'assets/map/gridtiles.png' }

]

export class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload(): void {
    audios.forEach(audio => this.load.audio(audio.name, audio.link));
    images.forEach(image => this.load.image(image.name, image.link));

    

    this.load.bitmapFont('joystix', 'assets/fonts/joystix.png', 'assets/fonts/joystix.fnt')
  }

  create(): void {

    this.scene.start('FirstMenu');

  }

}
