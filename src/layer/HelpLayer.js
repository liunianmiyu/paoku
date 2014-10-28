/**
 * Created by Administrator on 2014/10/22.
 */
var HelpLayer = cc.Layer.extend({
    winSize:null,
    go_home:null,
    go_game:null,
    showSprite:null,
    selectedSprite:null,
    selected_num:1,
    GamePlayLayer:null,
    ctor:function(layer){
        this._super();
        this.GamePlayLayer = layer;
        this.winSize = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.p_help);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    init:function(){
        var kongkuang = cc.Sprite.create("#kongkuang.png");
        kongkuang.attr({
            x:this.winSize.width/2,
            y:this.winSize.height-50
        });
        this.addChild(kongkuang);
        var setting_label = cc.Sprite.create("#shezhi.png");
        setting_label.attr({
            x:this.winSize.width/2,
            y:this.winSize.height-50
        });
        this.addChild(setting_label);
        var dikuang = cc.Sprite.create("#tili_dikuang.png");
        dikuang.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2-40
        });
        this.addChild(dikuang);
        var help_di = cc.Sprite.create("#help_di.png");
        help_di.attr({
            x:this.winSize.width/2-120,
            y:this.winSize.height/2-40
        });
        this.addChild(help_di);
        for(var i = 0 ; i < 4 ; i ++){
            var select_bar = cc.Sprite.create("#help_item_noselected.png");
            select_bar.attr({
                x:this.winSize.width/2-120+i*25,
                y:this.winSize.height/2+85
            });
            this.addChild(select_bar);
        }

        this.createButton();
        this.initContainer();
        this.show_to_container(1);
    },
    initContainer:function(item){
        if(item == 1 ){
            this.selectedSprite.removeFromParent();
            this.showSprite.removeFromParent();
            this.show_to_container(1);
        }else if(item == 2){
            this.selectedSprite.removeFromParent();
            this.showSprite.removeFromParent();
            this.show_to_container(2);
        }else if(item ==3){
            this.selectedSprite.removeFromParent();
            this.showSprite.removeFromParent();
            this.show_to_container(3);
        }else if(item == 4){
            this.selectedSprite.removeFromParent();
            this.showSprite.removeFromParent();
            this.show_to_container(4);
        }
    },
    show_to_container:function(item){
        this.showSprite = new cc.Sprite();
        this.addChild(this.showSprite);
        var show_lili = cc.Sprite.create("#show_"+item+".png");
        show_lili.attr({
            x:this.winSize.width/2-120,
            y:this.winSize.height/2
        });
        this.showSprite.addChild(show_lili);
        var explain1 =cc.Sprite.create("#help_zi"+item+".png");
        explain1.attr({
            x:this.winSize.width/2-120,
            y:this.winSize.height/2-120
        });
        this.showSprite.addChild(explain1);
        if(item == 1){
            var jiantou = cc.Sprite.create("#help1_jiantou.png");
            jiantou.attr({
                x:this.winSize.width/2-30,
                y:this.winSize.height/2-50
            });
            this.showSprite.addChild(jiantou);
        }
        this.selected_bar(item-1);
    },
    selected_bar:function(item){
        this.selectedSprite = cc.Sprite.create("#help_item_selected.png");
        this.selectedSprite.attr({
            x:this.winSize.width/2-120+item*25,
            y:this.winSize.height/2+85
        });
        this.addChild(this.selectedSprite);
    },
    createButton:function(){
        var go_homeMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create("#gohome1.png"),
            cc.Sprite.create("#gohome2.png"),
        this.goHome,this);
        this.go_home = cc.Menu.create(go_homeMenuItem);
        this.go_home.attr({
            x:this.winSize.width/2+120,
            y:this.winSize.height/2+10
        });
        this.addChild(this.go_home);

        var go_gameMenuItem = cc.MenuItemSprite.create(
            cc.Sprite.create("#returngame_1.png"),
            cc.Sprite.create("#returngame_2.png"),
            this.goGame,this);
        this.go_game = cc.Menu.create(go_gameMenuItem);
        this.go_game.attr({
            x:this.winSize.width/2+120,
            y:this.winSize.height/2-90
        });
        this.addChild(this.go_game);
    },
    goHome:function(){
        cc.director.runScene(new StartScene());
    },
    goGame:function(){
        HAVE_PLAY = 1;
        this.GamePlayLayer.game_play();
        this.removeFromParent();
    },
    onTouchBegan:function(){
        return true;
    },
    onTouchEnded:function(touch,event){
        var target = event.getCurrentTarget();
        var touchPos = touch.getLocation();
        var containerRect = cc.rect(165,30,235,260);
        if(cc.rectContainsPoint(containerRect,touchPos)){
            if(target.selected_num >= 1 && target.selected_num < 4){
                target.selected_num ++ ;
                target.initContainer(target.selected_num);
            }else{
                target.selected_num = 1;
                target.initContainer(target.selected_num);
            }
        }
    }
})