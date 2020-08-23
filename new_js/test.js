$(document).ready(function(e) {
	mobToggle ();
	if($(window).width() >= 1024){

	}
	
	/* 硫붿씤�붾㈃ �명듃濡� 異붽��� 二쇱꽍 �쒓굅 -- 2019.11.25
	if($('#wrap_container').hasClass('main')){
		$('#intro').css('display','block');
		introLayerstart();
	}
	*/
	
	$(".tab_device_ti").click(function(){
		$(this).toggleClass("ov");
		$(".tab_device .tab_menu").slideToggle(400);	
		return false;	
	});

	$(".ellipsis").each(function(){
		if($(window).width() >= 1281){
			var length = 245; //�쒖떆�� 湲��먯닔 �뺥븯湲�
		} 
		else if($(window).width() >= 1025){var length = 180;} 
		else if($(window).width() >= 1000){var length = 160;} 
		else if($(window).width() >= 768){var length = 150;} 
		else if($(window).width() >= 640){var length = 130;}
		else if($(window).width() >= 480){var length = 100;}
		else if($(window).width() >= 414){var length = 80;}
		else if($(window).width() >= 320){var length = 60;}

		$(this).each(function(){
			if( $(this).text().length >= length ){
				$(this).text( $(this).text().substr(0,length)+'...'); 
				//吏��뺥븷 湲��먯닔 �댄썑 �쒖떆�� �띿뒪��
			}
		});
	});

	if($(window).width()<481){	
		$('.zoom_img').on('click', function(){
			simpleLightbox($(this).attr('src'));
		});
	}
});

function simpleLightbox(imageUrl, bgColor, maxWidth){
    if(typeof bgColor === 'undefined'){
        bgColor = '#000';
    }
    if(typeof maxWidth === 'undefined'){
        maxWidth = '1100px';
    }
    window.open('', 'simpleLightbox').document.write('<html><head><meta charset="utf-8"><meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, width=device-width" /></head><body style="margin:0;background-color:'+bgColor+';height:100%;" onclick="javascript:window.close(\'simpleLightbox\');"><table border="0" width="100%" height="100%"><tr><td valign="middle" align="center"><img style="position:relative;z-index:2;width:100%;max-width:'+maxWidth+';" src="'+imageUrl+'"/></td></tr></table></body></html>');
}


// �곷떒 hot keyword
jQuery(function($)
{
    var ticker = function()
    {
        timer = setTimeout(function(){
            $('.keyword_roll li:first').animate( {marginTop: '-20px'}, 400, function()
            {
                $(this).detach().appendTo('.keyword_roll ul').removeAttr('style');
            });
            ticker();
        }, 3000);
      };
	ticker();

	var move_focus_area = $('.keyword_roll');

	$('.keyword_roll').on('mouseenter', function(){
		$('.keyword_lst').show();		
	});

	$('.keyword_lst').on('mouseleave blur' , function(){
		$('.keyword_lst').hide();
	});

	$('.wrap_hotkeyword .focus_move').on('keyup focus', function(){
		$(".prev").on('keyup focus', function(e){
			var v_keyCode = event.keyCode || event.which; 
			if(v_keyCode == 9){ 
				if(event.shiftKey){ 
					// Shift + Tab �대깽�� 
					$('.keyword_lst').hide();
					$('.search_top a').focus();
				} else {
					// Tab �대깽�� 
					$('.keyword_lst').show();
					$('.keyword_lst li:first a').focus();
				}
			}
		});

		$(".next").on('keyup focus', function(e){
			var v_keyCode = event.keyCode || event.which; 
			if(v_keyCode == 9){ 
				if(event.shiftKey){ 
					// Shift + Tab �대깽�� 
					$('.keyword_lst li:last a').focus();
					$('.keyword_lst').show();
				} else {
					// Tab �대깽�� 
					$('.keyword_lst').hide();
					$('#util li:first a').focus();
				}
			}
		});
	});
});

// scroll  - gnb �곷떒怨좎젙
$(window).scroll( function(){
	if($(window).width() >= 960){
		if ($(window).scrollTop() > 20){
			$("#mTop").fadeIn();
		} else {
			$("#mTop").fadeOut();
		}
		var sHeight = $(window).scrollTop();
		if (sHeight > 120){
			$("nav,.btnAllMn").addClass("fixed");
		} else {
			$("nav,.btnAllMn").removeClass("fixed");
		}
	}
});

