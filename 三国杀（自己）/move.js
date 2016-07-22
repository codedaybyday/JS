﻿function getStyle(obj,attr){			//获取样式
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
var moveType={
	buffMove:1,
	flexMove:0
};
function startMove(obj,json,type,endFn){
	switch(type){
		case moveType.buffMove:
		doBuffMove(obj,json,endFn);
		break;
		case moveType.flexMove:
		doFlexMove(obj,json,enfn);
		break;
	}

}	
function doBuffMove(obj,json,endFn){			
	clearInterval( obj.timer );
	obj.timer = setInterval( function (){
		var bStop = true;
		for(var attr in json){
			if( attr == 'opacity'){
				var cur = parseInt( parseFloat( getStyle(obj ,attr) )*100 );
			}else{
				var cur = parseInt( getStyle(obj ,attr) );
			}
			var speed = ( json[attr]- cur )/5 >0?Math.ceil( ( json[attr]-cur )/8):Math.floor( ( json[attr]-cur)/8 );	//缓冲公式	上下取整获取
			cur += speed;
			if( attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:"+cur+")';
				obj.style.opacity = cur/100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if( json[attr] != cur){	
				bStop = false;
			}
		}
		if(bStop == true){
			clearInterval(obj.timer);
			if(endFn){
				endFn();
			}
		}
		
	},30);
}

function doFlexMove(obj,json,endFn){		//弹性运动
	clearInterval( obj.timer );
	obj.timer = setInterval( function (){
		var bStop = true;
		for(var attr in json){
			if( attr == 'opacity'){
				var cur = parseInt( parseFloat( getStyle(obj ,attr) )*100 );//透明传进来的参数是小数
			}else{
				var cur = parseInt( getStyle(obj ,attr) );
			}
			var speed = ( json[attr]- cur )/5 >0?Math.ceil( ( json[attr]-cur )/8):Math.floor( ( json[attr]-cur)/8 );	//缓冲公式	上下取整获取
			speed *= 0.7;
			cur += speed;
			if( attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:"+cur+")';
				obj.style.opacity = cur/100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if( Math.abs(cur - json[attr])<1 && Math.abs(speed)<1){
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity:"+json[attr]+")';
					obj.style.opacity = json[attr]/100;
				}else{
					obj.style[attr] = json[attr] + 'px';
				}
				bStop = false;
			}
		}
		if(bStop == true){
			clearInterval(obj.timer);
			if(endFn){
				endFn();
			}
		}
		
	},50);
}