/* Brett Meyer - Broken Pony Club */

Image.prototype.load = function(url, target, type, callback) {
	var thisImg = this,
		xmlHTTP = new XMLHttpRequest();

	thisImg.completedPercentage = 0;
	thisImg.lastPercentage = 0;
	//thisImg.target = target;

	xmlHTTP.open('GET', url , true);
	xmlHTTP.responseType = 'arraybuffer';

	xmlHTTP.onload = function() {
		var h = xmlHTTP.getAllResponseHeaders(),
			m = h.match(/^Content-Type\:\s*(.*?)$/mi),
			mimeType = m[ 1 ] || 'image/png';

		var blob = new Blob([this.response], { type: mimeType });
		thisImg.src = window.URL.createObjectURL(blob);

		if (type === 'background' && target) {
			target.append('<div class="background"></div>');
			TweenMax.set(target.find('.background'), {alpha: 0});
			target.find('.background').css('background-image', 'url('+thisImg.src+')');
			target.find('.image-preloader').remove();
			TweenMax.to(target.find('.background'), 0.5, {alpha: 1, scale: 1, ease: Quart.easeOut});
		}

		if (callback) callback(this);
	};

	xmlHTTP.onprogress = function(e) {
		if (e.lengthComputable)
			thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
		
		if (thisImg.lastPercentage !== thisImg.completedPercentage) {
			//console.log(thisImg.completedPercentage);
			target.find('.image-preloader').width(thisImg.completedPercentage+'%');
		}
	};

	xmlHTTP.onloadstart = function() {
		thisImg.lastPercentage = 0;
		thisImg.completedPercentage = 0;

		target.prepend('<i class="image-preloader"></i>');
	};

	xmlHTTP.onloadend = function() {
		thisImg.completedPercentage = 100;
	};

	xmlHTTP.send();
};

