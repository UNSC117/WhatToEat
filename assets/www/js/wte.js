	$(document).on('pageinit', function() {
		var running = 0, 
		mark = 0,
		timer, 
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
			h1b4.html("is my <br />" + menuList[0][0]);
		} else {
			menuList.push(menuList.shift());
			menuList.push(menuList.shift());
			h1b4.html("is my <br />" + menuList[0][0]);
		}

		$( "#start" ).one( "click", function() {
			if(mark == 0) {
				var check = list.val().split(",");
				if(check.length == 1)  list.val(menuList[0][1]);
			}
		});

		$("#start").click(function(event) {
			var l = list.val().split(",");
			if(l.length == 1 && l[0] != "")
				return alert("Really? There is only one choice!");
			if(l.length == 1)
				return alert("Are you serious? No choices in menu at all!");
			if(!running) {
				times++;
				if(times == 3) {
					$("#hideTips").trigger('click');
					$("#start").text("Continue");
					clearInterval(timer);
					running = 0;
				} else {
					h1a5.text("?");
					$("#start").text("Stop");
					timer = setInterval(function() {
						var r = Math.floor(Math.random() * l.length) + 1;
						var food = l[r - 1];
						var h = $("#main_box").height();
						var w = $("#main_box").width();
						var rTop = Math.floor(Math.random() * h) + 1;
						var rLeft = Math.floor(Math.random() * w) + 1;
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
				}
			} else {
				h1a5.text("! ");
				$("#start").text("No, try again!");
				clearInterval(timer);
				running = 0;
			}
		});

	$("#edit_menu").click(function(event) {  
		if(running == 1) { 
 			event.preventDefault();
    		event.stopImmediatePropagation();
    		alert("Lottery is running! Stop it first..."); 
		} else {
			if(mark == 0){
				list.val(menuList[0][1]);
			}
			mark = 1;
		}
	});

	$("#big").click(function() {

		var h1 = $("#big");
		if(!running) {
			h1.css("position", "relative").stop().animate({
				left : "-20px"
			}, 80).animate({
				left : "20px"
			}, 80).animate({
				left : "-10px"
			}, 80, function() {
				what.text("What");
				h1b4.html("is my<br />" + menuList[1][0]);
				h1a5.text("? ");
				list.val(menuList[1][1]);
				menuList.push(menuList.shift());
			}).animate({
				left : "10px"
			}, 80).animate({
				left : "-5px"
			}, 80).animate({
				left : "5px"
			}, 80).animate({
				left : 0
			}, 80, function() {
				$(this).removeAttr("style");
			});
		};
	});

});
