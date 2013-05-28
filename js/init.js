// Author Kristian Hamilton
$(document).ready(function() {

	var $slide = $('#slides');
	var $mylist = $slide.find('ul');
	var $listitems = $mylist.children('li');
	var $listitemsGet = $listitems.get();
	$listitemsGet.sort(function(a, b) {
	   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})
	$.each($listitemsGet, function(idx, itm) { $mylist.append(itm); });
	
	$listitems.find('small').hide();
	$("#showPrices").click(function() {
		$listitems.find('small').fadeToggle("slow", "linear", function() {
			$('#showPrices').text($(this).is(':hidden') ? 'Show Prices' : 'Hide prices');
		});
	});
	
	$slide.find($('#normal li')).each(function() {
		var product_images = $(this).children('a').length,
			product_half = Math.round(product_images / 2)
			callback = product_half * 15,
			product_width = product_half * 200 - callback;

		$(this).css({
			'width' : product_width
		});
	});

	var accum_width = 0;
	$listitems.each(function() {
		accum_width += $(this).width() + 2;
	});
	
	var body_class = $.cookie('body_class');
    if(body_class) {
        $('body').attr('class', body_class);
    }
    $("#showWhite").click(function() {
        $("body").toggleClass("backgroundWhite");
        $.cookie('body_class', $('body').attr('class'));
    });

	$slide.kinetic({
		'triggerHardware' : true,
		'y' : false
	});

	$mylist.css({
		'width' : accum_width
	});

	$('#prev').click(function() {
		$slide.kinetic('start', {
			velocity : -5
		});
	});
	$('#next').click(function() {
		$slide.kinetic('start', {
			velocity : 5
		});
	});

	$slide.preloader();
	
	$('.see-shoe').hide();
	
	$(".cta").toggle(function() {
		$(this).addClass("active");
		$(".topNav").animate({
			'top' : '-70px'
		}, 'slow');
	}, function() {
		$(this).removeClass("active");
		$(".topNav").animate({
			'top' : '0px'
		}, 'slow');
		
	});

});
$(function() {
	
	

	var lightboxHTML = '<div id="overlay"></div>' + '<div id="lightbox">' + '<a href="#" id="close">Close</a>' + '<h2></h2>'+ 
	'<ul><h3>Available at</h3><li id="show-shoe"><a>Show Shoe Photo</a></li><li id="harrods"><a href="javascript:this.location = \'stockist.html\'" >Harrods</a></li><li id="liberty"><a href="javascript:this.location = \'stockist.html\'" >Liberty</a></li><li id="church"><a href="javascript:this.location = \'stockist.html\'" >Old Church Street</a></ul>' + '<img/>' + '<span class="cost"></span><p/>' + '</div>';

	$(lightboxHTML).appendTo('body').hide();

	$('#overlay').css('opacity', '0.9');
	
	$('li a', '#slides').each(function() {

		var $li = $(this);
		
		
		$li.click(function(event) {
	
			var src = $li.find('img').attr('src');
			var alt = $li.find('img').attr('alt');
			var price = $(this).siblings('small').text();
			var product = $(this).siblings('h2').text();
			
			seeShoe = $li.find('.see-shoe').attr('src'); 
			originalShoe = $li.find('.see-drawing').attr('src'); 
			
			$('img', '#lightbox').attr('src', src);
			$('p', '#lightbox').text(alt);
			$('span', '#lightbox').text(price);
			$('h2', '#lightbox').text(product);

			var har = parseInt($(this).find('img').attr('data-harrods'));
			var lib = parseInt($(this).find('img').attr('data-liberty'));
			var chur = parseInt($(this).find('img').attr('data-church'));
			
			$('#harrods, #church, #liberty').show();			

			if ( har == 0 ){
				$('#harrods').hide();			
			}
			if ( lib == 0 ){
				$('#liberty').hide();			
			}
			if ( chur == 0 ){
				$('#church').hide();			
			}
			if (chur == 0  &&  lib == 0  &&  har == 0) {
				$('#lightbox ul h3').hide();
				$('#show-shoe').show();	
				$('span', '#lightbox').hide();			
				
				//Show drawing and shoe
				$('#show-shoe').toggle(function() {
					$(this).text('See Shoe Drawing');
					$('span', '#lightbox').stop(true,true).fadeIn();
					$('#lightbox > img').attr('src', seeShoe);
				}, function() {
					$(this).text('She Shoe Photo');
					$('span', '#lightbox').fadeOut();
					$('#lightbox > img').attr('src', originalShoe);
				});	
			} 
			
			$('#overlay, #lightbox').fadeIn( 'normal' );

			event.preventDefault();
		});
	});
	
	//lightbox feature
	$('#close', '#lightbox').click(function(event) {
		$('#lightbox, #overlay').fadeOut( 'normal' );
		$('#show-shoe').text('She Shoe Photo');
		event.preventDefault();
	});
	
	$('#overlay').click(function(event) {
		$('#lightbox, #overlay').fadeOut( 'normal' );
		$('#show-shoe').text('She Shoe Photo');
	});
	
	

});
