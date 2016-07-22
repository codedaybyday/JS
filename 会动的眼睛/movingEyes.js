function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn);
	}
}

addEvent(window,"mouseover",getPosition);
function getPosition(evt){
	if(!evt){
		evt=window.event;
	}
	Move(evt.clientX,evt.clientY);
}

function Move(xPosition,yPosition){
	var leftEyeBall=document.getElementById("lDot").style;
	var rightEyeBall=document.getElementById("rDot").style;
}