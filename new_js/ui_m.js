$(function(){	
	$.fn.extend({	
		// calendar 			
		fn_datepicker:function(){
			$(".dateSelect input").datepicker({
				dateFormat: 'yymmdd'
			});
			$( ".dateSelect .ui-datepicker-trigger").prop('src','../new_images/common/inoCalendar.png')	
		},
		// 헤더 고정	
		fn_headFixed:function(){
			$(window).on('scroll',function(){//mouse wheel
				var wdT = $(window).scrollTop();
				if(wdT >= 230){
					$('#headerWrap').addClass('fixed')
					$('#tnb').addClass('fixed')
					$('#gnb').addClass('fixed')
				}else{
					$('#headerWrap').removeClass('fixed')
					$('#tnb').removeClass('fixed')
					$('#gnb').removeClass('fixed')
				}
			})
		},
		// qna 
		/*fn_qna:function(){
			var qnaList = $('.qnaArea > ul > li').find('.qnaQ')
			$(qnaList).each(function(qna){
				$(this).on('click',function(){	
					$(this).parent().attr('aria-selected',true).siblings().attr('aria-selected',false)
					$(this).parent().attr('title','선택됨').siblings().attr('title','');
					if ( $(this).parent().hasClass('on') )
					{
						$(qnaList).parent().removeClass('on');
						$(qnaList).parent().find('.qnaA').slideUp(200);
					} else {
						$(qnaList).parent().removeClass('on');
						$(qnaList).parent().find('.qnaA').slideUp(200);
						$(this).parent().addClass('on');
						$(this).parent().find('.qnaA').slideDown(200);
					}
				});
			});
		},*/
		fn_qna:function(){
			$(".qnaQ").append("<button type='button' class='arrowBtn'></button>");
			var qnaList = $('.qnaArea > ul > li .qnaQ')
			var toggleBtn = qnaList.find('.arrowBtn')			

			//$(qnaList).each(function(qna){
				$(toggleBtn).on('click',function(){	
					if ( $(this).parent().parent().hasClass('on') )
					{
						$(qnaList).parent().removeClass('on');
						$(qnaList).parent().find('.qnaA').slideUp(200);
						$(this).parent().parent().attr({'aria-selected':false,'title':''})
					} else {
						$(qnaList).parent().removeClass('on');
						$(qnaList).parent().find('.qnaA').slideUp(200);
						$(this).parent().parent().addClass('on');
						$(this).parent().parent().find('.qnaA').slideDown(200);
						$(this).parent().parent().attr({'aria-selected':true,'title':'선택됨'})
						$(this).parent().parent().siblings().attr({'aria-selected':false,'title':''})
					}
				});
		//	});
		},
		// tab
		fn_tab:function(){
			$('.tabInterface').each(function(tab){
				$(this).find('.tabList').children('li').each(function(idx){
					$(this).on('click',function(){	
						$(this).attr('aria-selected',true).siblings().attr('aria-selected',false);
						$(this).attr('title','선택됨').siblings().attr('title','');
						if ( !$(this).hasClass('on') )
						{					
							$(this).addClass('on').siblings().removeClass('on');
		
							$('.tabContents').children('.tabCont').removeClass('on');
							$('.tabContents').children('.tabCont').eq(idx).addClass('on');
						}
					});
				});
			});		
		}	
	});

	$(".dateSelect input").fn_datepicker(); //calendar
	$("#headerWrap").fn_headFixed(); //head Fixed
	$(".qnaArea").fn_qna(); //qna
	$(".tabInterface").fn_tab(); //tab

	uiForm();
	function uiForm(){	

		//라디오버튼
		var radioForm = 'input[type=radio]';
		$(radioForm).each(function () {
			if ($(this).prop('checked') == true) {
				var labelFor = $(this).attr('id');
				$('[for="'+labelFor+'"]').addClass('on');
			}
			if($(this).prop('disabled') == true){
				$(this).parent().addClass('disabled');
			}
		});
	
		$(document).on('click', radioForm, function () {
			var labelFor = $(this).attr('id');
			var n = $(this).attr('name');
			$('[name="' + n + '"]').parent().removeClass('on');
			$('[for="'+labelFor+'"]').addClass('on');
		});
	
		//체크박스 (서비스)
		var checkboxForm = 'input[type=checkbox]';
		$(checkboxForm).each(function () {
			$(this).on('click', function() {
				if ($(this).prop('checked') == true) {
					var labelFor = $(this).attr('id');
					$('[for="'+labelFor+'"]').addClass('on');
				}else{
					$(this).siblings('label').removeClass('on');
				}
			});
	
			//키보드 접근성 추가
			$(this).on('keydown', function(e) {			
				if (e.keyCode == 32) { // space key
					if ($(this).prop('checked') == true) {
						var labelFor = $(this).attr('id');
						$('[for="'+labelFor+'"]').removeClass('on');					
					}else{
						$(this).siblings('label').addClass('on');
					}
				}				
			});
		});	
	
		//textarea_자동 높이 조절
		$("textarea.autosize").on('keydown keyup', function () {
			$(this).height(1).height( $(this).prop('scrollHeight') );	
		});
	}
	

	//로그인 라디오버튼
	$("#radioMemberType input[type='radio']").change(function(){
		if($('#radioMemberType01').is(':checked')){
			$('#memberType01').css('display','block');
			$('#memberType02').css('display','none');
			$('#memberType03').css('display','none');
		}
		else if($('#radioMemberType02').is(':checked')){
			$('#memberType01').css('display','none');
			$('#memberType02').css('display','block');
			$('#memberType03').css('display','none');
		}
		else if($('#radioMemberType03').is(':checked')){
			$('#memberType01').css('display','none');
			$('#memberType02').css('display','none');
			$('#memberType03').css('display','block');
		}	
	});

	$("#radioDeputy input[type='radio']").change(function(){
		if($('#radioDeputy01').is(':checked')){
			$('#deputy01').css('display','block');
			$('#deputy02').css('display','none');
		}
		else if($('#radioDeputy02').is(':checked')){
			$('#deputy01').css('display','none');
			$('#deputy02').css('display','block');
		}
	});
	/* 기관칮기 : 기존 기관찾기 사용
	$('.openMenu_2' ).hide();
	$('.zone').on('click', function () {
	//버튼 색 제거,추가
	$('.zone').removeClass('on');
	$(this).addClass('on');

	//컨텐츠 제거 후 인덱스에 맞는 컨텐츠 노출
	var idx = $('.zone').index(this);

	$('.zoneBox').hide();
	$('.zoneBox').eq(idx).show();
	});*/
	
	$(function(){
		// 팝업 호출
		$('.popactive').click(function(){
			var data = $(this).data('popactive');
			$('body').css('position','fixed');
			$('body').css('height','100%');
			$('.layerfullWrap').css('display','none');
			$('[data-fullpop="'+ data +'"]').css('display','block');
		});
	
		// 팝업 닫기
		$('.layerCloseBtn').click(function(){
			$('body').removeAttr('style');
			$(this).closest('.layerfullWrap').css('display','none');
		});

		// 개별 슬라이드
		$('.dataSlide').on('click', function(){
			var data = $(this).data('slide');
			if ( $('[data-slideEle="'+ data +'"]').css('display') == 'block' )
			{
				$(this).addClass('on');
				
				$('[data-slideEle="'+ data +'"]').stop().slideUp(500);
			} else {
				$(this).removeClass('on');
				$('[data-slideEle="'+ data +'"]').stop().slideDown(500);
			}
		});

	});
});

