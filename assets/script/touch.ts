import { TouchEvent } from "./enum"

const {ccclass, property} = cc._decorator

@ccclass
export default class Touch extends cc.Component {

    @property(cc.Node)
    aimNode: cc.Node = undefined

    onLoad () {
       this.registerEvent()
    }

    registerEvent () {
        this.node.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            let startPoint = e.getStartLocation()
            let endPonit = e.getLocation()
            // 起点与终点相减
            let v = endPonit.sub(startPoint)
            // 转弧度
            let radians = Math.atan2(v.y, v.x)
            // 弧度转角度
            let degrees = cc.misc.radiansToDegrees(radians)
            /** 将角度划分 8 块区域，方便处理，注意恰好 360 度 */
            let index = Math.floor(degrees / 45)
            this.emitEventByIndex(index)
        }, this)
    }

    emitEventByIndex (index: number) {
        // 8 方向判断
        if (index === 0 || index === -1) {
            this.aimNode.emit(TouchEvent.RIGHT)
        } else if (index === 1 || index === 2) {
            this.aimNode.emit(TouchEvent.UP)
        } else if (index === -2 || index === -3) {
            this.aimNode.emit(TouchEvent.DOWN)
        } else if (index === -4 || index === 3 || index === 4) {
            this.aimNode.emit(TouchEvent.LEFT)
        } else {
            cc.error(`无此方向${index}`)
        }
    }

}
