import { MusicEvent } from "./enum"

const {ccclass, property} = cc._decorator

@ccclass
export default class Music extends cc.Component {

    @property({ type : cc.AudioClip })
    bgm: cc.AudioClip = undefined

    @property({ type : [cc.AudioClip] })
    effects: cc.AudioClip[] = []

    onLoad () {
        this.registerEvent()
    }

    registerEvent () {
        // 对应所有音频的类型
        this.node.on(MusicEvent.BGM, () => cc.audioEngine.play(this.bgm, true, 0.3), this)
        this.node.on(MusicEvent.ACTION, () => cc.audioEngine.playEffect(this.effects[0], false), this)
        this.node.on(MusicEvent.GAME_OVER, () => cc.audioEngine.playEffect(this.effects[1], false), this)
        this.node.on(MusicEvent.ELIMINATE, () => cc.audioEngine.playEffect(this.effects[2], false), this)
    }

}
