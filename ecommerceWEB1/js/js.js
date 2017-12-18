window.onload=function () {
	a.app.searchTip();
	a.app.bannerRoll();
	a.app.bannerChg();
	a.app.filtSelect();
	a.app.scrollChg();
}

var a={};

a.tools={};
a.tools.getElementsByClassName=function (element,classname) {
	if (element.getElementsByClassName) {
		return element.getElementsByClassName(classname);
	}else{
		var elements=element.getElementsByTagName('*'),
			result=[];
		var	names=classname.split(' ');
		for (var i = 0, el = elements.length; i < el; i++) {
			var getname=elements[i].className,
				flag=true;
			for (var j = 0, nl = names.length; j < nl; j++) {
				if(getname.indexOf(names[j]) == -1){
					flag=false;
					break;
				}
			}
			if(flag) {
				result.push(elements[i]);
			}
		}
		return result;
	}
}


a.ui={};
a.ui.tips=function (obj,text) {
	obj.onfocus=function () {
		if (this.value==text) this.value='';
	}
	obj.onblur=function () {
		if (!this.value) this.value=text;
	}
}
a.ui.fadeOut=function (obj) {
	clearInterval(obj.timer);
	var initial=100;
	obj.timer=setInterval(function () {
		initial-=5;
		obj.style.opacity=initial/100;
		obj.style.filter='alpha(opacity='+initial+')';
		if (initial<=0){
			clearInterval(obj.timer);
			obj.style.opacity=0;
			obj.style.filter='alpha(opacity=0)';
		}
	},30)
}
a.ui.fadeIn=function (obj) {
	clearInterval(obj.timer);
	var initial=0;
	obj.timer=setInterval(function () {
		initial+=5;
		obj.style.opacity=initial/100;
		obj.style.filter='alpha(opacity='+initial+')';
		if (initial>=100){
			clearInterval(obj.timer);
			obj.style.opacity=1;
			obj.style.filter='alpha(opacity=100)';
		}
	},30)
}
a.ui.bannerAnimation=function (num,dir) {
	for (var i = 0; i < a.app.oLi.length; i++) {
			a.app.oLi[i].style.opacity=0;
			a.app.oLi[i].style.filter='alpha(opacity=0)';
		}
		a.app.oLi[num%a.app.oLi.length].style.opacity=1;
		a.app.oLi[num%a.app.oLi.length].style.filter='alpha(opacity=100)';
		a.ui.fadeOut(a.app.oLi[num%a.app.oLi.length]);
		if (dir) {
			a.ui.fadeIn(a.app.oLi[(num+1)%a.app.oLi.length]);
		}else{
			if (num==0) num=a.app.oLi.length;
			a.ui.fadeIn(a.app.oLi[(num-1)%a.app.oLi.length]);
		}	
}
a.ui.move=function (obj,dist,limit,unit) {
	clearInterval(obj.timer);
	obj.timer=setInterval(function () {
		dist>0? step=Math.ceil(dist/10) : step=Math.floor(dist/10);
		obj.style.left=obj.offsetLeft+step+'px';
		dist-=step;
		//消除超出显示范围立刻重置时出现的跳帧问题；需要用到全局变量a.app.num；
		if (dist!=0 && parseInt(obj.style.left)<=limit) {
			clearInterval(obj.timer);
			obj.style.left=0;
			dist=Math.floor(dist/unit)*unit;
			a.ui.move(obj,dist,limit,unit);
			a.app.num=-dist/unit;
		}
		if (dist==0) {
			clearInterval(obj.timer);
		}
	},30)
}


