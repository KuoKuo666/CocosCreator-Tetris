/** 不渲染与7个颜色 */
export enum ItemColor {
    NULL = 0,
    Color1,
    Color2,
    Color3,
    Color4,
    Color5,
    Color6,
    Color7,
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