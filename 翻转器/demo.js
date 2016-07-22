/*
function addEvent(obj,type,fn){
	var saved=null;
	if(typeof obj['on'+type]=='function'){
		saved=obj['on'+type];
	}
	obj['on'+type]=function(){
		if(saved)
			saved();
		fn.call(this);
	};
	
}
*/



function addEvent(obj,type,fn){//跨浏览器添加事件
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn);
	}else{
		obj['on'+type]=fn;
	}
}


function getTarget(evt){
	if(evt){
		return evt.target;
	}else if(obj.event.srcElement){
		return obj.event.srcElement;
	}
}

addEvent(window,'load',change);

function change(){
	var box=document.getElementById('box');
	addEvent(box,'mouseover',arrow_on);
	addEvent(box,'mouseout',arrow_off);
}


function arrow_on(){//鼠标移上去的时候变成红色的图片
	document.images['arrow'].src='images/arrow_on.jpg';
}
function arrow_off(){//鼠标移出的时候变成最初的图片
	document.images['arrow'].src='images/arrow_off.jpg';
}




