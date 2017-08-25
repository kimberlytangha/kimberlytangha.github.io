var $menuOpt = [ "Experience", "Projects", "Skills", "Hackathons", "Conferences" ];
var $keyWords = [ "developer.", "student.", "disruptor.", "hacker.", "cyclist." ];

var buildMenu = function(options) {
	for(i = 0; i < $menuOpt.length; i++){
		// button tag
		var title = options[i];
		var $button = $('<button/>').attr("id", title).addClass("button");
		$(".buttons-container").append($button);

		// icon
		var $img = "img/" + title + ".png"
		var $icon = $('<img/>').attr("src", $img).addClass("button-icon");
		$button.append($icon);

		// label 
		var $label = "<br><label class='button-label'>" + title + "</label>"
		$button.append($label);
    };
};

var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 150 - Math.random() * 100; // delete speed

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 200;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName("txt-rotate");
	for (var i=0; i<elements.length; i++) {
		var toRotate = $keyWords;
		var period = 2000;
		if (toRotate) {
			new TxtRotate(elements[i], toRotate, period);
		}
	}
	
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 10px solid #58BC82 }";
	document.body.appendChild(css);
};

$(document).ready(function() {
	buildMenu($menuOpt);

    var blockMovements = function() {
        var speed = 1000;
        var slowerSpeed = speed + 700;

        /*$(".buttons-container").animate({left: $(".buttons-container").parent().width() / 2 - $(".buttons-container").width() / 2 }, speed);*/
        $(".body-description").animate({right: '0px'}, speed);
        $(".body-name").animate({top: '0px'}, speed);
        $(".social-container").animate({bottom: '0px'}, slowerSpeed);
    }

    /*blockMovements();*/

});