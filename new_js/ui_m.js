$(function(){	
	$.fn.extend({
		//fn_datepicker
		fn_datepicker : function(options){
			var defaults = {};
			var opts = $.extend(defaults, options);

			return this.each(function(){
				var $this = $(this),
					btnImg = $this.attr("data-button"),
					range = $this.attr("data-range"),
					from = $this.attr("data-from"),
					to = $this.attr("data-to"),
					minDate, maxDate, $elm, optDate,
					enableDates = opts.enableDates,
					onSelect = opts.onSelect;

				var dateOptions = {
					showOtherMonths:true,
					selectOtherMonths:true,
					dateFormat:'yy.mm.dd'
				}

				if(range !== undefined && $.trim(range) != ""){
					var arrRange = range.split(",")
					dateOptions.minDate =$.trim(arrRange[0]);
					dateOptions.maxDate =$.trim(arrRange[1]);
				}

				if(btnImg === undefined || !btnImg){
					dateOptions.showOn = "both";
				}

				if(to !== undefined && $.trim(to) != ""){
					$elm = $(to);
					optDate = "minDate";
				}

				if(from !== undefined && $.trim(from) != ""){
					$elm = $(from);
					optDate = "maxDate";
				}

				if($elm !== undefined){
					dateOptions.onClose = function(selectedDate){
						$elm.datepicker("option", optDate, selectedDate);
					}
				}

				if(enableDates !== undefined){
					dateOptions.beforeShowDay = function(d){
						var dmy = d.getMonth() + 1;
						if(d.getMonth() < 9) dmy = "0" + dmy;
						dmy += "-";

						if(d.getDate()<10) dmy += "0";
						dmy = d.getFullYear() + "-" + dmy + d.getDate();

						if($.inArray(dmy, enableDates) != -1){
							return [true, "ui-datepicker-current-day"];
						}else{
							return [false, ""];
						}
					}
				}

				if(onSelect !== undefined){
					dateOptions.onSelect = onSelect;
				}

				$.datepicker.regional['ko']={
					closeText:'닫기',
					prevText:'이전달',
					nextText:'다음달',
					currentText:'오늘',
					monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					dayNames:['일','월','화','수','목','금','토'],
					dayNamesShort:['일','월','화','수','목','금','토'],
					dayNamesMin:['일','월','화','수','목','금','토'],
					weekHeader:'Wk',
					dateFormat:'yy.mm.dd',
					firstDay:0,
					isRTL:false,
					showMonthAfterYear:true,
					yearSuffix:'년'
				}

				$.datepicker.setDefaults($.datepicker.regional['ko']);
				$this.datepicker(dateOptions);
			});
		},
	});
	$('.js_datepicker').fn_datepicker(); //date picker

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

	// qna 
	var qnaList = $('.qnaArea > ul > li')
	$(qnaList).each(function(qna){
		$(this).on('click',function(){	
			$(this).attr('aria-selected',true).siblings().attr('aria-selected',false)
			$(this).attr('title','선택됨').siblings().attr('title','');
			if ( $(this).hasClass('on') )
			{
				$(qnaList).removeClass('on');
				$(qnaList).find('.qnaA').slideUp(200);
			} else {
				$(qnaList).removeClass('on');
				$(qnaList).find('.qnaA').slideUp(200);
				$(this).addClass('on');
				$(this).find('.qnaA').slideDown(200);
			}
		});

		$(this).on('keydown',function(e){	
			if (e.keyCode == 13) { // enter key
				$(this).attr('aria-selected',true).siblings().attr('aria-selected',false)
				$(this).attr('title','선택됨').siblings().attr('title','');
				if ( $(this).hasClass('on') )
				{
					$(qnaList).removeClass('on');
					$(qnaList).find('.qnaA').slideUp(200);
				} else {
					$(qnaList).removeClass('on');
					$(qnaList).find('.qnaA').slideUp(200);
					$(this).addClass('on');
					$(this).find('.qnaA').slideDown(200);
				}
			}	
		});
	});

	//탭 메뉴
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

			$(this).on('keydown', function(e){
				if (e.keyCode == 13) { // enter key	
					$(this).attr('aria-selected',true).siblings().attr('aria-selected',false);
					$(this).attr('title','선택됨').siblings().attr('title','');
					if ( !$(this).hasClass('on') )
					{					
						$(this).addClass('on').siblings().removeClass('on');

						$('.tabContents').children('.tabCont').removeClass('on');
						$('.tabContents').children('.tabCont').eq(idx).addClass('on');
					}
				}	
			});

		});
	});	

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

	$('.openMenu_2' ).hide();
	$('.zone').on('click', function () {
	//버튼 색 제거,추가
	$('.zone').removeClass('on');
	$(this).addClass('on');

	//컨텐츠 제거 후 인덱스에 맞는 컨텐츠 노출
	var idx = $('.zone').index(this);

	$('.zoneBox').hide();
	$('.zoneBox').eq(idx).show();
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
		//	$('.overlay').css({opacity:0.8});
		//	$('.overlay').css({display:'block'});
			$('.totalMenuWrap').css({display:'block'}).animate({right : 0}, 400); 
		//	TweenMax.to('.overlay',0.5,{opacity:0.8});
		//	TweenMax.to('#gnb', 0.5, {left:'0'});
			$('body').addClass('noScroll');	
		});
	},

	close : function() {
		$('.closeTotalMenu').on('click',function() {
			//TweenMax.to('.totalMenuWrap', 0.5,{right:'100%',onComplete:function() {
			//	$('.totalMenuWrap').css({display:'none'}); 
			//}});	
			$('.totalMenuWrap').css({display:'block'}).animate({right : '-100%'}, 400); 
//			TweenMax.to('.overlay',0.5,{opacity:0,onComplete:function() {
//				$('.overlay').css({display:'none'});
//			}});	
			$('body').removeClass('noScroll');
		});
	},
	
	nav : function() { 
		var $depth1 = $('.navDepthArea01');
		var $depthList = $('.navDepthArea01 > li');

		$depthList.each(function(){
			$(this).on('click', function(){	

				var navPosTop = $depthList.offset().top; 
				var $depth1 = $depth1.scrollTop()
				idx = $depthList.index(this);	
				$depthList.children('a').removeClass('on');
				$depthList.children('a').eq(idx).addClass('on');
				$depth1.animate({
					scrollTop: navPosTop
			   	}, 1000);
				console.log(navPosTop)
				console.log(scrollTop1)
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
		if ( swiperCnt > 1)
		{
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
		} else {
		//	$('.mainSwiper').find('.event-button-next').hide();
		//	$('.mainSwiper').find('.event-button-prev').hide();
		}
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

//window.addEventListener('resize', function() {
//	header.resizing();
//});