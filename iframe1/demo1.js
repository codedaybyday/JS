//2014 12 7


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


function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn);
	}
}


function getTarget(evt){
	if(evt){
		return evt.target;
	}else if(window.event.srcElement){
		return window.event.srcElement;
	}
}
function preDef(evt){
	var e=evt||window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue=false;
	}
}
var count=new Array(0,0,0,0);
addEvent(window,'load',function(){
	for(var i=0;i<document.links.length;i++){
		document.links[i].thisPage = i;//给每个links[i]创建自己的属性，计数器
		addEvent(document.links[i],'click',function(evt){
			preDef(evt);
			document.getElementById('icontent').contentWindow.document.location=this.href;
			count[this.thisPage]++;
			var newtext="您已经访问这个页面"+count[this.thisPage]+"次了";
			document.getElementById('icontent').contentWindow.document.body.innerHTML=newtext;
			alert(count);
		});
		
	}
		
});






