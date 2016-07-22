window.onload=function(){
	var counter=document.getElementById('counter');
	var pre=document.getElementById('pre');
	var next=document.getElementById('next');
	var text=document.getElementById('text');
	var img=document.getElementById('img');
	var num=0;
	var imgArr=["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
	var textArr=["侠女","运动员","性感美女","枫叶-美女"];
	
	pre.onclick=function (){
		num--;
		if(num==-1){
			num=imgArr.length-1;
		}
		img.src=imgArr[num];
		counter.innerHTML=num+1+'/'+imgArr.length;
		text.innerHTML=textArr[num];
	};
	next.onclick=function (){
		num++;
		if(num==imgArr.length){
			num=0;
		}
		img.src=imgArr[num];
		text.innerHTML=textArr[num];
		counter.innerHTML=num+1+'/'+imgArr.length;
	};
};