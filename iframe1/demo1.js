//2014 12 7


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
		document.links[i].thisPage = i;//��ÿ��links[i]�����Լ������ԣ�������
		addEvent(document.links[i],'click',function(evt){
			preDef(evt);
			document.getElementById('icontent').contentWindow.document.location=this.href;
			count[this.thisPage]++;
			var newtext="���Ѿ��������ҳ��"+count[this.thisPage]+"����";
			document.getElementById('icontent').contentWindow.document.body.innerHTML=newtext;
			alert(count);
		});
		
	}
		
});






