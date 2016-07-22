/*function box(){
	var arr=[];
	for(var i=0;i<5;i++){
		arr[i]=function(){
			return i;
		}
	}
	return arr;
}*/
//修改
function box(){
	var arr=[];
	for(var i=0;i<5;i++){
		arr[i]=(function(num){
			return num;
		})(i);
	}
	return arr;
}
var b=box();
for(var i=0;i<5;i++){
	//alert(b[i]());
	alert(b[i]);
}