jQuery(document).ready(function($) {
	var bpc = bpc || {};
	bpc.aniIn = 0.2;
	bpc.aniOut = 0.3;
	bpc.retina = window.devicePixelRatio > 1;
	bpc.resw = screen.width;
	bpc.resh = screen.height;
	bpc.clickType = Modernizr.touchevents ? 'tap' : 'click';
	bpc.root = $('#site-root').val();
	bpc.base = $('#site-base').val();
	bpc.category = $('#site-category').val();

	//console.log(Modernizr);

	bpc.offline = false;

	bpc.validEmail = function(email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	};

	bpc.doneResize = 0;
	bpc.resize = function() {
		bpc.stageWidth = $(window).width();
		bpc.stageHeight = $(window).height();

		if (bpc.base === 'home') {
			var h = bpc.stageHeight - $('.brand-logos').outerHeight();
			if (h < 620) h = 620;
			$('.homepage-header').height(h);
			$('body.home').css({paddingTop: h});

			$('.features-col li').height('auto');
			if (bpc.stageWidth >= 768) {
				$('.features-col.left-col li').each(function() {
					if ($(this).height() > $('.features-col.right-col li').eq($(this).index()).height()) {
						$('.features-col.right-col li').eq($(this).index()).height($(this).height());
					} else {
						$(this).height($('.features-col.right-col li').eq($(this).index()).height());
					}
				});
			}
		}

		bpc.resizeSubNav();
		bpc.resizeServicesList();
	};

	bpc.resizeSubNav = function() {
		if (bpc.menuItem !== 0) {
			var x = bpc.menuItem.offset().left + (bpc.menuItem.outerWidth() * 0.5);
			$('.sub-nav .arrow').css({left: x});

			$('.sub-nav .col').outerHeight('auto');
			var hh = 0;
			$('.sub-nav .col').each(function() {
				if ($(this).outerHeight() > hh) hh = $(this).outerHeight();
			});
			$('.sub-nav .col').outerHeight(hh);

			if ($(window).width() < 768) {
				$('.sub-nav').hide();
			}
		}
	};

	bpc.resizeServicesList = function() {
		$('.services-list li').outerHeight('auto');
		if ($(window).width() > 600) {
			var h = 0;
			$('.services-list li').each(function() {
				if ($(this).outerHeight() > h) h = $(this).outerHeight();
			});
			$('.services-list li').outerHeight(h);
		}
	};

	// async script loading
	if (bpc.offline) {
		bpc.scriptsToLoad = [bpc.root+'js/greensock/TweenMax.min.js'];
	} else {
		bpc.scriptsToLoad = ['https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'];
	}
	//bpc.scriptsToLoad = [bpc.root+'js/greensock/TweenMax.min.js', bpc.root+'js/greensock/plugins/DrawSVGPlugin.min.js'];

	if (bpc.clickType === 'tap') {
		bpc.scriptsToLoad.push('js/jquery.mobile.custom.min.js');
	}
	
	if (bpc.base === 'home' || bpc.base === 'consultancy') {
		if (bpc.offline) {
			bpc.scriptsToLoad.push(bpc.root+'js/offline/flickity.pkgd.min.js');
		} else {
			bpc.scriptsToLoad.push('https://npmcdn.com/flickity@1.2/dist/flickity.pkgd.min.js');
		}
		bpc.scriptsToLoad.push(bpc.root+'js/pixijs/pixi.min.js');
		//bpc.scriptsToLoad.push(bpc.root+'js/animation-home.js');
		//bpc.scriptsToLoad.push(bpc.root+'js/animation-device.js');
	}
	/*if (bpc.base === 'home' || bpc.base === 'gallery') {
		bpc.scriptsToLoad.push(bpc.root+'js/ExifReader.js');
		bpc.scriptsToLoad.push(bpc.root+'js/megapix-image.js');
	}*/

	bpc.scriptsLoaded = 0;
	bpc.loadScriptsAsync = function() {
		for (var i=0; i<bpc.scriptsToLoad.length; i++) {
			$.ajax({
				url: bpc.scriptsToLoad[i],
				dataType: 'script',
				cache: true,
				async: true,
				success: bpc.fileLoaded
			});
		}
	};

	bpc.fileLoaded = function() {
		bpc.scriptsLoaded++;
		if (bpc.scriptsLoaded === bpc.scriptsToLoad.length)
			bpc.loadComplete();
	};

	bpc.loadComplete = function() {
		if (bpc.base === 'home') bpc.initHome();
		if (bpc.base === 'gallery') bpc.initGallery();
		if (bpc.base === 'faq') bpc.initFAQs();
		if (bpc.base === 'tutorials') bpc.initTutorials();
		if (bpc.base === 'consultancy') bpc.initConsultancy();
		if (bpc.base === 'submit') bpc.initSubmit();

		bpc.initNav();
		bpc.initMobileNav();
		bpc.initFooter();
	};

	// Stagger Animations
	bpc.staggerAnimations = function() {
		if (bpc.clickType !== 'tap') {
			$('*[data-animation]').each(function() {
				var speed = parseFloat($(this).attr('data-speed')),
				delay = parseFloat($(this).attr('data-delay'));
				TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
			});
		} else {
			$('*[data-animation]').each(function() {
				TweenMax.set($(this), {x: 0, y: 0, alpha: 1});
			});
		}
	};

	// Nav

	bpc.initNav = function() {
		bpc.subTimer = -1;

		if (bpc.clickType !== 'tap') {

			$('.main-nav .has-children').mouseover(function() {
				bpc.menuItem = $(this);
				var sub = $(this).parent().parent().parent().find('.sub-nav');
				clearTimeout(bpc.subTimer);
				TweenMax.killTweensOf(sub);
				sub.css({top: $(this).outerHeight()}).show(0);
				bpc.resizeSubNav();
				TweenMax.to(sub, 0.4, {y: 0, alpha: 1, ease: Quart.easeOut});
			}).mouseout(function() {
				clearTimeout(bpc.subTimer);
				bpc.subTimer = setTimeout(bpc.hideSubNav, 200);
			});
			$('.sub-nav').mouseenter(function() {
				clearTimeout(bpc.subTimer);
				TweenMax.killTweensOf($(this));
				TweenMax.to($(this), 0.4, {y: 0, alpha: 1, ease: Quart.easeOut});
			}).mouseleave(function() {
				clearTimeout(bpc.subTimer);
				bpc.subTimer = setTimeout(bpc.hideSubNav, 200);
			});

		} else {

			$('.main-nav .has-children').on(bpc.clickType, function() {
				var sub = $(this).parent().parent().parent().find('.sub-nav');
				bpc.menuItem = $(this);
				if (sub.is(':visible')) {
					bpc.hideSubNav();
					$('body').unbind(bpc.clickType);
				} else {
					TweenMax.killTweensOf(sub);
					sub.css({top: $(this).outerHeight()}).show(0);
					bpc.resizeSubNav();
					TweenMax.to(sub, 0.4, {y: 0, alpha: 1, ease: Quart.easeOut});

					$('body').on(bpc.clickType, function(e) {
						if (e.pageY < sub.offset().top || e.pageY > sub.offset().top + sub.height()) {
							e.preventDefault();
							e.stopPropagation();
							bpc.hideSubNav();
							$('body').unbind(bpc.clickType);
							return false;
						}
					});
				}
			});

		}
	};

	bpc.hideSubNav = function() {
		clearTimeout(bpc.subTimer);
		TweenMax.killTweensOf($(this));
		TweenMax.to($('.sub-nav'), 0.4, {y: 20, alpha: 0, ease: Quart.easeOut, onComplete: function() {
			$('.sub-nav').hide(0);
		}});
	};
	
	// Homepage

	bpc.menuItem = 0;
	bpc.initHome = function() {
		bpc.resize();

		// Setup reveal animations
		TweenMax.set($('.features .col'), {x: screen.width, alpha: 1});

		var featuresTextShown = false, featuresDevicesShown = false, featuredListShown = false, infoBlockShown = false, galleryShown = false, consultancyShown = false, supportShown = false, getStartedShown = false;

		// Scrolling Common

		var frame = document.getElementById('iframe-animation'), animationPaused = false;

		$(document).scroll(function() {
			// Fixed Nav
			if ($('.brand-logos').offset().top - $(window).scrollTop() <= 80) {
				bpc.hideSubNav();
				$('.main-header').addClass('shown');
				$('.mobile-header').addClass('shown');
			} else {
				$('.main-header').removeClass('shown');
				$('.mobile-header').removeClass('shown');
			}

			// Turn off canvas
			if ($('.brand-logos').offset().top - $(window).scrollTop() < 0) {
				if (!animationPaused) {
					frame.contentWindow.postMessage('pause', '*');
					$('iframe.animation').hide(0);
					animationPaused = true;
				}

			} else {
				if (animationPaused) {
					frame.contentWindow.postMessage('resume', '*');
					$('iframe.animation').show(0);
					animationPaused = false;
				}
			}

			if (bpc.clickType === 'tap') {
				/*if ($(document).scrollTop() > $('.homepage-header').height() && $('.homepage-header').is(':visible')) {
					$('.homepage-header').hide(0);
				} else if ($(document).scrollTop() < $('.homepage-header').height() && !$('.homepage-header').is(':visible')) {
					$('.homepage-header').show(0);
				}*/
			}
		});

		if (bpc.clickType !== 'tap') {

			// Scrolling Desktop

			$(document).scroll(function() {
				// Header parallax
				if (bpc.clickType !== 'tap') {
					if ($('.main-article').scrollTop() < $('.homepage-header').height()) {
						var pct = $(this).scrollTop() / $('.homepage-header').height() * 100;
						$('.homepage-header').css({transform: 'translate3d(0px, -' + (2 * pct) + 'px, 0)'});
					}
				}

				// Backgrounds parallax
				/*var scrollP = ($(window).scrollTop()) / ($(document).height() - $(window).height()) * 100;
				$('.features').css('background-position', '0 '+(scrollP)+'%');
				$('.projects').css('background-position', '0 '+(scrollP)+'%');
				$('.support').css('background-position', '0 '+(scrollP)+'%');*/

				// Sections in
				if (!featuresTextShown) {
					if ($('.features').offset().top - 50 - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						featuresTextShown = true;
						TweenMax.staggerTo('.features .col', 1, {x: 0, ease: Quart.easeOut}, 0.15);
					}
				}
				if (!featuresDevicesShown) {
					if ($('.features').offset().top + 250 - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						featuresDevicesShown = true;
						$('.features .device').each(function() {
							TweenMax.to($(this), 0.4, {y: 0, ease: Quart.easeOut, delay: $(this).attr('data-delay')});
						});
						TweenMax.to($('.features .button'), 0.4, {y: 0, ease: Quart.easeOut, delay: $('.features .button').attr('data-delay')});
					}
				}
				if (!featuredListShown) {
					if ($('.features-list').offset().top + 50 - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						featuredListShown = true;
						$('.features-list li').each(function() {
							TweenMax.to($(this).find('.text'), 1, {x: 0, alpha: 1, ease: Quart.easeOut, delay: $(this).attr('data-delay')});
							TweenMax.to($(this).find('img'), 1, {x: 0, alpha: 1, ease: Quart.easeOut, delay: $(this).attr('data-delay')});
						});

						$('.features-list *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}
				if (!infoBlockShown) {
					if ($('.info-block').offset().top - $(window).scrollTop() <= ($(window).height() - 200)) {
						infoBlockShown = true;
						TweenMax.to($('.info-block .dotjs'), 0.75, {x: 0, alpha: 1, ease: Quart.easeOut});
						TweenMax.to($('.info-block .type_8'), 0.75, {y: 0, alpha: 1, ease: Quart.easeOut, delay: 0.15});
						TweenMax.to($('.info-block .type_9'), 0.75, {y: 0, alpha: 1, ease: Quart.easeOut, delay: 0.3});
					}
				}
				if (!galleryShown) {
					if ($('.projects').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						galleryShown = true;
						$('.projects *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}
				if (!consultancyShown) {
					if ($('.consultancy').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						consultancyShown = true;
						$('.consultancy *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}
				if (!supportShown) {
					if ($('.support').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						supportShown = true;
						$('.support *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}
				if (!getStartedShown) {
					if ($('.get-started').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						getStartedShown = true;
						$('.get-started *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}
			});
		} else {

			// Show everything
			TweenMax.set($('*[data-animation]'), {x: 0, y: 0, alpha: 1});
			TweenMax.set($('.features .col'), {x: 0});
			TweenMax.set($('.features .device'), {y: 0});
			TweenMax.set($('.features .button'), {y: 0});
			TweenMax.set($('.features-list li .text, .features-list li img'), {x: 0, alpha: 1});
			TweenMax.set($('.info-block .dotjs'), {x: 0, alpha: 1});
			TweenMax.set($('.info-block .type_8'), {y: 0, alpha: 1});
			TweenMax.set($('.info-block .type_9'), {y: 0, alpha: 1});
		}
		$(document).scroll();

		// Logos animation
		$('.brand-logos .mask').flickity({
			cellAlign: 'left',
			wrapAround: true,
			groupCells: 2,
			autoPlay: 3000,
			pauseAutoPlayOnHover: false,
			prevNextButtons: false,
			pageDots: false
		});

		// 3D hover on thumbanils
		bpc.galleryThumbInteraction();
		//bpc.initGallerySubmission();

		// Support Floaters
		//$('.support').mousemove(function(e) {
		$(window).mousemove(function(e) {
			var x = e.pageX - $('.support').offset().left,
			y = e.pageY - $('.support').offset().top;

			var px = x/$('.support').width(), py = y/$('.support').height();
			var bg1x = (100 - (200*px)) + 'px',
			bg1y = (-60 + (120*py)) + 'px',
			bg2x = (-60 + (120*px)) + 'px',
			bg2y = (-60 + (120*py)) + 'px';

			//TweenMax.killTweensOf($('.support .bg-1'));
			TweenMax.to($('.support .bg-1'), 5, {x: bg1x, y: bg1y, ease: Quad.easeOut});
			TweenMax.to($('.support .bg-2'), 4, {x: bg2x, y: bg2y, ease: Quad.easeOut});
		});

		// Header Animation
		
		if (bpc.clickType !== 'tap') {
			// load the animations from CMS
			/*$.ajax({
				url: 'animation.php?term=masthead',
				dataType: 'script',
				cache: true,
				async: true
			});*/
			$.get('animation.php?term=masthead', function(data) {
				bpc.animations = data.split(',');
				$('iframe.animation').attr('src', bpc.animations[0]);
			});

			// load the animations from CMS
			$.ajax({
				url: 'animation.php?term=device',
				dataType: 'script',
				cache: true,
				async: true,
				success: function() {
					window.deviceAnimation('device-desktop-canvas', $('#device-desktop-canvas').width(), $('#device-desktop-canvas').height());
					window.deviceAnimation('device-ipad-canvas', $('#device-ipad-canvas').width(), $('#device-ipad-canvas').height());
					window.deviceAnimation('device-iphone-canvas', $('#device-iphone-canvas').width(), $('#device-iphone-canvas').height());
					window.deviceAnimation('device-phone-canvas', $('#device-phone-canvas').width(), $('#device-phone-canvas').height());
					window.deviceAnimation('device-laptop-canvas', $('#device-laptop-canvas').width(), $('#device-laptop-canvas').height());
					window.deviceAnimation('device-tablet-canvas', $('#device-tablet-canvas').width(), $('#device-tablet-canvas').height());
				}
			});
		}

		// Patreon
		/*$.get('php/patreon-feed.php', {}, function(data) {
			console.log(data.count);
			$('#patreon-count').replaceWith(data.count);
			$('#patreon-total').replaceWith(data.total);
		}, 'json');*/
		$.ajax({
			dataType: "json",
			url: 'php/patreon-feed.php',
			success: function(data) {
				$('#patreon-count').replaceWith(data.count);
				$('#patreon-total').replaceWith('$'+data.total);
			}
		});
	};

	// Gallery

	bpc.initGallery = function() {
		bpc.staggerAnimations();

		// Backgrounds parallax
		/*$(document).scroll(function() {
			var scrollP = ($(window).scrollTop()) / ($(document).height() - $(window).height()) * 100;
			$('.projects').css('background-position', '0 '+(scrollP*0.25)+'%');
		});*/

		bpc.galleryThumbInteraction();
		bpc.initGallerySubmission();

		if (bpc.category === 'submit') $('.show-submission').click();
	};

	bpc.galleryThumbInteraction = function() {
		if (bpc.clickType !== 'tap') {
			TweenMax.set($('.project-list .project'), {rotationY: 0, rotationX: 0, rotationZ: 0, transformPerspective: 1000});
			$('.project-list .project').mouseover(function() {
				$('.project-list .project').mousemove(function(e) {
					var x = e.pageX - $(this).offset().left,
					y = e.pageY - $(this).offset().top;

					var px = x/$(this).width(), py = y/$(this).height();
					var xx = -10 + (20*px), yy = 10 - (20*py);
					
					//TweenMax.killTweensOf($(this));
					TweenMax.to($(this), 0.5, {rotationY: xx, rotationX: yy, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
				});
			}).mouseout(function() {
				$(this).unbind('mousemove');
				//TweenMax.killTweensOf($(this));
				TweenMax.to($(this), 0.5, {rotationY: 0, rotationX: 0, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
			});
		}
	};

	/*bpc.initGallerySubmission = function() {
		$('.show-submission').click(function() {
			$('.submit-modal').show(0).addClass('show');
		});

		$('.submit-modal .close-modal, .submit-modal .close').click(function() {
			$('.submit-modal').removeClass('show');
			setTimeout(function() {
				$('.submit-modal').hide(0);
				$('.submit-modal form').show(0);
				$('.submit-modal .success').hide(0);
			}, bpc.aniOut*1000);
		});

		// Detect drag and drop
		var div = document.createElement('div');
		var draggable = ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
		
		if (draggable) {
			$('.submit-modal .image-preview-container').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
				e.preventDefault();
				e.stopPropagation();
			}).on('dragover dragenter', function() {
				$(this).find('.preview').addClass('drop');
			}).on('dragleave dragend drop', function() {
				$(this).find('.preview').removeClass('drop');
			}).on('drop', function(e) {
				var file = e.originalEvent.dataTransfer.files[0];
				bpc.previewImage(file);
			});
		}

		$('.submit-modal #gallery-image').change(function() {
			if (this.files && this.files[0]) {
				var file = this.files[0];
				bpc.previewImage(file);
			}
		});

		$('.submit-modal .form-group input').keydown(function() {
			if ($(this).parent().hasClass('error')) {
				$(this).parent().removeClass('error').find('i.error').remove();
			}
		});

		$('.submit-modal form').submit(function(e) {
			e.preventDefault();
			var title = $('.submit-modal #gallery-title').val(),
			company = $('.submit-modal #gallery-company').val(),
			url = $('.submit-modal #gallery-url').val(),
			error = false;

			$('.submit-modal .preview').removeClass('error');
			$('.submit-modal .form-group').removeClass('error').find('i.error').remove();

			if (title.length < 3) {
				error = true;
				$('.gallery-title').addClass('error').append('<i class="error">Please enter a title for your submission</i>');
			}
			if (company.length < 3) {
				error = true;
				$('.gallery-company').addClass('error').append('<i class="error">Please enter a company or developers name</i>');
			}
			if (url.length < 3) {
				error = true;
				$('.gallery-url').addClass('error').append('<i class="error">Please enter a URL</i>');
			}
			if (typeof bpc.galleryImage === 'undefined' || bpc.galleryImage === '') {
				error = true;
				$('.submit-modal .preview').addClass('error');
			}
			if (!error) {
				// Check for formData support
				if (window.FormData) {
					
					var form = document.getElementById('submit-form');
					var formData = new FormData(form);
					formData.append('gallery-image', bpc.galleryImage);
					formData.append('display', '1');
					
					//$.post(bpc.root+'php/submit.php', {'gallery-title': title, 'gallery-company': company, 'gallery-url': url,})
					$.ajax({
						url: bpc.root+'php/submit.php',
						data: formData,
						processData: false,
						contentType: false,
						type: 'POST',
						success: function(data){
							if (data === '1') {
								bpc.galleryImage = '';
								form.reset();
								$('.submit-modal .preview').css('background-image', 'none');
								$('.submit-modal .preview .instructions').show(0);

								$('.submit-modal form').hide(0);
								$('.submit-modal .success').show(0);
							}
						}
					});
				} else {
					return true;
				}
			}
			return false;
		});
	};*/

	bpc.initGallerySubmission = function() {
		/*$('.show-submission').click(function() {
			$('.submit-modal').show(0).addClass('show');
		});

		$('.submit-modal .close-modal, .submit-modal .close').click(function() {
			$('.submit-modal').removeClass('show');
			setTimeout(function() {
				$('.submit-modal').hide(0);
				$('.submit-modal form').show(0);
				$('.submit-modal .success').hide(0);
			}, bpc.aniOut*1000);
		});*/

		$('.show-submission').click(function() {
			$('.submit-form').slideDown(400);
		});

		$('.submit-form .close').click(function() {
			$('.submit-form').slideUp(400);
		});

		$('.submit-form #gallery-image').change(function() {
			if (this.files && this.files[0]) {
				var file = this.files[0];
				bpc.galleryImage = file;

				$('.submit-form .image-upload-container .preview').html(file.name).addClass('added');
				$('.submit-form .image-upload-container .instructions').html('Replace Screenshot').addClass('added');
				$('.submit-form .image-upload-container').removeClass('error');
			}
		});

		$('.submit-form .form-group input').keydown(function() {
			if ($(this).parent().hasClass('error')) {
				$(this).parent().removeClass('error').find('i.error').remove();
				$(this).parent().find('.helper').show(0);
			}
		});

		$('.submit-form form').submit(function(e) {
			e.preventDefault();
			var title = $('.submit-form #gallery-title').val(),
			company = $('.submit-form #gallery-company').val(),
			url = $('.submit-form #gallery-url').val(),
			error = false;

			$('.submit-form .preview').removeClass('error');
			$('.submit-form .form-group').removeClass('error').find('i.error').remove();

			if (title.length < 3) {
				error = true;
				$('.gallery-title').addClass('error').append('<i class="error">Please enter a title for your submission</i>').find('.helper').hide(0);
			}
			if (company.length < 3) {
				error = true;
				$('.gallery-company').addClass('error').append('<i class="error">Please enter a company or developers name</i>').find('.helper').hide(0);
			}
			if (url.length < 3) {
				error = true;
				$('.gallery-url').addClass('error').append('<i class="error">Please enter a URL</i>').find('.helper').hide(0);
			}
			if (typeof bpc.galleryImage === 'undefined' || bpc.galleryImage === '') {
				error = true;
				$('.submit-form .image-upload-container').addClass('error');
			}
			if (!error) {
				// Check for formData support
				if (window.FormData) {
					
					var form = document.getElementById('submit-form');
					var formData = new FormData(form);
					formData.append('gallery-image', bpc.galleryImage);
					formData.append('display', '1');
					
					//$.post(bpc.root+'php/submit.php', {'gallery-title': title, 'gallery-company': company, 'gallery-url': url,})
					$('.submit-form form button').attr('disabled', 'disabled').css('opacity', 0.25);
					$.ajax({
						url: bpc.root+'php/submit.php',
						data: formData,
						processData: false,
						contentType: false,
						type: 'POST',
						success: function(data){
							if (data === '1') {
								bpc.galleryImage = '';
								form.reset();
								$('.submit-form .preview').css('background-image', 'none');
								$('.submit-form .preview .instructions').show(0);

								$('.submit-form form').hide(0);
								$('.submit-form .success').show(0);
							} else {
								$('.submit-form form button').removeAttr('disabled', 'disabled').css('opacity', 1);
							}
						}
					});
				} else {
					return true;
				}
			}
			return false;
		});
	};

	bpc.previewImage = function(file) {
		bpc.galleryImage = file;

		var reader = new FileReader();
		reader.onload = function (e) {
			//var exif, tags;
			$('.submit-modal .preview .instructions').hide(0);

			//if (!Modernizr.canvas) {
				$('.submit-modal .preview').css('background-image', 'url('+e.target.result+')');
			/*}

			try {
				exif = new ExifReader();
				exif.load(e.target.result);
				exif.deleteTag('MakerNote');
				tags = exif.getAllTags();

				console.log(tags);
					
				var orient = tags.Orientation.value,
				canvas = document.createElement('canvas');

				var mpImg = new MegaPixImage(file);
				mpImg.render(canvas, {maxWidth: 500, maxHeight: 500, orientation: orient, quality: 0.6}, function() {
					$('.submit-modal .preview').css('background-image', 'url('+canvas.toDataURL("image/jpg")+')');
				});
				
			} catch (error) {
				$('.submit-modal .preview').css('background-image', 'url('+e.target.result+')');
			}*/
		};
		//if (!Modernizr.canvas) {
			reader.readAsDataURL(file);
		/*} else {
			reader.readAsArrayBuffer(file);
		}*/
	};

	// FAQs

	bpc.initFAQs = function() {
		bpc.staggerAnimations();

		$('.faq-list li').click(function() {
			/*if ($(this).hasClass('open')) {
				$(this).removeClass('open');
				$(this).find('.big-text').slideUp(300);
			} else {
				$('.faq-list li.open').find('.big-text').slideUp(300);
				$('.faq-list li.open').removeClass('open');

				$(this).addClass('open');
				$(this).find('.big-text').slideDown(250);
			}*/
			$(this).toggleClass('open');
			$(this).find('.big-text').slideToggle(250);
		});

		setTimeout(function() {
			$('.faq-list li').eq(0).click();
		}, 500);
	};

	// Tutorials

	bpc.initTutorials = function() {
		bpc.staggerAnimations();
	};

	// Consultancy

	bpc.initConsultancy = function() {

		if (bpc.clickType === 'tap') {
			$('.consultancy-header').addClass('touch');
		}

		$('.services-list li').each(function() {
			$(this).append('<div class="rect"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div>');
		});
		bpc.resizeServicesList();

		$('.consultancy-header *[data-animation]').each(function() {
			var speed = parseFloat($(this).attr('data-speed')),
			delay = parseFloat($(this).attr('data-delay'));
			TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
		});
		
		var section1 = false, section2 = false, section3 = false, section4 = false;

		if (bpc.clickType !== 'tap') {
			$(document).scroll(function() {
				if (!section1) {
					if ($('.services').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						section1 = true;
						$('.services *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}

				if (!section2) {
					if ($('.testimonials').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						section2 = true;
						$('.testimonials *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}

				if (!section3) {
					if ($('.production-servives').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						section3 = true;
						$('.production-servives *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}

				if (!section4) {
					if ($('.contact').offset().top - $(window).scrollTop() <= ($(window).height() * 0.65)) {
						section4 = true;
						$('.contact *[data-animation]').each(function() {
							var speed = parseFloat($(this).attr('data-speed')),
							delay = parseFloat($(this).attr('data-delay'));
							TweenMax.to($(this), speed, {x: 0, y: 0, alpha: 1, ease: Quart.easeOut, delay: delay});
						});
					}
				}
			});
			$(document).scroll();
		} else {
			$('*[data-animation]').each(function() {
				TweenMax.set($(this), {x: 0, y: 0, alpha: 1});
			});
		}

		$('.form-group input, .form-group textarea').keydown(function() {
			if ($(this).parent().hasClass('error')) {
				$(this).parent().removeClass('error').find('i.error').remove();
			}
		});

		$('form').on('submit', function(e) {
			e.preventDefault();
			$('.form-group').removeClass('error').find('i.error').remove();
			var name = $('#form-name').val(), email = $('#form-email').val(), msg = $('#form-message').val(), error = false;
			if (name.length < 3) {
				$('.form-name').addClass('error').append('<i class="error">Please enter your name</i>');
				error = true;
			}
			if (!bpc.validEmail(email)) {
				$('.form-email').addClass('error').append('<i class="error">Invalid email address</i>');
				error = true;
			}
			if (msg.length < 5) {
				$('.form-message').addClass('error').append('<i class="error">Enter your message</i>');
				error = true;
			}
			if (!error) {
				// submit form
				$.post(bpc.root+'php/contact.php', {name: name, email: email, message: msg}, function() {
					$('#form-name').val('');
					$('#form-email').val('');
					$('#form-message').val('');
					$('form .button').after('<p class="margin-bottom-0 pink500">Thank you, your message was sent.</p>');
				});
			}
			return false;
		});

		$('.testimonials .mask').flickity({
			cellAlign: 'left',
			wrapAround: true,
			autoPlay: 8000,
			pauseAutoPlayOnHover: false,
			prevNextButtons: false,
			pageDots: true
		});
	};

	// Mobile Nav
	bpc.initMobileNav = function() {
		
		$('.mobile-header .bar').click(function() {
			if ($('.mobile-header').hasClass('open')) bpc.closeMobileNav();
			else bpc.openMobileNav();
		});
	};

	bpc.openMobileNav = function() {
		$('.mobile-header nav').show(0);
		$('.mobile-header').addClass('open');
		/*TweenMax.to($('#bar2'), 0.2, {alpha: 0, ease: Quart.easeOut});
		TweenMax.to($('#bar1'), 0.2, {rotation: 45, transformOrigin: '15 15', ease: Quart.easeOut, delay: 0.2});
		TweenMax.to($('#bar3'), 0.2, {rotation: -45, transformOrigin: '22 6', ease: Quart.easeOut, delay: 0.2});*/
		
		TweenMax.to('#line1', 0.2, {y: 0, ease: Linear.easeNone});
		TweenMax.to('#line2', 0, {alpha: 0, ease: Linear.easeNone, delay: 0.2});
		TweenMax.to('#line3', 0.2, {y: 0, ease: Linear.easeNone});

		TweenMax.to('#line1', 0.2, {rotation: 45, ease: Quart.easeOut, delay: 0.2});
		TweenMax.to('#line3', 0.2, {rotation: -45, ease: Quart.easeOut, delay: 0.2});
	};

	bpc.closeMobileNav = function() {
		$('.mobile-header').removeClass('open');
		/*TweenMax.to($('#bar2'), 0.2, {alpha: 1, ease: Quart.easeOut, delay: 0.2});
		TweenMax.to($('#bar1'), 0.2, {rotation: 0, transformOrigin: '15 15', ease: Quart.easeOut, delay: 0});
		TweenMax.to($('#bar3'), 0.2, {rotation: 0, transformOrigin: '22 6', ease: Quart.easeOut, delay: 0});*/

		TweenMax.to('#line1', 0.2, {rotation: 0, ease: Linear.easeNone, delay: 0});
		TweenMax.to('#line3', 0.2, {rotation: 0, ease: Linear.easeNone, delay: 0});
		
		TweenMax.to('#line2', 0, {alpha: 1, ease: Quart.easeOut, delay: 0.2});
		TweenMax.to('#line1', 0.2, {y: -8, ease: Quart.easeOut, delay: 0.2});
		TweenMax.to('#line3', 0.2, {y: 8, ease: Quart.easeOut, delay: 0.2, onComplete: function() {
			$('.mobile-header nav').hide(0);
		}});
	};

	// Footer

	bpc.initFooter = function() {
		var index = 0, total = 0;

		$('.main-footer .twitter-feed').load(bpc.root+'php/feed.php', function() {
			total = $('.main-footer .twitter-feed li').length;
		});

		$('.main-footer .next').click(function() {
			$('.main-footer .prev').show();
			if (index < total - 1) {
				index ++;
				TweenMax.to($('.main-footer .twitter-feed li:first-child'), 0.4, {marginLeft: -(index*100)+'%', ease: Quart.easeOut});
				if (index === total-1)
					$('.main-footer .next').hide();
			}
		});
		$('.main-footer .prev').click(function() {
			$('.main-footer .next').show();
			if (index > 0) {
				index --;
				TweenMax.to($('.main-footer .twitter-feed li:first-child'), 0.4, {marginLeft: -(index*100)+'%', ease: Quart.easeOut});
				if (index === 0)
					$('.main-footer .prev').hide();
			}
		});
	};

	bpc.init = function() {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) bpc.clickType = 'click';
		$(window).resize(bpc.resize);

		// Floating forms
		$('.form-control').on('focus blur', function (e) {
			$(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
		
		bpc.loadScriptsAsync();

		// Setup buttons
		$('.button').each(function() {
			var text = $(this).html(), borders = $(this).hasClass('transparent') ? '' : '<div class="rect"><i class="r1"></i><i class="r2"></i><i class="r3"></i><i class="r4"></i></div>';

			$(this).html('<span>'+text+'</span><svg class="next" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23 14" xml:space="preserve"><line x1="22" y1="7" x2="16" y2="1" /><line x1="22" y1="7" x2="16" y2="13" /><line x1="0" y1="7" x2="23" y2="7" /></svg>'+borders);
		});

		if (bpc.clickType !== 'tap') {
			$('.button').mouseover(function() {
				$(this).addClass('hover');
			}).mouseout(function() {
				$(this).removeClass('hover');
			});
		}
	};

	bpc.init();
});