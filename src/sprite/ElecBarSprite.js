/**
 * Created by Administrator on 2014/10/11.
 */
var ElecBarSprite = cc.Sprite.extend({
    ElecBar:null,
    flag:null,
    ctor:function(){
        this._super();
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames("res/dianwang/dianw1.png",5,1,"dianw1");
        mySpriteFrameCache.addSpriteFrames("res/dianwang/dianw2.png",4,1,"dianw2");
        mySpriteFrameCache.addSpriteFrames("res/dianwang/dianw3.png",18,1,"dianw3");
    },
    init:function(){
        this.createElecBar();
    },
    createElecBar:function(){
        this.flag = Math.floor(Math.random()*2+1);
        switch (this.flag){
            case 1:
                this.initWithSpriteFrameName("dianw1_00");
                break;
            case 2:
                this.initWithSpriteFrameName("dianw2_00");
                break;
            case 3:
                this.initWithSpriteFrameName("dianw3_00");
                break;
            default :
                break;
        }
        //var scale = Math.floor(Math.random()*360);
        //var rotateAction=cc.rotateTo(0.1,scale);
        //this.runAction(rotateAction);
        this.changAction(this.flag);
    },
    changAction:function(flag){
        var barNum;
        if(flag == 1){
            barNum = 5;
        }else if(flag == 2){
            barNum = 4;
        }else{
            barNum = 18
        }
        var frames = [];
        for(var i = 0;i < barNum;i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("dianw"+flag+"_0"+i);
            frames.push(frame);
        }
        var changeAnimation = cc.Animation.create(frames,0.5/barNum);
        var changeAnimate = cc.Animate.create(changeAnimation);
        this.runAction(changeAnimate.repeatForever());
    },
    collide_electric:function(){
        var boom = new BoomSprite();
        boom.attr({
            x:this.getPosition.x,
            y:this.getPosition.y
        });
        this.addChild(boom);
        boom.electric_boom();
    }
})