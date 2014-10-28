/**
 * 子弹类型：1：AK子弹
 *           2：蓝色子弹
 *           3：激光枪子弹
 *           4：炮弹
 * Created by Administrator on 2014/10/10.
 */
var BulletSprite = cc.Sprite.extend({
    winSize:null,
    theY:null,
    flag:1,
    bullet:null,
    GamePlayLayer:null,
    ctor:function(layer,y){
        this._super();
        this.GamePlayLayer = layer;
        this.theY = y;
        this.winSize = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.p_bullets);
    },
    init:function(){
        switch (this.flag){
            case 1:
                this.bullet = cc.Sprite.create("#akzidan.png");
                //this.initWithSpriteFrameName("akzidan.png");
                break;
            case 2:
                this.bullet = cc.Sprite.create("#bullets2.png");
                //this.initWithSpriteFrameName("bullets2.png");
                break;
            case 3:
                this.bullet = cc.Sprite.create("#jiguangzidan.png");
                //this.initWithSpriteFrameName("jiguangzidan.png");
                break;
            case 4:
                var mySpriteFrameCache = MySpriteFrameCache.getInstance();
                mySpriteFrameCache.addSpriteFrames("res/bullets/paodandezidan.png",1,2,"paodan");
                this.bullet = cc.Sprite.create("#paodan_00");
                //this.initWithSpriteFrameName("paodan_00");
                var frame1 = cc.spriteFrameCache.getSpriteFrame("paodan_00");
                var frame2 = cc.spriteFrameCache.getSpriteFrame("paodan_10");
                var frames = [frame1,frame2];
                var paodanAnimation = cc.Animation.create(frames,0.1);
                var paodanAniamte = cc.Animate.create(paodanAnimation);
                this.runAction(paodanAniamte.repeatForever());
                break;
            default :
                break;
        }
        this.bullet.attr({
            x:280,
            y:this.theY
        });
        this.addChild(this.bullet);
        this.shot_bullets();
    },
    shot_bullets:function(){
        var moveAction = cc.moveBy(0.2,cc.p(this.winSize.width-250,0));
        var _this = this;
        var callFunc = new cc.CallFunc(function(){
            _this.bullet.removeFromParent();
            setTimeout(function(){
                _this.GamePlayLayer.initBullets();
            },4000);
        });
        this.bullet.runAction(cc.sequence(moveAction,callFunc));
    },
    bullet_collision:function(sprite){
        var bulletRect = this.getChildren()[0].getBoundingBox();
        var spriteRect = sprite.getBoundingBox();
        var tag =sprite.getTag();
        if(cc.rectIntersectsRect(bulletRect,spriteRect)){
            this.getChildren()[0].setVisible(false);
            var _this = this;
            if(tag == Enemy_tag){
                this.GamePlayLayer.collide_result(10);
            }
        }
    }
})