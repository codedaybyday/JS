/**
 *1.随机函数
 *2.弹性运动，摩擦运动
 *3定时器时间延迟为50的原因
 *4点阵图
 */
window.onload = function(){
	var canvas = document.getElementById('canvas');
	var cxt = canvas.getContext('2d');
	var RADIUS = 10;
	var colors = ['#465CFA','#29F63A','#FADF2E','#F610AE','#12CEEA','#DB3AF3','#40FEDA'];
	var color = '#465CFA';
	var currentTime = new Date();
	var balls = [];
	var WINDOW_WIDTH = document.documentElement.clientWidth;
	var WINDOW_HEIGHT = document.documentElement.clientHeight;
	var MARGIN_LEFT = parseInt((WINDOW_WIDTH-108*RADIUS)/2);
	var MARGIN_TOP = 50;
	var MAX_SIZE = 300

	init();
	var timer = setInterval(function(){
		render();
		update();
	},50);
	function init(){
		canvas.width = WINDOW_WIDTH;
		canvas.height = WINDOW_HEIGHT;
	}
	function render(){
		//var date = new Date();
		cxt.clearRect(0,0,canvas.width,canvas.height);
		drawClock();
		drawBalls();
	}
	/**
	 * [drawNum 绘制数字]
	 * @param  {[type]} x   [x坐标]
	 * @param  {[type]} y   [y坐标]
	 * @param  {[type]} num [要绘制的数字]
	 * @return {[type]}     [description]
	 */
	function drawNum(x,y,num){
		for(var i=0,lenH=digit[num].length;i<lenH;i++){
			for(var j=0,lenW=digit[num][i].length;j<lenW;j++){
				cxt.beginPath();
				if(digit[num][i][j] == 1){
					cxt.fillStyle = color;
					cxt.arc(x+j*2*RADIUS+RADIUS,y+i*2*RADIUS+RADIUS,RADIUS,0,2*Math.PI);
					cxt.fill();
				}
				cxt.closePath();
			}
		}
	}
	function drawBalls(){
		for(var i=0,len=balls.length;i<len;i++){
			cxt.beginPath();
			cxt.fillStyle = balls[i].color;
			cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
			cxt.fill();
			cxt.closePath();
		}
	}
	/**
	 * [drawClock 绘制整个时钟]
	 * @return {[type]} [description]
	 */
	function drawClock(){
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		//console.log(hours,minutes,seconds);
		//var date = new Date();
		//console.log(hours);
		drawNum(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
		drawNum(MARGIN_LEFT+15*RADIUS,MARGIN_TOP,hours%10);
		drawNum(MARGIN_LEFT+30*RADIUS,MARGIN_TOP,digit.length-1);
		drawNum(MARGIN_LEFT+39*RADIUS,MARGIN_TOP,parseInt(minutes/10));
		drawNum(MARGIN_LEFT+54*RADIUS,MARGIN_TOP,minutes%10);
		drawNum(MARGIN_LEFT+69*RADIUS,MARGIN_TOP,digit.length-1);
		drawNum(MARGIN_LEFT+78*RADIUS,MARGIN_TOP,parseInt(seconds/10));
		drawNum(MARGIN_LEFT+93*RADIUS,MARGIN_TOP,seconds%10);
	}
	function getCurrentTime(){
		var date = new Date();
		return date.getTime();
	}
	function update(){
		var nextTime = new Date();
		var next_hours = nextTime.getHours();
		var next_minutes = nextTime.getMinutes();
		var next_seconds = nextTime.getSeconds();

		var current_hours = currentTime.getHours();
		var current_minutes = currentTime.getMinutes();
		var current_seconds = currentTime.getSeconds();
		if(next_seconds != currentTime){
			currentTime = nextTime;
			addBalls(next_hours,current_hours,next_minutes,current_minutes,next_seconds,current_seconds);
		}
		for(var i=0;i<balls.length;i++){
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;
			balls[i].vy *= 0.8;
			if(balls[i].y>document.documentElement.clientHeight){
				balls[i].vy = -balls[i].vy;
			}
			if(balls[i].x+RADIUS<0||balls[i].x+RADIUS>canvas.width){
				balls.splice(i,1);
				i--;
			}
		}
		while(balls.length>MAX_SIZE){
			balls.shift();
		}
		//console.log(balls.length);
	}
	function addBalls(next_hours,current_hours,next_minutes,current_minutes,next_seconds,current_seconds){
		if(next_hours != current_hours){ 
			if(parseInt(next_hours/10) != parseInt(current_hours/10)){
				addBall(MARGIN_LEFT,MARGIN_TOP,parseInt(current_hours/10));
			}
			if(parseInt(next_hours%10) != parseInt(current_hours%10)){
				addBall(MARGIN_LEFT+15*RADIUS,MARGIN_TOP,parseInt(current_hours%10));
			}
		}
		if(next_minutes != current_minutes){ 
			if(parseInt(next_minutes/10) != parseInt(current_minutes/10)){
				addBall(MARGIN_LEFT+39*RADIUS,MARGIN_TOP,parseInt(current_minutes/10));
			}
			if(parseInt(next_minutes%10) != parseInt(current_minutes%10)){
				addBall(MARGIN_LEFT+54*RADIUS,MARGIN_TOP,parseInt(current_minutes%10));
			}
		}
		if(next_seconds != current_seconds){
			if(parseInt(current_seconds/10) != parseInt(next_seconds/10)){
				addBall(MARGIN_LEFT+78*RADIUS,MARGIN_TOP,parseInt(current_seconds/10));
			}
			if(parseInt(current_seconds%10) != parseInt(next_seconds%10)){
				addBall(MARGIN_LEFT+93*RADIUS,MARGIN_TOP,parseInt(current_seconds%10));
			}
		}
	}
	function getRandom(range){
		var max = Math.max(range[0],range[1]);
		var min = Math.min(range[0],range[1]);
		var diff = max - min;
		return Math.random()*diff+min;
	}
	function addBall(x,y,num){
		for(var i=0,lenH=digit[num].length;i<lenH;i++){
			for(var j=0,lenW=digit[num][i].length;j<lenW;j++){
				if(digit[num][i][j] == 1){
					balls.push({
						'x':x+j*2*RADIUS+RADIUS,
						'y':y+i*2*RADIUS+RADIUS,
						'vx':getRandom([-8,8]),
						'vy':getRandom([-4,4]),
						'g':getRandom([4,7]),
						'color':colors[Math.ceil(Math.random()*colors.length)]
					});
				}
			}
		}
	}
	/*var arr= [1,2,3]
	function test(arr){
		arr.push(4);
		console.log(arr);
	}
	test(arr);
	console.log(arr);*/
};