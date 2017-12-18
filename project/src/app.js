import $ from 'jquery';
import './style.css';

var flake= $('<div></div>').css({'position':'absolute','top':'-50px','color':'#fff'}).html('❄');
$(function () {
	var docHight=$(document).height(),docWidth=$(document).width();
	$("body").css({"overflow":"hidden"});
	setInterval(function () {
		var startLeft=Math.random()*docWidth,
			startOpacity=0.7+Math.random()*0.3,
			duration=3000+Math.random()*3600,
			size=20+Math.random()*30,
			endLeft=Math.random()*docWidth,
			endTop=docHight;
		flake.clone().appendTo("body").css({
			"left":startLeft,
			"opacity":startOpacity,
			"font-size":size
		}).animate({
			"top":endTop,
			"left":endLeft,
			"opacity":"0.5"
		},duration,function () {
			$(this).remove()
		})
	},200)
});
