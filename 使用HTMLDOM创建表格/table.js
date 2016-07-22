window.onload=function(){
	var body=document.getElementsByTagName('body')[0];
	var table=document.createElement('table');
	table.width=300;
	table.border=1;
	body.appendChild(table);
	
	var caption=table.createCaption();
	caption.innerHTML='人员表';
	
	var thead=table.createTHead();
	
	var thead_tr=thead.insertRow(0);
	thead_tr.insertCell(0).innerHTML='姓名';
	thead_tr.insertCell(1).innerHTML='性别';
	thead_tr.insertCell(2).innerHTML='年龄';
	
	var tbody=document.createElement('tbody');
	table.appendChild(tbody);
	var tbody_tr1=tbody.insertRow(0);
	tbody_tr1.insertCell(0).innerHTML='张三';
	tbody_tr1.insertCell(1).innerHTML='男';
	tbody_tr1.insertCell(2).innerHTML='18';
	
	var tbody_tr2=tbody.insertRow(1);
	tbody_tr2.insertCell(0).innerHTML='李四';
	tbody_tr2.insertCell(1).innerHTML='女';
	tbody_tr2.insertCell(2).innerHTML='19';
	
	var tbody_tr3=tbody.insertRow(2);
	tbody_tr3.insertCell(0).innerHTML='王五';
	tbody_tr3.insertCell(1).innerHTML='男';
	tbody_tr3.insertCell(2).innerHTML='20';
}