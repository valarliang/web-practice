var re={
    qq : /[1-9][0-9]{4,9}/,
    email : /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
    phone : /^(\d{3,4}-)?\d{7,8}$|^1\d{2,10}$/,
    trim:/^\s*|\s*$/,                    //行首行尾空格
    chinese:/[\u4e00-\u9fa5]/,           //匹配中文
    url:/[a-zA-z]+:\/\/[^\s]*/,          //网址
    postalcode:/[0-9]\d{5}/,             //邮编
    ID:/[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/  //身份证号
}


function addLoadEvent(func) {
    var oldonload=window.onload;
    if (typeof window.onload!='function') {
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

function addClass(element,value) {
    if (!element.className) {
        element.className=value;
    }else{
        element.className+=''+value;
    }
}

function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

function findMax() {
    var max = arguments[0]; 
    if(arguments.length < 2) return max;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}

function getElementsByClassName(element,classname) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(classname);
    }else{
        var elements=element.getElementsByTagName('*'),
            result=[];
        var names=classname.split(' ');
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

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild==targetElement) {
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

// 移动元素
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
    var repeat='moveElement("'+elementid+'",'+finalx+','+finaly+','+interval+')'
    elem.movement=setTimeout(repeat,interval);
}


// 拖拽效果
function drag(obj) {
    obj.onmousedown=function (ev) {
        var ev=ev || window.event;
            disX=ev.clientX-this.offsetLeft,
            disY=ev.clientY-this.offsetTof;
        if ( obj.setCapture ) {//兼容IE
                obj.setCapture();
            }
        document.onmousemove=function () {
            obj.style.left=ev.clientX-disX;
            obj.style.top=ev.clientY-disY;
        }
        document.onmouseup=function () {
            document.onmousemove=document.onmouseup=null;
            //释放全局捕获 releaseCapture();
            if ( obj.releaseCapture ) {
                    obj.releaseCapture();
                }
        }
        //阻止冒泡
        return false;
    }
}

//抖动效果
function shakeAnimation ( obj, attr, endFn ) {
    obj.style[attr]='';
    var pos = parseInt( getStyle(obj, attr) );  
    var arr = [];           // 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;   
    for ( var i=20; i>0; i-=2 ) {
        arr.push( i, -i );
    }
    arr.push(0);
    clearInterval( obj.shake );
    obj.shake = setInterval(function (){
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if ( num === arr.length ) {
            clearInterval( obj.shake );
            endFn && endFn();
        }
    }, 50);
}//或：
function shake(json={}){ //配置
    //默认
    let opt = {
        callback:function(){},
        attr:'left',
        n:10,
        obj:null
    }
    // 有配置走配置，没配置走默认
    Object.assign(opt,json);

    //console.log(opt);

    let arr = [];
    let num = 0;
    let timer = null;
    for(var i=opt.n;i>0;i-=2){
        arr.push(-i,i);
    }
    arr.push(0);
    clearInterval(timer);
    timer = setInterval(function(){
        opt.obj.style[opt.attr] = parseInt(getComputedStyle(opt.obj)[opt.attr]) + arr[num] + 'px';
        num ++;
        if(num >= arr.length){
            clearInterval(timer);
            num = 0;
            opt.callback && opt.callback();//钩子函数
        }
    },30); 
}

//倒计时
function countDown(fullyear,month,date,hours,minutes,secounds) {
    var dNow=new Date(fullyear,month,date,hours,minutes,secounds);
    var dNew=new Date();
    var t=Math.floor((dNow-dNew)/1000);
    if (t>=0) {
        var str=Math.floor(t/86400)+'天'+Math.floor(t%86400/3600)+'时'+Math.floor(t%86400%3600/60)+'分'+t%60+'秒';
        return str;
    }else{
        alert('It has expired');
        clearInterval(timer);
    }
}

function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}


/*function setcookie(key,value,date) {
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+date);
    document.cookie=key+'='+value+';expires='+oDate.toGMTString();
}
function getcookie(key) {
    var arr1=document.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2=arr1[i].split('=');
        if (arr2[0]==key) {
            return decodeURI(arr2[1]);
        }
    }
}
function removecookie(key) {
    setcookie(key,'',-1);
}*/
function setcookie(name,value,expires,path,domain,secure) {
    var cookie=encodeURIComponent(name)+'='+encodeURIComponent(value);
    if (expires) cookie+='; expires='+expires.toGMTString();
    if (path) cookie+='; path='+path;
    if (domain) cookie+='; domain='+domain;
    if (secure) cookie+='; secure='+secure;
    document.cookie=cookie;
}



function getcookie() {
    var cookie={};
    var all=document.cookie;
    if (all==='') return cookie;
    var list=all.split('; ');
    for (var i = 0; i < list.length; i++) {
        var p=list[i].indexOf('=');
        var name=decodeURIComponent(list[i].substring(0,p));
        var value=decodeURIComponent(list[i].substring(p+1));
        cookie[name]=value;
    }
    return cookie;
}

function removecookie(name,path,domain) {
    document.cookie=name+'='+'; path='+path+';domain='+domain+'; max-age=0';
}

function ajax(method,url,date,fun) {
    var xhr=null;
    try{
        xhr=new XMLHttpRequest();
    }catch(e){
        xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE6
    }

    if (method=='get' && date) {
        url+='?'+date;
    }
    xhr.open(method,url,true);
    if (method=='get') {
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange=function () {
        if (xhr.readyState==4) {
            if (xhr.status==200) {
                fun && fun(JSON.parse(xhr.requestText));
            }else{
                alert('出错了,Err：' + xhr.status);
            }
        }
    }
}

//快速排序
function quickSort(arr) {
    if(arr.length<=1){
        return arr;
    }
    var al=arr.length;
    var num=arr.splice(Math.floor(al/2),1);
    var left=[];
    var right=[];
    for (var i = 0; i < al; i++) {
        if (arr[i]<num) {
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([num],quickSort(right));
}

//深拷贝
// 方法一：JSON.parse(JSON.stringify(obj))
function deepClone(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newobj={};
    for(var attr in obj) {
        newobj[attr]=deepClone(obj[attr]);
    }
    return newobj;
}
