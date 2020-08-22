import { Keys } from "~/consts/index";

export default class Paused extends Phaser.Scene {
  constructor() {
    super(Keys.PausedScene)
  }
  preload() {
    this.load.image('bg', 'assets/images/bg.jpg')
    this.load.audio('testAudio', [
      'assets/audio/test.ogg'
    ])
  }
  create(data: any) {
    const { width, height } = this.scale
    this.add.text(width * 0.5, height * 0.5, '暫停中...')
    const testText = this.add.text(width * 0.5, height * 0.6, '继续', {
      fontSize: 40
    }).setInteractive()

    testText.on('pointerdown', () => {
      data?.onResume?.()
    })
  }
  update() { }
}
