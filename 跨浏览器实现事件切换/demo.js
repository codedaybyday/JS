//2014 12  03 

function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(window.attachEvent){
		window.attachEvent('on'+type,fn);
	}
}

function removeEvent(obj,type,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn,false);
	}else if(window.deattachEvent){
		window.deattachEvent('on'+type,fn);
	}
}

addEvent(window,'load',function(){
	var box=document.getElementById('box');
	addEvent(box,'click',function(){	
		alert('Lee');
	});
	addEvent(box,'click',toBlue);	
});

function getTarget(evt){
	if(evt){
		return evt.target;
	}else if(window.event.srcElement){
		return window.event.srcElement;
	}
}
function toRed(evt){
	var that=getTarget(evt);
	that.className='red';
	removeEvent(that,'click',toRed);
	addEvent(that,'click',toBlue);
}
function toBlue(evt){
	var that=getTarget(evt);
	that.className='blue';
	removeEvent(that,'click',toBlue);
	addEvent(that,'click',toRed);
}