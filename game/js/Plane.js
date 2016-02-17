/**
 * @author bgg
 * @飞机类
 */
function Plane(){
	base(this,LSprite,[]);
	this.init();
}

Plane.prototype.init=function () {
	var self = this;
	self.yspeed=0;
    self.xspeed=20;
    self.aktiv=false;
    self.startYSpeed=8;
    self.startXSpeed=10;
    self.grav=0.1;
    self.isStart=false;
    self.topY=0;
    self.bottonY=0;
    self.faktor=0;
    self.PlaneNodePosY=0;
    self.bgNodeX=0;
    
    
    //添加飞机
	self.addChild( new LBitmap(new LBitmapData(dataList["zhentou"+zhentouType])));
	
	//添加飞机轮子
    self.wheel=new LBitmap(new LBitmapData(dataList["zhentou_bg"]));
//  self.wheel.scaleX=0.6;
//  self.wheel.scaleY=0.6;
//  self.wheel.x=140;
    self.wheel.y=-50;
    self.addChild(self.wheel);
	
}
Plane.prototype.setTopAndBotton=function(top,botton){
    this.topY=top;
    this.bottonY=botton;
}

Plane.prototype.startFly=function(per){
    this.aktiv=true;
    this.yspeed = -this.startYSpeed*(per/100);//重力加速度，飞机下降速度，越来越快
    this.xspeed = this.xspeed + Math.random()*20;//飞机前进速度，主要体现在gameLayer的倒退速度上
}
Plane.prototype.toFly=function(power){
    if (this.aktiv)
    {
        this.PlaneNodePosY=this.y;
        if(this.PlaneNodePosY>620){
            this.PlaneNodePosY=230;
        }
        this.faktor = (power * 2.0 + this.PlaneNodePosY) / 400;
        this.yspeed = this.yspeed - 2* this.faktor;
        this.xspeed = this.xspeed + 6.0 * this.faktor;
        this.xspeed +=this.yspeed / 25.0;

//      this.xspeed = 
//      this.yspeed =
    }
}
Plane.prototype.stopFly=function(){
    this.aktiv=false;
}
Plane.prototype.updata=function(){
    if(this.aktiv){
    	
    		//触碰上层气流层
        if (this.y <=this.topY )
        {
            this.xspeed=50;
            this.yspeed = this.yspeed + 1;
        }
        //触碰下层气流层
        if(this.y>=this.bottonY){
            this.xspeed-=0.2;
            gameLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
            if (this.xspeed < 1.0)
            {
               	this.xspeed = 0.0;
                gameLayer.gameOver();
                this.aktiv=false;
            } // end if
        }else{
            if (this.yspeed <0)
            {
                this.xspeed -=this.yspeed / 20.0;
            }
            if(this.xspeed>10){
                this.xspeed *= 0.99;
            }
            this.yspeed += this.grav;
            this.y+= this.yspeed;
            
            //飞机头部抬起，不让机头往下坠
		    this.rotate=this.yspeed>0?0:this.yspeed;
        }
        gameLayer.updataBg(this.xspeed);
       
    }
}