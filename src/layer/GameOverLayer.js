/**
 * Created by Administrator on 2014/10/15.
 */
var GameOverLayer = cc.Layer.extend({
    winSize:null,
    back_btn:null,
    restart_btn:null,
    paihang_btn:null,
    levelSprite:null,
    juli_num:0,
    coin_num:0,
    all_coin_num:null,
    score_num:0,
    ctor:function(juli,coin,score){
        this._super();
        this.juli_num = juli;
        this.coin_num = coin;
        this.score_num = score;
        this.winSize = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.p_gameover);
    },
    init:function(){
        var bg = cc.Sprite.create(res.bg2);
        bg.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.addChild(bg);
        var your_score_label = cc.Sprite.create("#score.png");
        your_score_label.attr({
            x:120,
            y:this.winSize.height-30
        });
        this.addChild(your_score_label);
        var your_score = cc.LabelBMFont.create(this.juli_num+"m",res.f_G);
        your_score.attr({
            x:200,
            y:this.winSize.height-100
        });
        this.addChild(your_score);
        var corn_label = cc.Sprite.create("#rank.png");
        corn_label.attr({
            x:130,
            y:this.winSize.height/2+50
        });
        this.addChild(corn_label);
        var coin = cc.LabelBMFont.create(this.coin_num+"",res.f_jin);
        coin.attr({
            x:250,
            y:this.winSize.height/2+50
        });
        this.addChild(coin);

        var coin_kunag = cc.Sprite.create("#qian_kuang.png");
        coin_kunag.attr({
            x:this.winSize.width/2+20,
            y:this.winSize.height-30
        });
        this.addChild(coin_kunag);
        this.all_coin_num_label = cc.LabelBMFont.create(ALL_COIN_NUM+"",res.f_jinxnum);
        this.all_coin_num_label.attr({
            x:this.winSize.width/2-10,
            y:this.winSize.height-30
        });
        this.addChild(this.all_coin_num_label);

        var tili = cc.Sprite.create("#tili_kuang.png");
        tili.attr({
            x:this.winSize.width/2+200,
            y:this.winSize.height-30
        });
        this.addChild(tili);
        this.tili_num_label = cc.LabelBMFont.create(TILI+"",res.f_jinxnum);
        this.tili_num_label.attr({
            x:this.winSize.width/2+180,
            y:this.winSize.height-30
        });
        this.addChild(this.tili_num_label);

        var benci_score = cc.Sprite.create("#bencifenshu.png");
        benci_score.attr({
            x:this.winSize.width/2+100,
            y:this.winSize.height/2+70
        });
        this.addChild(benci_score);
        var benci_score_num = cc.LabelBMFont.create(this.score_num+"",res.f_jin);
        benci_score_num.attr({
            x:this.winSize.width/2+200,
            y:this.winSize.height/2+70
        });
        this.addChild(benci_score_num);

        this.initButton();
        this.initLevel();
        this.best_record();
    },
    initLevel:function(){
        if(this.score_num < 1000){
            this.levelSprite = cc.Sprite.create("#d.png");
        }else if(this.score_num >= 1000 && this.score_num < 3000){
            this.levelSprite = cc.Sprite.create("#c.png");
        }else if(this.score_num >= 3000 && this.score_num < 5000){
            this.levelSprite = cc.Sprite.create("#b.png");
        }else if(this.score_num >= 5000 && this.score_num < 7000){
            this.levelSprite = cc.Sprite.create("#a.png");
        }else{
            this.levelSprite = cc.Sprite.create("#s.png");
        }
        this.levelSprite.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.levelSprite.setScale(1.5,1.5);
        this.addChild(this.levelSprite);
        this.levelAction();
    },
    levelAction:function(){
        var moveAction = cc.moveTo(1,cc.p(200,this.winSize.height/2-80));
        var scaleAction = cc.scaleTo(1,1,1);
        this.levelSprite.runAction(cc.spawn(moveAction,scaleAction));
    },
    initButton:function(){
        var backMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create("#fanhui.png"),
            null,
            this.GameBack,this);
        this.back_btn = cc.Menu.create(backMenuItem);
        this.back_btn.attr({
            x:this.winSize.width/2+330,
            y:this.winSize.height-30
        });
        this.addChild(this.back_btn);

        var paihangMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create("#paihang1.png"),
            cc.Sprite.create("#paihang2.png"),
            this.paihang,this);
        this.paihang_btn = cc.Menu.create(paihangMenuItem);
        this.paihang_btn.attr({
            x:this.winSize.width/2+330,
            y:this.winSize.height/2+70
        });
        this.addChild(this.paihang_btn);

        var restartMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create("#zaicitiaozhan1.png"),
            cc.Sprite.create("#zaicitiaozhan2.png"),
            this.restart,this);
        this.restart_btn = cc.Menu.create(restartMenuItem);
        this.restart_btn.attr({
            x:this.winSize.width/2+200,
            y:this.winSize.height/2-150
        });
        this.addChild(this.restart_btn);
    },
    GameBack:function(){
        cc.director.runScene(new StartScene());
    },
    paihang:function(){
        //alert("查看排行榜，请下载APP！");
        this.download_dialog("不让你看！",0);
    },
    restart:function(){
        if( TILI == 0 ){
            //alert("体力不足，稍后再玩！");
            this.download_dialog("体力不足！",1)
        }else{
            cc.director.runScene(new GameScene())
        }
    },
    download_dialog:function(reason,isNew){
        var download = new DownloadLayer(reason,isNew);
        download.init();
        this.addChild(download);
    },
    best_record:function(){
        if(this.score_num > BEST_SCORE && BEST_SCORE != 0){
            BEST_SCORE = this.score_num;
            this.best_recordAction();
        }
    },
    best_recordAction:function(){
        var new_record = cc.Sprite.create("#best.png");
        new_record.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.addChild(new_record);
        var fadeOutAction = cc.fadeOut(0.5);
        var fadeInAction = cc.fadeIn(0.5);
        var shanAction = cc.sequence(fadeOutAction,fadeInAction);
        this.levelSprite.runAction(shanAction.repeat(3));
    }
})