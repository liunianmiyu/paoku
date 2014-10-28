/**
 * Created by Administrator on 2014/9/29.
 */
var StartLayer = cc.Layer.extend({
    winSize:null,
    start_btn:null,
    ctor:function(){
        this._super();
        this.winSize= cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.home_plist);
    },
    init:function(){
        var bg = cc.Sprite.create("#home.jpg");
        bg.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.addChild(bg);
        var logo = cc.Sprite.create("#logo.png");
        logo.attr({
            x:this.winSize.width/4+50,
            y:this.winSize.height*0.9
        });
        this.addChild(logo);
        this.initBtn();
        this.initLiLi();
        this.initLabel();
    },
    initBtn:function(){
        var shop_menu = cc.MenuItemSprite.create(
            cc.Sprite.create("#gameshop_1.png"),
            null,
            this.shop,this);
        var shop_btn = cc.Menu.create(shop_menu);
        shop_btn.attr({
            x:this.winSize.width*0.8,
            y:this.winSize.height*0.7
        });
        this.addChild(shop_btn);
        var btn2 = cc.Sprite.create("#wuqizhuangbei_1.png");
        btn2.attr({
            x:this.winSize.width*0.8,
            y:this.winSize.height*0.7-80
        });
        this.addChild(btn2);
        var btn3 = cc.Sprite.create("#chongwu_1.png");
        btn3.attr({
            x:this.winSize.width*0.8,
            y:this.winSize.height*0.7-160
        });
        this.addChild(btn3);
        var start_menu = cc.MenuItemSprite.create(
            cc.Sprite.create("#stargame_1.png"),
            null,
            this.start,this);
        var start_btn = cc.Menu.create(start_menu);
        start_btn.attr({
            x:this.winSize.width*0.8,
            y:this.winSize.height*0.7-240
        });
        this.addChild(start_btn);
    },
    initLiLi:function(){
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames("res/zhujiemian_ren.png",2,1,"home_lili");
        var lili = cc.Sprite.create("#home_lili_00");
        lili.attr({
            x:this.winSize.width/4+45,
            y:this.winSize.height*0.4+30
        });
        this.addChild(lili);

        var frame1 = cc.spriteFrameCache.getSpriteFrame("home_lili_00");
        var frame2 = cc.spriteFrameCache.getSpriteFrame("home_lili_01");
        var frames=[frame1,frame2];
        var lili_animation = cc.Animation.create(frames,0.2);
        var lili_animate = cc.Animate.create(lili_animation);
        lili.runAction(lili_animate.repeatForever());
    },
    initLabel:function(){
        var name_lili = cc.Sprite.create("#name_lili.png");
        name_lili.attr({
            x:this.winSize.width*0.1+50,
            y:this.winSize.height*0.7+30
        });
        this.addChild(name_lili);
        var jineng_lili = cc.Sprite.create("#jineng_lili.png");
        jineng_lili.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2+50
        });
        this.addChild(jineng_lili);
    },
    download_dialog:function(reason,isNew){
        var download = new DownloadLayer(reason,isNew);
        download.init();
        this.addChild(download);
    },
    start:function(){
        if( TILI == 0 ){
            //alert("体力不足，请稍后再玩！");
            this.download_dialog("体力不足！",1);
        }else{
            cc.director.runScene(new GameScene());
        }
    },
    shop:function(){
        var shopLayer = new ShopLayer();
        shopLayer.init();
        this.addChild(shopLayer);
    }
})
var StartScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new StartLayer();
        layer.init();
        this.addChild(layer);
    }
})