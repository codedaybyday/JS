//2014 12 5


/*function addEvent(obj, type, fn) {
	//���ڱ�����һ���¼�
	var saved = null;
	//�ж��¼��Ƿ����
	if (typeof obj['on' + type] == 'function') {
		saved = obj['on' + type];		//������һ���¼�
	}
	//ִ���¼�
	obj['on' + type] = function () {
		if (saved) saved();
		fn.call(this);							//��this���ݹ�ȥ
	};
	
}
addEvent(window, 'load', function () {
	var box = document.getElementById('box');
	addEvent(box, 'click', function () {				//Ŀ�Ĵﵽ��ÿ�ζ�ִ�У���Ӱ��
		alert('Lee');
	});
	addEvent(box, 'click', toBlue);						//thisû�д��ݹ�ȥ
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
	var box=document.getElementById('box');
	addEvent(box,'mouseover',function(evt){
		document.images['arrow'].src='images/arrow_on.jpg';
	});
	addEvent(box,'mouseout',function(evt){
		document.images['arrow'].src='images/arrow_off.jpg';
	});
	addEvent(box,'click',function(evt){
		document.images['arrow'].src='images/arrow_3.jpg';
	});
});







