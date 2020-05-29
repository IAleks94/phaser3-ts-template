import "phaser";

// Game config : GameConfig
const config = {
	width: 38*32,
	height: 16*32,
	title: "TS Phaser3",
	url: "https://example.com",
	version: "1.0",
	zoom: 1,
	type: Phaser.AUTO,
	parent: "game",
	input: {
		keyboard: true,
		mouse: true,
		touch: true,
		gamepad: false
	},
	backgroundColor: "#000000"
}

export default config;
