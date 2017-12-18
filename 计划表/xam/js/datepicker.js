
var bg=document.querySelectorAll('.bg'),
	box=document.querySelectorAll('.box'),
	btn=document.querySelector('button'),
	time=document.querySelector('.time'),
	note=time.querySelector('p'),
	mask=document.querySelector('#mask'),
	wrap=document.querySelector('.boxwrap'),
	timingbtn=document.querySelector('#timing'),
	btn1=timingbtn.children[0],
	btn2=timingbtn.children[1];
wrap.style.transform='translateZ('+0.01+'px)'; //硬件加速
layout();
document.addEventListener('touchmove',function (e) {
	e.preventDefault();
})
for (var i = 0; i < bg.length; i++) {
	touchscroll(bg[i],i);
}
btn.addEventListener('touchend',timeBegin);
btn1.addEventListener('touchend',reset);
btn2.addEventListener('touchend',timePause);


function touchscroll(obj,index) {
	obj.lastp=0;
	obj.startp=0;
	obj.lastime=0;
	obj.change=0;
	obj.val=0;
	obj.lastdeg=0;
	obj.addEventListener('touchstart',function (e) {
		clearInterval(this.timer);
		obj.lastdeg=-obj.val;
		obj.startp=obj.lastp=e.changedTouches[0].pageY;  //touchmove事件嵌套在touchstart事件内时切忌使用在touchstart事件内定义的lastp，一定提前指定全局lastp，否则会出现两个lastp;
	});
	obj.addEventListener('touchmove',function (e) {
		note.style.display='none';
		var nowp=e.changedTouches[0].pageY,
			nowtime=new Date().getTime(),
			dist=nowp-obj.lastp,
			timelag=nowtime-obj.lastime;
		obj.change=-dist/timelag*200;
		obj.lastime=nowtime;
		obj.lastp=nowp;
		obj.lastdeg+=dist/2;
		obj.children[0].style.transform='rotateX('+(-obj.lastdeg)+'deg)';
		timeSet(-obj.lastdeg,index);
	});
	obj.addEventListener('touchend',function (e) {
		var nowp=e.changedTouches[0].pageY,
			target=obj.change-obj.lastdeg,
			duration=200,
			t=0;
		if (index%2==0) {
			if (target<0) target=0;
			if (target>180) target=180;
		}
		if (nowp==obj.startp) {//点击
			obj.change=Math.round(-obj.lastdeg/36)*36+obj.lastdeg;//数字取整
		}else{//滑动
			obj.change=Math.round(target/36)*36+obj.lastdeg; 
		}
		obj.timer=setInterval(function () {
			t++;
			obj.val=easeOutQuad(t,-obj.lastdeg,obj.change,duration);
			obj.children[0].style.transform='rotateX('+obj.val+'deg)';
			timeSet(obj.val,index);
			if (t>=duration) {
				clearInterval(obj.timer);
				obj.lastdeg=-obj.val;
			}
		},16)
	});
}

function layout() {
	for (var i = 0; i < box.length; i++) {
		var	str='';
		for (var j = 0; j < 10; j++) {
			if (i%2==0 && j<4) {
				str='<div><span></span>'+str+'</div>';
			}else{
				str='<div><span>'+(9-j)+'</span>'+str+'</div>';
			}
		}
		box[i].innerHTML=str;
	}
}
function timeSet(val,index) {
	var num=Math.round(val/36)%10;
	if (index%2==0 && val<0) {
		time.children[index].innerHTML=0;
	}else if (index%2==0 && val>180){
		time.children[index].innerHTML=5;
	}else{
		num<0? time.children[index].innerHTML=num+10 : time.children[index].innerHTML=num;
	}
}
function timeBegin() {
	for (var i = 0; i < bg.length; i++) {
		clearInterval(bg[i].timer);
	}
	var arr1=[];
	for (var i = 0; i < time.children.length-1; i++) {
		arr1[i]=time.children[i].innerHTML;
	}
	var timeVal=Number((arr1[0]+arr1[1])*60)+Number(arr1[2]+arr1[3]);
	if (!timeVal) {
		reset();
		return;
	}

	note.innerHTML='正在计时';
	btn.style.display='none';
	timingbtn.style.display=note.style.display=mask.style.display='block';

	btn.timer=setInterval(function () {
		timeVal--;
		var num2=toDb(parseInt(timeVal/60))+toDb(parseInt(timeVal%60)),
			arr2=[...num2];
		timechange(arr1,arr2);
		arr1=arr2;
		if (timeVal<=0) {
			clearInterval(btn.timer);
			note.innerHTML='计时结束';
			timingbtn.style.display=mask.style.display='none';
			btn.style.display='block';
			for (var i = 0; i < bg.length; i++) {
				bg[i].lastp=0;
				bg[i].startp=0;
				bg[i].lastime=0;
				bg[i].change=0;
				bg[i].val=0;
				bg[i].lastdeg=0;
			}
		}
	},1000)
}
function timechange(arr1,arr2) {
	//滚轮切换
	for (let i = 0; i < bg.length; i++) {
		let change=(arr2[i]-arr1[i])*36,
			duration=30,
			t=0;
		bg[i].timer=setInterval(function () {
			clearInterval(this.timer);
			t++;
			if (change==324) change=-36;
			if (change==-324) change=36;
			val=easeOutQuad(t,36*arr1[i],change,duration);
			bg[i].children[0].style.transform='rotateX('+val+'deg)';
			if (t>=duration) {
				clearInterval(bg[i].timer);
			}
		},16)
	}
	//时间切换
	for (var i = 0; i < time.children.length-1; i++) {
		time.children[i].innerHTML=arr2[i];
	}
}
function reset() {
	note.innerHTML='';
	btn2.innerHTML='暂停';
	timingbtn.style.display=mask.style.display='none';
	btn.style.display='block';
	for (var i = 0; i < bg.length; i++) {
		clearInterval(bg[i].timer);
	}
	clearInterval(btn.timer);
	var arr1=[],
		arr2=[0,0,0,0];
	for (var i = 0; i < time.children.length-1; i++) {
		arr1[i]=time.children[i].innerHTML;
	}
	timechange(arr1,arr2);
	for (var i = 0; i < bg.length; i++) {
		bg[i].lastp=0;
		bg[i].startp=0;
		bg[i].lastime=0;
		bg[i].change=0;
		bg[i].val=0;
		bg[i].lastdeg=0;
	}
}
function timePause() {
	if (this.innerHTML=='暂停') {
		note.innerHTML='暂停计时';
		this.innerHTML='继续';
		for (var i = 0; i < bg.length; i++) {
			clearInterval(bg[i].timer);
		}
		clearInterval(btn.timer);
	}else{
		this.innerHTML='暂停';
		timeBegin();
	}	
}
function toDb(a) {
	return a<10? '0'+a : ''+a;
}
function easeOutQuad (t, b, c, d) {
	return -c *(t/=d)*(t-2) + b;
	// t: current time, b: begInnIng value, c: change In value, d: duration
}