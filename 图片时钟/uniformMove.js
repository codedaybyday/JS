function getStyle(obj,attr){			//获取样式
	return obj.currentStyle?obj.currentStyle[attr]:window.getComputedStyle(obj)[attr];
}
function startMove(obj,attr,target,endFn){
	clearInterval(obj.timer);
	//alert(obj)
	obj.timer = setInterval(function(){
		doMove(obj,attr,target,endFn);
	},30);
	function doMove(obj,attr,target,endFn){
		var cur = parseInt(getStyle(obj,attr));
		var speed = (target-cur)>0?10:-10;
		cur += speed;
		if(cur>=target&&speed>0 || cur<=target&&speed<0){
			clearInterval(obj.timer);
			cur = target;
			if(endFn){
				endFn();
			}
		}else{
			obj.style[attr] = cur +'px';
		}
	}	
}