//GNB
$(window).on('load resize', function(){	
	var gnb_a = $('.gnb');
	var gnb = $('.gnb li a');
	var depth2_box = $('.gnb .depth2_box');
	var depth2 = $('.gnb .depth2');
	var depth3 = $('.gnb .depth3');

	if (depth2.find('ul').length){ 
		depth2.find('ul').prev('a').addClass('has_sub');
	} 

	// for Tab, Mobile
	if($(window).width() <= 980){
		$('nav,.btnAllMn').removeClass('fixed');
		$('.wrap_menu').hide();
		var cntW = $('.wrap_menu .wrap_area').width();

		$('#header .btnToggleMn').on('click', 'a', function(){
			var m_ckHei = $(window).height()-$("#header").height()-5;
			$("#wrap").css({"height":m_ckHei+"px"});
			$('html').addClass('noScroll');
			$('.wrap_menu').show();
			$(this).addClass('btnClose');
			$('.wrap_menu .wrap_area').show().css('left' , -cntW).stop().animate({'left': 0}, 250 ,"easeInOutExpo");
		});

		$('.wrap_menu').on('click', function(e) {
			$("#wrap").css({"height":"auto"});	
			var target = $(e.target);
			if( ! target.closest('.wrap_menu .wrap_area').length){	
		 		$('html').removeClass('noScroll');
		 		$('.wrap_menu .wrap_area').stop().animate({'left': -cntW}, 250 ,"easeInOutExpo");
		 		$('.wrap_menu').fadeOut(800);
	 		}
		});
		
		// snb menu
		gnb.off('mouseenter focus');

		gnb.click(function(){
			gnb.removeClass('on');
			depth2.hide();

			$(this).addClass('on');
			$(this).next('.depth2_box').slideDown('fast');

			if($(this).next().length != '0'){

				$('.wrap_area').animate({scrollTop: $(this).offset().top},100);
				depth3.hide();	

				$(this).parent().css("display","block");
				
				//3depth��
				$(this).parent().parent().css("display","block");
				$(this).next("ul").show().css("display","block");
				
				return false;
			}else{
				return true;
			}			
		});

		$('.wrap_menu').on('click', function(e) {
			$("#wrap").css({"height":"auto"});	
			var target = $(e.target);
			if( ! target.closest('.wrap_menu .wrap_area').length){	
		 		$('html').removeClass('noScroll');
		 		$('.wrap_menu .wrap_area').stop().animate({'left': -cntW}, 250 ,"easeInOutExpo");
		 		$('.wrap_menu').fadeOut(800);
	 		}
		});
	}

	// for PC
	else{
		var snb = $('.gnb .depth2 li a');
		$('.wrap_menu').show();

		gnb.on('mouseenter focus' , function(){
			var i = $(this).parent('li').index() + 1;
			gnb.parent().removeClass('active');
			$(this).parent().addClass('active');
			$(this).next(depth2_box).show();
		});

		gnb.click(function(){
			return true;
		});

		$('#gnb').on('mouseleave blur', function(){
			gnb.parent().removeClass('active');
			depth2_box.hide();
		});		

		snb.on('mouseenter focus' , function(){
			$(this).parents('.depth2').addClass('on');
			gnb.parent().removeClass('active');
			$(this).parents('.depth2').parents('li').addClass('active');
		});

		//tab move - open 2depth menu hide
		snb.last().on('blur', function(){
			gnb.parent().removeClass('active');
			depth2_box.hide();
		});

		gnb_a.find('> ul > li > a:first').on('keydown', function(e){
			var v_keyCode = event.keyCode || event.which; 
			if(v_keyCode == 9){ 
				if(event.shiftKey){ 
					gnb.parent().removeClass('active');
					depth2_box.hide();						
				} 
			}
		});
	}
});

//LNB
$(function(){
	//lnb
	//$(".lnb ul:not(:first)").css("display","none");
	$(".lnb ul").prev().addClass('sub_depth');

	//$(".lnb > li:first").addClass("active");
	$(".lnb > li").on("click focus touchstart", function(){
		if($("ul",this).css("display") == "none"){
			$(".lnb ul").slideUp(150);
			$("ul",this).slideDown(150);
			$(".lnb > li").removeClass("active");
			$(this).addClass("active");
		} else {
			$("ul",this).slideUp(150);
			$(this).removeClass("active");
		};
	});
});

// 紐⑤컮�� viewport 675誘몃쭔 tab 泥섎━嫄�(select 泥섎━)
var delta = 300;
var timerResize = null;

var cacheWidth = $(window).width();
$(window).resize(function(){
	var newWidth = $(window).width();
	if(newWidth !== cacheWidth){
	//do
		clearTimeout(timerResize);
		timerResize = setTimeout(resizeDone, delta);
		function resizeDone(){
			mobToggle ();
			clearTimeout(timerResize);
	 		//location.reload();
		}
	}
});

