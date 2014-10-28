/**
 * Created by Administrator on 2014/10/9.
 */
var SkillSprite = cc.Sprite.extend({
    winSize:null,
    skill_button1:null,
    skill_button2:null,
    skill_button3:null,
    skill_button4:null,
    GameLayer:null,
    ctor:function(layer){
        this._super();
        this.GameLayer = layer;
        this.winSize = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.p_skill);
    },
    init:function(){
        this.initItem();
        this.initButton();
    },
    initItem:function(){
        for(var i = 0; i < 4; i ++){
            var item = cc.Sprite.create("#item.png");
            item.attr({
                x:this.winSize.width*0.7+65*i,
                y:this.winSize.height*0.1-15
            });
            this.addChild(item);
        }
    },
    initButton:function(){
        if( SKILL1 >= 1){
            var ButtonItem1 = cc.MenuItemSprite.create(
                cc.Sprite.create("#item_1.png"),
                null,
                this.skill1,this);
            this.skill_button1 = cc.Menu.create(ButtonItem1);
            this.skill_button1.attr({
                x:this.winSize.width*0.7,
                y:this.winSize.height*0.1-15
            });
            this.addChild(this.skill_button1);
        }
        if( SKILL2 >= 1){
            var ButtonItem2 = cc.MenuItemSprite.create(
                cc.Sprite.create("#item_2.png"),
                null,
                this.skill2,this);
            this.skill_button2 = cc.Menu.create(ButtonItem2);
            this.skill_button2.attr({
                x:this.winSize.width*0.7+65,
                y:this.winSize.height*0.1-15
            });
            this.addChild(this.skill_button2);
        }
    },
    skill1:function(){
        if( SKILL1 > 1){
            this.GameLayer.use_skill(1);
            SKILL1 -- ;
        }else{
            this.skill_button1.removeFromParent();
            this.GameLayer.use_skill(1);
            SKILL1 -- ;
        }
    },
    skill2:function(){
        if( SKILL2 > 1){
            this.GameLayer.use_skill(2);
            SKILL2 -- ;
        }else{
            this.skill_button2.removeFromParent();
            this.GameLayer.use_skill(2);
            SKILL2 -- ;
        }
    }
})