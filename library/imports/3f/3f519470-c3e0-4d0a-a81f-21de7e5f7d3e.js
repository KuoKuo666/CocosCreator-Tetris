"use strict";
cc._RF.push(module, '3f519Rww+BNCqgfId5+X30+', 'enum');
// script/enum.ts

Object.defineProperty(exports, "__esModule", { value: true });
/** 不渲染与7个类型 */
var ItemType;
(function (ItemType) {
    ItemType[ItemType["NULL"] = 0] = "NULL";
    ItemType[ItemType["SHAPE1"] = 1] = "SHAPE1";
    ItemType[ItemType["SHAPE2"] = 2] = "SHAPE2";
    ItemType[ItemType["SHAPE3"] = 3] = "SHAPE3";
    ItemType[ItemType["SHAPE4"] = 4] = "SHAPE4";
    ItemType[ItemType["SHAPE5"] = 5] = "SHAPE5";
    ItemType[ItemType["SHAPE6"] = 6] = "SHAPE6";
    ItemType[ItemType["SHAPE7"] = 7] = "SHAPE7";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
/** 事件类型枚举 */
var TouchEvent;
(function (TouchEvent) {
    TouchEvent["UP"] = "touch-up";
    TouchEvent["DOWN"] = "touch-down";
    TouchEvent["LEFT"] = "touch-left";
    TouchEvent["RIGHT"] = "touch-right";
})(TouchEvent = exports.TouchEvent || (exports.TouchEvent = {}));
/** 音效事件 */
var MusicEvent;
(function (MusicEvent) {
    MusicEvent["BGM"] = "bgm";
    MusicEvent["ACTION"] = "action";
    MusicEvent["GAME_OVER"] = "over";
    /** 方块消除 */
    MusicEvent["ELIMINATE"] = "eliminate";
})(MusicEvent = exports.MusicEvent || (exports.MusicEvent = {}));
/** 节点路径 */
var NodeUrl;
(function (NodeUrl) {
    NodeUrl["Canvas"] = "Canvas";
    NodeUrl["Music"] = "Music";
})(NodeUrl = exports.NodeUrl || (exports.NodeUrl = {}));

cc._RF.pop();