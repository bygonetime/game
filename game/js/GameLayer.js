/**
 * @author bgg
 */
function GameLayer(){
	base(this,LSprite,[]);
	this.init();
}
GameLayer.prototype.init = function(){
	var self = this;
	self.state = GameState.reading;//游戏状态，分为 1.reading力量槽蓄力中   2.
    self.mainPlane= null;
    self.moveTo= null;
    self.tataiMoveFromRight= null;
    self.tataiMoveToLeft= null;
    self.flyMode= null;
    self.ground1Sprite= null;
    self.ground2Sprite= null;
    self.disTime= 0;
    self.flyDis= 0;
    self.endingNum=0;
    self.isTiped= 0;
    

    
    
	//背景
	var bgSprite =new LSprite();
	bgSprite.addChild(new LBitmap(new LBitmapData(dataList["bg_back"])));
	self.addChild(bgSprite);
	
	//logo
	var logoSprite = new LBitmap(new LBitmapData(dataList["logo"]));
	logoSprite.x =154;
	logoSprite.y = 30-LGlobal.getOffsetY();
	self.addChild(logoSprite);
	
	//星星背景
	self.xingxing1Sprite = new LBitmap(new LBitmapData(dataList["xingxing_bg"]));
	self.xingxing1Sprite.x =0;
	self.xingxing1Sprite.y = 200;
	self.addChild(self.xingxing1Sprite);
	self.xingxing2Sprite = new LBitmap(new LBitmapData(dataList["xingxing_bg"]));
	self.xingxing2Sprite.x =640;
	self.xingxing2Sprite.y = 200;
	self.addChild(self.xingxing2Sprite);
	
	//当前分数
	self.currentScoreLabel= new Num(30,Num.LEFT);
	self.currentScoreLabel.x = 70;
	self.currentScoreLabel.y = 810;//346;
	self.currentScoreLabel.setValue(0);
	self.addChild(self.currentScoreLabel);
	
	//当前能量条
	self.powerLineSprite = new LSprite();
	self.powerLineSprite.bitmapData = new LBitmapData(dataList["power"]);
	self.powerLineSprite.addChild(new LBitmap(self.powerLineSprite.bitmapData));
	self.powerLineSprite.x = 73;
	self.powerLineSprite.y = 871;
	self.addChild(self.powerLineSprite);
	
	//设置力量槽变量
    self.powerLineSprite.totalPower = self.powerLineSprite.getWidth();//总能量值
	self.powerLineSprite.touchPower = Math.ceil(self.powerLineSprite.totalPower/10);//每点一下，扣除的能量值
	self.powerLineSprite.currentPower = 0;
	self.powerLineSprite.bitmapData.setProperties(0,0,0,31);

	
	//当前能量槽框
	self.powerFrameSprite = new LBitmap(new LBitmapData(dataList["power_wrap"]));
	self.powerFrameSprite.x=67;
	self.powerFrameSprite.y=865;
	self.addChild(self.powerFrameSprite);
	
	
	//建筑物
	self.buildSpriteArray=new Array();
    for(var i=1;i<=12;i++){
        var b=new LBitmap(new LBitmapData(dataList["pao"+i]));
        b.y=780-b.getHeight();
        b.x = 640;
        self.buildSpriteArray.push(b);
        self.addChild(b);
    }
    
    //地板1+2
    self.ground1Sprite = new LBitmap(new LBitmapData(dataList["paodao_bg1"]));
    self.ground1Sprite.x = 640;
    self.ground1Sprite.y = 780-self.ground1Sprite.getHeight();
	self.addChild(self.ground1Sprite);
//	self.ground1Sprite.visible=false;
    self.ground2Sprite = new LBitmap(new LBitmapData(dataList["paodao_bg2"]));
    self.ground2Sprite.x = 1280;
    self.ground2Sprite.y = 780-self.ground2Sprite.getHeight();
	self.addChild(self.ground2Sprite);
//	self.ground2Sprite.visible=false;
    
    	
    //起始背景
    self.beginPaodaoNode = new LBitmap(new LBitmapData(dataList["begin_paodao_bg"]));
    self.beginPaodaoNode.x = 0;
    self.beginPaodaoNode.y = 600;
	self.addChild(self.beginPaodaoNode);
	
	
	//结束背景
    self.endPaodaoNode = new LBitmap(new LBitmapData(dataList["end_paodao_bg"]));
    self.endPaodaoNode.x = 640;
    self.endPaodaoNode.y = 600;
	self.addChild(self.endPaodaoNode);
	
	
	//飞机和轮子
	self.plane = new Plane();
	self.plane.x = 45;
	self.plane.y = 625;
    self.addChild(self.plane);
    TweenMax.from(self.plane, 0.8, {y:-200, delay:0.5, ease:Linear.easeInOut,
   		onComplete:function(){
		    	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.onTouchBegan.bind(self));
			self.addEventListener(LMouseEvent.MOUSE_UP,self.onTouchEnded.bind(self));
			self.addEventListener(LEvent.ENTER_FRAME,self.onframe.bind(self));
	    }
    });
	self.plane.setTopAndBotton(200,705);
    	//白云
    self.clound1Sprite=new LBitmap(new LBitmapData(dataList["sky_bg1"]));
    self.clound2Sprite=new LBitmap(new LBitmapData(dataList["sky_bg2"]));
    self.clound1Sprite.x =640 ;
    self.clound1Sprite.y=100;
    self.clound2Sprite.x =1280 ;
    self.clound2Sprite.y=100;
    	self.addChild(self.clound1Sprite);
    	self.addChild(self.clound2Sprite);
    	
    //乌云
    self.wuyunNode=new LSprite();
    var wy1Sprite=new LBitmap(new LBitmapData(dataList["wuyun"]));
    var wy2Sprite=new LBitmap(new LBitmapData(dataList["wuyun"]));
    wy1Sprite.x=0;
    wy2Sprite.x=640;
    self.wuyunNode.addChild(wy1Sprite);
    self.wuyunNode.addChild(wy2Sprite);
    self.addChild(self.wuyunNode);
    self.wuyunNode.x = 0;
    self.wuyunNode.y = 600;
    self.wuyunNode.visible=false;
    //控制塔
