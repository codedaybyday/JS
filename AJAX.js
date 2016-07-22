function AJAX(method,url,sucessFn,failFn){
	var ajax = null;
	if(window.XMLHttpRequest){		//	IE6
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajax.open(method,url,true);
	ajax.send();
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4){
			if(ajax.status==200){
				sucessFn(ajax.responseText);
			}else if(failFn){
				failFn();
			}
		}
	};

}