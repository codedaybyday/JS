window.onload=function(){
	var body=document.getElementsByTagName('body')[0];
	var table=document.createElement('table');
	table.width=300;
	table.border=1;
	body.appendChild(table);
	
	var caption=document.createElement('caption');
	caption.innerHTML='人员表';
	table.appendChild(caption);
	
	var thead=document.createElement('thead');
	table.appendChild(thead);
	var thead_tr=document.createElement('tr');
	thead.appendChild(thead_tr);
	
	var thead_tr_th1=document.createElement('th');
	thead_tr_th1.innerHTML='姓名';
	thead_tr.appendChild(thead_tr_th1);
	var thead_tr_th2=document.createElement('th');
	thead_tr_th2.innerHTML='性别';
	thead_tr.appendChild(thead_tr_th2);
	var thead_tr_th3=document.createElement('th');
	thead_tr_th3.innerHTML='年龄';
	thead_tr.appendChild(thead_tr_th3);
	
	var tbody=document.createElement('tbody');
	table.appendChild(tbody);
	
	var tbody_tr1=document.createElement('tr');
	tbody.appendChild(tbody_tr1);
	
	var tbody_tr1_td1=document.createElement('td');
	tbody_tr1_td1.innerHTML='张三';
	tbody_tr1.appendChild(tbody_tr1_td1);
	
	var tbody_tr1_td2=document.createElement('td');
	tbody_tr1_td2.innerHTML='男';
	tbody_tr1.appendChild(tbody_tr1_td2);
	
	var tbody_tr1_td3=document.createElement('td');
	tbody_tr1_td3.innerHTML='18';
	tbody_tr1.appendChild(tbody_tr1_td3);
	
	
	var tbody_tr2=document.createElement('tr');
	tbody.appendChild(tbody_tr2);
	
	var tbody_tr2_td1=document.createElement('td');
	tbody_tr2_td1.innerHTML='李四';
	tbody_tr2.appendChild(tbody_tr2_td1);
	
	var tbody_tr2_td2=document.createElement('td');
	tbody_tr2_td2.innerHTML='女';
	tbody_tr2.appendChild(tbody_tr2_td2);
	
	var tbody_tr2_td3=document.createElement('td');
	tbody_tr2_td3.innerHTML='19';
	tbody_tr2.appendChild(tbody_tr2_td3);
	
	var tbody_tr3=document.createElement('tr');
	tbody.appendChild(tbody_tr3);
	
	var tbody_tr3_td1=document.createElement('td');
	tbody_tr3_td1.innerHTML='王五';
	tbody_tr3.appendChild(tbody_tr3_td1);
	
	var tbody_tr3_td2=document.createElement('td');
	tbody_tr3_td2.innerHTML='男';
	tbody_tr3.appendChild(tbody_tr3_td2);
	
	
	var tbody_tr3_td3=document.createElement('td');
	tbody_tr3_td3.innerHTML='20';
	tbody_tr3.appendChild(tbody_tr3_td3);
}