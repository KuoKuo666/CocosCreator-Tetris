import { config } from "./config"
import Render from "./render"
import { TouchEvent, ItemColor, NodeUrl, MusicEvent } from "./enum"

const {ccclass, property} = cc._decorator

export interface CurrentShapeData {
    /** 指向当前形状中心 */
    center: cc.Vec2,
    /** 当前形状翻转下标，0-3，可以翻转 4 种形态 */
    index: number,
    /** 什么颜色的方块 */
    color: ItemColor
}

@ccclass
export default class Main extends cc.Component {

    @property(Render)
    renderClass: Render = undefined

    @property(cc.Node)
    startPanel: cc.Node = undefined

    /** 二维数组 */
    dataArray: ItemColor[][] = []

    /** 当前形状 */
    currentShape: CurrentShapeData = {
        center: cc.v2(0, 0),
        index: 0,
        color: ItemColor.NULL
    }

    /** 计时变量 */
    time: number = 0

    /** 游戏进行开关 */
    isOpen: boolean = false

    onLoad () {
        this.registerEvent()
    }

    start () {
        // 游戏音乐 BGM
        cc.find(NodeUrl.Music).emit(MusicEvent.BGM)
    }

    registerEvent () {
        // touch 脚本传来上下左右事件，上：变形，下：下一个格子，左右：左右移动一个格子
        this.node.on(TouchEvent.UP, () => {
            this.changeCurrentShapeIndex()
        }, this)

        this.node.on(TouchEvent.DOWN, () => {
            this.changeCurrentShapePos(cc.v2(1, 0))
        }, this)

        this.node.on(TouchEvent.LEFT, () => {
            this.changeCurrentShapePos(cc.v2(0, -1))
        }, this)

        this.node.on(TouchEvent.RIGHT, () => {
            this.changeCurrentShapePos(cc.v2(0, 1))
        }, this)
    }

    /** 点击开始游戏按钮后触发 */
    gameStart () {
        this.startPanel.active = false
        this.initData()
        this.render()
        this.randomOneShape()
        this.isOpen = true
    }

    initData () {
        for (let i = 0; i < config.row; i++) {
            this.dataArray[i] = []
            for (let j = 0; j < config.col; j++) {
                this.dataArray[i][j] = ItemColor.NULL
            }
        }
    }

    /** 随机生成 */
    randomOneShape () {
        this.currentShape.center.set(config.startPos)
        // 随机类型
        this.currentShape.color = Math.floor(1 + 7 * Math.random())
        // 随机开始的下标
        this.currentShape.index = Math.floor(4 * Math.random())
        // 检测游戏结束
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape)
        } else {
            cc.warn('游戏结束')
            this.isOpen = false
            this.setCurrentData(this.currentShape)
            cc.find(NodeUrl.Music).emit(MusicEvent.GAME_OVER)
            this.scheduleOnce(() => {
                // 显示游戏开始菜单
                this.startPanel.active = true
            }, 2)
        }
    }

    /** 根据当前中心点和形状类型清除数据 */
    clearCurrentData (currentShape: CurrentShapeData) {
        const { center, color, index } = currentShape
        const shape = `shape${color}`
        const shapeData: cc.Vec2[][] = config[shape]
        shapeData[index].forEach(ele => {
            const row = center.x + ele.x
            const col = center.y + ele.y
            this.dataArray[row][col] = ItemColor.NULL
        })
    }

    /** 根据当前中心点和形状类型加入数据 */
    setCurrentData (currentShape: CurrentShapeData) {
        const { center, color, index } = currentShape
        const shape = `shape${color}`
        const shapeData: cc.Vec2[][] = config[shape]
        shapeData[index].forEach(ele => {
            const row = center.x + ele.x
            const col = center.y + ele.y
            this.dataArray[row][col] = color
        })
        // 刷新视图
        this.render()
    }

    /** 判断传入中心点和形状类型是否合理 */
    isCurrentDataOK (currentShape: CurrentShapeData): boolean {
        const { center, color, index } = currentShape
        const shape = `shape${color}`
        const shapeData: cc.Vec2[][] = config[shape]
        const shapeIndexDate: cc.Vec2[] = shapeData[index]
        for (let i = 0; i < shapeIndexDate.length; i++) {
            const row = center.x + shapeIndexDate[i].x
            if (row < 0 || row >= config.row) {
                return false
            }
            const col = center.y + shapeIndexDate[i].y
            if (col < 0 || col >= config.col) {
                return false
            }
            if (this.dataArray[row][col] !== ItemColor.NULL) {
                return false
            }
        }
        return true
    }

    /** 操作变形逻辑 */
    changeCurrentShapeIndex () {
        this.clearCurrentData(this.currentShape)
        this.currentShape.index += this.currentShape.index === 3 ? -3 : 1
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape)
            cc.find(NodeUrl.Music).emit(MusicEvent.ACTION)
        } else {
            cc.warn('操作不合理')
            this.currentShape.index += this.currentShape.index === 0 ? 3 : -1
        }
    }

    /** 操作逻辑 */
    changeCurrentShapePos (v: cc.Vec2) {
        this.clearCurrentData(this.currentShape)
        this.currentShape.center.x += v.x
        this.currentShape.center.y += v.y
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape)
        } else {
            cc.warn('操作不合理')
            this.currentShape.center.x -= v.x
            this.currentShape.center.y -= v.y
        }
    }

    /** 检测消除行 */
    checkLines () {
        // 从下往上，写一个 while 检测所有满的行
        let row: number = config.row - 1
        // 有消除
        let isEliminated: boolean = false
        while (row !== 0) {
            let isFull: boolean = true
            for (let j = 0; j < config.col; j++) {
                if (this.dataArray[row][j] === ItemColor.NULL) {
                    isFull = false
                }
            }
            // 如果该行满了，消除本行，所有数据下移，再检测一次
            if (isFull) {
                isEliminated = true
                for (let p = row; p > 0; p--) {
                    for (let q = 0; q < config.col; q++) {
                        this.dataArray[p][q] = this.dataArray[p - 1][q]
                    }
                }
            } else {
                row--
            }
        }
        if (isEliminated) {
            cc.find(NodeUrl.Music).emit(MusicEvent.ELIMINATE)
        }
    }

    /** 自动下落逻辑 */
    autoDown () {
        this.clearCurrentData(this.currentShape)
        this.currentShape.center.x += 1
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape)
        } else {
            cc.warn('无法下移动，下一个')
            this.currentShape.center.x -= 1
            this.setCurrentData(this.currentShape)
            // 消除逻辑
            this.checkLines()
            // 下一个形状
            this.randomOneShape()
        }
    }

    update (dt: number) {
        if (!this.isOpen) {
            return
        }
        this.time += dt
        if (this.time > 1) {
            this.time = 0
            // 下落逻辑
            this.autoDown()
        }
    }

    /** 刷新视图 */
    render () {
        this.renderClass.render(this.dataArray)
    }

}
