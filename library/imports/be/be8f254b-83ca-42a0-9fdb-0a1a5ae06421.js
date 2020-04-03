"use strict";
cc._RF.push(module, 'be8f2VLg8pCoJ/bChpa4GQh', 'config-tool');
// tool/config-tool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tool = /** @class */ (function (_super) {
    __extends(Tool, _super);
    function Tool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buttons = undefined;
        _this.clickData = [];
        return _this;
    }
    Tool.prototype.onLoad = function () {
        this.initData();
        this.registerEvent();
        this.clear();
    };
    Tool.prototype.initData = function () {
        for (var i = 0; i < 4; i++) {
            this.clickData[i] = [];
            for (var j = 0; j < 4; j++) {
                this.clickData[i][j] = false;
            }
        }
    };
    Tool.prototype.outData = function () {
        // cc.log(this.clickData)
        var data = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.clickData[i][j]) {
                    data.push(cc.v2(i, j));
                }
            }
        }
        // 做偏移后转字符串
        var str = '[';
        data.forEach(function (v, index) {
            var x = v.x - 1;
            var y = v.y - 1;
            str += "cc.v2(" + x + ", " + y + ")";
            if (index !== data.length - 1) {
                str += ', ';
            }
        });
        str += ']';
        cc.log(str);
    };
    Tool.prototype.clear = function () {
        var _this = this;
        this.buttons.children.forEach(function (node, index) {
            var bk = node.children[0];
            bk.color = cc.color(220, 220, 220);
            var pos = _this.indexToRowCol(index);
            _this.clickData[pos.x][pos.y] = false;
        });
    };
    Tool.prototype.onButtonClick = function (index, node) {
        var bk = node.children[0];
        bk.color = cc.Color.GREEN;
        var pos = this.indexToRowCol(index);
        this.clickData[pos.x][pos.y] = true;
    };
    Tool.prototype.registerEvent = function () {
        var _this = this;
        this.buttons.children.forEach(function (node, index) {
            node.on(cc.Node.EventType.TOUCH_END, function (event) {
                _this.onButtonClick(index, event.target);
            });
        });
    };
    /** 0-15 转化为数据坐标 */
    Tool.prototype.indexToRowCol = function (index) {
        var row = Math.floor(index / 4);
        var col = index % 4;
        // cc.warn(row, col)
        return cc.v2(row, col);
    };
    __decorate([
        property(cc.Node)
    ], Tool.prototype, "buttons", void 0);
    Tool = __decorate([
        ccclass
    ], Tool);
    return Tool;
}(cc.Component));
exports.default = Tool;

cc._RF.pop();