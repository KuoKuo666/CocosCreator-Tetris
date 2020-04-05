"use strict";
cc._RF.push(module, '3f519Rww+BNCqgfId5+X30+', 'enum');
// script/enum.ts

Object.defineProperty(exports, "__esModule", { value: true });
/** 不渲染与7个颜色 */
var ItemColor;
(function (ItemColor) {
    ItemColor[ItemColor["NULL"] = 0] = "NULL";
    ItemColor[ItemColor["Color1"] = 1] = "Color1";
    ItemColor[ItemColor["Color2"] = 2] = "Color2";
    ItemColor[ItemColor["Color3"] = 3] = "Color3";
    ItemColor[ItemColor["Color4"] = 4] = "Color4";
    ItemColor[ItemColor["Color5"] = 5] = "Color5";
    ItemColor[ItemColor["Color6"] = 6] = "Color6";
    ItemColor[ItemColor["Color7"] = 7] = "Color7";
})(ItemColor = exports.ItemColor || (exports.ItemColor = {}));
/** 触摸事件-上下左右滑动 */
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