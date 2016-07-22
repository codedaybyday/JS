//2014 12 10修改完成，主要原因是validTag里面嵌套了几个函数，没有注意传参的问题
//2014 12 12 单选框检查问题解决

/*function addEvent(obj,type,fn){
	var saved=null;
	if(typeof obj['on'+type]=='function'){
		saved=obj['on'+type];
	}
	obj['on'+type]=function(){
		if(saved)
			saved();
		fn.call(this);
	};
	
}*/
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
addEvent(window,'load',initForm);

function initForm(){
	var form=document.getElementsByTagName('form');
	for(var i=0;i<form.length;i++)
		addEvent(form[i],'submit',validForm);
	var sunroof=document.getElementById('sunroof');
	addEvent(sunroof,'click',function(){//当Sunroof被选中的时候，单选框twoDoors也会被选中
		document.getElementById('twoDoors').checked=true;
	});
}

function validForm(evt){
	var allGood=true;
	var allTag=document.getElementsByTagName('*');
	for(var i=0;i<allTag.length;i++){
		if(!validTag(allTag[i],allGood))
			allGood= false;
	}
	return allGood;
}

function validTag(thisTag,allGood){
	//var flag=false;//用于标记单选框
	var outClass='';
	var allClass=thisTag.className.split(' ');
	for(var i=0;i<allClass.length;i++)
		outClass+=validBasedOnClass(allClass[i])+' ';
		
		thisTag.className=outClass;//修改之前没有这条语句，导致了无法更改className里面的内容
		
	if(outClass.indexOf('invalid')>-1){
		thisTag.focus();
		thisTag.parentNode.className=' invalid';
		if (thisTag.nodeName == "INPUT") {
				thisTag.select();
		}
		return false;//如果此处不用return，程序将会继续向下索引，导致如果多个文本框没填写的话，就会选择多个文本框
	}
	return true;
	
	
	
	function validBasedOnClass(thisClass){
		var backClass='';
		switch(thisClass){
			case '':
			break;
			case 'invalid'://表明之前这个表单未填，一但有这个，就会被消除，因为这相当于新一轮的遍历，其实invalid的存在主要还是case 'reqd'决定的
			break;
			case 'must':
			if(allGood&&thisTag.value==''){//allCood获取不到
				backClass='invalid ';
			}
			backClass+=thisClass;
			break;
			case 'radio':
			if(allGood  &&  !radioPicked (thisTag)){//allCood为真表示前面的表单都没问题
				backClass='invalid ';
			}
			backClass+=thisClass;
			break;
			case 'e-mail':
			if(allGood && !rightEmail(thisTag)){
				backClass='invalid ';
				alert('hello');
			}
			backClass+= thisClass;
			break;
			default://当thisClass=password1或者class为空
			if(allGood  &&  !checkCross(thisTag)){//// !checkCross(thisTag)检查该标签内是否填写了密码
				backClass='invalid ';///////////////////
			}
			backClass+= thisClass;
		}
		return backClass;
		
		
		function checkCross(thisTag){//有漏洞
			if(thisTag.id=='password1')
				return thisTag.value==document.getElementById('password2').value;
			return false;
		}
		
		
		function radioPicked (thisTag_Name){//检查单选框是否被选择
			var count=0;
			for(var i=0;i<thisTag.childNodes.length;i++){
				if(thisTag.childNodes[i].checked){
					count++;
				}
			}
			if(count==1)
				return true;
			else{
				alert("您有单选框未选择！");
				return false;
			}
		}
		
		function rightEmail(thisTag){
			var email=thisTag.value;
			if(email!=''){
				var re = /^\w+([\.-]?\w+)*@\w+ ([\.-]?\w+)*(\.\w{2,3})+$/;
				return re.test(email);
			}
			return false;
		}
}

}






