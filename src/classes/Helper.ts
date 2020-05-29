const STORAGE_COINS = 'coins',
	STORAGE_BEST_SCORE = 'bestScore';
export default class Helper {

	static drawCoins(context: Phaser.Scene): void {
		let coinsCount = localStorage[STORAGE_COINS];
		if (!coinsCount) {
			coinsCount = 0;
		}
		context.add.image(25, 25, 'coin').setDisplaySize(30, 30);
		context.add.dynamicBitmapText(50, 11, 'joystix', coinsCount, 20);
	}
	static drawBestScore(context: Phaser.Scene): void {
		let bestScore = localStorage[STORAGE_BEST_SCORE];
		if (!bestScore) {
			bestScore = 0;
		}
		context.add.dynamicBitmapText(context.sys.canvas.width -25, 11, 'joystix', bestScore, 20).setOrigin(1, 0);
	}
	static createText(context: Phaser.Scene, y: number, text: string | string[], size: number) {
    return context.add.dynamicBitmapText(context.sys.canvas.width / 2, context.sys.canvas.height / 2 - y, 'joystix', text, size).setOrigin(0.5);
	}
	
	static ButtonCreator(element: Phaser.GameObjects.DynamicBitmapText, thisScene: Phaser.Scene, targetScene: string): void {
		element.setInteractive();
    element.on('pointerover', () => {
      element.fontSize += 2;
      element.tint = Math.random() * 0xffffff;
    })
    element.on('pointerout', () => {
      element.fontSize -= 2;
      element.clearTint();
		})
    element.setInteractive();
    element.on('pointerdown', () => {
      thisScene.scene.start(targetScene)
    })
	}
}