a.app={};
a.app.oAd=document.getElementById('ad'),
a.app.oLi=a.app.oAd.getElementsByTagName('li'),
a.app.num1=a.app.oLi.length-1  //css绝对定位显示最后一张图
a.app.num=0;
a.app.searchTip=function () {
	var text1=document.getElementById('text1'),
		text2=document.getElementById('text2'),
		text=text1.value;
	a.ui.tips(text1,text);
	a.ui.tips(text2,text);
}
a.app.bannerRoll=function () {
	a.app.oAd.timer=setInterval(function () {
		a.ui.bannerAnimation(a.app.num1,1);
		a.app.num1++;
	},3000);
}
a.app.bannerChg=function () {
	var	pre=a.tools.getElementsByClassName(a.app.oAd,'pre')[0],
		next=a.tools.getElementsByClassName(a.app.oAd,'next')[0];
	a.app.oAd.onmouseover=function () {
		clearInterval(a.app.oAd.timer);
		this.onmousemove=function (ev) {
			var ev=ev || window.event,
				helfw=parseInt(this.offsetWidth/2),
				x=ev.clientX-this.offsetLeft;
			if (x<helfw) {
				pre.style.display='block';next.style.display='none';
			}else{
				next.style.display='block';pre.style.display='none';
			}
		}
		this.onmouseout=function () {
			a.app.bannerRoll();
			next.style.display='none';
			pre.style.display='none';
		}	
	}
	next.onclick=function () {
		//Chrom的BUG：next.onclick偶尔会触发next.onmouseout,冒泡到a.app.oAd.onmouseout,所以阻止冒泡后再调用onmousemove重新设置next.onmouseout动作,同时‘恢复’冒泡;
		this.onmouseout=function (ev) {
			var ev=ev || window.event;
			event.cancelBubble=true;
			this.onmousemove=function () {
				this.onmouseout=function () {
					this.style.display='none';
				}
			}
		}
		a.ui.bannerAnimation(a.app.num1,1);
		a.app.num1++;
	}
	pre.onclick=function () {
		//同上
		this.onmouseout=function (ev) {
			var ev=ev || window.event;
			event.cancelBubble=true;
			this.onmousemove=function () {
				this.onmouseout=function () {
					this.style.display='none';
				}
			}
		}
		a.ui.bannerAnimation(a.app.num1,0);
		if (a.app.num1==0) a.app.num1=a.app.oLi.length;
		a.app.num1--;
	}
}
a.app.filtSelect=function () {
	var filt=a.tools.getElementsByClassName(document,'filt')[0],
		dd=filt.getElementsByTagName('dd');
	for (var i = 0; i < dd.length; i++) {
		dd[i].onclick=function (ev) {
			for (var j = 0; j < dd.length; j++) {
				dd[j].getElementsByTagName('ul')[0].style.display='none';
			}
			var ev=ev || window.event,
				ul=this.getElementsByTagName('ul')[0],
				li=ul.getElementsByTagName('li');
			ul.style.display='block';
			ev.cancelBubble=true;
			document.onclick=function () {
				ul.style.display='none';
			}
			for (var j = 0; j < li.length; j++) {
				li[j].onmouseover=function () {
					this.className='activ';
					this.onmouseout=function () {
						this.className='';
					}
					this.onclick=function (ev) {
						var ev=ev || window.event,
							h=this.parentNode.parentNode.getElementsByTagName('h2')[0];
						h.innerHTML=this.innerHTML;
						this.parentNode.style.display='none';
						ev.cancelBubble=true;
					}
				}
			}
		}
	}
}
a.app.scrollChg=function () {
	var scroll=document.getElementById('scroll_wrapr'),
		ul=scroll.getElementsByTagName('ul')[0],
		li=ul.getElementsByTagName('li'),
		pre=a.tools.getElementsByClassName(scroll,'pre')[0],
		next=a.tools.getElementsByClassName(scroll,'next')[0],
		limit=ul.offsetWidth;
	ul.style.width=ul.offsetWidth*2+'px';
	ul.innerHTML+=ul.innerHTML;
	next.onclick=function () {
		a.app.num++;
		console.log();
		a.ui.move(ul,-a.app.num*li[0].offsetWidth-ul.offsetLeft,-limit,li[0].offsetWidth);
	}
}