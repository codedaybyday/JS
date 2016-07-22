function getStyle(obj,attr){			//获取样式
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}	
function doMove(obj,json,endFn){			//完美运动框架
	clearInterval( obj.timer );
	var bStop = true;
	obj.timer = setInterval( function (){
		for(var attr in json){
			if( attr == 'opacity'){
				var cur = parseInt( parseFloat( getStyle(obj ,attr) )*100 );
			}else{
				var cur = parseInt( getStyle(obj ,attr) );
			}
			var speed = ( json[attr]- cur )/8 >0?Math.ceil( ( json[attr]-cur )/8):Math.floor( ( json[attr]-cur)/8 );	//缓冲公式	上下取整获取
			cur += speed;
			/*if( (target < t&&speed>0) || (target > t&&speed<0)){
				t = target;
			}*/
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
		
	},50);
}