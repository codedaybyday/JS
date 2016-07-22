/*
	修改时间：2015-7-24
	修正了弹性运动，之前写法有误
	之前如果传入的json里面只有一个键值对的话，结果判断定时器是否关闭有误
*/
function getStyle(obj,attr){			//获取样式
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
var moveType={
	buffMove:1,//缓冲运动
	flexMove:0	//弹性运动
};
function startMove(obj,json,type,endFn){
	switch(type){
		case moveType.buffMove:
		doBuffMove(obj,json,endFn);
		break;
		case moveType.flexMove:
		doFlexMove(obj,json,endFn);
		break;
	}

}	
function doBuffMove(obj,json,endFn){			
	clearInterval( obj.timer );
	var bStop = true;
	obj.timer = setInterval( function (){
		for(var attr in json){
			if( attr == 'opacity'){
				var cur = parseInt( parseFloat( getStyle(obj ,attr) )*100 );
			}else{
				var cur = parseInt( getStyle(obj ,attr) );
			}
			//console.log(cur)
			var speed = ( json[attr]- cur )/5 >0?Math.ceil( ( json[attr]-cur )/5):Math.floor( ( json[attr]-cur)/5 );	//缓冲公式	上下取整获取
			cur += speed;
			if( attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:"+cur+")';
				obj.style.opacity = cur/100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if( json[attr] != cur){	
				bStop = false;
			}else if(json[attr] == cur && getJsonLength(json) == 1){
				bStop = true;
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

function doFlexMove(obj,json,endFn){		//弹性运动
	clearInterval( obj.timer );
	var bStop = true;
	var speed = 0;
	obj.timer = setInterval( function (){
		for(var attr in json){
			if( attr == 'opacity'){
				var cur = parseInt( parseFloat( getStyle(obj ,attr) )*100 );
			}else{
				var cur = parseInt( getStyle(obj ,attr) );
			}
			speed += ( json[attr]-cur )/3;
			speed *= 0.7;
			cur += speed;
			cur = Math.ceil(cur);
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
				//bStop = true;
				//console.log(getJsonLength(json))
				if(getJsonLength(json) == 1){
					bStop = true;
				}
			}else{
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
function getJsonLength(json){
	var len = 0;
	for(var value in json){
		len++;
	}
	return len;
}