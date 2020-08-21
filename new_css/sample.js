(function($){
	'use strict';

	if(typeof window.ui === 'undefined'){
		var ui = window.ui = {}
	}

	$.fn.imagesLoaded = function(){
		var $imgs = this.find('img[src!=""]'), dfds = [];

		if (!$imgs.length){
			return $.Deferred().resolve().promise();
		}

		$imgs.each(function(){
			var dfd = $.Deferred(), img = new Image();
			dfds.push(dfd);
			img.onload = function(){dfd.resolve();}
			img.onerror = function(){dfd.resolve();}
			img.src = this.src;
		});

		return $.when.apply($, dfds);
	}

	ui.init = (function(_){
		(function deviceCheck(md){
			/* check device */
			_.isDevice   = md.mobile();		/* smart device	: ui.isDevice */
			_.isMobile   = md.phone();		/* mobile		: ui.isMobile */
			_.isTablet   = md.tablet();		/* tablet		: ui.isTablet */
			_.isDesktop  = !md.mobile();	/* desktop		: ui.isDesktop */
		})(new MobileDetect(window.navigator.userAgent));

		(function setViewport(viewport){
			if(_.isDesktop){
				/* set desktop viewport */
				viewport.attr({'content':'width=1100, user-scalable=no'});
			}
			if(_.isTablet){
				/* set tablet viewport */
				viewport.attr({'content':'width=1100, user-scalable=no'});
			}
			if(_.isMobile){
				/* set mobile viewport */
				viewport.attr({'content':'width=750, user-scalable=no'});
			}
		})($('meta[name=viewport]'));

		var getElements = function(){
			_.$html			=	$('html');
			_.$body			=	$('body');
			_.$wrap			=	$('#wrap');
			_.$header		=	$('#header');
			_.$aside        =   $('#aside');
			_.$gnb			=	$('#gnb');
			_.$container	=	$('#container');
			_.$main			=	$('#main');
			_.$contents		=	$('#contents');
			_.$footer		=	$('#footer');
			_.$motion		=	$('.n-motion');
		}

		var getWindowSize = function(){
			_.winsizeW = $(window).outerWidth();
			_.winsizeH = $(window).outerHeight();
		}

		var getWindowScrl = function(){
			_.winscrlT = $(window).scrollTop();
			_.winscrlL = $(window).scrollLeft();
		}

		return {
			onLoad : function(){
				getElements();
				getWindowSize();
				getWindowScrl();

				_.loadmotion.init();
				//_.changeView();
				_.headerAction();
				_.btnTopMake();
				_.btnTop();
				_.btnTopAct();
				_.gnbOpacity();
				_.pageTabFixed();
			},
			onResize : function(){
				getWindowSize();
				_.pageTabFixed();
			},
			onScroll : function(){
				getWindowScrl();
				_.btnTop();
				_.gnbOpacity();
				//_.pageTabFixed();
			}
		}
	})(ui);

	ui.hasOwnProperty = function(org, src){
		for(var prop in src){
			if(!hasOwnProperty.call(src, prop)){
				continue;
			}
			if('object' === $.type(org[prop])){
				org[prop] = ($.isArray(org[prop]) ? src[prop].slice(0) : ui.hasOwnProperty(org[prop], src[prop]));
			}else{
				org[prop] = src[prop];
			}
		}

		return org;
	}

	ui.ajaxpopup = (function(_){
		var def = {
			defaults : {
				background : true,
				backClose : true,
				top : false,
				left : false,
				openCallback : function(data){},
				closeCallback : function(){},
				backLock : true
			},
			idx : 0,
			setInit : function(popup, settings){
				var defIdx = def.idx++;
				popup.opt = $.extend({}, def.defaults, settings);
				popup.$back = popup.opt.background ? _.$body.append('<div class="layer-back">').children('.layer-back:last-child') : _.$body.append('<div class="layer-back">').children('.layer-back:last-child').addClass('bg-none');
				popup.$wrap = popup.$back.append('<div class="layer-wrap">').children('.layer-wrap:last-child');
				popup.seq = defIdx;
				popup.resizeEvent = 'resize.ajaxpopup'+defIdx;
			},
			setPosition : function(popup){
				popup.$wrap.w = popup.$wrap.outerWidth();
				popup.$wrap.h = popup.$wrap.outerHeight();
				popup.$wrap.t = popup.$wrap.h > _.winsizeH * 0.8 ? _.winscrlT + _.winsizeH * 0.1 : _.winscrlT + (_.winsizeH - popup.$wrap.h) / 2;
				popup.$wrap.l = (_.winsizeW - popup.$wrap.w) / 2;

				if (popup.opt.backLock) {
					bodyScrollLock.disableBodyScroll(popup.$wrap);
				}
				return popup.$wrap;
			},
			setClose : function(popup){
				popup.$close = popup.$wrap.find('[layer="close"]');
				$('.layer-back:last-child').on('click', function(e){
					var targetThis = $(e.target)[0];
					e.stopPropagation();

					if (popup.opt.backClose && e.target.className.indexOf('layer-wrap') > -1) {
						popup.opt.closeCallback();
						popup.close(targetThis);
					}
				});
				popup.$close.on('click', function(e){
					var target = e.currentTarget;
					popup.opt.closeCallback();
					popup.close(target);
				});
			},
			popupClose : function(popup){
				popup.$back.remove();
				$(window).off(popup.resizeEvent);
			}
		}

		return {
			open : function(url, settings){
				var init = function(){
					var popup = this;

					def.setInit(popup, settings);

					$.ajax({
						url : url,
						timeout : 10000,
						dataType : 'html',
						success : function(data){
							popup.$wrap.append(data).imagesLoaded().then(function(){
								popup.opt.openCallback(popup.$wrap);
								def.setPosition(popup).addClass('open');
								def.setClose(popup);
								$(window).on(popup.resizeEvent, function(){
									def.setPosition(popup);
								});
							});
						},
						error : function(xhr){
							alert('['+xhr.status+'] �쒕쾭�꾩넚�ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎.');
						}
					});

					return popup;
				}

				init.prototype.close = function(){
					var popup = this;

					def.popupClose(popup);
					bodyScrollLock.clearAllBodyScrollLocks();
				}

				init.prototype.reinit = function(){
					var popup = this;

					def.setPosition(popup);
				}

				return new init();
			}
		}
	})(ui);

	ui.mainpopup = (function(_){
		var def = {
			defaults : {
				id : null,
				node : null,
				top : false,
				left : false,
				width : false,
				height : false
			}
		}

		return {
			open : function(url, settings){
				var init = function(){
					var popup = this;

					popup.opt = $.extend({}, def.defaults, settings);

					if($.cookie(popup.opt.id)){
						return false;
					}

					ui.ajaxpopup.open(url, {
						top : popup.opt.top,
						left : popup.opt.left,
						background : false,
						openCallback : function(target){
							var id = '#'+popup.opt.id;
							popup.$mainpopup = target.children('.main_popup');
							popup.$mainpopup.attr({'id' : popup.opt.id});

							if(popup.opt.width && popup.opt.height){
								popup.$mainpopup.addClass('sizeFixed');
							}
						},
						closeCallback : function(){
							if($('[name='+popup.opt.id+']').prop('checked')){
								$.cookie(popup.opt.id, true, {expires : 1, path : '/'});
							}
						},
						backLock: false
					});

					return popup;
				}

				return new init();
			}
		}
	})(ui);

	ui.slider = (function(_){
		return {
			mainVisual : function(){
				this.$mainVisual = $('.main-slider').slick({
					arrows : false,
					dots : true,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false
				});
			},
			newMenu : function(){
				this.$newMenu = $('.new-menu-slider').slick({
					arrows : true,
					dots : false,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false,
					adaptiveHeight: true
				});
			},
			cafeSlide : function(){
				this.$cafeSlide  = $('.cafebene-slider').slick({
					arrows : false,
					dots : true,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					centerMode: true,
					centerPadding: '70px',
					accessibility : false,
					dotsClass:'custom_paging',
					customPaging:function(slider,i){
						return  (i + 1) + '<span> / '+ slider.slideCount +'</span>';
					}

				});
			},
			guideSlide : function(){
				this.$guideSlide  = $('.guide-slider').slick({
					arrows : true,
					dots : true,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false
				});
			},
			storeView : function(){
				this.$storeView = $('.store-view-slider').slick({
					arrows : true,
					dots : false,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false
				});
			},
			gallerySlider1 : function(){
				this.$gallerySlider1 = $('.gallery-slider1').slick({
					arrows :false,
					dots : true,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false
				});
			},
			gallerySlider2 : function(){
				this.$gallerySlider2 = $('.gallery-slider2').slick({
					arrows : false,
					dots : true,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false
				});
			},
			fnMainVisual : function(){
				this.$fnMainVisual = $('.fn-main-slider').slick({
					arrows : false,
					dots : true,
					infinite : true,
					slidesToShow : 1,
					slidesToScroll : 1,
					accessibility : false
				});
			},
		}
	})(ui);

	ui.inputfile = function(target){
		var $target = $(target), value = $target.val();
		$target.next().val(value);
	}

	ui.loadmotion = (function(_){
		return {
			init : function(){
				var f = this;
				_.$motion.each(function(idx, obj){
					obj.t = $(obj).offset().top;
					obj.h = $(obj).outerHeight() / 2 ;
					obj.p = obj.t + obj.h;
					obj.e = 'load.lmotion'+idx+' scroll.lmotion'+idx;

					f.scroll(obj);
					$(window).on(obj.e, function(){
						f.scroll(obj);
					});
				});
			},
			scroll : function(obj){
				if(_.winscrlT + _.winsizeH > obj.p){
					if($(obj).find('> .value').length){
						if(!$(obj).hasClass('n-active')){
							$(obj).find('> .value').YJnumber({
								delay : 600,
								speed : 1200,
								startNum : '0'
							});
						}
					}
					$(obj).addClass('n-active');
					$(window).off(obj.e);
				}
			}
		}
	})(ui);



	ui.headerAction = function(_){
		var _ = this;
		var ts;

		var prevScrollTop = $(window).scrollTop();
		var nowScrollTop = $(window).scrollTop();
		//var flag = false;

       _.$header.find('.tg-menu').on({
			'click': function(){
				_.$aside .addClass('open');
				_.$html.addClass('asideOpen');
			}
		})
		_.$aside.find('.tg-close').on({
			'click': function(){
				_.$aside .removeClass('open')
				_.$html.removeClass('asideOpen');
			}
	    })

		_.$gnb.find('> li').on({
			'click': function(){
				$(this).toggleClass('on').siblings().removeClass('on');
			}
		})

		$(window).on('click', function(e){
			if (!$(e.target).closest(_.$header).length) {
				_.$aside .removeClass('open');
				_.$html.removeClass('asideOpen');
			}
		});
		$(document).on('touchstart', function (e){
			e.stopPropagation();
			ts = e.originalEvent.touches[0].clientY;
		});
	}

	ui.gnbOpacity = function () {
		if ($('.main').length) {
			$(window).scrollTop() > 134 ? $('.main').addClass('on') : $('.main').removeClass('on');
		} else {
			$(window).scrollTop() > 134 ? $('#header').addClass('sticky') : $('#header').removeClass('sticky');
		}
	};


	ui.btnTopMake = function(){
		var $btnTop = '<button type="button" class="btn-top on">Top</button>'
		$('#sub').append($btnTop);
	}

	ui.btnTop = function () {
		$(window).scrollTop() > 600 ? $('.btn-top').addClass('on') : $('.btn-top').removeClass('on');
	};

	ui.btnTopAct = function(){
		$('.btn-top').click(function(){
			$('html, body').animate({scrollTop : 0 }, 1000);
		});
	};

	ui.tabAction = function(navi, cont){
		var _ = ui;

		function action(tab, idx){
			tab.def.$navi.eq(idx).addClass('on').siblings().removeClass('on');
			tab.def.$cont.eq(idx).addClass('on').siblings().removeClass('on');
			tab.def.offsetTop = tab.def.$navi.offset().top;

			tab.def.idx = idx;
		}

		var tabAction = (function(){
			return {
				def : {
					idx : 0,
					$navi : $(navi).children(),
					$cont : $(cont).children()
				},
				init : function(){
					var _this = this;

					_this.def.$navi.on('click', function(){
						action(_this, $(this).index());
					});

					return _this;
				},
				setIndex : function(idx){
					action(this, idx);
					$('html, body').animate({scrollTop : this.def.offsetTop-_.$header.outerHeight()}, 300);
				}
			};
		})();

		return tabAction.init();
	}


	ui.pageTabFixed = function(){

		if($('.page-tab').length){
			var tabOffset = $('.page-tab').offset();
			//var $curPos =   $(window).scrollTop();
			var $utilH = $('#header' ).offset();
			console.log($utilH)

			$(window).scroll( function() {
				if ( $(window).scrollTop() > tabOffset.top ) {
					$( '.page-tab').addClass( 'fixed' );
					$('.content-section').css('padding-top','480px')
				}
				else {
					$( '.page-tab').removeClass( 'fixed' );
					$('.content-section').css('padding-top','0')
				}
			});
		}

	}



	ui.toggleOnAction = function(target){
		$(target).on('click', function(){
			$(this).toggleClass('on');
		});
	}

	ui.addOnAction = function(elm, getSib){
		// getSib�� true硫� �뺤젣�� removeClass on
		if (getSib == false) {
			$(elm).on('click', function(){
				$(this).toggleClass('on');
			});
		} else {
			$(elm).on('click', function(){
				$(this).toggleClass('on').siblings().removeClass('on');
			});
		}
	}




	ui.ajaxpopup = (function(_){
		var def = {
			defaults : {
				background : true,
				backClose : true,
				top : false,
				left : false,
				openCallback : function(data){},
				closeCallback : function(){},
				backLock : true
			},
			idx : 0,
			setInit : function(popup, settings){
				var defIdx = def.idx++;
				popup.opt = $.extend({}, def.defaults, settings);
				popup.$back = popup.opt.background ? _.$body.append('<div class="layer-back">').children('.layer-back:last-child') : _.$body.append('<div class="layer-back">').children('.layer-back:last-child').addClass('bg-none');
				popup.$wrap = popup.$back.append('<div class="layer-wrap">').children('.layer-wrap:last-child');
				popup.seq = defIdx;
				popup.resizeEvent = 'resize.ajaxpopup'+defIdx;
			},
			setPosition : function(popup){
				popup.$wrap.w = popup.$wrap.outerWidth();
				popup.$wrap.h = popup.$wrap.outerHeight();
				popup.$wrap.t = popup.$wrap.h > _.winsizeH * 0.8 ? _.winscrlT + _.winsizeH * 0.1 : _.winscrlT + (_.winsizeH - popup.$wrap.h) / 2;
				popup.$wrap.l = (_.winsizeW - popup.$wrap.w) / 2;

				if (popup.opt.backLock) {
					bodyScrollLock.disableBodyScroll(popup.$wrap);
				}
				return popup.$wrap;
			},
			setClose : function(popup){
				popup.$close = popup.$wrap.find('[layer="close"]');
				$('.layer-back:last-child').on('click', function(e){
					var targetThis = $(e.target)[0];
					e.stopPropagation();

					if (popup.opt.backClose && e.target.className.indexOf('layer-wrap') > -1) {
						popup.opt.closeCallback();
						popup.close(targetThis);
					}
				});
				popup.$close.on('click', function(e){
					var target = e.currentTarget;
					popup.opt.closeCallback();
					popup.close(target);
				});
			},
			popupClose : function(popup){
				popup.$back.remove();
				$(window).off(popup.resizeEvent);
			}
		}

		return {
			open : function(url, settings){
				var init = function(){
					var popup = this;

					def.setInit(popup, settings);

					$.ajax({
						url : url,
						timeout : 10000,
						dataType : 'html',
						success : function(data){
							popup.$wrap.append(data).imagesLoaded().then(function(){
								popup.opt.openCallback(popup.$wrap);
								def.setPosition(popup).addClass('open');
								def.setClose(popup);
								$(window).on(popup.resizeEvent, function(){
									def.setPosition(popup);
								});
							});
							//_.changeView();
						},
						error : function(xhr){
							alert('['+xhr.status+'] �쒕쾭�꾩넚�ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎.');
						}
					});

					return popup;
				}

				init.prototype.close = function(){
					var popup = this;

					def.popupClose(popup);
					bodyScrollLock.clearAllBodyScrollLocks();
				}

				init.prototype.reinit = function(){
					var popup = this;

					def.setPosition(popup);
				}

				return new init();
			}
		}
	})(ui);

	$(window).on({
		'load' : function(){
			ui.init.onLoad();
		},
		'resize' : function(){
			ui.init.onResize();
		},
		'scroll' : function(){
			ui.init.onScroll();
		}
	});
})(jQuery);


