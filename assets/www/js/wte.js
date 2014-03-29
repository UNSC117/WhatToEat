	$(document).ready(function() {

		var running = 0, 
		timer, 
		popup = $("#popbox-wrapper"), 
		list = $("#list"), 
		h1 = $("#big"), 
		h1b4 = $("span", h1).eq(0), 
		h1a5 = $("span", h1).eq(-1), 
		what = $("#what"), times = 0;
		
		var menuList = [
		["breakfast", "豆浆油条, 小笼包, 煎饼, 鸡蛋灌饼, 粥, 馄饨, 麦当劳"],
		["lunch", "Hamburger, Sandwich, Panini, Pizza, Only Fruits, Salads"], 
		["dinner", "KFC, Subway, Popeye, Papa john's, Korean Town, Chinatown, Little Tokyo"]
		];

		var objDate = new Date();
		var hours = objDate.getHours();
		if(hours >= 0 && hours < 10) {
		} else if(hours >= 10 && hours <= 14) {
			menuList.push(menuList.shift());
			list.val(menuList[0][1]);
			h1b4.html("is my <br />" + menuList[0][0]);
		} else {
			menuList.push(menuList.shift());
			menuList.push(menuList.shift());
			list.val(menuList[0][1]);
			h1b4.html("is my <br />" + menuList[0][0]);
		}

		$("#start").click(function() {
			var l = list.val().split(",");
			if(l.length == 1 && l[0] != "")
				return alert("Really? There is only one choice!");
			if(l.length == 1)
				return alert("Are you serious? No choices in the menu at all!");
			if(!running) {
				times++;
				if(times == 3) {
					$("<p class='tip'><i></i>No favorite food? Remember you can edit the menu!</p>").css({
						left:"58%",
						top:"80%",
						opacity : 0
					}).appendTo("#mian_box").animate({
						left : "-=5px",
						opacity : 1
					});
					$("#start").text("Continue");
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
				$("#start").text("Stop");
				timer = setInterval(function() {
					var r = Math.floor(Math.random() * l.length) + 1;
					var food = l[r - 1];
					var h = $("body").height();
					var w = $("body").width();
					var rTop = Math.floor(Math.random() * h) + 1;
					var rLeft = Math.floor(Math.random() * w) + 1;
					//var rSize = Math.floor(Math.random() * (37 - 14 + 1)) + 14;
					var emSize = Math.floor((Math.random()*1.5)+1);
					what.html(food);
					$("<span class='temp'>" + food + "</span>").css({
						"display" : "none",
						"position" : "absolute",
						"top" : rTop,
						"left" : rLeft,
						"color" : "rgba(0,0,0," + Math.random() + ")",
						"font-size" : emSize + "em"
					}).appendTo("#main_box").fadeIn("slow", function() {
						$(this).fadeOut("slow", function() {
							$(this).remove();
						});
					});
				}, 60);
				running = 1;

			} else {
				h1a5.text("! ");
				$("#start").text("No, try again!");
				clearInterval(timer);
				running = 0;
			}
		});

	$("#edit_menu").click(function() {
		if(running == 1) { 
			alert("Lottery is running! Stop it first..."); 
		} else {
			var t = list.val();
			list.focus().val("").val(t);
			centrePopup();
			loadPopup();
		}
	});

	$("#ok").click(function() {
		disablePopup();
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
				h1b4.html("is my<br />" + menuList[1][0]);
				h1a5.text("? ");
				list.val(menuList[1][1]);
				menuList.push(menuList.shift());
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

	function loadPopup() {

		$("#popupBackground").css({
			"opacity" : "0.5"
		});
		$("#popupBackground").fadeIn("slow");
		popup.fadeIn("slow");
	}

	function disablePopup() {
		$("#popupBackground").fadeOut("slow");
		popup.fadeOut("slow")
	}

	function centrePopup() {
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;

		var popupHeight = popup.height();
		var popupWidth = popup.width();

		popup.css({
			"position" : "absolute",
			"top" : windowHeight / 2 - popupHeight / 2,
			"left" : windowWidth / 2 - popupWidth / 2
		});

		$("#popupBackground").css({
			"height" : windowHeight
		});
	}


});
