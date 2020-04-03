const {ccclass, property} = cc._decorator;

@ccclass
export default class Tool extends cc.Component {

    @property(cc.Node)
    buttons: cc.Node = undefined

    clickData: boolean[][] = []

    onLoad () {
        this.initData()
        this.registerEvent()
        this.clear()
    }

    initData () {
        for(let i = 0; i < 4; i++) {
            this.clickData[i] = []
            for (let j = 0; j < 4; j++) {
                this.clickData[i][j] = false
            }
        }
    }

    outData () {
        // cc.log(this.clickData)
        const data: cc.Vec2[] = []
        for(let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.clickData[i][j]) {
                    data.push(cc.v2(i, j))
                }
            }
        }
        // 做偏移后转字符串
        let str = '['
        data.forEach((v, index) => {
            const x = v.x - 1
            const y = v.y - 1
            str += `cc.v2(${x}, ${y})`
            if (index !== data.length - 1) {
                str += ', '
            }
        })
        str += ']'
        cc.log(str)
    }

    clear () {
        this.buttons.children.forEach((node, index) => {
            const bk = node.children[0]
            bk.color = cc.color(220, 220, 220)
            const pos = this.indexToRowCol(index)
            this.clickData[pos.x][pos.y] = false
        })
    }

    onButtonClick (index: number, node: cc.Node) {
        const bk = node.children[0]
        bk.color = cc.Color.GREEN
        const pos = this.indexToRowCol(index)
        this.clickData[pos.x][pos.y] = true
    }

    registerEvent () {
        this.buttons.children.forEach((node, index) => {
            node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
                this.onButtonClick(index, event.target)
            })
        })
    }

    /** 0-15 转化为数据坐标 */
    indexToRowCol (index: number) {
        const row = Math.floor(index / 4)
        const col = index % 4
        // cc.warn(row, col)
        return cc.v2(row, col)
    }

}
