import { config } from "./config"

const {ccclass, property} = cc._decorator

@ccclass
export default class Render extends cc.Component {

    @property(cc.Prefab)
    item: cc.Prefab = undefined

    @property([cc.SpriteFrame])
    itemSpriteFrames: cc.SpriteFrame[] = []

    /** 游戏层上应该铺满节点，然后根据数据渲染 */
    itemArray: cc.Node[][] = []

    onLoad () {
        this.init()
    }

    init () {
        const height = config.row * config.blockHeight
        const width = config.col * config.blockWidth
        // 初始化所有节点
        for (let i = 0; i < config.row; i++) {
            this.itemArray[i] = []
            for (let j = 0; j < config.col; j++) {
                const x = -width / 2 + config.blockWidth / 2 + j * config.blockWidth
                const y = height / 2 - config.blockHeight / 2 - i * config.blockHeight
                const item = this.createItem(x, y)
                this.itemArray[i][j] = item
            }
        }
    }

    /** 根据传入二维数组进行渲染 */
    render (dataArray: number[][]) {
        for (let i = 0; i < config.row; i++) {
            for (let j = 0; j < config.col; j++) {
                const type = dataArray[i][j]
                this.itemArray[i][j].getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[type - 1]
            }
        }
    }

    createItem (x: number, y: number): cc.Node {
        let item = cc.instantiate(this.item)
        this.node.addChild(item)
        item.setPosition(x, y)
        item.setContentSize(config.itemWidth, config.itemHeight)
        return item
    }
}