function mobToggle (){
	if($(window).width()<668){
		if($(".tab_device_ti").is(":hidden")){
			// $(".tab_device .tab_menu").show();	
			$(".tab_device .tab_menu").hide();
		} else {
			$(".tab_device_ti").removeClass("ov");
			$(".tab_device .tab_menu").hide();
		}

		var tebChkYn = $(".tab_device ul.tab_menu li.on a").text();

		if(tebChkYn==''){
			$(".tab_device_ti").text($(".tab_device ul.tab_menu li:eq(1)").text());
		}else{
			$(".tab_device a:eq(0)").text(tebChkYn);
		}

		var tabText = $(".tab_device ul.tab_menu li a");
		tabText.click(function(){
			$(".tab_device .tab_menu").slideUp();
		});

	}else{
		$(".tab_device .tab_menu").show();
	}
}

//Tab Menu
function showTab(obj, other){
	var target = $(obj).attr("href");
	$(target).show().siblings(other).hide();
	$(obj).parent().siblings("li").removeClass("on");
	$(obj).parent().addClass("on");
}

//Tab Menu2
function showTab2(obj, other){
	var target = $(obj).attr("href");
	var dep2_txt = $(target).find('button');
	var dep2_menu = dep2_txt.next('ul');
	var cont_div = dep2_menu.next('div');

	$(target).show().siblings(other).hide();
	$(obj).parent().siblings("li").removeClass("on");
	$(obj).parent().addClass("on");

	dep2_txt.text(dep2_menu.find("li:eq(0)").text());
	dep2_menu.hide();
	cont_div.hide().first().show();
}

//select design
$(function(){
	//select design
	var selectTarget = $('.selectbox select');
	selectTarget.change(function(){
		var select_name = 
		 $(this).children('option:selected').text();
		 $(this).siblings('label').text(select_name);
	});

	//input=file design
	var fileTarget = $('.area_filebox .upload_hidden');
	fileTarget.on('change', function(){ //媛믪씠 蹂�寃쎈릺硫�
		if(window.FileReader){ //modern browser
			var filename = $(this)[0].files[0].name;
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		//異붿텧�� �뚯씪紐� �쎌엯
		$(this).siblings('.upload_name').val(filename);
	});
});

	//tabMenu 2depth style
	$(function(){
		var trigger = $('.tab_menu_2depth_ti');
		var list = $('.tab_menu_2depth');

		trigger.click(function() {
			$(this).addClass('active');
			$(this).next('ul').slideToggle(200);
		});

		list.click(function() {
			var tabClick = $(this).find(" > li.on a").text();
			trigger.click().text(tabClick).removeClass('active');
		});
	})

// �섎떒 留곹겕
$(function(){
    var obj = $(".org_site");
    var btn = $(".org_site>li>a");
    var box_btn = $(".link_box>ul>li>a");
    var box_btn_close = $(".link_box>ul+a");

    $(".link_box").hide();

	$(document).mouseup(function(e){
		if(obj.has(e.target).length===0)
		obj.removeClass('on');
		btn.removeClass('on');
		$(".link_box").hide();
	});


    btn.on("click",function(){
		obj.removeClass('on');
		btn.removeClass('on');
        if($(this).siblings(".link_box").is(":hidden")){
            $(".link_box").hide();
			$(this).addClass('on');
			$(this).parent().parent().addClass('on');
            $(this).siblings(".link_box").show();
        }else{
			$(this).removeClass('on');
			$(this).parent().parent().removeClass('on');
            $(".link_box").hide();
        }
        return false;
    });

	box_btn_close.on("click", function(){
		obj.removeClass('on');
		btn.removeClass('on');
		$(".link_box").hide();
	})
})

// label �뺣낫
$(function(){
	var info_box = $('.focus_tit').next('input,textarea');
	$('.focus_tit').css({'position':'absolute','z-index':'1','display':'block'});
	info_box
		.focus(function(){
			$(this).prev('.focus_tit').css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).prev('.focus_tit').css('visibility','visible');
			} else {
				$(this).prev('.focus_tit').css('visibility','hidden');
			}
		})
		.change(function(){
			if($(this).val() == ''){
				$(this).prev('.focus_tit').css('visibility','visible');
			} else {
				$(this).prev('.focus_tit').css('visibility','hidden');
			}
		})
		.blur();	
});

