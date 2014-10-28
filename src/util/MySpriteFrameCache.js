var MySpriteFrameCache = function(){}
MySpriteFrameCache.prototype={
    addSpriteFrames:function(file,lie,hang,key){
        var tempSprite = cc.Sprite.create(file);
        var rect = tempSprite.getTextureRect();
        var width = rect.width;
        var height = rect.height;
        var widthOne = width/lie;
        var heightOne = height/hang;
        for(var i=0;i<hang;i++){
            for(var j=0;j<lie;j++){
                var x = j*widthOne;
                var y = i*heightOne;
                var spriteFrame = cc.SpriteFrame.create(file,cc.rect(x,y,widthOne,heightOne));
                cc.spriteFrameCache.addSpriteFrame(spriteFrame,key+"_"+i+j);
            }
        }
    }
}
MySpriteFrameCache.getInstance=function(){
    if(!this.instance){
        this.instance = new MySpriteFrameCache();
    }
    return this.instance;
}