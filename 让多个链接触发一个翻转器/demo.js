//2014 12 5


/*function addEvent(obj, type, fn) {
	//用于保存上一个事件
	var saved = null;
	//判断事件是否存在
	if (typeof obj['on' + type] == 'function') {
		saved = obj['on' + type];		//保存上一个事件
	}
	//执行事件
	obj['on' + type] = function () {
		if (saved) saved();
		fn.call(this);							//把this传递过去
	};
	
}
addEvent(window, 'load', function () {
	var box = document.getElementById('box');
	addEvent(box, 'click', function () {				//目的达到，每次都执行，不影响
		alert('Lee');
	});
	addEvent(box, 'click', toBlue);						//this没有传递过去
});


function toRed() {
	this.className = 'red';
	removeEvent(this, 'click');
	addEvent(this, 'click', toBlue);	
}

function toBlue() {
	this.className = 'blue';
	removeEvent(this, 'click');
	addEvent(this, 'click', toRed);									
}
*/


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

function getTarget(evt){
	if(evt){
		return evt.target;
	}else if(window.event.srcElement){
		return window.event.srcElement;
	}
}
addEvent(window,'load',function(){
	var flyer=document.getElementById('flyer');
	var text=document.getElementById('text');
	addEvent(flyer,'mouseover',function(evt){
		text.src='images/flyerText.gif';
	});
	addEvent(flyer,'mouseout',function(evt){
		text.src='';
	});
	
	var tank=document.getElementById('tank');
	addEvent(tank,'mouseover',function(evt){
		text.src='images/tankText.gif';
	});
	addEvent(tank,'mouseout',function(evt){
		text.src='';
	});
	
	var helicopter=document.getElementById('helicopter');
	addEvent(helicopter,'mouseover',function(evt){
		text.src='images/helicopterText.gif';
	});
	addEvent(helicopter,'mouseout',function(evt){
		text.src='';
	});
});