//  self.tataiSprite=new LBitmap(new LBitmapData(dataList["tatai"]));
//  self.tataiSprite.x = 530;
//  self.tataiSprite.y= 555;
//  self.addChild(self.tataiSprite);
//  TweenMax.from(self.tataiSprite, 0.3, {x:LGlobal.width, delay:1.2, ease:Linear.easeNone,
//  		onComplete:function(){
//		    	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.onTouchBegan.bind(self));
//			self.addEventListener(LMouseEvent.MOUSE_UP,self.onTouchEnded.bind(self));
//			self.addEventListener(LEvent.ENTER_FRAME,self.onframe.bind(self));
//	    }
//  });

    //结束界面
    self.topLayer=new TopLayer();
    self.addChild(self.topLayer);
	self.topLayer.visible=false;
	
	//教学界面
	self.isTiped=localStorage.getItem("isTiped");
	self.isTiped = self.isTiped=="true"?true:false;
    if(!self.isTiped){
        self.gameTipLayer=new TipLayer();
        self.gameTipLayer.x=0;
        self.gameTipLayer.y=0;
        self.addChild(self.gameTipLayer);
        self.gameTipLayer.onShow(1);
//      self.gameTipLayer.isOk=true;
    }
	

    
	
	
};
GameLayer.prototype.onframe = function(event){
	var self = this;
	var per = Math.ceil(self.powerLineSprite.currentPower/self.powerLineSprite.totalPower*100);
        		
    if(self.state==GameState.pressing){

        self.updataBg(per);
        if(per<100){
        		per+=2;
            self.powerLineSprite.currentPower += self.powerLineSprite.totalPower*0.02;
            self.powerLineSprite.bitmapData.setProperties(0,0,self.powerLineSprite.currentPower,31);
            self.currentScoreLabel.x=(70+per*5);
            self.currentScoreLabel.setValue(per);
            if(per>=99){
            		if(!self.isTiped){
            			self.gameTipLayer.onShow(2);
            		}
        			
            }
        }
		
    }else if(self.state==GameState.playing){
    		
        if(per<100&&per>0){
            if(self.disTime%20==0){
                self.disTime=0;
                per+=1;
            		self.powerLineSprite.currentPower += self.powerLineSprite.totalPower*0.01;
            		self.powerLineSprite.bitmapData.setProperties(0,0,self.powerLineSprite.currentPower,31);
            }
            self.disTime++;
        }
        if(self.plane.y>700){
        		if(self.gameTipLayer.visible){
    				self.gameTipLayer.onHide();
        		}
            if(self.powerFrameSprite.visible){
				self.powerLineSprite.visible = false;
				self.powerFrameSprite.visible = false;
//				TweenMax.fromTo(self.tataiSprite, 1.3, {x:700},{x:530,delay:2, ease:Linear.easeNone});
                self.plane.wheel.visible = true;
            }
            if(self.plane.x<363){
                 self.plane.x+=3;
            }
        }
    }else if(self.state==GameState.ending){
    		if(!self.topLayer.visible){
    			self.topLayer.visible = true;
	        	self.topLayer.play();
    		}
		
    }
    self.plane.updata();
};



