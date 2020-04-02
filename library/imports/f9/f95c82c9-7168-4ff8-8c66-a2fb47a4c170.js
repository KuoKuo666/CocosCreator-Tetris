"use strict";
cc._RF.push(module, 'f95c8LJcWhP+IxmovtHpMFw', 'touch');
// script/touch.ts

Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Touch = /** @class */ (function (_super) {
    __extends(Touch, _super);
    function Touch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aimNode = undefined;
        return _this;
    }
    Touch.prototype.onLoad = function () {
        this.registerEvent();
    };
    Touch.prototype.registerEvent = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            var startPoint = e.getStartLocation();
            var endPonit = e.getLocation();
            // 起点与终点相减
            var v = endPonit.sub(startPoint);
            // 转弧度
            var radians = Math.atan2(v.y, v.x);
            // 弧度转角度
            var degrees = cc.misc.radiansToDegrees(radians);
            /** 将角度划分 8 块区域，方便处理，注意恰好 360 度 */
            var index = Math.floor(degrees / 45);
            _this.emitEventByIndex(index);
        }, this);
    };
    Touch.prototype.emitEventByIndex = function (index) {
        // 8 方向判断
        if (index === 0 || index === -1) {
            this.aimNode.emit(enum_1.TouchEvent.RIGHT);
        }
        else if (index === 1 || index === 2) {
            this.aimNode.emit(enum_1.TouchEvent.UP);
        }
        else if (index === -2 || index === -3) {
            this.aimNode.emit(enum_1.TouchEvent.DOWN);
        }
        else if (index === -4 || index === 3 || index === 4) {
            this.aimNode.emit(enum_1.TouchEvent.LEFT);
        }
        else {
            cc.error("\u65E0\u6B64\u65B9\u5411" + index);
        }
    };
    __decorate([
        property(cc.Node)
    ], Touch.prototype, "aimNode", void 0);
    Touch = __decorate([
        ccclass
    ], Touch);
    return Touch;
}(cc.Component));
exports.default = Touch;

cc._RF.pop();