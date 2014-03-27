$(document).ready(function() {

	var running = 0, 
	timer, 
	popup = $("#popbox-wrapper"), 
	list = $("#list"), 
	h1 = $("#big"), 
	h1b4 = $("span", h1).eq(0), 
	h1a5 = $("span", h1).eq(-1), 
	what = $("#what"), times = 0;
	
	var book = [
			["breakfast", "The Hangover Biscuit, The Ham, Healthy Bennie, House Made Granola, B&O Omelet, Eggs Benedict, Steel Cut Oats"],
			["lunch", "Hamburger, Sandwich, Panini, Pizza, Only Fruits, Salads"], 
			["dinner", "KFC, Subway, Popeye, Papa john's, Sushi, Chinatown, Little Tokyo"]
		];

	var objDate = new Date();
	var hours = objDate.getHours();
	if(hours >= 0 && hours < 10) {
	} else if(hours >= 10 && hours <= 14) {
		book.push(book.shift());
		list.val(book[0][1]);
		h1b4.text(" is my " + book[0][0]);
	} else {
		book.push(book.shift());
		book.push(book.shift());
		list.val(book[0][1]);
		h1b4.text(" is my " + book[0][0]);
	}

	$("#start").click(function() {
		var l = list.val().split(",");
		if(l.length == 1 && l[0] != "")
			return alert("¡ú_¡ú Really? There is only one choice!");
		if(l.length == 1)
			return alert("Are you serious? No choices in the menu at all!");
		if(!running) {
			times++;
			if(times == 3) {
				$("<span class='tip'><i></i>No favorite food? Remember you can edit the menu!</span>").css({
					left : "290px",
					opacity : 0
				}).appendTo("#mian_box").animate({
					left : "-=5px",
					opacity : 1
				});
				$("#start").val("Continue");
				$("#edit_menu").add("#start").one("click", function() {
					$(".tip").animate({
						left : "+=5px",
						opacity : 0
					}, function() {
						$(this).remove();
					});
				});
				return false;
			}

			h1a5.text("?");
			$(this).val("Stop");
			timer = setInterval(function() {
				var r = Math.floor(Math.random() * l.length) + 1;
				var food = l[r - 1];
				var h = $("body").height();
				var w = $("body").width();
				var rTop = Math.floor(Math.random() * h) + 1;
				var rLeft = Math.floor(Math.random() * w) + 1;
				var rSize = Math.floor(Math.random() * (37 - 14 + 1)) + 14;
				what.html(food);
				$("<span class='temp'>" + food + "</span>").css({
					"display" : "none",
					"position" : "absolute",
					"top" : rTop,
					"left" : rLeft,
					"color" : "rgba(0,0,0,." + Math.random() + ")",
					"fontSize" : rSize + "px"
				}).appendTo("body").fadeIn("slow", function() {
					$(this).fadeOut("slow", function() {
						$(this).remove();
					});
				});
			}, 60);
			running = 1;

		} else {
			h1a5.text("! ");
			$("#start").val("No, try again!");
			clearInterval(timer);
			running = 0;
		}
	});

	$("#edit_menu").click(function() {
		running ? alert("It's running! Choose one please...") : popup.fadeIn(function() {
			var t = list.val();
			list.focus().val("").val(t)
		});
	});

	$("#ok").click(function() {
		popup.fadeOut();
	});

	$("#big").click(function() {

		var h1 = $("#big");
		if(!running) {
			h1.css("position", "relative").stop().animate({
				left : "-20px"
			}, 50).animate({
				left : "20px"
			}, 50).animate({
				left : "-10px"
			}, 50, function() {
				what.text("What");
				h1b4.text(" is my " + book[1][0]);
				h1a5.text("? ");
				list.val(book[1][1]);
				book.push(book.shift());
			}).animate({
				left : "10px"
			}, 50).animate({
				left : "-5px"
			}, 50).animate({
				left : "5px"
			}, 50).animate({
				left : 0
			}, 50, function() {
				$(this).removeAttr("style");
			});
		};
	});

	document.onkeydown = function(e) {
		e = e || window.event;
		if((e.keyCode == 32 || e.keyCode == 13) && !popup.is(":visible"))
			$("#start").trigger("click");
	};
});
