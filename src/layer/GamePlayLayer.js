/**
 * Created by Administrator on 2014/10/8.
 */
var GamePlayLayer = cc.Layer.extend({
    winSize:null,
    bgLayer:null,
    zhangaiLayer:null,
    newTimes:null,
    space:null,
    GameScene:null,
    liliSprite:null,
    bulletSprite:null,
    lili_die:0,
    use_skill:0,
    ctor:function(layer){
        this._super();
        this.GameScene = layer;
        this.winSize = cc.director.getWinSize();
        this.space = new cp.Space();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    init:function(){
        this.initBg();
        this.initHelp();
    },
    initHelp:function(){
        if(HAVE_PLAY == 0){
            var helpLayer = new HelpLayer(this);
            helpLayer.init();
            this.addChild(helpLayer);
        }else{
            this.game_play();
        }
    },
    initBg:function(){
        this.bgLayer = new GameBgLayer();
        this.bgLayer.init();
        this.addChild(this.bgLayer);
    },
    initZhangAi:function(){
        this.zhangaiLayer = new ZhangAiLayer(this);
        this.zhangaiLayer.init();
        this.addChild(this.zhangaiLayer);
        this.newTimes = 0;
    },
    createNewZhangAi:function(){
        this.newTimes ++;
        if(this.newTimes == 1){
            this.zhangaiLayer.removeFromParent();
            this.initZhangAi();
        }
    },
    initOpenBoom:function(){
        var openBoom = new BoomSprite(this);
        openBoom.init();
        openBoom.attr({
            x:100,
            y:50
        });
        this.addChild(openBoom);
        openBoom.initOpenBoom();
    },
    initBullets:function(){
        if(this.bulletSprite != null){
            this.bulletSprite.removeFromParent();
        }
        this.bulletSprite = new BulletSprite(this,this.liliSprite.getPosition().y);
        this.bulletSprite.init();
        this.addChild(this.bulletSprite);
    },
    game_play:function(){
        this.initOpenBoom();
        this.rock_layer();
    },
    layerMove:function(){
        this.GameScene.GameStart();
        this.bgLayer.bgMove();
        this.initPhysics();
        this.initPhyLili();
        this.initZhangAi();
        this.initBullets();
        this.scheduleUpdate();
        this.schedule(this.isLiliCollision);
    },
    initPhysics: function () {
        var space = this.space ;
        var staticBody = space.staticBody;
        // Gravity
        space.gravity = cp.v(0, -980);//重力
        space.sleepTimeThreshold = 0.5;//休眠临界时间
        // Walls--上下边界
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,10), cp.v(this.winSize.width,10),0),// bottom
            new cp.SegmentShape( staticBody, cp.v(0,this.winSize.height-10), cp.v(this.winSize.width,this.winSize.height-10), 0),	// top
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,this.winSize.height), 0),// left
            new cp.SegmentShape( staticBody, cp.v(this.winSize.width,0), cp.v(this.winSize.width,this.winSize.height), 0)// right
        ];
        for( var i=0; i < walls.length; i++ ) {
            var shape = walls[i];
            space.addShape( shape );
            shape.setCollisionType(i);
            shape.setLayers(1);
        }
    },
    initPhyLili: function () {
        //物体的定义
        var mass =1;
        var body = new cp.Body(mass, cp.momentForBox(mass,100,100));
        body.setPos( cp.v(200,60) );
        this.space.addBody( body );
        var shape = new cp.BoxShape(body,100,100);
        shape.setFriction(0.5);
        shape.setCollisionType(1);
        shape.setLayers(3);
        this.space.addShape(shape);
        //创建丽丽
        this.liliSprite = new PhyLiliSprite(this);
        this.liliSprite.init();
        this.liliSprite.setBody(body);
        this.addChild(this.liliSprite,1);
    },
    update: function () {
        //这个必须有，物理世界对刚体的处理
        this.space.step(1/60.0);
    },
    doForceLili: function () {
        this.liliSprite.getBody().setVel(cp.v(0,0));
        this.liliSprite.getBody().applyImpulse(cp.v(0,500), cp.v(0, 0));
    },
    doForceDie:function(){
        this.liliSprite.getBody().setVel(cp.v(0,0));
        this.liliSprite.getBody().applyImpulse(cp.v(100,100), cp.v(0, 0));
    },
    isLiliCollision:function(){
        if(this.zhangaiLayer.getChildByTag(Enemy_tag) != null){
            var enemy = this.zhangaiLayer.getChildByTag(Enemy_tag);
            this.liliSprite.lili_collision(enemy);
        }
        if(this.zhangaiLayer.getChildByTag(Elec_tag) != null){
            var electric = this.zhangaiLayer.getChildByTag(Elec_tag);
            this.liliSprite.lili_collision(electric);
        }
        if(this.zhangaiLayer.getChildByTag(Coin_Tag) != null){
            var coins = this.zhangaiLayer.getChildByTag(Coin_Tag).getChildren();
            var length =coins.length;
            for(var i = 0;i < length;i ++) {
                var coin = coins[i];
                this.liliSprite.lili_collision(coin);
            }
        }
        if(this.bulletSprite.getChildren()[0] != null){
            if(this.zhangaiLayer.getChildByTag(Enemy_tag) != null){
                var enemy = this.zhangaiLayer.getChildByTag(Enemy_tag);
                this.bulletSprite.bullet_collision(enemy);
            }
            if(this.zhangaiLayer.getChildByTag(Elec_tag) != null){
                var electric = this.zhangaiLayer.getChildByTag(Elec_tag);
                this.bulletSprite.bullet_collision(electric);
            }
        }
    },
    collide_result:function(tag){
        if(tag == Enemy_tag){
            this.zhangaiLayer.getChildByTag(Enemy_tag).jiangshi_die();
            this.liliDie();
        }else if(tag == Elec_tag){
            this.zhangaiLayer.getChildByTag(Elec_tag).collide_electric();
            this.liliDie();
        }else if (tag == 10){
            this.zhangaiLayer.getChildByTag(Enemy_tag).jiangshi_die();
        }
    },
    eat_coin:function(sprite,coin_tag){
        var mySpriteFrameCache = MySpriteFrameCache.getInstance();
        mySpriteFrameCache.addSpriteFrames(res.img_starshan,6,1,"star_shan");
        var frames = [];
        for(var i = 0; i < 6;i ++){
            var frame = cc.spriteFrameCache.getSpriteFrame("star_shan_0"+i);
            frames.push(frame);
        }
        var shanAnimation = cc.Animation.create(frames,0.1);
        var shanAnimate = cc.Animate.create(shanAnimation);
        var _this = this;
        var callFun = new cc.CallFunc(function(){
            sprite.removeFromParent();
            _this.GameScene.addCoin(coin_tag);
        });
        sprite.runAction(cc.sequence(shanAnimate,callFun));
    },
    initSkillLayer:function(skill_type){
        var skillLayer = new ShowSkillLayer(skill_type);
        skillLayer.init();
        this.addChild(skillLayer);
    },
    GameSkill:function(skill_type){
        this.initSkillLayer(skill_type);
        this.rock_layer();
        this.unscheduleAllCallbacks();
        if( skill_type == 1 ){
            SPEED = 15;
            SCORE += 2000;
            this.use_skill = 1;
            var _this = this;
            setTimeout(function(){_this.liliSprite.getBody().setPos(cp.v(250,300));},500);
            this.liliSprite.save_energy(1);
        }else{
            SPEED = 30;
            SCORE += 5000;
            this.use_skill = 1;
            this.liliSprite.save_energy(2);
        }
    },
    Skill_End:function(){
        var _this = this ;
        setTimeout(function(){
            SPEED = 8;
            _this.use_skill = 0;
            _this.scheduleUpdate();
            _this.schedule(_this.isLiliCollision);
        },1000);
    },
    liliDie:function(){
        this.rock_layer();
        this.doForceDie();
        if(this.bulletSprite != null){
            this.bulletSprite.removeFromParent();
        }
        this.liliSprite.lili_die();
        this.lili_die = 1;
    },
    rock_layer:function(){
        var rock_up = cc.moveBy(0.02,cc.p(0,10));
        var rock_down = cc.moveBy(0.02,cc.p(0,-10));
        this.runAction(cc.sequence(rock_up,rock_down,rock_down,rock_up).repeat(3));
    },
    GameOver:function(){
        this.unscheduleAllCallbacks();
        this.zhangaiLayer.removeFromParent();
        this.bgLayer.stopMove();
        this.GameScene.Game_Over();
    },
    onEnter:function(){
        this._super();
        this.space.addCollisionHandler( 1, 0,
            this.collisionBegin.bind(this),
            this.collisionPre.bind(this),
            this.collisionPost.bind(this),
            this.collisionSeparate.bind(this)
        );
    },
    collisionBegin:function(arbiter, space){
        if(this.lili_die != 1){
            this.liliSprite.lili_run();
        }
        return true;
    },
    collisionPre:function(arbiter, space){
        return true;
    },
    collisionPost:function(arbiter,space){
    },
    collisionSeparate:function(arbiter,space){
    },
    onTouchBegan:function(touch,event){
        var target = event.getCurrentTarget();
        if(target.lili_die != 1 && target.use_skill != 1){
            target.doForceLili();
            target.liliSprite.jumpAction();
            target.liliSprite.show_huo();
            return true;
        }
        return false;
    },
    onTouchEnded:function(touch,event){
        var target = event.getCurrentTarget();
    }
})