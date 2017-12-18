function displayAbbr() {
	if (!document.getElementsByTagName||!document.createElement
		||!document.createTextNode) return false;
	var abbreviations=document.getElementsByTagName('abbr');
	//用'缩略语'和'解释'组成数组
	if (abbreviations.length<1) return false;
	var defs=new Array();
	for (var i = abbreviations.length - 1; i >= 0; i--) {
		if (abbreviations[i].childNodes.length<1) return false;
		var definition=abbreviations[i].getAttribute('title');
		var key=abbreviations[i].lastChild.nodeValue;
		defs[key]=definition;
	}
	//创建定义列表
	dlist=document.createElement('dl');
	for(key in defs){
		var definition=defs[key];
		var dtitle=document.createElement('dt');
		var ddescr=document.createElement('dd');
		var dtitle_=document.createTextNode(key);
		var ddescr_=document.createTextNode(definition);
		dtitle.appendChild(dtitle_);
		ddescr.appendChild(ddescr_);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddescr);
	}
	if (dlist.childNodes.length<1) return false;
	//给定义列表建个题目
	header=document.createElement('h2');
	htext=document.createTextNode('Abbreviations');
	header.appendChild(htext);
	//把他们放到body标签里
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}
displayAbbr();

function displayCite(){
	if (!document.getElementsByTagName||!document.createElement
		||!document.createTextNode) return false;
	var quotes=document.getElementsByTagName('blockquote');
	for(var i=0; i<quotes.length; i++){
		if (!quotes[i].getAttribute('cite')) continue;
		var url=quotes[i].getAttribute('cite');
		var link=document.createElement('a');
		var superscript=document.createElement('sup');
		var link_=document.createTextNode('source');
		link.setAttribute('href',url);
		link.appendChild(link_);
		superscript.appendChild(link);
		var quotechild=quotes[i].getElementsByTagName('*');
		if (quotechild.length<1) continue;
		var elem=quotechild[quotechild.length-1];
		elem.appendChild(superscript);
	}
}
displayCite();