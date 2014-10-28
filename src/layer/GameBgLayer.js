/**
 * Created by Administrator on 2014/9/29.
 */
var GameBgLayer = cc.Layer.extend({
    winSize:null,
    bg1:null,
    bg2:null,
    bg3:null,
    spriteLayer:null,
    enemySprite:null,
    coinSprite:null,
    elecBarSprite:null,
    ctor:function(){
        this._super();
        this.winSize = cc.director.getWinSize();
    },
    init:function(){
        this.bg1 = cc.Sprite.create(res.bg1);
        this.bg1.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.addChild(this.bg1);
        this.bg2 = cc.Sprite.create(res.bg2);
        this.bg2.attr({
            x:this.winSize.width*1.5-1,
            y:this.winSize.height/2
        });
        this.addChild(this.bg2);
        this.bg3 = cc.Sprite.create(res.bg3);
        this.bg3.attr({
            x:this.winSize.width*2.5-1,
            y:this.winSize.height/2
        });
        this.addChild(this.bg3);
    },
    bgMove:function(){
        this.schedule(this.LayerMove);
    },
    LayerMove:function(){
       var X1 = this.bg1.getPositionX();
       var X2 = this.bg2.getPositionX();
       var X3 = this.bg3.getPositionX();
       var speed = SPEED;
       X1-=speed;
       X2-=speed;
       X3-=speed;
       var size = this.bg1.getContentSize();
       if (X1<-size.width/2)
       {
           X2 = size.width/2;
           X1=size.width/2+size.width*2;
       }
       if (X2<-size.width/2)
       {
           X3 = size.width/2;
           X2=size.width/2+size.width*2;
       }
       if(X3<-size.width/2)
       {
           X1 = size.width/2;
           X3=size.width/2+size.width*2;
       }
       this.bg1.setPositionX(X1);
       this.bg2.setPositionX(X2);
       this.bg3.setPositionX(X3);
    },
    stopMove:function(){
        this.unscheduleAllCallbacks();
    }
})