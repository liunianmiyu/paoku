/**
 * Created by Administrator on 2014/10/10.
 */
var CoinSprite = cc.Sprite.extend({
    winSize:null,
    bigCoin:null,
    smallCoin:null,
    ZhangaiLayer:null,
    move_speed:null,
    ctor:function(layer,speed){
        this._super();
        this.ZhangaiLayer = layer;
        this.winSize = cc.director.getWinSize();
        this.move_speed = speed;
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames("res/coin/staroll.png",7,1,"coin");
    },
    init:function(){
        this.createCoin();
    },
    createCoin:function(){
        var coins = [6];
        for (var i = 0;i < 6;i ++){
            coins[i] = [15];
            for(var j = 0;j < 15;j ++){
                coins[i][j] = Math.floor(Math.random()+0.5);
                if(coins[i][j] == 1){
                    this.smallCoin = cc.Sprite.create("#coin_00");
                    this.smallCoin.attr({
                        x:this.winSize.width-150+j*25,
                        y:this.winSize.height-150-i*25
                    });
                    this.smallCoin.setTag(SmallCoin_Tag);
                    this.addChild(this.smallCoin);
                    this.Twinkle(this.smallCoin);
                    this.MoveSprite(this.smallCoin);
                }
            }
        }
    },
    createBigCoin:function(){
        this.bigCoin = cc.Sprite.create("res/coin/bigcoin.png");
        this.bigCoin.setTag(BigCoin_tag);
        this.bigCoin.attr({
            x:this.winSize.width-150,
            y:this.winSize.height-250
        });
        this.addChild(this.bigCoin);
        this.updown_bigcoin();
        this.MoveSprite(this.bigCoin);
    },
    Twinkle:function(sprite){
        var frames = [];
        for(var i = 0; i < 7;i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("coin_0"+i);
            frames.push(frame);
        }
        var TwinkleAnimation = cc.Animation.create(frames,0.1);
        var TwinkleAnimate = cc.Animate.create(TwinkleAnimation);
        sprite.runAction(TwinkleAnimate.repeatForever());
    },
    updown_bigcoin:function(){
        var jumpAction1 = cc.moveBy(1,cc.p(0,200));
        var jumpAction2 = cc.moveBy(1,cc.p(0,-200));
        this.bigCoin.runAction(cc.sequence(jumpAction1,jumpAction2).repeatForever());
    },
    MoveSprite:function(sprite){
        var moveAction = cc.moveBy(this.move_speed,cc.p(-this.winSize.width-100,0));
        sprite.runAction(moveAction);
    }
})