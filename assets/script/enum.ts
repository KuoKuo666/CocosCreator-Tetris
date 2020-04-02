/** 不渲染与7个类型 */
export enum ItemType {
    NULL = 0,
    SHAPE1,
    SHAPE2,
    SHAPE3,
    SHAPE4,
    SHAPE5,
    SHAPE6,
    SHAPE7,
}

/** 触摸事件-上下左右滑动 */
export enum TouchEvent {
    UP = 'touch-up',
    DOWN = 'touch-down',
    LEFT = 'touch-left',
    RIGHT = 'touch-right'
}

/** 音效事件 */
export enum MusicEvent {
    BGM = 'bgm',
    ACTION = 'action',
    GAME_OVER = 'over',
    /** 方块消除 */
    ELIMINATE = 'eliminate'
}

/** 节点路径 */
export enum NodeUrl {
    Canvas = 'Canvas',
    Music = 'Music'
}