/* ==============================
	* 네비게이션
* ============================== */
var uiNavigation = {
	idx : 0,
	len : 0,
	init : function(){
		this.close(); // 전체메뉴 닫기
		this.menu(); // 전체메뉴
		this.nav(); // gnb메뉴
	//	this.goTop(); // top버튼 클릭시 페이지 상단으로 이동

	},

	menu : function() {
		$('.totalMenuBtn').on('click',function() {
			$('.totalMenuWrap').css({display:'block'}).animate({right : 0}, 400); 
			$('body').addClass('noScroll');	
		});
	},

	close : function() {
		$('.closeTotalMenu').on('click',function() {
			$('.totalMenuWrap').css({display:'block'}).animate({right : '-100%'}, 400); 
			$('body').removeClass('noScroll');
		});
	},
	
	nav : function() { 
		var $depth1 = $('.navDepthArea01');
		var $depthList = $('.navDepthArea01 > li');

		$depthList.each(function(){
			var posTop1 = $depthList.eq(0).children('.navDepthArea02').offset().top; 
			var posTop2 = $depthList.eq(1).children('.navDepthArea02').offset().top;
			var posTop3 = $depthList.eq(2).children('.navDepthArea02').offset().top;
			var posTop4 = $depthList.eq(3).children('.navDepthArea02').offset().top;

			$(this).on('click', function(){	
				idx = $depthList.index(this);					
				$depthList.children('a').removeClass('on');
				$depthList.children('a').eq(idx).addClass('on');
				if(idx==0){
					$('.navBody').animate({scrollTop : posTop1 - posTop1}, 400);
				}else if(idx==1){
					$('.navBody').animate({scrollTop : posTop2 - posTop1 - 85}, 400);	
				}else if(idx==2){
					$('.navBody').animate({scrollTop : posTop3 - posTop1 - 85}, 400);	
				}else if(idx==3){
					$('.navBody').animate({scrollTop : posTop4 - posTop1 - 85}, 400);	
				}
			});
		});	
	},

/* 	goTop : function() {
		$(document).on("click", '.btnGoTop', function(e){
			$(document).scrollTop(0);
			e.preventDefault();
		});
	}	 */
}; 