GameLayer.prototype.onTouchBegan=function(event){
    var self =this;
	var per = Math.ceil(self.powerLineSprite.currentPower/self.powerLineSprite.totalPower*100);

	//飞机一点击，进入蓄力状态
    if(self.state==GameState.reading){
        self.state=GameState.pressing;
//  		TweenMax.to(self.tataiSprite, 0.8, {x:-200,  ease:Linear.easeNone});//指挥塔退下
    		
    //后续的点击，则是给飞机向上的动力
    }else if(self.state==GameState.playing){
        if(!self.isTiped){
    			self.gameTipLayer.onHide();
    		}
        if(per==0){//能量不足，则不做任何操作
            return;
        }
        
        self.plane.toFly(per);
        //能量足够的前提下，每点击一次，则扣除10%能量
		if(per>10){
			per-=10;
			self.powerLineSprite.currentPower-=self.powerLineSprite.touchPower;
		}else{
			per=0;
			self.powerLineSprite.currentPower=0;
		}
		//设置能量条长度，setProperties（x,y,width,height）
		self.powerLineSprite.bitmapData.setProperties(0,0,self.powerLineSprite.currentPower,31);
        self.plane.toFly(per);
    }
    return true;
}
GameLayer.prototype.onTouchEnded=function(event){
    var self=this;
	var per = Math.ceil(self.powerLineSprite.currentPower/self.powerLineSprite.totalPower*100);
	//蓄力状态下，才做操作
    if(self.state==GameState.pressing){
        //告诉起飞
        if(!self.isTiped){
            self.gameTipLayer.onShow(3);
        }
        self.plane.startFly(per);//告诉飞机，开始飞行
        self.state=GameState.playing;//状态改为飞行中
        self.currentScoreLabel.x = -300;//这个数字显示从能量数字，改为显示公里数，在updateBg中运用
        self.currentScoreLabel.y = 346;
//      self.plane.wheel.visible = false;//把飞机轮子收起来
    }
}

