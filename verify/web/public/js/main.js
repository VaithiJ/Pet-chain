(function($) {
  
  "use strict";  

	const mainslider = tns({
		container: '.mainslider',
		loop: true,
		items: 1,
		slideBy: 'page',
		nav: false,    
		autoplay: true,
		speed: 400,
		autoplayButtonOutput: false,
		mouseDrag: true,
		lazyload: true,
		controlsContainer: "#customize-hs-controls",
	});

	const categoryslider = tns({
		container: '.categoryslider',
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
				items: 5,
			},
			400: {
				items: 5,
			},
			640: {
				items: 9,
			},
			768: {
				items: 9,
			}
		}	
	});

}(jQuery));