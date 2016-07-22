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

var thisAd=0;
addEvent(window,'load',function(){
	var images=new Array('images/robot1.jpg','images/robot2.jpg','images/robot3.jpg');
	var Previous=document.getElementById('Previous');
	var mypicture=document.getElementById('mypicture');
	
	addEvent(Previous,'click',function(){
		thisAd--;
		if(thisAd<0)
			thisAd=images.length;
		mypicture.src=images[thisAd];
	});
	
	var Next=document.getElementById('Next');
	addEvent(Next,'click',function(){
		thisAd++;
		if(thisAd==images.length)
			thisAd=0;
		mypicture.src=images[thisAd];
	});
	
});







