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


	headFixed();
	uiForm();
	uiSlider.init();
	wrapWindowByMask();

	/* popup */
	function wrapWindowByMask(){
		var maskHeight = $(document).height();  
		var maskWidth = '100%';

		$('#mask').css({'width':maskWidth,'height':maskHeight});  

		$('#mask').fadeIn(1000);      
		$('#mask').fadeTo("slow",0.5);    

		$('.windowPop').show();
	}
	$('.openMask').click(function(e){
		e.preventDefault();
		wrapWindowByMask();
	});

	$('.windowPop .close').click(function (e) {  
		e.preventDefault();  
		$('#mask, .windowPop').hide();  
	});       

	$('#mask').click(function () {  
		$(this).hide();  
		$('.windowPop').hide();  
	});
	
	/* head fixed */
	function headFixed(){
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
	}

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

	$('.tabInterface').each(function(tab){
		$(this).find('.tabs').children('li').each(function(idx){
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
			console.log('1');
		}
		else if($('#radioDeputy02').is(':checked')){
			$('#deputy01').css('display','none');
			$('#deputy02').css('display','block');
			console.log('2');
		}
	});

	/* 메인 우수훈련과정 텝
	$('.topTrainingList .tabContents > ol').find('li').on('click',function() {
		$('.topTrainingList .tabContents > ol > li' ).removeClass('on');
		$(this).addClass('on');
		console.log('click');
	});*/

	// 담기 토글 버튼
	$('.like').on('click',function() {
		$(this).toggleClass('on');
		return false;
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

	// 직무검색 탭
	$('.dpTabAreaList').find('button').on('click', function(){
		idx = $(this).closest('li').index();
		//$(this).closest('.dpTabAreaList > li').removeClass('on').closest('li').addClass('on');
		$(this).closest('.dpTabAreaList').find('li').removeClass('on');
		$(this).closest('.condiSchArea').find('.dpTabCont').removeClass('on');
		$(this).closest('.condiSchArea').find('.dpTabCont').eq(idx).addClass('on');
		$(this).closest('li').addClass('on')
	})



	/*var idx2=$('#mainKeyVisualPagination .swiper-pagination-bullet-active').index();
				console.log(idx2);*/
});

/* ==============================
	* 메인 통합검색
* ============================== */

var mainSearch = {
	idx : 0,
	len : 0,

	init : function() {
		mainSearch.open();
	},
	
	open : function() {	
		var $searchBtn = $('.btnTotalSearchArea .btn');
		var $inputSearchBtn = $('.btnTotalSearchArea > li > input');
		var $tabSelect = $('.tabSelect .content .boxWrap');
		var $inputSearchKeyword = $('.searchArea .inputArea');
		mainSearch.len = $searchBtn.length;	
		
		$searchBtn.each(function(){
			$(this).on('click', function(){	
			idx = $searchBtn.index(this);	
				if($(this).hasClass('on')){							
					$(this).removeClass('on');
					$tabSelect.hide('fast');
				}else{				
					$searchBtn.removeClass('on');
					$searchBtn.eq(idx).addClass('on');
					$inputSearchBtn.css('display','none')
					$searchBtn.eq(idx).siblings().css('display','block')
					$tabSelect.hide('fast');
					$tabSelect.eq(idx).show('slow');
					$inputSearchKeyword.css('width','190px;')
				}
			});		
		});			
	}
};


/* ==============================
	* navigation 
* ============================== */

var navigation = {
	idx : 0,
	len : 0,

	init : function() {
		navigation.pc_menu();
	},
	
	pc_menu : function() {	
		var $gnb_top = $('#gnb > li > a');
		navigation.len = $('#gnb > li > a').length;	

		$gnb_top.on('mouseenter focus',function() {	
			for(var i = 0; i < navigation.len; i++){
				$("#gnb").find('.gnbSubArea > ul').hide();
				$gnb_top.eq(i).removeClass('on')
			}
			$(this).siblings().find('ul').show();
			$(this).addClass('on');

			$("#headerWrap").addClass('fixed');
			$("#gnb").addClass('fixed');
			$("#tnb").addClass('fixed');
			$(".gnbSubArea").stop().slideDown();
		//	$('body').addClass('noScroll');	
		});	

		$(".headArea").on('mouseleave blur',function() {	
			$("#headerWrap").removeClass('fixed');
			$("#tnb").removeClass('fixed');
			$("#gnb").removeClass('fixed');
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
			$gnb_top.removeClass('on')
			$(".gnbSubArea").stop().slideUp('fast');
		//	$('body').removeClass('noScroll');	
		});
		





	}
};

/* ==============================
	* slider  
* ============================== */
var uiSlider = {
	init : function(){
		this.keyVisual(); //메인 KEY비주얼 
		this.digitalTech(); //디지털 신기술 인재 양성 과정
		this.topTraining(); //우수훈련과정
		this.event(); //이벤트 배너		
		this.familySite(); //패밀리 사이트
	},

	keyVisual : function() {
		var swiperCnt = $('#mainKeyVisual').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#mainKeyVisual', {
				//direction: 'vertical',
				loop: true,
				autoplay: {
					delay: 3000,
				},
				autoplayDisableOninteraction: true, //모바일에서 터치하거나 클릭시 자동 슬라이드 정지
				paginationType: 'custom',
				pagination: {
					el: '#mainKeyVisualPagination.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						if(index==0){
							return '<span class="swiper-pagination-bullet" tabindex="0" role="button"><a href="/">메인 바로가기</a><span>메인</span></span>';
						}else if(index==1){
							return '<span class="swiper-pagination-bullet" tabindex="0" role="button"><a href="/">학생 바로가기</a><span>학생</span></span>';
						}else if(index==2){
							return '<span class="swiper-pagination-bullet" tabindex="0" role="button"><a href="/">구직자 바로가기</a><span>구직자</span></span>';
						}else if(index==3){
							return '<span class="swiper-pagination-bullet" tabindex="0" role="button"><a href="/">근로자 바로가기</a><span>근로자</span></span>';
						}else if(index==4){
							return '<span class="swiper-pagination-bullet" tabindex="0" role="button"><a href="/">중장년 바로가기</a><span>중장년</span></span>';
						}else if(index==5){
							return '<span class="swiper-pagination-bullet" tabindex="0" role="button"><a href="/">여성 바로가기</a><span>여성</span></span>';
						}
					},
				},
			});			
		} else {
			$('.mainSwiper').find('.event-button-next').hide();
			$('.mainSwiper').find('.event-button-prev').hide();
		}

	
		$('.mainKeyVisual .swiper-button-play').on('click',function() {
			if($(this).hasClass('pause')){
				swiper.autoplay.stop();	
			}else{
				swiper.autoplay.start();
			}
			return false;
		});
	},
	digitalTech : function() {
		var swiperCnt = $('#disitalTech').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#disitalTech', {
				slidesPerView: 3,
				spaceBetween: 20,
				loop: true,
				pagination: {
					el: '#disitalTechPagination',
					clickable:true,
				},
				//autoplay: {
				//	delay: 2500,
				//},
			});
		} else {
			$('.mainSwiper').find('.event-button-next').hide();
			$('.mainSwiper').find('.event-button-prev').hide();
		}
	},

	topTraining : function() {
		var swiperCnt = $('#topTraining').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#topTraining', {
				slidesPerView: 3,
				slidesPerColumn: 2,
				spaceBetween: 30,
				pagination: {
					el: '#topTrainingPagination',
					clickable: true,
				},
			});
		} else {
			$('.mainSwiper').find('.event-button-next').hide();
			$('.mainSwiper').find('.event-button-prev').hide();
		}
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
				keyboardControl: true,
				//autoplay: {
				//	delay: 2500,
				//},
			});
		} else {
			$('.mainSwiper').find('.event-button-next').hide();
			$('.mainSwiper').find('.event-button-prev').hide();
		}
	},
	familySite : function() {
		var swiperCnt = $('#footerLink').find('.swiper-slide').length;
		if ( swiperCnt > 1)
		{
			var swiper = new Swiper('#footerLink', {
				slidesPerView: 'auto',
				spaceBetween: 30,
				loop: true,
				/*pagination: {
					el: '.swiper-pagination',
					clickable:true,
				},
				autoplay: {
					delay: 2500,
				},*/			  
			});
		} else {
			$('.mainSwiper').find('.event-button-next').hide();
			$('.mainSwiper').find('.event-button-prev').hide();
		}
	}	
}; 
			
/**************************************
* page load 
***************************************/
$(function($){
	navigation.init();
	uiSlider.init();	
	mainSearch.init();
});

//window.addEventListener('resize', function() {
//	header.resizing();
//});

