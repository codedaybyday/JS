window.onload = initForms;

function initForms() {
	for (var i=0; i< document.forms.length; i++) {
		document.forms[i].onsubmit = validForm;//为每个表单添加onsubmit事件
	}
}

function validForm() {
	var allGood = true;
	var allTags = document.getElementsByTagName("*");//得到所有标签的集合

	for (var i=0; i<allTags.length; i++) {
		if (!validTag(allTags[i])) {
			allGood = false;
		}
	}
	return allGood;

	function validTag(thisTag) {
		var outClass = "";
		var allClasses = thisTag.className.split(" ");//把多个class用空格分开
	
		for (var j=0; j<allClasses.length; j++) {
			outClass += validBasedOnClass(allClasses[j]) + " ";//
		}
	
		thisTag.className = outClass;
	
		if (outClass.indexOf("invalid") > -1) {//如果能够索引到invalid
			thisTag.focus();
			if (thisTag.nodeName == "INPUT") {
				thisTag.select();
			}
			return false;//如果此处不用return，程序将会继续向下索引，导致如果多个文本框没填写的话，就会选择多个文本框
		}
		return true;
		
		function validBasedOnClass(thisClass) {
			var classBack = "";
		
			switch(thisClass) {
				case "":break;
				case "invalid"://表明之前这个表单未填，一但有这个，就会被消除，因为这相当于新一轮的遍历，其实invalid的存在主要还是case 'reqd'决定的
					break;
				case "reqd":
					if (allGood && thisTag.value == "") {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				default:
					classBack += thisClass;
			}
			return classBack;
		}
	}
}
