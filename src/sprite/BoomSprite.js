/**
 * Created by Administrator on 2014/10/9.
 */
var BoomSprite = cc.Sprite.extend({
    winSize:null,
    GamePlayLayer:null,
    ctor:function(layer){
        this._super();
        this.GamePlayLayer = layer;
        this.winSize = cc.director.getWinSize();
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames("res/boom/openboom.png",11,1,"open_boom");
        mySpriteFrameCache.addSpriteFrames("res/boom/baozha.png",10,1,"elec_boom");
        mySpriteFrameCache.addSpriteFrames("res/boom/explosionx.png",8,1,"shot_boom");
    },
    init:function(){
    },
    initOpenBoom:function(){
        var openboom = cc.Sprite.create("#open_boom_00");
        openboom.setScale(10);
        this.addChild(openboom);
        var moveAction = cc.MoveBy.create(1,cc.p(50,0));
        var frames = [];
        for(var i = 0; i < 11; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("open_boom_0"+i);
            frames.push(frame);
        }
        var openboomAnimation = cc.Animation.create(frames,1/11);
        var openboomAnimate = cc.Animate.create(openboomAnimation);
        var _this = this;
        var callFun = new cc.CallFunc(function(){
            openboom.removeFromParent();
            _this.GamePlayLayer.layerMove();
        });
        openboom.runAction(cc.sequence(cc.spawn(moveAction,openboomAnimate),callFun));
    },
    shot_boom:function(x,y){
        var shot_boom = cc.Sprite.create("#shot_boom_00");
        shot_boom.setScale(3);
        shot_boom.attr({
            x:x-150,
            y:y+30
        });
        this.addChild(shot_boom);
        var frames = [];
        for(var i = 0; i < 8; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("shot_boom_0"+i);
            frames.push(frame);
        }
        var shotboomAnimation = cc.Animation.create(frames,0.5/8);
        var shotboomAnimate = cc.Animate.create(shotboomAnimation);
        var callFun = new cc.CallFunc(function(){
            shot_boom.removeFromParent();
        });
        shot_boom.runAction(cc.sequence(shotboomAnimate,callFun));
    },
    electric_boom:function(){
        var elec_boom = cc.Sprite.create("#elec_boom_00");
        elec_boom.setScale(5);
        this.addChild(elec_boom);
        var frames = [];
        for(var i = 0; i < 10; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("elec_boom_0"+i);
            frames.push(frame);
        }
        var shotboomAnimation = cc.Animation.create(frames,1/8);
        var shotboomAnimate = cc.Animate.create(shotboomAnimation);
        var callFun = new cc.CallFunc(function(){
            elec_boom.removeFromParent();
        });
        elec_boom.runAction(cc.sequence(shotboomAnimate,callFun));
    }
})