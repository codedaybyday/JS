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



function addEvent(obj,type,fn){//�����������¼�
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


function arrow_on(){//�������ȥ��ʱ���ɺ�ɫ��ͼƬ
	document.images['arrow'].src='images/arrow_on.jpg';
}
function arrow_off(){//����Ƴ���ʱ���������ͼƬ
	document.images['arrow'].src='images/arrow_off.jpg';
}




