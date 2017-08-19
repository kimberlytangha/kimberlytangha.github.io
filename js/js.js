var $menuOpt = [ "Experience", "Projects", "Skills & Coursework", "Hackathons", "Conferences"];

var buildMenu = function(options) {
	for(i = 0; i < $menuOpt.length; i++){
		// button tag
		var title = options[i];
		var $button = $('<button/>').attr("id", title).addClass("button");
		$(".body-button").append($button);

		// icon
		var $element = document.getElementById(title);
		var $icon = $('<img/>').attr("src", "../img/check.png").addClass("button-icon");
		$button.append($icon);

		// label 
		var $label = "<br><label>" + title + "</label>"
		$button.append($label);
    };
}


$(document).ready(function() {
	buildMenu($menuOpt);

});