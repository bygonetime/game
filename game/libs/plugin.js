/**				
 * Created by        宝哥哥  2014.10.1				
 */		
var hHeight;		
var wWidth;

function plugin(pluginName){
    switch(pluginName){
        case "scaleMode"://适配兼容扩展插件
            LGlobal.fixedMode = "middle";
            LStageScaleMode.FIXED_WIDTH  ="FixedWidth";
            LStageScaleMode.FIXED_HEIGHT  ="FixedHeight";
            LStageScaleMode.FIXED_MODE_TOP  ="top";
            LStageScaleMode.FIXED_MODE_BOTTOM  ="bottom";
            LStageScaleMode.FIXED_MODE_MIDDLE  ="middle";//居中
            LStageScaleMode.FIXED_MODE_LEFT  ="left";
            LStageScaleMode.FIXED_MODE_RIGHT  ="right";
            LGlobal.resize = function (canvasW, canvasH) {
                var w, h, t = 0, l = 0, ww = window.innerWidth, wh = window.innerHeight;
//              var ch = document.documentElement.clientHeight;
//              var cw = document.documentElement.clientWidth;
//				console.log("ww:"+ww+" wh:"+wh);
				//计算屏幕缩放比率
				LGlobal.radio = wh/dh;
//				console.log("屏幕缩放率:"+LGlobal.radio);
				
//				LGlobal.radio = 1;
                if (canvasW) {
                    w = canvasW;
                }
                if (canvasH) {
                    h = canvasH;
                }
                if (LGlobal.stageScale == "noScale") {
                    w = canvasW || LGlobal.width;
                    h = canvasH || LGlobal.height;
                }
                switch (LGlobal.stageScale) {
                    case "FixedWidth":
                        w = ww;
                        h = LGlobal.height*(w/LGlobal.width);
                        
                        var radius = LGlobal.radius = h/LGlobal.height;

                        switch (LGlobal.fixedMode){
                            case "top":
                                t=0;
                                LGlobal.cutOffsetY=0;
                                break;
                            case "bottom":
                                t=-(h-wh);

                                LGlobal.cutOffsetY=t/radius;
                                break;
                            case "middle":
                                t=-((h-wh)/2);
                                LGlobal.cutOffsetY = t/radius;
                                break;
                        }

                        LGlobal.cutOffsetX = 0;
                        $("#legend > div").eq(0).css({overflow:"hidden",height:wh+"px"})
                        break;
                    case "FixedHeight":
                        h = wh;
                        w = LGlobal.width*(h/LGlobal.height);
                        var radius = LGlobal.radius = w/LGlobal.weight;
                        switch (LGlobal.fixedMode){
                            case "left":
                                l=0;
                                break;
                            case "right":
                                l=-(w-cw);
                                break;
                            case "middle":
                                l=-((w-cw)/2);
                                break;
                        }
                        LGlobal.cutOffsetY = 0;
                        $("#legend > div").eq(0).css({overflow:"hidden",width:cw+"px"})
                        break;
                    case "exactFit":
                        w = canvasW || ww;
                        h = canvasH || wh;
                        break;
                    case "noBorder":
                        w = canvasW || ww;
                        h = canvasH || LGlobal.height*ww/LGlobal.width;
                        switch (LGlobal.align) {
                            case LStageAlign.BOTTOM:
                            case LStageAlign.BOTTOM_LEFT:
                            case LStageAlign.BOTTOM_RIGHT:
                            case LStageAlign.BOTTOM_MIDDLE:
                                t = wh - h;
                                break;
                        }
                        break;
                    case "showAll":
                        if (ww / wh > LGlobal.width / LGlobal.height) {
                            h = canvasH || wh;
                            w = canvasW || LGlobal.width * wh / LGlobal.height;
                        } else {
                            w = canvasW || ww;
                            h = canvasH || LGlobal.height * ww / LGlobal.width;
                        }
                    case "noScale":
                    default:
                        switch (LGlobal.align) {
                            case LStageAlign.BOTTOM:
                            case LStageAlign.BOTTOM_LEFT:
                                t = wh - h;
                                break;
                            case LStageAlign.RIGHT:
                            case LStageAlign.TOP_RIGHT:
                                l = ww - w;
                                break;
                            case LStageAlign.TOP_MIDDLE:
                                l = (ww - w) * 0.5;
                                break;
                            case LStageAlign.BOTTOM_RIGHT:
                                t = wh - h;
                                l = ww - w;
                                break;
                            case LStageAlign.BOTTOM_MIDDLE:
                                t = wh - h;
                                l = (ww - w) * 0.5;
                                break;
                            case LStageAlign.MIDDLE:
                                t = (wh - h) * 0.5;
                                l = (ww - w) * 0.5;
                                break;
                            case LStageAlign.TOP:
                            case LStageAlign.LEFT:
                            case LStageAlign.TOP_LEFT:
                            default:
                        }
                }
                LGlobal.canvasObj.style.marginTop = t + "px";
                LGlobal.canvasObj.style.marginLeft = l + "px";
                if (LGlobal.isFirefox) {
                    LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
                    LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
                }
                LGlobal.ll_setStageSize(w, h);
            };
            break;
    		case "textField":
    			LTextField = (function () {
			function LTextField () {
				var s = this;
				LExtends(s, LInteractiveObject, []);
				s.type = "LTextField";
				s.texttype = null;
				s.text = "";
				s.htmlText = "";
				s.styleSheet = "";
				s.font = "Arial";
				s.size = 15;
				s.color = "#000000";
				s.weight = "normal";
				s.textAlign = "left";
				s.textBaseline = "top";
				s.heightMode = LTextField.HEIGHT_MODE_BOTTOM;
				s.stroke = false;
				s.lineWidth = 1;
				s.lineColor = "#000000";
				s.width = 150;
				s.height = s.size;
				s.displayAsPassword = false;
				s.wordWrap = false;
				s.multiline = false;
				s.numLines = 1;
				s.speed = 0;
				s._speedIndex = 100;
			}
			LTextField.HEIGHT_MODE_BOTTOM = "bottom";
			LTextField.HEIGHT_MODE_BASELINE = "baseline";
			var p = {
				_showReady : function (c) {
					var s = this;
					c.font = s.weight + " " + s.size + "px " + s.font;  
					c.textAlign = s.textAlign;
					c.textBaseline = s.textBaseline;
				},
				ll_getStyleSheet : function (textFormat, tabName, attribute, text) {
					var s = this, pattern, tf = textFormat.clone();
					if (tabName == "font") {
						var i = 0;
						while (attribute) {
							if (i++ > 4)
								break;
							pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
							var arr = pattern.exec(attribute);
							if (!arr || !arr[0]) {
								break;
							}
							switch(arr[2]) {
								case "face":
									tf.font = arr[6];
									break;
								case "color":
									tf.color = arr[6];
									break;
								case "size":
									tf.size = arr[6];
									break;
							}
							attribute = attribute.replace(arr[0], "").replace(/(^\s*)|(\s*$)|(\n)/g, "");
						}
					} else if (tabName == "b") {
						tf.bold = true;
					} else if (tabName == "u") {
						tf.underline = true;
					} else if (tabName == "i") {
						tf.italic = true;
					} else if (tabName == "p" && s.wordWrap) {
						text = "\n" + text + "\n";
					} else if(s.styleSheet){
						var sheetObj;
						if (tabName == "span"){
							pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
							var arr = pattern.exec(attribute);
							if (arr && arr[0]) {
								switch(arr[2]) {
									case "class":
										sheetObj = s.styleSheet.getStyle("." + arr[6]);
										break;
								}
							}
						}else if(s.styleSheet.getStyle(tabName)){
							sheetObj = s.styleSheet.getStyle(tabName);
						}
						if(sheetObj){
							tf.setCss(sheetObj);
						}
					}
					s.ll_getHtmlText(tf, text); 
				},
				ll_getHtmlText : function (tf, text) {
					if (!text) {
						return;
					}
					var s = this, tabName, content, start, end, pattern = /<(.*?)(\s*)(.*?)>(.*?)<\/\1>/g, arr = pattern.exec(text);
					if (!arr || !arr[0]) {
						s.ll_htmlTexts.push({
							textFormat : tf.clone(),
							text : text
						});
						return;
					}
					if (arr.index > 0) {
						s.ll_htmlTexts.push({
							textFormat : tf.clone(),
							text : text.substring(0, arr.index)
						});
					}
					tabName = arr[1];
					start = arr.index;
					end = start;
					do {
						end = text.indexOf("</" + tabName, end + 1);
						start = text.indexOf("<" + tabName, start + 1);
					} while(start > 0 && start < end);
					content = text.substring(text.indexOf(">", arr.index) + 1, end);
					s.ll_getStyleSheet(tf, tabName, arr[3], content);
					s.ll_getHtmlText(tf, text.substring(end + tabName.length + 3));
				},
				_ll_show : function (c) {
					var s = this, d, lbl, i, rc, j, l, k, m, b, h, enter, tf, underlineY;
					if (s.texttype == LTextFieldType.INPUT) {
						s.inputBackLayer.ll_show();
						rc = s.getRootCoordinate();
						if (LGlobal.inputBox.name == "input" + s.objectIndex) {
							LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
							LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
							alert(LGlobal.inputBox.style.marginTop);
							alert(LGlobal.inputBox.style.marginLeft);
						}
						if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex == s.objectIndex) {
							return;
						}
					}
					if (LGlobal.fpsStatus) {
						LGlobal.fpsStatus.text++;
					}
					c.fillStyle = s.color;
					if (s.stroke) {
						c.strokeStyle = s.lineColor;
						c.lineWidth = s.lineWidth + 1;  
					}
					if (s.htmlText) {
						if (s.ll_htmlText != s.htmlText || (s.styleSheet && (s.ll_style_objectIndex != s.styleSheet.objectIndex || s.ll_styleIndex == s.styleSheet.styleIndex))) {
							tf = new LTextFormat();
							s.ll_htmlTexts = [];
							s.ll_htmlText = s.htmlText;
							if(s.styleSheet){
								s.ll_style_objectIndex = s.styleSheet.objectIndex;
								s.ll_styleIndex = s.styleSheet.styleIndex;
							}
							s.ll_getHtmlText(tf, s.htmlText);
						}
						j = 0, k = 0, m = 0, b = 0;
						s._wordHeight = s.wordHeight || 30;
						if(!LTextField.underlineY){
							LTextField.underlineY = {"alphabetic" : 0, "top" : 1, "bottom" : -0.2, "middle" : 0.4, "hanging" : 0.8};
						}
						s.ll_htmlTexts.forEach(function(element){
							var textFormat = element.textFormat, text = element.text;
							c.font = textFormat.getFontText();
							c.fillStyle = textFormat.color;
							for (i = 0, l = text.length; i < l; i++) {
								enter = /(?:\r\n|\r|\n|¥n)/.exec(text.substr(i, 1));
								if (enter) {
									j = 0;
									k = i + 1;
									m++;
								} else {
									h = c.measureText("O").width * 1.2;
									if (s.stroke) {
										c.strokeText(text.substr(i, 1), j, m * s._wordHeight);
									}
									c.fillText(text.substr(i, 1), j, m * s._wordHeight);
									if(textFormat.underline){
										c.beginPath();
										underlineY = m * s._wordHeight + h * LTextField.underlineY[s.textBaseline];
										c.moveTo(j, underlineY);
										c.lineTo(j + c.measureText(text.substr(i, 1)).width, underlineY);
										c.stroke();
									}
								}
								j += c.measureText(text.substr(i, 1)).width;
								if (s.wordWrap && j + c.measureText(text.substr(i + 1, 1)).width > s.width) {
									j = 0;
									k = i + 1;
									m++;
								}
							}
							s.height = (m + 1) * s._wordHeight;
						});
						return;
					}
					lbl = s.text;
					if (s.displayAsPassword) {
						lbl = '';
						for (i=0, l = s.text.length; i < l; i++) {
							lbl += '*';
						}
					}
					if (s.wordWrap || s.multiline) {
						j = 0, k = 0, m = 0, b = 0;
						for (i = 0, l = s.text.length; i < l; i++) {
							enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i, 1));
							if (enter) {
								j = 0;
								k = i + 1;
								m++;
							} else {
								if (s.stroke) {
									c.strokeText(lbl.substr(i, 1), j, m * s.wordHeight);
								}
								c.fillText(lbl.substr(i, 1), j, m * s.wordHeight);
							}
							s.numLines = m;
							j = c.measureText(s.text.substr(k, i + 1 - k)).width;
							if (s.wordWrap && j + c.measureText(lbl.substr(i, 1)).width > s.width) {
								j = 0;
								k = i + 1;
								m++;
							}
						}
						s.height = (m + 1) * s.wordHeight;
					} else {
						s.numLines = 1;
						if (s.stroke) {
							c.strokeText(lbl, 0, 0, c.measureText(lbl).width);
						}
						c.fillText(lbl, 0, 0, c.measureText(lbl).width);
					}
					if (s.windRunning) {
						s._ll_windRun();
					}
				},
				_wordHeight : function (h) {
					var s = this;
					if (h > 0) {
						s.wordHeight = h;
					} else {
						s.wordWrap = false;
						s.wordHeight = s.getHeight();
					}
					s.height = 0;
				},
				setMultiline : function (v, h) {
					var s = this;
					if (v) {
						s._wordHeight(h);
					}
					s.multiline = v;
				},
				setWordWrap : function (v, h) {
					var s = this;
					if (v) {
						s._wordHeight(h);
					}
					s.wordWrap = v;
				},
				setType : function (type, inputBackLayer) {
					var s = this;
					if (s.texttype != type && type == LTextFieldType.INPUT) {
						if (inputBackLayer == null || inputBackLayer.type != "LSprite") {
							s.inputBackLayer = new LSprite();
							s.inputBackLayer.graphics.drawRect(1, "#000000", [0, -s.getHeight() * 0.4, s.width, s.getHeight() * 1.5]);
						} else {
							s.inputBackLayer = inputBackLayer;
						}
						s.inputBackLayer.parent = s;
						if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
							LMouseEventContainer.pushInputBox(s);
						}
					} else {
						s.inputBackLayer = null;
						LMouseEventContainer.removeInputBox(s);
					}
					s.texttype = type;
				},
				ismouseon : function (e, cood) {
					var s = this;
					if (!e) {
						return false;
					}
					if (!s.visible) {
						return false;
					}
					if (!cood) {
						cood = {x : 0, y : 0, scaleX : 1, scaleY : 1};
					}
					if (s.mask) {
						if (!s.mask.parent) {
							s.mask.parent = s.parent;
						}
						if (!s.mask.ismouseon(e, cood)) {
							return false;
						}
					}
					if (s.inputBackLayer) {
						return s.inputBackLayer.ismouseon(e, {x : s.x * cood.scaleX + cood.x, y : s.y * cood.scaleY + cood.y, scaleX : cood.scaleX * s.scaleX, scaleY : cood.scaleY * s.scaleY});
					}
					return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s._getWidth(), s._getHeight()]}], e.offsetX, e.offsetY);
				},
				clone : function () {
					var s = this, a = new s.constructor();
					a.copyProperty(s);
					a.texttype = null;
					if (s.texttype ==  LTextFieldType.INPUT) {
						a.setType( LTextFieldType.INPUT);
					}
					return a;
				},
				mouseEvent : function (event, type, cood) {
					var s = this, on;
					if (s.inputBackLayer == null || type != LMouseEvent.MOUSE_DOWN) {
						return;
					}
					on = s.ismouseon(event, cood);
					if (!on) {
						return;
					}
					s.focus();
				},
				_ll_getValue : function () {
					if (LGlobal.inputBox.style.display != NONE) {
						LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
						LEvent.removeEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
						LGlobal.inputBox.style.display = NONE;
						LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
						LGlobal.inputTextField = null;
					}
				},
				updateInput : function () {
					var s = this;
					if (s.texttype == LTextFieldType.INPUT && LGlobal.inputTextField.objectIndex == s.objectIndex) {
						LGlobal.inputTextBox.value = LGlobal.inputTextField.text;
					}
				},
				_ll_input : function (e) {
					var event = new LEvent(LTextEvent.TEXT_INPUT);
					event.keyCode = e.keyCode;
					LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
					if (LGlobal.inputTextField.hasEventListener(LTextEvent.TEXT_INPUT)) {
						e.returnValue = LGlobal.inputTextField.dispatchEvent(event);
					} else {
						e.returnValue = true;
					}
				},
				focus : function () {
					var s = this, sc, sx;
					if (!s.parent) {
						return;
					}
					if (s.texttype != LTextFieldType.INPUT) {
						return;
					}
					if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex != s.objectIndex) {
						s._ll_getValue();
					}
					s.dispatchEvent(LFocusEvent.FOCUS_IN);
					sc = s.getAbsoluteScale();
					LGlobal.inputBox.style.display = "";
					LGlobal.inputBox.name = "input" + s.objectIndex;
					LGlobal.inputTextField = s;
					LGlobal.inputTextareaBoxObj.style.display = NONE;
					LGlobal.inputTextBoxObj.style.display = NONE;
					LGlobal.passwordBoxObj.style.display = NONE;
					
					if (s.displayAsPassword) {
						LGlobal.inputTextBox = LGlobal.passwordBoxObj;
					} else if (s.multiline) {
						LGlobal.inputTextBox = LGlobal.inputTextareaBoxObj;
					} else {
						LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
					}
					sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width;
					sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
					LGlobal.inputTextBox.style.display = "";
					LGlobal.inputTextBox.value = s.text;
					LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight() * sc.scaleY * s.scaleY * sy + "px";
					LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth() * sc.scaleX * s.scaleX * sx + "px";
					LGlobal.inputTextBox.style.color = s.color;
					LGlobal.inputTextBox.style.fontSize = ((s.size * parseFloat(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >> 0) + "px";
					LGlobal.inputTextBox.style.fontFamily = s.font;
					
					
				        sy=LGlobal.radio;
				        LGlobal.inputTextBox.style.padding="0px";
				        LGlobal.inputTextBox.style.textAlign= s.textAlign;
				        LGlobal.inputTextBox.style.border="none";
				        LGlobal.inputTextBox.style.outline="none";
				        LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight() * sy + "px";
				        LGlobal.inputTextBox.style.fontSize = (((s.size-0.5) * LGlobal.radio ))+ "px";
				        LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth() * sy+ "px";


					LEvent.addEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
					if (s.texttype == LTextFieldType.INPUT) {
						rc = s.getRootCoordinate();
						if (LGlobal.inputBox.name == "input" + s.objectIndex) {
							LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
							LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
						}
					}
					setTimeout(function () {
						LGlobal.inputTextBox.focus();
					}, 0);
				},
				_getWidth : function () {
					var s = this;
					if (s.wordWrap) {
						return s.width;
					}
					LGlobal.canvas.font = s.size + "px " + s.font;
					return LGlobal.canvas.measureText(s.text).width;
				},
				getWidth : function (maskSize) {
					var s = this, w, mx, mw;
					w = s._getWidth() * s.scaleX;
					if (maskSize && s.mask) {
						mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
						if (mx > w) {
							return 0;
						}
						mw = s.mask.getWidth();
						if (mx + mw > w) {
							return w - mx;
						} else {
							return mw;
						}
					}
					return w;
				},
				_getHeight : function () {
					var s = this, c = LGlobal.canvas, i, l, j, k, m, enter;
					if (s.wordWrap) {
						c.font = s.weight + " " + s.size + "px " + s.font;
						if (s.height == 0) {
							j = 0, k = 0, m = 0;
							for (i = 0, l = s.text.length; i < l; i++) {
								j = c.measureText(s.text.substr(k, i - k)).width;
								enter = /(?:\r\n|\r|\n|¥n)/.exec(s.text.substr(i, 1));
								if ((s.wordWrap && j > s.width) || enter) {
									j = 0;
									k = i;
									m++;
									if (enter) {
										k++;
									}
								}
							}
							s.height = (m + 1) * s.wordHeight;
						}
						return s.height;
					}
					c.font = s.weight + " " + s.size + "px " + s.font; 
					l = c.measureText("O").width * 1.2;
					if (s.heightMode == LTextField.HEIGHT_MODE_BASELINE) {
						l = l * 1.2;
					}
					return l;
				},
				getHeight : function (maskSize) {
					var s = this, h, my, mh;
					h = s._getHeight() * s.scaleY;
					if (maskSize && s.mask) {
						my = s.mask._startY ? s.mask._startY() : s.mask.startY();
						if (my > h) {
							return 0;
						}
						mh = s.mask.getHeight();
						if (my + mh > h) {
							return h - my;
						} else {
							return mh;
						}
					}
					return h;
				},
				wind : function (listener) {
					var s = this;
					s.wind_over_function = listener;
					s.windRunning = true;
					s._ll_wind_text = s.text;
					s.text = "";
					s._ll_wind_length = 0;
				},
				_ll_windRun : function () {
					var s = this;
					if (s._speedIndex++ < s.speed) {
						return;
					}
					s._speedIndex = 0;
					if (s._ll_wind_length > s._ll_wind_text.length) {
						s.windRunning = false;
						if (s.wind_over_function) {
							s.wind_over_function();
						}
						s.dispatchEvent(new LEvent(LTextEvent.WIND_COMPLETE));
						return;
					}
					s.text = s._ll_wind_text.substring(0, s._ll_wind_length);
					s._ll_wind_length++;
				},
				die : function () {
					LMouseEventContainer.removeInputBox(this);
				}
			};
			for (var k in p) {
				LTextField.prototype[k] = p[k];
			}
			return LTextField;
		})();

    }


    //传入设计偏移Y轴的值，返回实际偏移Y轴的值
    LGlobal.getOffsetY = function(offsetY) {
//      return (offsetY-LGlobal.cutOffsetY)/LGlobal.radius;
		return isNaN(LGlobal.cutOffsetY)?0:LGlobal.cutOffsetY;
    }



    LGlobal.getOsVerison = function() {
        //获取用户代理
        var ua = navigator.userAgent;
        if (ua.indexOf("Windows NT 5.1") != -1) return "Windows XP";
        if (ua.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
        if (ua.indexOf("Windows NT 6.1") != -1) return "Windows 7";
        if (ua.indexOf("Windows NT 6.2") != -1) return "Windows 8";
        if (ua.indexOf("iPhone") != -1){
            //
            var cw = document.documentElement.clientWidth;
            var ch = document.documentElement.clientHeight;
//            alert(cw+"  "+ch);
//            alert(cw/ch);
            if(cw/ch<0.65){
                return "iphone5";
            }else{
                return "iphone4";
            }
        }
        if (ua.indexOf("iPad") != -1) return "iPad";
        if (ua.indexOf("Linux") != -1) {
            var index = ua.indexOf("Android");
            if (index != -1) {
//os以及版本
                var os = ua.slice(index, index+13);

//手机型号
                var index1 = ua.lastIndexOf(";");

                var index2 = ua.indexOf("Build");
                var type = ua.slice(index1+1, index2);
                return type + os;
            } else {
                return "Linux";
            }
        }
        return "未知操作系统";
    }
	
	/**
	 * 封装的文本生成函数
	 * @param {Object} text
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} width
	 * @param {Object} height
	 * @param {Object} size
	 * @param {Object} type
	 * @param {Object} color
	 * @param {Object} border
	 * @param {Object} htmlText
	 * @param {Object} backLayer
	 */
	LGlobal.setText = function(x,y,width,height,size,text,border,isMultiline,type,color,borderColor,htmlText,backLayer){
		x = x?x:0;
		y = (y?y:0)-LGlobal.cutOffsetY;
		width = width?width:200;
		height = height?height:40;
		size = size?size:40;
		var textField = new LTextField();
		textField.x = x;
		textField.y = y;
		textField.size = size;
		textField.width = width;
		textField.height = height;
		textField.color = color?color:"#000000";
		textField.htmlText = htmlText?htmlText:"";
		textField.text = text?text:"";
		if(backLayer==undefined){
			backLayer = new LSprite();
			backLayer.graphics.drawRect(border?border:0, borderColor?borderColor:"#000000", [0, 0, width, height]);
		}
		textField.setType((type?type:LTextFieldType.INPUT), backLayer);
		if(isMultiline!=undefined){
			textField.setWordWrap(false,size);
			textField.setMultiline(true);
		}
		//加遮罩，只显示所设置的文本大小
		var mask = new LSprite();
	    mask.graphics.drawRect(border?border:0, borderColor?borderColor:"#000000",[x,y,width,height]);
	    textField.mask=mask;
	    
		return textField;
	}
}





plugin("scaleMode");
//plugin("textField");
