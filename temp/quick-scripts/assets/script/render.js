(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/render.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'af5cbAjVx9L459whaT0CJ9E', 'render', __filename);
// script/render.ts

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Render = /** @class */ (function (_super) {
    __extends(Render, _super);
    function Render() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = undefined;
        _this.itemSpriteFrames = [];
        /** 游戏层上应该铺满节点，然后根据数据渲染 */
        _this.itemArray = [];
        return _this;
    }
    Render.prototype.onLoad = function () {
        this.init();
    };
    Render.prototype.init = function () {
        var height = config_1.config.row * config_1.config.blockHeight;
        var width = config_1.config.col * config_1.config.blockWidth;
        // 初始化所有节点
        for (var i = 0; i < config_1.config.row; i++) {
            this.itemArray[i] = [];
            for (var j = 0; j < config_1.config.col; j++) {
                var x = -width / 2 + config_1.config.blockWidth / 2 + j * config_1.config.blockWidth;
                var y = height / 2 - config_1.config.blockHeight / 2 - i * config_1.config.blockHeight;
                var item = this.createItem(x, y);
                this.itemArray[i][j] = item;
            }
        }
    };
    /** 根据传入二维数组进行渲染 */
    Render.prototype.render = function (dataArray) {
        for (var i = 0; i < config_1.config.row; i++) {
            for (var j = 0; j < config_1.config.col; j++) {
                var color = dataArray[i][j];
                // 拖入图片 0-6，颜色枚举 1-7
                this.itemArray[i][j].getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[color - 1];
            }
        }
    };
    Render.prototype.createItem = function (x, y) {
        var item = cc.instantiate(this.item);
        this.node.addChild(item);
        item.setPosition(x, y);
        item.setContentSize(config_1.config.itemWidth, config_1.config.itemHeight);
        return item;
    };
    __decorate([
        property(cc.Prefab)
    ], Render.prototype, "item", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Render.prototype, "itemSpriteFrames", void 0);
    Render = __decorate([
        ccclass
    ], Render);
    return Render;
}(cc.Component));
exports.default = Render;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=render.js.map
        