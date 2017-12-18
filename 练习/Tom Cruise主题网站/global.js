function addClass(element,value) {
	if (!element.className) {
		element.className=value;
	}else{
		element.className+=''+value;
	}
}

function addLoadEvent(func) {
	var oldonload=window.onload;
	if (typeof window.onload!='function') {
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild==targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}

}

function moveElement(elementid,finalx,finaly,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementid)) return false;
	var elem=document.getElementById(elementid);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left='0px';
	}
	if (!elem.style.top) {
		elem.style.top='0px';
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist;
	if (xpos==finalx&&ypos==finaly) {
		return true;
	}
	if (xpos<finalx) {
		dist=Math.ceil((finalx-xpos)/20);
		xpos+=dist;
	}
	if (xpos>finalx) {
		dist=Math.ceil((xpos-finalx)/20);
		xpos-=dist;
	}
	if (ypos<finaly) {
		dist=Math.ceil((finaly-ypos)/20);
		ypos+=dist;
	}
	if (ypos>finaly) {
		dist=Math.ceil((ypos-finaly)/20);
		ypos-=dist;
	}
	elem.style.left=xpos+'px';
	elem.style.top=ypos+'px';
	//注意变量不能用''包起来
	var repeat='moveElement("'+elementid+'",'+finalx+','+finaly+','+interval+')'
	elem.movement=setTimeout(repeat,interval);
}

function highlightPage(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		linkurl = links[i].getAttribute('href');
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = 'here';
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id',linktext);
		}
	}
}
addLoadEvent(highlightPage);

function prepareSlideshow(){
	if (!document.getElementById('intro')) return false;
	var slideshow=document.createElement('div');
	slideshow.setAttribute('id','slideshow');
	var preview=document.createElement('img');
	preview.setAttribute('src','slideshow.gif')
	preview.setAttribute('alt','a glimpse of what awaits you');
	preview.setAttribute('id','preview');
	slideshow.appendChild(preview);
	var intro=document.getElementById('intro');
	insertAfter(slideshow,intro);
	var links=document.getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		links[i].onmouseover=function(){
			var destination=this.getAttribute('href');
			if (destination.indexOf('index.html') !=-1) {
				moveElement('preview',0,0,5);
			}if (destination.indexOf('about.html') !=-1) {
				moveElement('preview',-160,0,5);
			}if (destination.indexOf('photos.html') !=-1) {
				moveElement('preview',-320,0,5);
			}if (destination.indexOf('live.html') !=-1) {
				moveElement('preview',-480,0,5);
			}if (destination.indexOf('contact.html') !=-1) {
				moveElement('preview',-640,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

function showSection(id){
	var sections=document.getElementsByTagName('section');
	for (var i = sections.length - 1; i >= 0; i--) {
		if (sections[i].getAttribute('id') != id){
			sections[i].style.display='none';
		}else {
			sections[i].style.display='block';
		}
	}
}

function prepareInternalnav(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles=document.getElementsByTagName('article');
	if (articles.length == 0) return false;
	var navs=articles[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links=navs[0].getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		var sectionId=links[i].getAttribute('href').split('#')[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display='none';
		//通过自定义属性来调用局部变量section
		links[i].destination=sectionId;
		links[i].onclick=function() {
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

//创建img和p标签
function preparePlace(){
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('image')) return false;
	var cimg=document.createElement('img');
	cimg.setAttribute('id','plchold');
	cimg.setAttribute('src','photo0.jpg');
	cimg.setAttribute('alt','my image gallery');
	cimg.style.display='block';
	cimg.style.width='646px';
	cimg.style.margin='0 auto';
	var cp=document.createElement('p');
	cp.setAttribute('id','description');
	cp.style.font='1.4em normal';
	var ctxt=document.createTextNode('Choose an image.');
	cp.appendChild(ctxt);
	var gul=document.getElementById('image');
	insertAfter(cimg,gul);
	insertAfter(cp,gul);
}
//给#image的链接添加click事件
function preparelinks(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById('image')) return false;
	var gul=document.getElementById('image');
	var links=gul.getElementsByTagName('a');
	for (var i=0; i<links.length; i++) {
		links[i].onclick=function(){
			return !showpic(this);
		}
	}
}
//点击时执行：拷贝href和title到创建的相应位置
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
addLoadEvent(preparePlace);
addLoadEvent(preparelinks);

function stripeTables(){
	if (!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName('table');
	for (var i = tables.length - 1; i >= 0; i--) {
		var odd=false;
		var rows=tables[i].getElementsByTagName('tr');
		for (var j = 1; j < rows.length; j++) {
			if (odd==true) {
				addClass(rows[j],'odd');
				odd=false;
			}else{odd=true;}
		}
	}
}
function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName('tr');
	for (var i = 1; i < rows.length; i++) {
		rows[i].oldclass=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,' highlight');
		}
		rows[i].onmouseout=function(){
			this.className=this.oldclass;
		}
	}
}
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
	//把他们放到article标签里
	var articles=document.getElementsByTagName('article');
	articles[0].appendChild(header);
	articles[0].appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbr);

function focusLabels(){
	if (!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName('label');
	for (var i = labels.length - 1; i >= 0; i--) {
		if (!labels[i].getAttribute('for')) continue;
		labels[i].onclick=function(){
			var id=document.getElementById('for');
			if (!document.getElementById(id)) return false;
			var elem=document.getElementById(id);
			elem.focus();
		}
	}
}

function resetFields(){
	for (var i = 0; i < document.forms.length; i++) {
		var forms=document.forms[i];
		for (var j = 0; j < forms.elements.length; j++) {
			var elem=forms.elements[j];
			if (elem.type=='submit') continue;
			if (!elem.placeholder) continue;
			elem.placeholders=elem.placeholder;
			elem.onfocus=function(){
				this.placeholder='';
			}
			elem.onblur=function(){
				this.placeholder=this.placeholders;
			}
		}
	}
}

function isFilled(field){
	if (field.value.replace(' ','').length==0) return false;
	return (field.value!=placeholder);
}
function isEmail(field){
	return(field.value.indexOf('@')!=-1 && field.value.indexOf('.')!=-1);
}

function validateForm(){
	for (var i = 0; i < document.forms.length; i++) {
		var forms=document.forms[i];
		resetFields(forms);
		forms.onsubmit=function(){
			for (var i = 0; i < this.elements.length; i++) {
				var elem=this.elements[i];
				if (elem.required=='required') {
					if (!isFilled(elem)) {
						alert('Please fill in the '+elem.name+' field.');
						return false;
					}
				}
				if (elem.type=='email') {
					if (!isEmail(elem)) {
						alert('The '+elem.name+' field must be a valid email address.');
						return false;
					}
				}
				return true;
			}
		}
	}
}
addLoadEvent(validateForm);