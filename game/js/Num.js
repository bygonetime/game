/**
 * @author bgg
 * 
 */
/**
 * @author bgg
 * @param {Object} direction
 * @param {String} width      字符的宽度
 */
function Num(width,direction){
	base(this,LSprite,[]);
	this.init(width,direction);
}
Num.LEFT = "num_left";
Num.RIGHT = "num_right";
Num.prototype.init = function(width,direction){
	var self = this;
	self.direction = direction;
	self.width = width!==undefined?width:"20";
	self.dataList = [
		new LBitmapData(dataList["num_0"]),
		new LBitmapData(dataList["num_1"]),
		new LBitmapData(dataList["num_2"]),
		new LBitmapData(dataList["num_3"]),
		new LBitmapData(dataList["num_4"]),
		new LBitmapData(dataList["num_5"]),
		new LBitmapData(dataList["num_6"]),
		new LBitmapData(dataList["num_7"]),
		new LBitmapData(dataList["num_8"]),
		new LBitmapData(dataList["num_9"]),
		new LBitmapData(dataList["num_km"])
	];
	self.list = [];
//	self.setValue(0);
};
Num.prototype.setValue = function(value){
	var self = this;
	self.value = value;
	var strValue = self.value.toString(),numBitmap,sx;
	
	if(self.childList.length != strValue.length){
		self.setList(strValue.length);
	}
	
	
	for(var i=0,l=strValue.length;i<l;i++){
		numBitmap = self.childList[i];
		var numberValue = strValue.charAt(i);//获取每个字符
		
		//特殊字符判断，这里是输出"km"
		if(numberValue=="#"){
			numBitmap.bitmapData = self.dataList[10];
			continue;
		}
		numBitmap.bitmapData = self.dataList[parseInt(strValue.charAt(i))];
	}
};
Num.prototype.setList = function(length){
	var self = this;
	if(self.childList.length > length){
		self.childList.splice(length - 1,self.childList.length - length);
		return;
	}
	var sx,numBitmap;
	if(self.direction == Num.LEFT){
		sx = -length*self.width;
	}else{
		sx = -self.width;
	}
	for(var i=0,l=length;i<l;i++){
		if(i >= self.childList.length){
			numBitmap = new LBitmap(self.dataList[0]);
			self.addChild(numBitmap);
		}
		numBitmap = self.childList[i];
		sx += self.width;
		numBitmap.x = sx;
	}
};
