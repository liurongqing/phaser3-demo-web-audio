import { Keys } from '~/consts/index'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private music!: any
  constructor() {
    super(Keys.GameScene)
  }
  create() {
    const { width, height } = this.scale
    this.music = this.sound.add('testAudio', { volume: 0.2, loop: true })
    this.sound.pauseOnBlur = false

    // 避免多个 AudioContext 警告
    if (!this.sound.locked) {
     this.music.play()
    } else {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.music.play()
      })
    }


    // 解决 iOS 切回来时音频无法恢复问题
    this.game.events.on(Phaser.Core.Events.BLUR, () => {
      console.log('游戏失去焦点')
      this.handleLoseFocus()
    })

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) return
      console.log('页面失去焦点')
      this.handleLoseFocus()
    })


    this.add.image(width * 0.5, height * 0.5, 'bg')
  }

  handleLoseFocus() {
    if (this.scene.isActive(Keys.PausedScene)) return
    this.music.pause()
    this.scene.run(Keys.PausedScene, {
      onResume: () => {
        this.scene.stop(Keys.PausedScene)
        this.music.resume()
      }
    })
  }
}
