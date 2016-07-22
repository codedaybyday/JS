/*
1.数据分离
2.模板
3.数组乱序
4.Array.prototype.slice.call(DomElement)和Array.prototype.splice.call(DomElement)区别
5.re = new RegExp('\\s*'+clas);与正则字面量比较的妙处
 */
window.onload = function(){
	var oWrap = document.getElementById('wrap'),
	aPhoto = null,
	aBar = null,
	center_index = 0;
	//data = data;

	addPhotos();
	setRandomPos();
	bind();
	/**
	 * [addPhotos 模板解析，添加照片]
	 */
	function addPhotos(){
		var _template = oWrap.innerHTML,
		_html = '',
		_bar_html = '<p id="bar">';

		for(var i=0,len=data.length;i<len;i++){
			_html += _template.replace(/{{img}}/,data[i].img).replace(/{{caption}}/,data[i].caption).replace(/{{desc}}/,data[i].desc);
			_bar_html += '<span index='+i+'></span>';
		}
		_bar_html += '</p>';
		_html += _bar_html;
		oWrap.innerHTML = _html;
	}
	/**
	 * [setRandomPos 设置随机位置]
	 */
	function setRandomPos(index){
		if(!aPhoto){
			aPhoto = oWrap.getElementsByClassName('photo');
		}
		removeClass(aPhoto[center_index],'center');
		var _temp = Array.prototype.slice.call(aPhoto);//转成真实的数组
		var _ranges = getPosRange();
		center_index = index || getRandom([0,data.length]);
		var center_photo = _temp.splice(center_index,1)[0];

		_temp.sort(function(){//数组乱序
			return Math.random()<0.5?1:-1;
		});

		var left_photo = _temp.splice(0,Math.ceil(data.length/2));
		var right_photo = _temp;
		var oBar = document.getElementById('bar');
		aBar = oBar.getElementsByTagName('span');

		for(var i=0,len=left_photo.length;i<len;i++){
			removeClass(left_photo[i],'center');
			left_photo[i].style.left = getRandom(_ranges.left.x)+'px';
			left_photo[i].style.top = getRandom(_ranges.left.y)+'px';
			left_photo[i].style.transform = 'rotate('+getRandom([0,360])+'deg)';
		}
		for(var i=0,len=right_photo.length;i<len;i++){
			removeClass(left_photo[i],'center');
			right_photo[i].style.left = getRandom(_ranges.right.x)+'px';
			right_photo[i].style.top = getRandom(_ranges.right.y)+'px';
			right_photo[i].style.transform = 'rotate('+getRandom([0,360])+'deg)';
		}
		for(var i=0,len=aBar.length;i<len;i++){
			aBar[i].className = '';
		}
		aBar[center_index].className = ' active';
		center_photo.style.left = '';
		center_photo.style.top = '';
		center_photo.style.transform = '';
		addClass(center_photo,'center');
	}
	/**
	 * [getRandom 从一个已知的范围内获取一个随机数]
	 * @param  {[type]} range [description]
	 * @return {[type]}       [description]
	 */
	function getRandom(range){
		var _max = Math.max(range[0],range[1]),
		_min = Math.min(range[0],range[1]),
		_diff = _max - _min;

		return Math.floor(Math.random()*_diff + _min);
	}
	function addClass(obj,clas){
		if(typeof obj === 'object'){
			obj.className += ' '+clas;
		}else{
			for(var i=0,len=obj.length;i<len;i++){
				obj[i].className += ' '+clas;
			}
		}
	}
	function removeClass(obj,clas){
		var re = new RegExp('\\s*'+clas);
		if(typeof obj === 'object'){
			if(obj.className && re.test(obj.className)){
				obj.className = obj.className.replace(re,'');
			}
		}else{
			for(var i=0,len=obj.length;i<len;i++){
				if(obj[i].className && re.test(obj[i].className)){
					obj[i].className = obj[i].className.replace(re,'');
				}
			}
		}
	}
	/**
	 * [bind 绑定事件]
	 * @return {[type]} [description]
	 */
	function bind(){
		for(var i=0,len=aPhoto.length;i<len;i++){
			var center_pattern = /center/;
			aPhoto[i].onclick = function(){
				turnPhoto(this);
				if(center_pattern.test(this.className)){
					turn(aBar[center_index]);
				}
			};
		}
		for(var i=0,len=aBar.length;i<len;i++){
			aBar[i].onclick = function(){
				if(/active/.test(this.className)){
					turnPhoto(aPhoto[center_index]);
					turn(this);
				}else{
					removeClass(aBar[center_index],'active');
					var index  = this.getAttribute('index');
					setRandomPos(index);
					addClass(aBar[center_index],'active');
				}
			};
		}
		/**
		 * [turn 按钮翻转]
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		function turn(obj){
			console.log(/bar_back/.test(obj.className))
			if(/bar_back/.test(obj.className)){
				removeClass(obj,'bar_back');
			}else{
				addClass(obj,'bar_back');
			}
		}
		function turnPhoto(obj){
			var front_pattern = /photo_front/,
			back_pattern = /photo_back/;

			if(front_pattern.test(obj.className)){
				removeClass(obj,'photo_front');
				addClass(obj,'photo_back');
			}else{
				removeClass(obj,'photo_back');
				addClass(obj,'photo_front');
			}
		}
	}
	/**
	 * [getPosRange 得到图片位置的随机范围]
	 * @return {[type]} [description]
	 */
	function getPosRange(){
		var oPhoto = oWrap.getElementsByClassName('photo')[0],
		wrapW = oWrap.offsetWidth,
		wrapH = oWrap.offsetHeight,
		photoW = oPhoto.offsetWidth,
		photoH = oPhoto.offsetHeight,
		ranges = {
			'left':{'x':[],'y':[]},
			'right':{'x':[],'y':[]}
		};
		ranges.left.x.push(-photoW,(wrapW-photoW)/2);
		ranges.left.y.push(-photoH,wrapH+photoH);
		ranges.right.x.push((wrapW+photoW)/2,wrapW+photoW);
		ranges.right.y.push(-photoH,wrapH+photoH);
		//console.log(ranges);
		return ranges;
	}
};