// content sns
$(function() {
	// sns怨듭쑀
	$('.page_share .share_sns').click(function(){
		$(this).toggleClass('on');
		$(this).next('.share_box').toggleClass('open');
		return false;
	});
	$('.menu_use .share_box .box_close').click(function(){
		$(this).parent('.share_box').removeClass('open');
		return false;
	});
});

// modal Layer Popup
function showLayer(self,obj){
	var $self = $(self);
	var $target = $($self.attr('href'));
	var _pWidth = $target.width()/2;
	var _pHeight = $target.height()/2;
	$('.modal_bg').show();

	scrollNone();

	$target.attr('tabindex', '0').show().focus();
	$(obj).css({"margin-top":"-"+ _pHeight +"px","margin-left":"-"+ _pWidth +"px"})
	$(obj).find(".modal_close").click(function(){
		hideLayer();
	});


	//�ㅻ낫�� �ъ빱�� modal popup �곸뿭�댁쁺
	var 
		firstElement = $target.find("div[tabindex='0'],a,input:not([disabled='disabled']),select,button,textarea").filter(':first'),
		lastElement = $target.find("div[tabindex='0'],a,input:not([disabled='disabled']),select,button,textarea").filter(':last');
		firstElement.off("keydown").on("keydown",function(b){
			if(b.keyCode == 9 && b.shiftKey){
				b.preventDefault();
				lastElement.focus();
			}
		});

	lastElement.off("keydown").on("keydown",function(b){
		if(b.keyCode == 9 && b.shiftKey){
		} else if (b.keyCode == 9){
			b.preventDefault();
			firstElement.focus();
		}
	});

	function hideLayer(){
		$(obj).hide();
		$(obj).removeAttr('tabindex');
		$('.modal_bg').hide().css({'top':'0','height':'100%'});
		scrollBlock();
		$self.focus();
		$(this).off('click');
	}
}

function enableLayerBtn(obj) {
	$(".modal_close").click(function(){
		hideLayer(obj);
		$(this).off('click');
	});
}

// modal pop - body scroll
function scrollNone(){
	var windowHeight = $(window).height();
	if(windowHeight > $("#wrap").height()){
		$("body").css({"height":windowHeight +"px","overflow":"hidden"});
	} else {
		$("body").css({"height":windowHeight +"px","overflow":"hidden"});
	}
}

function scrollBlock(){
	$("body").css({"height":"auto","overflow":"auto"});
}

// 紐⑤컮�� 寃���
$(function(){
    var search = $(".search_top");
    var search_div = search.find("fieldset div");
    var search_input = search.find("input[type=text]");
    var search_view = search.find(".search_btn");
    search_view.click(function() {
        var e = $(window).width();
        if (e < 1024) {
            search.toggleClass("on");
            search_input.focus();
			search_view.text('寃��됱쁺��떕湲�');
        } else {
            search.removeClass("on")
			search_view.text('寃��됱쁺��뿴湲�');
        }
    });
    $(window).resize(function() {
        var e = $(window).width();
        if (e > 768) {
            search.removeClass("on")
			search_view.text('寃��됱쁺��뿴湲�');
        }
    });
});

//intro
var intro;

function introLayerstart(){
	if($(window).width() >= 980){
		scrollNone();
	}
	intro = setTimeout(function(){intro_close();}, 5000);
}

function introLayerstop(){clearTimeout(intro);}

$(function(){
	$(".btn_intro a").click(function(){
		if($(window).width() >= 980){
			$('#intro').show();
			$("#intro").animate({width: '100%'}, 'slow');
		}
		else if($(window).width() >= 320 && $(window).width() < 980){
			$('#intro').show().css('width','100%');
			$("#intro").animate({height: '247px'}, 'slow');
			$("#intro").addClass('pop');
		}
		$(".intro_cont,.intro_bg").fadeIn('fast');
	});

	$(".btn_intro_close,.intro_bg").click(function(){
		intro_close()
	});
});

function intro_close(){
	if($(window).width() >= 980){
		$('#intro').animate({ width: '0'}, 1000, function(){
			$('#intro').hide();
			$('.intro_cont').hide();
		});
		scrollBlock();
	}
	else if($(window).width() >= 320 && $(window).width() < 980){
		$('#intro').animate({ height: '0'}, 1000, function(){
			$('#intro').hide();
			$('.intro_cont').hide();
		});
	}	
}

//rss popup size
function rssPopup(url,name){
	var url = url;
	var name = name;

	var x = $( window ).width();

	if(x > 900) {
		x = 837
	}

	var option = "width = "+ x +", height = 500, top = 100, left = 200, location = no"
	window.open(url, name, option);
}