/**
 * Created by Administrator on 2014/10/23.
 */
var DownloadLayer = cc.Layer.extend({
    winSize:null,
    reason:null,
    newGame:null,
    ctor:function(reason,isNewGame){
        this._super();
        this.reason = reason;
        this.newGame = isNewGame;
        this.winSize = cc.director.getWinSize();
    },
    init:function(){
        var bg = cc.Sprite.create(res.img_down_bg);
        bg.setScale(0.8);
        bg.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.addChild(bg);

        var backMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create(res.img_down_back_btn),
            null,
            this.goBack,this);
        var backMenu = cc.Menu.create(backMenuItem);
        backMenu.attr({
            x:this.winSize.width/2-150,
            y:this.winSize.height/2+120
        });
        this.addChild(backMenu);
        var RGB = [];
        this.initLabel("返 回",24,cc.p(this.winSize.width/2-150,this.winSize.height/2+120),0);
        this.initLabel(this.reason,40,cc.p(this.winSize.width/2,this.winSize.height/2+30),1);
        this.initLabel("更多精彩内容请下载官方App！",24,cc.p(this.winSize.width/2,this.winSize.height/2-30),2);

        var androidMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create(res.img_down_btn),
            null,
            this.android_down,this);
        var androidMenu = cc.Menu.create(androidMenuItem);
        androidMenu.attr({
            x:this.winSize.width/2-100,
            y:this.winSize.height/2-120
        });
        this.addChild(androidMenu);
        this.initLabel("Android下载",24,cc.p(this.winSize.width/2-100,this.winSize.height/2-110),null);
        this.initLabel("(10.18MB)",18,cc.p(this.winSize.width/2-100,this.winSize.height/2-135),null);

        var iosMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create(res.img_down_btn),
            null,
            this.ios_down,this);
        var iosMenu = cc.Menu.create(iosMenuItem);
        iosMenu.attr({
            x:this.winSize.width/2+100,
            y:this.winSize.height/2-120
        });
        this.addChild(iosMenu);
        this.initLabel("App Store下载",24,cc.p(this.winSize.width/2+100,this.winSize.height/2-110),null);
        this.initLabel("(10.18MB)",18,cc.p(this.winSize.width/2+100,this.winSize.height/2-135),null);
    },
    initLabel:function(context,font_size,pos,color){
        var LabelText = cc.LabelTTF.create(context,"microsoft yahei",font_size);
        if(color == 1){
            LabelText.setColor(cc.color(155,155,155));
        }else if(color == 2){
            LabelText.setColor(cc.color(255,38,38));
        }
        LabelText.setPosition(pos);
        this.addChild(LabelText);
    },
    goBack:function(){
        if( this.newGame == 1) {
            ALL_COIN_NUM = 0 ;
            TILI = 5;
            SKILL1 = 0;
            SKILL2 = 0;
            cc.director.runScene(new StartScene());
        }else{
            this.removeFromParent();
        }
    },
    android_down:function(){
        window.open("http://www.baidu.com");
    },
    ios_down:function(){

    }
})