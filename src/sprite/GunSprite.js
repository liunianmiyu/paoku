/**
 * 枪支类型：1：AK枪
 *           2：不知道
 *           3：激光枪
 *           4：炮弹
 * Created by Administrator on 2014/10/10.
 */
var GunSprite = cc.Sprite.extend({
    flag:null,
    gun:null,
    ctor:function(flag){
        this._super();
        this.flag = flag;
    },
    init:function(){
        this.createGun(this.flag);
    },
    createGun:function(flag){
        switch (flag){
            case 1:
                this.gun = cc.Sprite.create("res/gun/wuqi_AK.png");
                break;
            case 2:
                this.gun = cc.Sprite.create("res/gun/wuqi_shouqiang.png");
                break;
            case 3:
                this.gun = cc.Sprite.create("res/gun/wuqi_jiguangqiang.png");
                break;
            case 4:
                this.gun = cc.Sprite.create("res/gun/wuqi_pao.png");
                break;
            default :
                break;
        }
        this.addChild(this.gun);
    }
})