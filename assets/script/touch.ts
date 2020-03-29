import { TouchEvent } from "./enum"

const {ccclass, property} = cc._decorator

@ccclass
export default class Touch extends cc.Component {

    onLoad () {
       this.registerEvent()
    }

    registerEvent () {
        this.node.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            let startPoint = e.getStartLocation()
            let endPonit = e.getLocation()
            let v = endPonit.sub(startPoint)
            // cc.log(v)
            let radians = Math.atan2(v.y, v.x)
            let degrees = cc.misc.radiansToDegrees(radians)
            /** 将角度划分 8 块区域，方便处理，注意恰好 360 度 */
            let index = Math.floor(degrees / 45)
            this.emitEventByIndex(index)
        }, this)
    }

    emitEventByIndex (index: number) {
        // main 上有对应监听，注意如果两个脚本没同时绑定在一个节点上，此处就不能用 this.node 了
        if (index === 0 || index === -1) {
            this.node.emit(TouchEvent.RIGHT)
        } else if (index === 1 || index === 2) {
            this.node.emit(TouchEvent.UP)
        } else if (index === -2 || index === -3) {
            this.node.emit(TouchEvent.DOWN)
        } else if (index === -4 || index === 3 || index === 4) {
            this.node.emit(TouchEvent.LEFT)
        } else {
            cc.error(`无此方向${index}`)
        }
    }

}
