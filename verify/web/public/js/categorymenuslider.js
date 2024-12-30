(function($) {
  
  "use strict";  

	const innercatslider = tns({
		container: '.innercatslider',
		loop: true,
		items: 1,
		slideBy: 'page',
		nav: false,    
		autoplay: false,
		speed: 400,
		autoplayButtonOutput: false,
		mouseDrag: true,
		lazyload: true,
		controls:false,
		responsive: {
			300: {
				items: 3,
			},
			400: {
				items: 3,
			},
			640: {
				items: 7,
			},
			768: {
				items: 7,
			}
		}	
	});

}(jQuery));

