/**
 * @author bgg
 * @游戏教学界面
 */
function TipLayer(){
	base(this,LSprite,[]);
	this.init();
}

TipLayer.prototype.init=function () {
	var self = this;
	self.oneSprite=new LBitmap(new LBitmapData(dataList["tips1"]));
	self.oneSprite.x=LGlobal.width*.5-self.oneSprite.getWidth()*.5;
	self.oneSprite.y=320;
	self.oneSprite.visible=false;
	self.addChild(self.oneSprite);
	self.twoSprite=new LBitmap(new LBitmapData(dataList["tips2"]));
	self.twoSprite.x=LGlobal.width*.5-self.twoSprite.getWidth()*.5;
	self.twoSprite.y=280;
	self.twoSprite.visible=false;
	self.addChild(self.twoSprite);
	self.threeSprite=new LBitmap(new LBitmapData(dataList["tips3"]));
	self.threeSprite.x=LGlobal.width*.5-self.threeSprite.getWidth()*.5;
	self.threeSprite.y=280;
	self.threeSprite.visible=false;
	self.addChild(self.threeSprite);
}

TipLayer.prototype.onShow=function(id){
	var self = this;
    self.showId=id;
    self.oneSprite.visible=false;
    self.twoSprite.visible=false;
    self.threeSprite.visible=false;
    if(id==1){
        self.oneSprite.visible=true;
    }else if(id==2){
        self.twoSprite.visible=true;
    }else if(id==3){
        self.threeSprite.visible=true;
    }else{
//      self.oneSprite.visible=false;
    }
}
TipLayer.prototype.onHide=function(){
	var self = this;
	self.visible=false;
}