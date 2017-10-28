import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		/*sticky menu ITSELF gradually changes color on scroll*/
		this.siteHeader = $(".site-header"); /*getting the DOM element to work with*/
		this.headerTriggerElement = $(".large-hero__title"); /*getting the DOM element for creating a waypoint*/
		this.createHeaderWaypoint();/*calling method on page start*/

		/*sticky menu LINKS change color on scroll*/
		this.pageSections = $(".page-section"); /*collection of all elements with the class of page-section*/
		this.headerLinks = $(".primary-nav a"); /*collection of all links in the nav section*/
		this.createPageSectionWaypoints(); /*calling method on page start*/
		this.addSmoothScrolling();
	}

	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
	}

	/*createHeaderWaypoint starts*/
	createHeaderWaypoint() { 
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function (direction) {
				if (direction == "down") {
					that.siteHeader.addClass("site-header--dark");
				} else {
					that.siteHeader.removeClass("site-header--dark");
				}
			}
		});	
	}
	/*createHeaderWaypoint ends*/

	createPageSectionWaypoints() {
		var that = this; /*it has to be placed HERE!! where the method firts begins*/
		
		this.pageSections.each(function() {
			var currentPageSection = this;
			/*scrolling down*/
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						/*or?*/
						// $(matchingHeaderLink).removeClass("is-current-link");				
						$(matchingHeaderLink).addClass("is-current-link");
					}	
				},
				offset: "20%"
			}); 

			/*scrolling up*/
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						/*or?*/
						// $(matchingHeaderLink).removeClass("is-current-link");				
						$(matchingHeaderLink).addClass("is-current-link");
					}	
				},
				offset: "-45%"
			}); 
		});	
	}

}

export default StickyHeader;