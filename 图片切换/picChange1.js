window.onload=function(){
	var counter=document.getElementById('counter');
	var pre=document.getElementById('pre');
	var next=document.getElementById('next');
	var text=document.getElementById('text');
	var img=document.getElementById('img');
	var btn1=document.getElementById('btn1');
	var btn2=document.getElementById('btn2');
	var p1=document.getElementById('p1');
	var num=0;
	var imgArr=["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
	var textArr=["侠女","运动员","性感美女","枫叶-美女"];
	var flag=true;
	pre.onclick=function (){
		num--;
		if(flag){
			if(num==-1){
				num=imgArr.length-1;
			}
		}else{
			if(num==-1){
				alert("已经切换到了第一张，无法再往前切换！");
				num++;
			}
		}
		img.src=imgArr[num];
		counter.innerHTML=num+1+'/'+imgArr.length;
		text.innerHTML=textArr[num];
	};
	next.onclick=function (){
		num++;
		if(flag){
			if(num==imgArr.length){
				num=0;
			}
		}else{
			if(num==imgArr.length){
			num--;
			alert("已经切换到最后一张，无法再往后且切换！");
			}
		}
		img.src=imgArr[num];
		text.innerHTML=textArr[num];
		counter.innerHTML=num+1+'/'+imgArr.length;
	};
	btn2.onclick=function(){
		p1.innerHTML="图片只能到最后一张或只能到第一张切换";
		flag=false;
	};
	btn1.onclick=function(){
		p1.innerHTML="图片可从最后一张跳转到第一张循环切换";
		flag=true;
	};
};