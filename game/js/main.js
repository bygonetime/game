var mfps=45;   //帧频
var dw = 640;//设计宽度
var dh = 1136;//设计高度
init(1000 / mfps, "canvas", dw, dh, main);


window.onresize =resizeTips;
function resizeTips(){	
    var ch = document.documentElement.clientHeight;	
    var cw = document.documentElement.clientWidth;	
    if(cw/ch>1){	
        document.getElementById("canvas").style.display="none";	
        document.getElementById("tips").style.display="block";	
    }else{	
        document.getElementById("tips").style.display="none";	
        document.getElementById("canvas").style.display="block";	
    }	
}		

var loadData = [
{name : "bg_back",path :  fileUrl+"images/bg_back.jpg"}, /*游戏背景*/
{name : "logo",path :  fileUrl+"images/logo.png"}, /*LOGO*/
{name : "xingxing_bg",path :  fileUrl+"images/xingxing_bg.png"}, /*天空星星背景*/
{name : "begin_paodao_bg",path :  fileUrl+"images/begin_paodao_bg.png"}, /*跑道开始背景*/
{name : "end_paodao_bg",path :  fileUrl+"images/end_paodao_bg.png"}, /*跑道结束背景*/
{name : "paodao_bg1",path :  fileUrl+"images/paodao_bg1.png"}, /*跑道平时背景1*/
{name : "paodao_bg2",path :  fileUrl+"images/paodao_bg2.png"}, /*跑道平时背景2*/
{name : "sky_bg1",path :  fileUrl+"images/sky_bg1.png"}, /*天空云朵背景1*/
{name : "sky_bg2",path :  fileUrl+"images/sky_bg2.png"}, /*天空云朵背景2*/
{name : "zhentou1",path :  fileUrl+"images/zhentou1.png"}, /*枕头*/
{name : "zhentou2",path :  fileUrl+"images/zhentou2.png"}, /*枕头*/
{name : "zhentou3",path :  fileUrl+"images/zhentou3.png"}, /*枕头*/
{name : "zhentou4",path :  fileUrl+"images/zhentou4.png"}, /*枕头*/
{name : "zhentou_bg",path :  fileUrl+"images/zhentou_bg.png"}, /*枕头光环*/
{name : "pao1",path :  fileUrl+"images/pao1.png"}, /*途经地方1*/
{name : "pao2",path :  fileUrl+"images/pao2.png"}, /*途经地方2*/
{name : "pao3",path :  fileUrl+"images/pao3.png"}, /*途经地方3*/
{name : "pao4",path :  fileUrl+"images/pao4.png"}, /*途经地方4*/
{name : "pao5",path :  fileUrl+"images/pao5.png"}, /*途经地方5*/
{name : "pao6",path :  fileUrl+"images/pao6.png"}, /*途经地方6*/
{name : "pao7",path :  fileUrl+"images/pao7.png"}, /*途经地方7*/
{name : "pao8",path :  fileUrl+"images/pao8.png"}, /*途经地方8*/
{name : "pao9",path :  fileUrl+"images/pao9.png"}, /*途经地方9*/
{name : "pao10",path :  fileUrl+"images/pao10.png"}, /*途经地方10*/
{name : "pao11",path :  fileUrl+"images/pao11.png"}, /*途经地方11*/
{name : "pao12",path :  fileUrl+"images/pao12.png"}, /*途经地方12*/
{name : "pao13",path :  fileUrl+"images/pao8.png"}, /*途经地方13*/
{name : "pao14",path :  fileUrl+"images/pao8.png"}, /*途经地方14*/
{name : "tips1",path :  fileUrl+"images/tips1.png"}, /*提示1*/
{name : "tips2",path :  fileUrl+"images/tips2.png"}, /*提示2*/
{name : "tips3",path :  fileUrl+"images/tips3.png"}, /*提示3*/
{name : "power_wrap",path :  fileUrl+"images/power_wrap.png"}, /*能量槽外框*/
{name : "power",path :  fileUrl+"images/power.png"}, /*能量槽条状*/

{name : "new",path :  fileUrl+"images/new.png"}, /*新纪录图标*/
{name : "num_0",path :  fileUrl+"images/num_0.png"}, /*数字0*/
{name : "num_1",path :  fileUrl+"images/num_1.png"}, 
{name : "num_2",path :  fileUrl+"images/num_2.png"}, 
{name : "num_3",path :  fileUrl+"images/num_3.png"}, 
{name : "num_4",path :  fileUrl+"images/num_4.png"}, 
{name : "num_5",path :  fileUrl+"images/num_5.png"}, 
{name : "num_6",path :  fileUrl+"images/num_6.png"}, 
{name : "num_7",path :  fileUrl+"images/num_7.png"}, 
{name : "num_8",path :  fileUrl+"images/num_8.png"}, 
{name : "num_9",path :  fileUrl+"images/num_9.png"}, /*数字9*/
{name : "repeat_play_btn",path :  fileUrl+"images/repeat_play_btn.png"}, /*再玩一次按钮*/
{name : "lottery_btn",path :  fileUrl+"images/lottery_btn.png"}, /*抽奖按钮*/
{name : "result_bg",path:fileUrl+"images/result_bg.jpg"},
{name : "label_txt_2",path:fileUrl+"images/label_txt_2.jpg"},
{type : "js",path :  fileUrl+"libs/TweenMax.min.js"},
{type : "js",path :  fileUrl+"js/GameLayer.js"},
{type : "js",path :  fileUrl+"js/TopLayer.js"},
{type : "js",path :  fileUrl+"js/Num.js"},
{type : "js",path :  fileUrl+"js/TipLayer.js"},
{type : "js",path :  fileUrl+"js/Plane.js"}
];

var stageLayer;	//舞台层
var gameLayer;//游戏层
var dataList;	//全局资源
var GameState={reading:0,pressing:1,staring:2,ending:3};
var startLoadTime=new Date().getTime();//开始加载的时间
var endLoadTime;//结束加载的时间
function main() {
	
	if(LGlobal.mobile){
		LGlobal.stageScale = LStageScaleMode.FIXED_WIDTH;
		LGlobal.fixedMode = LStageScaleMode.FIXED_MODE_MIDDLE;
	}else{
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}
	
	LSystem.screen(LStage.FULL_SCREEN);
//	LGlobal.setDebug(true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
//	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
//	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	LLoadManage.load(loadData, function(progress) {
		document.getElementById("loading_txt").innerHTML = progress+"%";	
	}, imgLoadComplete);
}
function imgLoadComplete(result){
	dataList = result;
	stageLayer = new LSprite();
	addChild(stageLayer);
	$("#loading").hide();
	$("#canvas").show();
	gameStart();
//	endLoadTime = new Date().getTime();//结束加载的时间
//	if(endLoadTime-startLoadTime<2000){
//		setTimeout(function () {
//			$("#loading").hide();
//			$("#canvas").show();
//			gameStart();
//		},800)
//	}else{
//		$("#loading").hide();
//		$("#canvas").show();
//		gameStart();
//	}
	
	
//	var fps = new FPS();
//	fps.y-=LGlobal.cutOffsetY;
//	addChild(fps);
}

function gameStart(){
	stageLayer.removeAllChild();
	stageLayer.die();
	gameLayer = new GameLayer();
	stageLayer.addChild(gameLayer);
}
