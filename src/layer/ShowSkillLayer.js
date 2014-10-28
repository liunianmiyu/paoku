/**
 * Created by Administrator on 2014/10/21.
 */
var ShowSkillLayer = cc.Layer.extend({
    winSize:null,
    skill_type:null,
    ctor:function(flag){
        this._super();
        this.skill_type = flag;
        this.winSize = cc.director.getWinSize();
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames(res.img_biantiao,1,10,"bg");
        mySpriteFrameCache.addSpriteFrames(res.img_bianzi,5,2,"skill_word");
        cc.spriteFrameCache.addSpriteFrames(res.p_skill);
    },
    init:function(){
        this.initBg();
        this.initSkillType();
    },
    initBg:function(){
        var bg = cc.Sprite.create("#bg_00");
        bg.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        bg.setScale(3);
        this.addChild(bg);
        var frames = [];
        for(var i = 0; i < 10; i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("bg_"+i+"0");
            frames.push(frame);
        }
        var bgAnimation = cc.Animation.create(frames,0.1);
        var bgAnimate = cc.Animate.create(bgAnimation);
        var _this = this;
        var callFun = new cc.CallFunc(function(){
            _this.removeFromParent();
        });
        bg.runAction(cc.sequence(bgAnimate,callFun));
    },
    initSkillType:function(){
        switch (this.skill_type){
            case 1:
                var skill_icon = cc.Sprite.create("#item_1.png");
                var skill_word = cc.Sprite.create("#skill_word_01");
                break;
            case 2:
                var skill_icon = cc.Sprite.create("#item_2.png");
                var skill_word = cc.Sprite.create("#skill_word_01");
                break;
            default :
                break;
        }
        skill_icon.attr({
            x:this.winSize.width/2-100,
            y:this.winSize.height/2
        });
        skill_word.attr({
            x:this.winSize.width/2+100,
            y:this.winSize.height/2
        });
        this.addChild(skill_icon);
        this.addChild(skill_word);
    }
})