/* ==============================
	* slider  
* ============================== */
var uiSlider = {
	init : function(){
		this.topVisual(); //메인 탑 비주얼 (모바일)
		this.learningCard(); //국민내일배움카드
		this.notice(); //공지사항
		this.digitalTech(); //디지털 신기술 인재 양성 과정
		this.trainingCourse(); //정부부처훈련과정
		this.event(); //이벤트 배너		
	},

	topVisual : function() {
		var swiperCnt = $('#mainKeyVisual').find('.swiper-slide').length;
		if ( swiperCnt > 1){
			var swiper = new Swiper('#mainKeyVisual', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: '#mainKeyVisualPagination',
					clickable:true,
				},
				autoplay: {
					delay: 2500,
				},
				autoplayDisableOninteraction: true, //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
			});
		} else {}
	},

	learningCard : function() {
		var swiperCnt = $('#learningCard').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#learningCard', {
				slidesPerView: 4.5,
				spaceBetween: 10,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable:true,
				}
			});
		} else {}
	},

	notice : function() {
		var swiperCnt = $('.noticeArea').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('.noticeArea', {
				direction: 'vertical',
				slidesPerView: 1,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable:true,
				},
				autoplay: {
					delay: 2500,
				},
				autoplayDisableOninteraction: true, //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
			});
		} else { }
	},

	digitalTech : function() {
		var swiperCnt = $('#disitalTech').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#disitalTech', {
				slidesPerView: 1.9,
				spaceBetween: 35,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable:true,
				}  
			});
		} else {}
	},

	trainingCourse : function() {
		var swiperCnt = $('#trainingCourse').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#trainingCourse', {
				slidesPerView: 2.95,
				spaceBetween: 28,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable:true,
				}		
			});
		} else {}
	},
	event : function() {
		var swiperCnt = $('#eventArea').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#eventArea', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: '#eventPagination',
					clickable:true,
				},
				autoplay: {
					delay: 2500,
				},
				autoplayDisableOninteraction: true, //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
			});
		} else {}
	}		
}; 

/**************************************
* page load 
***************************************/
$(function($){
	uiNavigation.init();
	uiSlider.init();		
});