var $menuOpt = [ "Experience", "Skills", "Hackathons", "Conferences" ];
var $keyWords = [ "a developer.", "an engineer." ];

var buildMenu = function(options) {
	for(i = 0; i < options.length; i++){
		// button tag
		var title = options[i];
		var button = $('<li/>').addClass("button");
		$(".buttons-container").append(button);

		// icon
		var idFormatted = "#" + options[i];
		var img = "img/" + title + ".png"
		var icon = $('<img/>')
		    .attr("src", img)
		    .attr("data-id", idFormatted)
		    .addClass("button-icon");
		button.append(icon);

		// label 
		var label = "<br><label class='button-label'>" + title + "</label>"
		button.append(label);
    };
};

// Text animation
var txtRotateInit = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

txtRotateInit.prototype.tick = function() {
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

var textTyping = function() {
	var elements = document.getElementsByClassName("txt-rotate");
	for (var i=0; i<elements.length; i++) {
		var toRotate = $keyWords;
		var period = 1000;
		if (toRotate) {
			new txtRotateInit(elements[i], toRotate, period);
		}
	}
	
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 10px solid #5196DF }";
	document.body.appendChild(css);
};

$(document).ready(function() {
	buildMenu($menuOpt);
    textTyping();

    var blockMovements = function() {
        var speed = 700;
        var slowerSpeed = speed + 1200;

        $(".buttons-container").animate({left: $(".buttons-container").parent().width() / 2 - $(".buttons-container").width() / 2 }, speed);
        $(".body-description").animate({right: '0px'}, speed);
        $(".body-info").animate({top: '0px'}, speed );
        $(".social-container").animate({bottom: '0px'}, slowerSpeed);
    }

    var generateDialogBox = function() {
        var id = $(this).data('id');
        $(".dialog").dialog({
            autoOpen: false,
            modal: true,
            show: {
                effect: "puff",
                duration: 500
            },
            height: 500,
            width: 700,
            dialogClass: "no-close",
            buttons: [
                {
                  text: "Close",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                }
            ]
/*
            edits to be done
            position => center of page
            height/ width are functions of page size with min and max established*/
        });
    };

    var dialogAnimation = function() {
        $(".button-icon").click(function() {
            var id = $(this).data('id');
            $(id).dialog("open");
        });
    };

    blockMovements();
    generateDialogBox();
    dialogAnimation();
});