/**
 * Created by Administrator on 2014/10/8.
 */
var PhyLiliSprite = cc.PhysicsSprite.extend({
    winSize:null,
    lili:null,
    jump_huo:null,
    gun:null,
    wuqi_flag:1,
    GamePlayLayer:null,
    ctor:function(layer){
        this._super();
        this.GamePlayLayer = layer;
        this.winSize = cc.director.getWinSize();
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames(res.lili_run,6,2,"lili_run");
        mySpriteFrameCache.addSpriteFrames(res.lili_tiao,2,1,"lili_tiao");
        mySpriteFrameCache.addSpriteFrames(res.lili_luo,2,1,"lili_luo");
        mySpriteFrameCache.addSpriteFrames(res.huo,16,1,"tiao_huo");
        mySpriteFrameCache.addSpriteFrames(res.lili_dead,4,1,"lili_dead");
        mySpriteFrameCache.addSpriteFrames(res.img_moto,2,1,"moto");
        mySpriteFrameCache.addSpriteFrames(res.img_qimoto,2,1,"qimoto");
        mySpriteFrameCache.addSpriteFrames(res.img_chomgqi,1,4,"chongqi");
        mySpriteFrameCache.addSpriteFrames(res.img_lilifei,2,1,"fei");
        mySpriteFrameCache.addSpriteFrames(res.xuneng,5,1,"xuneng");
    },
    init:function(){
        this.lili = cc.Sprite.create("#lili_run_00");
        this.lili.setTag(Lili_tag);
        this.addChild(this.lili);
        this.initGun();
        this.jump_huo = cc.Sprite.create("#tiao_huo_00");
        this.jump_huo.attr({
            x:35,
            y:0
        });
        this.lili.addChild(this.jump_huo);
        this.jump_huo.setVisible(false);
    },
    initGun:function(){
        this.gun = new GunSprite(this.wuqi_flag);
        this.gun.init();
        this.gun.attr({
            x:60,
            y:40
        });
        this.lili.addChild(this.gun);
    },
    lili_run:function(){
        this.lili.stopAllActions();
        if(this.huo!=null){
            this.huo.removeFromParent();
        }
        var frames = [];
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < 6; j++){
                var frame = cc.spriteFrameCache.getSpriteFrame("lili_run_"+i+j);
                frames.push(frame);
            }
        }
        var lili_runAnimation = cc.Animation.create(frames,(6-SPEED > 0.5 ? (6-SPEED) : 0.5)/12);
        var lili_runAnimate = cc.Animate.create(lili_runAnimation);
        this.lili.runAction(lili_runAnimate.repeatForever());
    },
    jumpAction:function(){
        this.lili.stopAllActions();
        var frame1 = cc.spriteFrameCache.getSpriteFrame("lili_tiao_00");
        var frame2 = cc.spriteFrameCache.getSpriteFrame("lili_tiao_01");
        var frames = [frame1,frame2];
        var jumpAnimation = cc.Animation.create(frames,0.1);
        var jumpAnimate = cc.Animate.create(jumpAnimation);
        this.lili.runAction(jumpAnimate.repeatForever());
    },
    downAction:function(){
        this.lili.stopAllActions();
        var frame1 = cc.spriteFrameCache.getSpriteFrame("lili_luo_00");
        var frame2 = cc.spriteFrameCache.getSpriteFrame("lili_luo_01");
        var frames = [frame1,frame2];
        var downAnimation = cc.Animation.create(frames,0.05);
        var downAnimate = cc.Animate.create(downAnimation);
        this.lili.runAction(downAnimate.repeatForever());
    },
    show_huo:function(){
        this.jump_huo.setVisible(true);
        var frames = [];
        for(var i = 0; i < 16; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("tiao_huo_0"+i);
            frames.push(frame);
        }
        var _this = this;
        var callFun = new cc.CallFunc(function(){
            _this.hide_huo();
        });
        var huoAnimation = cc.Animation.create(frames,1/16);
        var huoAnimate = cc.Animate.create(huoAnimation);
        this.jump_huo.runAction(cc.sequence(huoAnimate,callFun));
    },
    hide_huo:function(){
        this.jump_huo.setVisible(false);
        this.jump_huo.stopAllActions();
        this.jump_huo.setVisible(false);
    },
    save_energy:function(flag){
        var xuneng = cc.Sprite.create("#xuneng_00");
        xuneng.attr({
            x:40,
            y:30
        });
        this.lili.addChild(xuneng);
        var frames = [];
        for(var i = 0 ; i < 5 ; i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("xuneng_0"+i);
            frames.push(frame);
        }
        var xunengAnimation = cc.Animation.create(frames,0.1);
        var xunengAniamte = cc.Animate.create(xunengAnimation);
        var _this = this ;
        var callFun = new cc.CallFunc(function(){
            xuneng.removeFromParent();
            _this.Skill_penshe(flag)
        });
        if( flag == 1) {
            xuneng.runAction(cc.sequence(xunengAniamte, callFun));
        }else{
            xuneng.runAction(xunengAniamte.repeatForever());
            this.Skill_penshe(flag);
            setTimeout(function(){xuneng.removeFromParent();},4000);
        }
    },
    Skill_penshe:function(flag){
        var chongqi = cc.Sprite.create("#chongqi_00");
        chongqi.attr({
            x:-flag*100,
            y:60
        });
        chongqi.setScale(flag+0.5);
        this.lili.addChild(chongqi);
        var frames = [];
        for(var i = 0 ; i < 4 ; i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("chongqi_"+i+"0");
            frames.push(frame);
        }
        var chongqiAnimation = cc.Animation.create(frames,0.1);
        var chongqiAniamte = cc.Animate.create(chongqiAnimation);
        var _this = this ;
        chongqi.runAction(chongqiAniamte.repeatForever());
        setTimeout(function(){
            chongqi.stopAllActions();
            chongqi.removeFromParent();
            _this.downAction();
            _this.GamePlayLayer.Skill_End();
        },4000);
        if( flag == 1 ){
            this.lili.stopAllActions();
            var frame_1 = cc.spriteFrameCache.getSpriteFrame("fei_00");
            var frame_2 = cc.spriteFrameCache.getSpriteFrame("fei_01");
            var frames2 = [frame_1,frame_2];
            var lili_qimotoAnimation = cc.Animation.create(frames2,0.1);
            var lili_qimotoAnimate = cc.Animate.create(lili_qimotoAnimation);
            this.lili.runAction(lili_qimotoAnimate.repeatForever());
        }else{
            var guangquan = cc.Sprite.create(res.guangquan);
            guangquan.attr({
                x:this.winSize.width/2,
                y:60
            });
            this.addChild(guangquan);
            guangquan.setScale(0);
            var scaleAction = cc.scaleTo(1,5,5);
            var callFun = new cc.CallFunc(function(){
                guangquan.removeFromParent();
            });
            guangquan.runAction(cc.sequence(scaleAction,callFun));
        }

    },
    lili_die:function(){
        this.gun.removeFromParent();
        this.lili.stopAllActions();
        var frames = [];
        for(var i = 0; i < 4; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("lili_dead_0"+i);
            frames.push(frame);
        }
        var lili_dieAnimation = cc.Animation.create(frames,1/4);
        var lili_dieAnimate = cc.Animate.create(lili_dieAnimation);
        var _this =this;
        var callFun = new cc.CallFunc(function(){
            _this.GamePlayLayer.GameOver();
        });
        this.lili.runAction(cc.sequence(lili_dieAnimate,callFun));
    },
    lili_collision:function(sprite){
        var liliRect = this.getBoundingBox();
        var spriteRect = sprite.getBoundingBox();
        if(cc.rectIntersectsRect(liliRect,spriteRect)){
            var sprite_tag = sprite.getTag();
            if(sprite_tag == SmallCoin_Tag || sprite_tag == BigCoin_tag ){
                this.GamePlayLayer.eat_coin(sprite,sprite_tag);
            }else{
                this.GamePlayLayer.collide_result(sprite_tag);
            }
        }
    }
})