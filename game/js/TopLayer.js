/**
 * @author bgg
 * @游戏结束界面
 */
function TopLayer(){
	base(this,LSprite,[]);
	this.init();
}
TopLayer.prototype.init = function(){
	var self = this;
	
	self.graphics.drawRect(1, "rgba(0,0,0,0.7)", [0, 0, 640, 1136], true, "rgba(0,0,0,0.7)")
	
	self.bgSprite = new LBitmap(new LBitmapData(dataList["result_bg"]));
	self.bgSprite.x = 45;
	self.bgSprite.y = 240;
	self.addChild(self.bgSprite);

	//本次游戏记录
    self.currentScoreLabel= new Num(30,Num.LEFT);
	self.currentScoreLabel.x = 220;
	self.currentScoreLabel.y = 385;
    self.currentScoreLabel.scaleX=0.8;
    self.currentScoreLabel.scaleY=0.8;
	self.currentScoreLabel.setValue(0);
	self.addChild(self.currentScoreLabel);
    
    //本次游戏记录
    self.txtLabel= new LTextField();
	self.txtLabel.x = 83;
	self.txtLabel.y = 461;
	self.txtLabel.color="#ffffff";
	self.txtLabel.size=24;
	self.txtLabel.width=472;
	self.txtLabel.height=100;
	self.txtLabel.text= "";
	self.addChild(self.txtLabel);
	
	self.label_txt_2 = new LBitmap(new LBitmapData(dataList["label_txt_2"]));
	self.label_txt_2.x = 200;
	self.label_txt_2.y = 500;
	self.addChild(self.label_txt_2);
    
    
    //最好游戏记录
    self.bestScore=localStorage.getItem("bestScore");
    self.bestScore =  self.bestScore? self.bestScore:0;
    self.bestScoreLabel= new Num(30,Num.LEFT);
	self.bestScoreLabel.x = 480;
	self.bestScoreLabel.y = 385;
    self.bestScoreLabel.scaleX=0.8;
    self.bestScoreLabel.scaleY=0.8;
	self.bestScoreLabel.setValue( self.bestScore);
	self.addChild(self.bestScoreLabel);
    
    //“新记录”标志
    self.newSprite=new LBitmap(new LBitmapData(dataList["new"]));
    self.addChild(self.newSprite);
    self.newSprite.x=485;
    self.newSprite.y=324;
    
    //排行榜按钮
//  self.topMenuItem = new LSprite();
//  self.topMenuItem.addChild(new LBitmap(new LBitmapData(dataList["top"])));
//  self.topMenuItem.tag =400;
//  self.topMenuItem.x = 230;
//  self.topMenuItem.y = 550;
//  self.topMenuItem.addEventListener(LMouseEvent.MOUSE_DOWN,self.MenuClick);
//  self.addChild(self.topMenuItem);
    
    //再玩一次按钮
    self.playMenuItem = new LSprite();
    self.playMenuItem.addChild(new LBitmap(new LBitmapData(dataList["repeat_play_btn"])));
    self.playMenuItem.tag = 100;
    self.playMenuItem.x = 85;
    self.playMenuItem.y = 805;
    self.playMenuItem.addEventListener(LMouseEvent.MOUSE_DOWN,self.MenuClick);
    self.addChild(self.playMenuItem);
    
    
    //抽奖按钮
    self.shareMenuItem = new LSprite();
    self.shareMenuItem.addChild(new LBitmap(new LBitmapData(dataList["lottery_btn"])));
    self.shareMenuItem.tag =200;
    self.shareMenuItem.x = 324;
    self.shareMenuItem.y = 805;
    self.shareMenuItem.addEventListener(LMouseEvent.MOUSE_DOWN,self.MenuClick);
    self.addChild(self.shareMenuItem);
    

    
    
  

}


TopLayer.prototype.MenuClick=function(e){
    var btn=e.currentTarget;
    if(btn.tag==100){
    		if(productUrl){
    			window.location.href=productUrl;
    		}else{
    			gameStart();
    		}
    }else if(btn.tag==200){
        window.location.href=lotteryUrl;
    }
}

TopLayer.prototype.setScore = function(score){
        var date=new Date();
        var currentDateNum=date.getDate()+date.getMonth();
        var oldDateNum=localStorage.getItem("bestDate");
        if(currentDateNum!=oldDateNum){
            localStorage.setItem("bestDate", currentDateNum);
            this.bestScore=score;
            this.bestScoreLabel.setValue(score);
            //upData gameCenter;
            this.newSprite.visible = true;
            localStorage.setItem("bestScore", score);
        }else if (score>this.bestScore) {
            this.bestScore=score;
            this.bestScoreLabel.setValue(score);
            //upData gameCenter;
            this.newSprite.visible = true;
            localStorage.setItem("bestScore", score);
        }else{
            this.newSprite.visible = false;
        }
        this.currentScoreLabel.setValue(score);
        //更改结果文字
        this.txtLabel.text= "恭喜您抛出了"+score+"光年，击败了"+(80+parseInt(Math.random()*10))+"%的玩家！";
        //ajax提交分数
        submitScore(score);

}


TopLayer.prototype.play = function(){
	TweenMax.from(this.bgSprite,.3,{y:340});
//	TweenMax.from(this.topMenuItem,.5,{y:650});
}
