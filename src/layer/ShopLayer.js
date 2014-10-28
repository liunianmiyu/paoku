/**
 * Created by Administrator on 2014/10/22.
 */
var ShopLayer = cc.Layer.extend({
    winSize:null,
    all_coin_num_label:null,
    tili_num_label:null,
    ctor:function(){
        this._super();
        this.winSize = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.p_shop);
    },
    init:function(){
        var bg = cc.Sprite.create("#youxishangcheng_ditu.jpg");
        bg.attr({
            x:this.winSize.width/2,
            y:this.winSize.height/2
        });
        this.addChild(bg);

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

        var daojv_btn = cc.Sprite.create("#daojv1.png");
        daojv_btn.attr({
            x:120,
            y:this.winSize.height/2+115
        });
        this.addChild(daojv_btn);

        this.initSkillLabel();
    },
    initSkillLabel:function(){
        var hang ;
        for(var i = 0 ; i < 3 ; i ++){
            hang = i ;
            for(var j = 0 ; j < 2 ; j ++){
                var skill_label = cc.Sprite.create("#skill_"+( hang + i + j + 1 )+".png");
                skill_label.attr({
                    x:230+j*350,
                    y:this.winSize.height-185-i*100
                });
                this.addChild(skill_label);
                var skill_icon = cc.Sprite.create("#item_"+( hang + i + j + 1 )+".png");
                skill_icon.attr({
                    x:skill_label.getPosition().x-130,
                    y:skill_label.getPosition().y
                });
                this.addChild(skill_icon);
                if( i == 0 ){
                    if(j == 0){
                        var getSkillMenuItem1 = cc.MenuItemSprite.create(
                            cc.Sprite.create("#lingqu1.png"),
                            cc.Sprite.create("#lingqu2.png"),
                            this.getSkill1,this);
                        var getSkillMenu1 = cc.Menu.create(getSkillMenuItem1);
                        getSkillMenu1.attr({
                            x:skill_label.getPosition().x+120,
                            y:skill_label.getPosition().y-20
                        });
                    }
                    else {
                        this.addChild(getSkillMenu1);
                        var getSkillMenuItem2 = cc.MenuItemSprite.create(
                            cc.Sprite.create("#lingqu1.png"),
                            cc.Sprite.create("#lingqu2.png"),
                            this.getSkill2, this);
                        var getSkillMenu2 = cc.Menu.create(getSkillMenuItem2);
                        getSkillMenu2.attr({
                            x: skill_label.getPosition().x + 120,
                            y: skill_label.getPosition().y - 20
                        });
                        this.addChild(getSkillMenu2);
                    }
                }else{
                    var getSkillMenuItem = cc.MenuItemSprite.create(
                        cc.Sprite.create("#lingqu2.png"),
                        null,
                        this.NoDone,this);
                    var getSkillMenu = cc.Menu.create(getSkillMenuItem);
                    getSkillMenu.attr({
                        x:skill_label.getPosition().x+120,
                        y:skill_label.getPosition().y-20
                    });
                    this.addChild(getSkillMenu);
                }
            }
        }
    },
    GameBack:function(){
        this.removeFromParent();
    },
    NoDone:function(){
        //alert("体验更多技能，请下载APP");
        this.download_dialog("不让你玩！",0);
    },
    jianfen:function(jian_score){
        var jianfen = cc.LabelBMFont.create("-"+jian_score,res.f_jinxnum);
        jianfen.attr({
            x:this.winSize.width/2-10,
            y:this.winSize.height-30
        });
        this.addChild(jianfen);
        var moveAction = cc.moveTo(0.2,cc.p(this.winSize.width/2-20,this.winSize.height-40));
        var callFun = new cc.CallFunc(function(){
            jianfen.removeFromParent();
        });
        jianfen.runAction(cc.sequence(moveAction,callFun));
    },
    getSkill1:function(){
        if( ALL_COIN_NUM >= 200 ){
            ALL_COIN_NUM -= 200 ;
            SKILL1 ++ ;
            this.all_coin_num_label.setString(ALL_COIN_NUM);
            this.jianfen(200);
        }else{
            //alert("金币不足，玩游戏赚取更多金币！");
            this.download_dialog("金币不足！",0);
        }
    },
    getSkill2:function(){
        if( ALL_COIN_NUM >= 500 ){
            ALL_COIN_NUM -= 500 ;
            SKILL2 ++ ;
            this.all_coin_num_label.setString(ALL_COIN_NUM);
            this.jianfen(500);
        }else{
            //alert("金币不足，玩游戏赚取更多金币！");
            this.download_dialog("金币不足！",0);
        }
    },
    download_dialog:function(reason,isNew){
        var download = new DownloadLayer(reason,isNew);
        download.init();
        this.addChild(download);
    }
})