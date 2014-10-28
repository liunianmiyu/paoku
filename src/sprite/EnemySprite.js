/**
 * Created by Administrator on 2014/10/9.
 */
var EnemySprite = cc.Sprite.extend({
    winSize:null,
    enemy:null,
    falg:null,
    ctor:function(){
        this._super();
        this.winSize = cc.director.getWinSize();
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames("res/enemy/jiangshi.png",8,4,"jiangshi");
        mySpriteFrameCache.addSpriteFrames("res/enemy/jiangshi_dasi.png",5,4,"jiangshi_dasi");

    },
    init:function(){
        this.createJiangshi();
    },
    createJiangshi:function(){
        this.flag = Math.floor(Math.random()*3);
        this.initWithSpriteFrameName("jiangshi_"+this.flag+"0");
        var framesNum;
        if(this.flag == 0||this.flag == 2){
            framesNum = 8;
        }else{
            framesNum = 7;
        }
        var frames = [];
        for(var i = 0;i < framesNum; i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("jiangshi_"+this.flag+i);
            frames.push(frame);
        }
        var enemyAnimation = cc.Animation.create(frames,0.5/framesNum);
        var enemyAnimate = cc.Animate.create(enemyAnimation);
        this.runAction(enemyAnimate.repeatForever());
    },
    jiangshi_die:function(){
        SCORE += 100;
        var frames = [];
        for(var i = 0;i < 5; i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("jiangshi_dasi_"+this.flag+i);
            frames.push(frame);
        }
        var enemy_dieAnimation = cc.Animation.create(frames,0.5/5);
        var enemy_dieAnimate = cc.Animate.create(enemy_dieAnimation);
        var _this =this;
        var callFun = new cc.CallFunc(function(){
            _this.removeFromParent();
        });
        this.runAction(cc.sequence(enemy_dieAnimate,callFun));
    }
})