//获取字符串中重复次数最多的字符和其个数
function findMaxRepeat(str) {
	var arr=str.split('');
	var str=arr.sort().join('');
	var re=/(\w)\1+/g;
	var num=0,value='';
	str.replace(re,function (a,b) {
		if (num<a.length) {
			num=a.length;
			value=b;
		}
	})
	return [value,num];
}


Array.prototype.push = function() {
	for (var i = 0; i < arguments.length; i++) {
		this[this.length]=arguments[i];
	}
	return this.length;
}
Array.prototype.unshift = function() {
	var arr=[];
	for (var i = 0; i < this.length; i++) {
		arr[i]=this[i];
		this[arguments.length+i]=arr[i];
	}
	for (var j = 0; j < arguments.length; j++) {
		this[j]=arguments[j];
	}
	return this.length;
}
Array.prototype.pop = function() {
	var a=this[this.length-1];
	this.length--;
	return a;
}
Array.prototype.shift = function() {
	var a=this[0];
	for (var i = 0; i < this.length; i++) {
		this[i]=this[i+1];
	}
	this.length--;
	return a;
}
Array.prototype.splice = function() {
	
}