
//NOTE(@duncanmid): match height

$(function() {
    
    $('.project > .inner').matchHeight();
});



//NOTE(@duncanmid): scroll to anchors

$(function() {
	
	$('a:not(.no-scroll)').click(function() {
		
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
			if (target.length) {
				
				$('html, body').animate({
					
					scrollTop: target.offset().top
				}, 1000);
				
				return false;
			}
		}
	});
});



//note(@duncanmid): click all

$(function() {

	var item = $('.clickall');
	
	item.each(function() {
		
		var $this = $(this);
		$this.css('cursor','pointer');
		$this.find('a').click(function(event){event.preventDefault();});
		$this.click(function(){window.location.href=$('a',this).attr('href');});
	});
	
});



//note(@duncanmid): hide on scroll

$(function() {
	
	var header = $('#site-header').height();
		
	$(window).scroll(function() {
		
		var scrollPosition = $(document).scrollTop();
		
		if ( scrollPosition > ( header - 50 ) ) {
		
			$('#site-nav').addClass('hidden');	
		
		} else {
			
			$('#site-nav').removeClass('hidden');
		}
	});
});
