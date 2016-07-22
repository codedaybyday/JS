function starMove(obj,target,iType,fnEnd)
{
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	switch(iType)
	{
		case 0:
		obj.timer=setInterval(function(){doMoveBuffer(obj,target,fnEnd);},14);
		break;
		case 1:
		var sAttr="";
		obj.iSpeed={};
		for( sAttr in  target)
		{
			obj.iSpeed[sAttr]=0;
		}
		obj.timer=setInterval(function(){domoveFlexible(obj,target,fnEnd);},14);
		break;
	}
}
function doMoveBuffer(obj,target,fnEnd)
{
	var sAttr="";
	var iEnd=1;
	for(sAttr in target)
	{
		var iNow=parseFloat(getCss(obj,sAttr));
		if(iNow==target[sAttr])
		{
			continue;
		}
		else
		{
			var iSpeed=(target[sAttr]-iNow)/5;
				iSpeed*=0.75;
			if(iSpeed>0)
			{
				iSpeed=Math.ceil(iSpeed);
			}
			else
			{
				iSpeed=Math.floor(iSpeed);
			}
			iNow+=iSpeed
			var json={};
			json[sAttr]=iNow;
			setCss(obj,json);
			iEnd=0;
		}
	}
	if(iEnd)
	{
		clearInterval(obj.timer);
		if(fnEnd)
		{
			fnEnd.call(obj);
		}
	}
}
function domoveFlexible(obj,target,fnEnd)
{
	var sAttr="";
	var iEnd=1;
	for( sAttr in target)
	{
		var iNow=parseFloat(getCss(obj,sAttr));
		obj.iSpeed[sAttr]+=(target[sAttr]-iNow)/5;
		obj.iSpeed[sAttr]*=0.75;
		if(Math.round(iNow)==target[sAttr] && Math.abs(obj.iSpeed[sAttr])<1)
		{
			continue;
		}
		else
		{	
			iNow=Math.round(iNow+obj.iSpeed[sAttr]);
			var json={};
			json[sAttr]=iNow;
			setCss(obj,json);
			iEnd=0;
		}
	}
	if(iEnd)
	{
		clearInterval(obj.timer);
		if(fnEnd)
		{
			fnEnd.call(obj);
		}
	}
}
