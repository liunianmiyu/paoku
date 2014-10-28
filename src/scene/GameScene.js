/**
 * Created by Administrator on 2014/9/29.
 */
var GameLayer=cc.Layer.extend({
    winSize:null,
    GamePlayLayer:null,
    GameOverLayer:null,
    skillSprite:null,
    coin_num_label:null,
    juli_num_label:null,
    juli_num:0,
    coin_num:0,
    ctor:function(){
        this._super();
        this.winSize = cc.director.getWinSize();
    },
    init:function(){
        this.initGamePlayLayer();
    },
    GameStart:function(){
        this.initNumSprite();
        this.initSkill();
        this.schedule(this.updateJuli,0.2);
        this.schedule(this.updateScore);
        SPEED = 5;
        SCORE = 0;
        TILI -- ;
    },
    initGamePlayLayer:function(){
        this.GamePlayLayer = new GamePlayLayer(this);
        this.GamePlayLayer.init();
        this.addChild(this.GamePlayLayer);
    },
    initNumSprite:function(){
        var coin = cc.Sprite.create("res/qian_kuang.png");
        coin.attr({
            x:this.winSize.width/5-50,
            y:this.winSize.height*0.9+20
        });
        this.addChild(coin);
        this.coin_num_label = cc.LabelBMFont.create(ALL_COIN_NUM + "",res.f_best);
        this.coin_num_label.attr({
            x:this.winSize.width/5-50,
            y:this.winSize.height*0.9+20
        });
        this.addChild(this.coin_num_label);
        var juli = cc.Sprite.create("res/juli_kuang.png");
        juli.attr({
            x:this.winSize.width/4+120,
            y:this.winSize.height*0.9+20
        });
        this.addChild(juli);
        this.juli_num_label = cc.LabelBMFont.create(this.juli_num+"",res.f_best);
        this.juli_num_label.attr({
            x:this.winSize.width/4+120,
            y:this.winSize.height*0.9+20
        });
        this.addChild(this.juli_num_label);
    },
    initSkill:function(){
        this.skillSprite = new SkillSprite(this);
        this.skillSprite.init();
        this.addChild(this.skillSprite);
    },
    use_skill:function(skill_type){
        this.GamePlayLayer.GameSkill(skill_type);
    },
    updateScore:function(){
        SCORE ++ ;
    },
    updateJuli:function(){
        SPEED = SPEED + 0.02;
        this.juli_num = this.juli_num + Math.floor(SPEED - 4);
        this.juli_num_label.setString(this.juli_num);
    },
    addCoin:function(coin_tag){
        if(coin_tag == SmallCoin_Tag){
            ALL_COIN_NUM ++;
            this.coin_num ++;
            this.coin_num_label.setString(ALL_COIN_NUM);
        }else {
            ALL_COIN_NUM += 50;
            this.coin_num += 50;
            this.coin_num_label.setString(ALL_COIN_NUM);
        }
    },
    Game_Over:function(){
        this.unscheduleAllCallbacks();
        this.skillSprite.removeFromParent();
        this.GamePlayLayer.removeFromParent();
        this.GameOverLayer = new GameOverLayer(this.juli_num,this.coin_num,SCORE);
        this.GameOverLayer.init();
        this.addChild(this.GameOverLayer);
    }
})
var GameScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new GameLayer();
        layer.init();
        this.addChild(layer);
    }
})