GameLayer.prototype.updataBg=function(xSpeed){
	var self=this;
    var posX;
    
    
    //定义各个物体的滚动速度
    var per = Math.ceil(self.powerLineSprite.currentPower/self.powerLineSprite.totalPower*100);
    if(per>0&&self.plane.y<=706){
        xSpeed=50;
    }
    self.flyDis+=xSpeed;//飞行距离累积
//  var groundXSpeed = xSpeed*0.35;//定义地板滚动速度
//  	var	beginPaodaoXSpeed = xSpeed*0.3;//定义开始跑道的滚动速度
//  var cloundXSpeed =xSpeed*.1;//定义白云背景的滚动速度
//  var xingxingXSpeed =xSpeed*.05;//定义星星背景的滚动速度
//  var buildXSpeed=xSpeed*0.3;//定义建筑物滚动速度
    
    var groundXSpeed = xSpeed*0.25;//定义地板滚动速度
    	var	beginPaodaoXSpeed = xSpeed*0.2;//定义开始跑道的滚动速度
    var cloundXSpeed =xSpeed*.1;//定义白云背景的滚动速度
    var xingxingXSpeed =xSpeed*.05;//定义星星背景的滚动速度
    var buildXSpeed=xSpeed*0.3;//定义建筑物滚动速度
    
    if(self.state==GameState.playing){ //飞行中
    		//背景物体1：跑道开始时背景
    		paodaoPosX=self.beginPaodaoNode.x-beginPaodaoXSpeed;
        if(paodaoPosX>=-640){
            self.beginPaodaoNode.x=paodaoPosX;
        }
      
    		//背景物体2：地板,控制地板移动				
    		var groundPosX=this.ground1Sprite.x-groundXSpeed;
        	if(groundPosX<-640){
	        groundPosX=640;
        }
        self.ground1Sprite.x=groundPosX;
        
    		groundPosX=this.ground2Sprite.x-groundXSpeed;
        	if(groundPosX<-640){
	        groundPosX=640;
        }
        self.ground2Sprite.x=groundPosX;
    	
    	
    		
        
        //背景物体3：白云
	    cloundPosX=self.clound1Sprite.x-cloundXSpeed;
	    if(cloundPosX<-640){
	        cloundPosX=640;
	    }
	    self.clound1Sprite.x=cloundPosX;
		
	    cloundPosX=self.clound2Sprite.x-cloundXSpeed;
	    if(cloundPosX<-640){
	        cloundPosX=640;
	    }
	    self.clound2Sprite.x=cloundPosX;
	        
	    //背景物体4：星星
	    xingxingPosX=self.xingxing1Sprite.x-xingxingXSpeed;
	    if(xingxingPosX<-640){
	        xingxingPosX=640;
	    }
	    self.xingxing1Sprite.x=xingxingPosX;

	    xingxingPosX=self.xingxing2Sprite.x-xingxingXSpeed;
	    if(xingxingPosX<-640){
	        xingxingPosX=640;
	    }
	    self.xingxing2Sprite.x=xingxingPosX;
        
        
        
        //背景物体5：建筑物
	    var buildId=Math.floor(self.flyDis/5000)-1;//每超过5000米，显示一个建筑物
	    if(buildId>=0){
	        buildId=buildId>10?10:buildId;
	        buildPosX=self.buildSpriteArray[buildId].x-buildXSpeed;//建筑物向后移动
	        if(buildPosX<-640){//移动超过屏幕后，不再运动
	            self.buildSpriteArray[buildId].x=buildPosX;
	        }
	        self.buildSpriteArray[buildId].x=buildPosX;
	    }
        
        
        
        if(self.plane.y>705&&self.beginPaodaoNode.visible){//飞机高度不够时，结束背景出现跑，并往后跑动
			self.beginPaodaoNode.visible = false;//
			TweenMax.to(self.endPaodaoNode, 1.5, {x:0,  ease:Linear.easeOut,
		   		onComplete:function(){
					
			    }
		    });
        }
        
        
    		
	    
    }
    
    
	

    
   
}

GameLayer.prototype.gameOver=function(){
	var self = this;
    if(self.state==GameState.ending)return;
    self.state=GameState.ending;//修改游戏状态为游戏结束
    self.topLayer.setScore(this.flyDis>>0);//设置本次分数
    if(!self.isTiped){
//		self.isTiped=true;//打开这个注释后，提示只会在第一次出现
		self.gameTipLayer.onHide();
        localStorage.setItem("isTiped", self.isTiped);
    }
}
GameLayer.prototype.showMenu = function(isShow){
    this.powerFrameSprite.visible=!isShow;
    this.currentScoreLabel.visible=!isShow;
    this.powerLineSprite.visible=!isShow;
    
    //弹出结束菜单
    if(isShow){
		this.topLayer.visible = isShow;
        this.topLayer.play();
    }
}
