"use strict";
cc._RF.push(module, '52073YquUJE1Zi+6Jw3DGup', 'main');
// script/main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var render_1 = require("./render");
var enum_1 = require("./enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderClass = undefined;
        _this.startPanel = undefined;
        /** 二维数组 */
        _this.dataArray = [];
        /** 当前形状 */
        _this.currentShape = {
            center: cc.v2(0, 0),
            index: 0,
            color: enum_1.ItemColor.NULL
        };
        /** 计时变量 */
        _this.time = 0;
        /** 游戏进行开关 */
        _this.isOpen = false;
        return _this;
    }
    Main.prototype.onLoad = function () {
        this.registerEvent();
    };
    Main.prototype.start = function () {
        // 游戏音乐 BGM
        cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.BGM);
    };
    Main.prototype.registerEvent = function () {
        var _this = this;
        // touch 脚本传来上下左右事件，上：变形，下：下一个格子，左右：左右移动一个格子
        this.node.on(enum_1.TouchEvent.UP, function () {
            _this.changeCurrentShapeIndex();
        }, this);
        this.node.on(enum_1.TouchEvent.DOWN, function () {
            _this.changeCurrentShapePos(cc.v2(1, 0));
        }, this);
        this.node.on(enum_1.TouchEvent.LEFT, function () {
            _this.changeCurrentShapePos(cc.v2(0, -1));
        }, this);
        this.node.on(enum_1.TouchEvent.RIGHT, function () {
            _this.changeCurrentShapePos(cc.v2(0, 1));
        }, this);
    };
    /** 点击开始游戏按钮后触发 */
    Main.prototype.gameStart = function () {
        this.startPanel.active = false;
        this.initData();
        this.render();
        this.randomOneShape();
        this.isOpen = true;
    };
    Main.prototype.initData = function () {
        for (var i = 0; i < config_1.config.row; i++) {
            this.dataArray[i] = [];
            for (var j = 0; j < config_1.config.col; j++) {
                this.dataArray[i][j] = enum_1.ItemColor.NULL;
            }
        }
    };
    /** 随机生成 */
    Main.prototype.randomOneShape = function () {
        var _this = this;
        this.currentShape.center.set(config_1.config.startPos);
        // 随机类型
        this.currentShape.color = Math.floor(1 + 7 * Math.random());
        // 随机开始的下标
        this.currentShape.index = Math.floor(4 * Math.random());
        // 检测游戏结束
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
        }
        else {
            cc.warn('游戏结束');
            this.isOpen = false;
            this.setCurrentData(this.currentShape);
            cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.GAME_OVER);
            this.scheduleOnce(function () {
                // 显示游戏开始菜单
                _this.startPanel.active = true;
            }, 2);
        }
    };
    /** 根据当前中心点和形状类型清除数据 */
    Main.prototype.clearCurrentData = function (currentShape) {
        var _this = this;
        var center = currentShape.center, color = currentShape.color, index = currentShape.index;
        var shape = "shape" + color;
        var shapeData = config_1.config[shape];
        shapeData[index].forEach(function (ele) {
            var row = center.x + ele.x;
            var col = center.y + ele.y;
            _this.dataArray[row][col] = enum_1.ItemColor.NULL;
        });
    };
    /** 根据当前中心点和形状类型加入数据 */
    Main.prototype.setCurrentData = function (currentShape) {
        var _this = this;
        var center = currentShape.center, color = currentShape.color, index = currentShape.index;
        var shape = "shape" + color;
        var shapeData = config_1.config[shape];
        shapeData[index].forEach(function (ele) {
            var row = center.x + ele.x;
            var col = center.y + ele.y;
            _this.dataArray[row][col] = color;
        });
        // 刷新视图
        this.render();
    };
    /** 判断传入中心点和形状类型是否合理 */
    Main.prototype.isCurrentDataOK = function (currentShape) {
        var center = currentShape.center, color = currentShape.color, index = currentShape.index;
        var shape = "shape" + color;
        var shapeData = config_1.config[shape];
        var shapeIndexDate = shapeData[index];
        for (var i = 0; i < shapeIndexDate.length; i++) {
            var row = center.x + shapeIndexDate[i].x;
            if (row < 0 || row >= config_1.config.row) {
                return false;
            }
            var col = center.y + shapeIndexDate[i].y;
            if (col < 0 || col >= config_1.config.col) {
                return false;
            }
            if (this.dataArray[row][col] !== enum_1.ItemColor.NULL) {
                return false;
            }
        }
        return true;
    };
    /** 操作变形逻辑 */
    Main.prototype.changeCurrentShapeIndex = function () {
        this.clearCurrentData(this.currentShape);
        this.currentShape.index += this.currentShape.index === 3 ? -3 : 1;
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
            cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.ACTION);
        }
        else {
            cc.warn('操作不合理');
            this.currentShape.index += this.currentShape.index === 0 ? 3 : -1;
        }
    };
    /** 操作逻辑 */
    Main.prototype.changeCurrentShapePos = function (v) {
        this.clearCurrentData(this.currentShape);
        this.currentShape.center.x += v.x;
        this.currentShape.center.y += v.y;
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
        }
        else {
            cc.warn('操作不合理');
            this.currentShape.center.x -= v.x;
            this.currentShape.center.y -= v.y;
        }
    };
    /** 检测消除行 */
    Main.prototype.checkLines = function () {
        // 从下往上，写一个 while 检测所有满的行
        var row = config_1.config.row - 1;
        // 有消除
        var isEliminated = false;
        while (row !== 0) {
            var isFull = true;
            for (var j = 0; j < config_1.config.col; j++) {
                if (this.dataArray[row][j] === enum_1.ItemColor.NULL) {
                    isFull = false;
                }
            }
            // 如果该行满了，消除本行，所有数据下移，再检测一次
            if (isFull) {
                isEliminated = true;
                for (var p = row; p > 0; p--) {
                    for (var q = 0; q < config_1.config.col; q++) {
                        this.dataArray[p][q] = this.dataArray[p - 1][q];
                    }
                }
            }
            else {
                row--;
            }
        }
        if (isEliminated) {
            cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.ELIMINATE);
        }
    };
    /** 自动下落逻辑 */
    Main.prototype.autoDown = function () {
        this.clearCurrentData(this.currentShape);
        this.currentShape.center.x += 1;
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
        }
        else {
            cc.warn('无法下移动，下一个');
            this.currentShape.center.x -= 1;
            this.setCurrentData(this.currentShape);
            // 消除逻辑
            this.checkLines();
            // 下一个形状
            this.randomOneShape();
        }
    };
    Main.prototype.update = function (dt) {
        if (!this.isOpen) {
            return;
        }
        this.time += dt;
        if (this.time > 1) {
            this.time = 0;
            // 下落逻辑
            this.autoDown();
        }
    };
    /** 刷新视图 */
    Main.prototype.render = function () {
        this.renderClass.render(this.dataArray);
    };
    __decorate([
        property(render_1.default)
    ], Main.prototype, "renderClass", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "startPanel", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

cc._RF.pop();