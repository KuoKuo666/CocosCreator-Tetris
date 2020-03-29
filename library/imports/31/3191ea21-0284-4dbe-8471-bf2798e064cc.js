"use strict";
cc._RF.push(module, '3191eohAoRNvoRxvyeY4GTM', 'music');
// script/music.ts

Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Music = /** @class */ (function (_super) {
    __extends(Music, _super);
    function Music() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = undefined;
        _this.effects = [];
        return _this;
    }
    Music.prototype.onLoad = function () {
        this.registerEvent();
    };
    Music.prototype.registerEvent = function () {
        var _this = this;
        // 对应所有音频的类型
        this.node.on(enum_1.MusicEvent.BGM, function () { return cc.audioEngine.play(_this.bgm, true, 0.3); }, this);
        this.node.on(enum_1.MusicEvent.ACTION, function () { return cc.audioEngine.playEffect(_this.effects[0], false); }, this);
        this.node.on(enum_1.MusicEvent.GAME_OVER, function () { return cc.audioEngine.playEffect(_this.effects[1], false); }, this);
        this.node.on(enum_1.MusicEvent.ELIMINATE, function () { return cc.audioEngine.playEffect(_this.effects[2], false); }, this);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Music.prototype, "bgm", void 0);
    __decorate([
        property({ type: [cc.AudioClip] })
    ], Music.prototype, "effects", void 0);
    Music = __decorate([
        ccclass
    ], Music);
    return Music;
}(cc.Component));
exports.default = Music;

cc._RF.pop();