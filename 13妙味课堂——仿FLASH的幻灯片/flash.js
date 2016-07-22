window.onload = function (){
	var oUl = document.getElementById('small_pic');
	var content = document.getElementById('content');
	var aLi = oUl.getElementsByTagName('li');
	var left = document.getElementById('left');
	var left_btn = document.getElementById('left_btn');
	var right_btn = document.getElementById('right_btn');
	var big_pic = document.getElementById('big_pic');
	var small_pic = document.getElementById('small_pic');
	var aBig_pic = big_pic.getElementsByTagName('li');
	var minZindex = 2;
	var now = 0;		//用于存放点击时的序号
	var timer = null;
	
	oUl.style.width = parseInt( getStyle(aLi[0],'width') )*aLi.length+'px';

	timer = setInterval(function(){	//自动轮播
		now = (now+1)%aLi.length;
		tab();
	},3000);
	content.onmouseover = function(){	
		clearInterval(timer);
	};
	content.onmouseout = function(){
		clearInterval(timer);
		timer = setInterval(function(){
			now = (now+1)%aLi.length;
			tab();
		},3000);
	};
	for(var i=0;i<aLi.length;i++){
		aLi[i].timer = null;
		aLi[i].index = i;
		aLi[i].onmouseover = function (){
			//var oImg = this.getElementsByTagName('img')[0];
			doMove(this,100,'opacity');
		};
		aLi[i].onmouseout = function (){
			//var oImg = this.getElementsByTagName('img')[0];
			if(this.index != now){
				doMove(this,60,'opacity');
			}
		};
		aLi[i].onclick = function (){
			for(var i=0;i<aLi.length;i++){
				//var oImg = aLi[i].getElementsByName('img')[0];
				doMove(aLi[i],60,'opacity');
			}
			//var nowImg = this.getElementsByName('img')[0]
			doMove(this,100,'opacity');
			if(now !=this.index){
				aBig_pic[this.index].style.zIndex = minZindex++;
				aBig_pic[this.index].style.height = 0;
				doMove(aBig_pic[this.index],big_pic.offsetHeight,'height');
				now = this.index;
			}
			
		};
	}
	left.timer = null;
	left.onmouseover = function (){
		doMove(left_btn,100,'opacity');
	};
	left.onmouseout = function (){
		doMove(left_btn,0,'opacity');
	};
	right.timer = null;
	right.onmouseover = function (){
		doMove(right_btn,100,'opacity');
	};
	right.onmouseout = function (){
		doMove(right_btn,0,'opacity');
	};
	
	right_btn.onclick = function (){
		now = (now + 1)%aBig_pic.length;
		tab();
	};
	left_btn.onclick = function (){
		now--;
		if(now == -1){
			now = aBig_pic.length - 1;
		}
		tab();
	};
	
	function tab(){
		aBig_pic[now].style.zIndex = minZindex++;
		aBig_pic[now].style.height = 0;
		doMove(aBig_pic[now],big_pic.offsetHeight,'height');
		for(var i=0;i<aLi.length;i++){
			doMove(aLi[i],60,'opacity');
		}
		doMove(aLi[now],100,'opacity');
		if(now == 0){
			doMove(small_pic,0,'left');
		}else if(now ==aLi.length - 1){
			var left =	-(now-2)*parseInt( getStyle(aLi[0],'width') );
			doMove(small_pic,left,'left');
		}else{
			doMove( small_pic,-(now - 1)*parseInt( getStyle(aLi[0],'width') ),'left');
		}
	}
};


function getStyle(obj,attr){			//获取样式
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}	
function doMove(obj,target,attr){			//缓冲运动---运动框架
	clearInterval( obj.timer );
	obj.timer = setInterval( function (){
		if( attr == 'opacity'){
			var cur = parseInt( parseFloat( getStyle(obj ,attr) )*100 );
		}else{
			var cur = parseInt( getStyle(obj ,attr) );
		}
		var speed = ( target- cur )/8 >0?Math.ceil( ( target-cur )/8):Math.floor( ( target-cur)/8 );	//缓冲公式	上下取整获取
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
		if( target == cur){	//到达目标点就取消定时器
			clearInterval( obj.timer );
		}
	},50);
}