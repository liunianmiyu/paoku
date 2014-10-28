/**
 * Created by Administrator on 2014/10/13.
 */
var ZhangAiLayer = cc.Layer.extend({
    winSize:null,
    GamePlayLayer:null,
    coinSprite:null,
    enemySprite:null,
    elecBarSprite:null,
    speed_move:null,
    ctor:function(layer){
        this._super();
        this.GamePlayLayer = layer;
        this.winSize = cc.director.getWinSize();
        this.speed_move = (this.winSize.width+500)/(60*SPEED);
    },
    init:function(){
        this.createSprite();
    },
    createSprite:function(){
        var flag = Math.floor(Math.random()+1.5);
        var _this = this;
        if(flag == 1){
            _this.initCoin();
            _this.initKongSprite();
            _this.initEnemy();
        }else if(flag == 2){
            _this.initElecBar();
            _this.initEnemy();
        }
    },
    initEnemy:function(){
        this.enemySprite = new EnemySprite();
        this.enemySprite.init();
        this.enemySprite.attr({
            x:this.winSize.width+100+Math.random()*100,
            y:70
        });
        this.enemySprite.setTag(Enemy_tag);
        this.addChild(this.enemySprite);
        this.MoveSprite(this.enemySprite);
    },
    initBigCoin:function(){
        this.coinSprite.createBigCoin();
    },
    initCoin:function(){
        this.coinSprite = new CoinSprite(this,this.speed_move);
        this.coinSprite.init();
        this.coinSprite.setTag(Coin_Tag);
        this.addChild(this.coinSprite);
        this.initBigCoin();
},
    initElecBar:function(){
        this.elecBarSprite = new ElecBarSprite();
        this.elecBarSprite.init();
        this.elecBarSprite.attr({
            x:this.winSize.width,
            y:this.winSize.height*0.7-Math.floor(Math.random()*150)
        });
        this.elecBarSprite.setTag(Elec_tag);
        this.addChild(this.elecBarSprite);
        this.MoveSprite(this.elecBarSprite);
    },
    initKongSprite:function(){
        var kong = cc.Sprite.create(res.img_gameover,cc.rect(0,0,1,1));
        kong.attr({
            x:this.winSize.width+100,
            y:this.winSize.height-250
        });
        this.addChild(kong);
        this.MoveSprite(kong);
    },
    MoveSprite:function(sprite){
        var moveAction = cc.moveBy(this.speed_move,cc.p(-(this.winSize.width+400),0));
        var _this = this;
        var callFun = new cc.CallFunc(function(){
            sprite.removeFromParent();
            _this.createNew();
        });
        sprite.runAction(cc.sequence(moveAction,callFun));
    },
    createNew:function(){
        this.GamePlayLayer.createNewZhangAi();
    }
})