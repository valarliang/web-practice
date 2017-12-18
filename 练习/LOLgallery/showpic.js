//拷贝href和title到位置
function showpic(whichpic) {
	if(!document.getElementById('plchold')) return false;
	var source=whichpic.getAttribute('href');
	var plchold=document.getElementById('plchold');
	if (plchold.nodeName!='IMG') return false;
	plchold.setAttribute("src",source);
	if(document.getElementById('description')) {
		var text=whichpic.getAttribute('title')? whichpic.getAttribute('title') :'';
		var desc=document.getElementById('description');
		if (desc.firstChild.nodeType==3) {
			desc.firstChild.nodeValue=text;	
		}
	}
	return true;
}

//添加click事件
function preparelinks(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById('popup')) return false;
	var gul=document.getElementById('popup');
	var links=gul.getElementsByTagName('a');
	for (var i=0; i<links.length; i++) {
		links[i].onclick=function(){
			return !showpic(this);
		}
	}
}
preparelinks();

//创建img和p标签
window.onload=function(){
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('popup')) return false;
	var cimg=document.createElement('img');
	cimg.setAttribute('id','plchold');
	cimg.setAttribute('src','ashe.jpg');
	cimg.setAttribute('alt','my image gallery');
	var cp=document.createElement('p');
	cp.setAttribute('id','description');
	var ctxt=document.createTextNode('Choose an image.');
	cp.appendChild(ctxt);
	var gul=document.getElementById('popup');
	gul.parentNode.insertBefore(cimg,gul);
	gul.parentNode.insertBefore(cp,gul);
}