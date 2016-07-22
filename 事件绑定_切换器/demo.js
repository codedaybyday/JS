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

function toRed(){
	this.className='red';
	addEvent(this,'click',toBlue);
}
function toBlue(){
	this.className='blue';
	addEvent(this,'click',toRed);
}

addEvent(window,'load',function(){
	var box=document.getElementById('box');
	addEvent(box,'click',function(){
		alert('Lee');
	});
	addEvent(box,'click',toBlue);
});







