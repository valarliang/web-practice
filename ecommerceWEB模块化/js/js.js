$(function () {
	//搜索框
	(function () {
		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var num=0;
		$('#menu li').click(function () {
			$('#menu li').attr('class','gradient');
			$(this).attr('class','active');
			num=$(this).index();
			$('#search .form .text').val(arrText[num]);
			// console.log($(this).index())
		})
		$('#search .form .text').focus(function () {
			if ($(this).val()==arrText[num] || $(this).val()=='例如：……') {
				$(this).val('');
			}
			$(this).blur(function () {
				if (!$(this).val()) {
					$(this).val(arrText[num]);
				}
			})
		})
	})();

	//update滑动效果
	(function () {
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];
		var str='';
		var num=0;
		var oul=$('.update ul');
		for (var i = 0; i < arrData.length; i++) {
			str+='<li><a href="javascript:;"><strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> '+arrData[i].title+'…</a></li>';
		}
		oul.html(str);
		$('.update #updateUpBtn').click(function () {
			clearInterval(oul.timer);
			move(1);
			autoplay();
		})
		$('.update #updateDownBtn').click(function () {
			clearInterval(oul.timer);
			move(-1);
			autoplay();
		})

		function autoplay() {
			oul.timer=setInterval(function () {
				move(-1);
			},3000);
		}
		autoplay();
		oul.hover(function () {
			clearInterval(oul.timer);
		},autoplay);

		var h=$('.update ul li').height();
		function move(step) {
			num+=step;
			if (num>0) {
				num=-arrData.length+1;
			}else if (num<-arrData.length+1) {
				num=0;
			}
			oul.stop().animate({top:h*num},2200,'elasticOut');
		}
	})();

	//option选项卡切换
	(function () {
		tab($('.tabNav1 li'),$('.tabCon1'),'click');
		tab($('.tabNav2 li'),$('.tabCon2'),'click');
		tab($('.tabNav3 li'),$('.tabCon3'),'mouseover');
		tab($('.tabNav4 li'),$('.tabCon4'),'mouseover');
		function tab(obj,corrobj,event) {
			corrobj.hide().eq(0).show();
			obj.on(event,function () {
				obj.removeClass('active').addClass('gradient');
				$(this).removeClass('gradient').addClass('active');
				obj.find('a').attr('class','triangle_down_gray');
				$(this).find('a').attr('class','triangle_down_red');
				corrobj.hide().eq($(this).index()).show();
			})
		}
	})();

	//日历活动说明
	(function () {
		$('.calendar .img').hover(function () {
			$('.today_info img').attr('src',$(this).attr('src'));
			$('.today_info p').html($(this).attr('info'));
			$('.today_info strong').html($('.calendar h3 span').eq($(this).parent().index()%7).html());
			$('.today_info').show().css({'top': $(this).parent().position().top-30,'left': $(this).parent().position().left+55});
		},function () {
			$('.today_info').hide();
		})
	})();

	//轮播图
	(function () {
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var num=0;
		function fufade (obj) {
			$('#fade ul li').each(function (i) {
				if (i!=obj.index()) {
					$(this).css('zIndex',1).fadeOut(1000);
					$('#fade ol li').eq(i).removeClass('active');
				}else{
					$(this).css('zIndex',2).fadeIn(1000);
					obj.addClass('active');
					$('#fade p').html(arr[obj.index()]);
				}
			})
		}
		function autoplay() {
			timer=setInterval(function () {
				num++;
				fufade($('#fade ol li').eq(num%arr.length))
			},2200)
		}
		fufade($('#fade ol li').eq(0));
		autoplay();
		$('#fade ol li').click(function () {
			fufade($(this));
		})
		$('#fade ul').hover(function () {
			clearInterval(timer);
		},autoplay);
	})();

	//红人烧客
	(function () {
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />区域：朝阳CBD<br />人气3',
			'用户4<br />区域：朝阳CBD<br />人气4',
			'用户5<br />区域：朝阳CBD<br />人气5',
			'用户6<br />区域：朝阳CBD<br />人气6',
			'用户7<br />区域：朝阳CBD<br />人气7',
			'用户8<br />区域：朝阳CBD<br />人气8',
			'用户9<br />区域：朝阳CBD<br />人气9',
			'用户10<br />区域：朝阳CBD<br />人气10'
		];
		$('.hot_area li').hover(function () {
			if (!$(this).index()) return;
			$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</p>');
		},function () {
			$('.hot_area li p').remove();
		})
	})();

	//BBS论坛
	(function () {
		$('.bbs ol li').mouseover(function () {
			$('.bbs ol li').removeAttr('class');
			$(this).addClass('active');
		})
	})();
})