$(document).ready(function() {

	$links = $(".links a");
	$registerBtn = $(".register.button");
	$loginBtn = $(".login.button");

	$emailInput = $(".email-input");
	$passwordInput = $(".pw-input");
	$charSelect = $(".selection");

	$searchBar = $(".search input");
	$results = $(".header .results");

	$loginDivs = $(".login-page .side div");
	$modalContainer = $(".modals");
	$modalBackground = $(".modal-background");
	$modals = $(".modals > div");

	$modalBackground.click(function() {
		$modalBackground.hide();
		$modalContainer.hide();
		$modals.hide();
	});


	$links.on("click", function(evt) {
		var $this = $(this);
		var hash = $this.attr("href");
		location.hash = hash;
		if(hash == "#game"){
			$searchBar.fadeOut();
			$(".login-page").css("display", "none");
			$(".admin-content").css("display", "none");
			$(".accounts").css("display", "block");
			$(".player-content").css("display", "block");
		} else if (hash == "#admin") {
			$searchBar.fadeIn();
			$(".login-page").css("display", "none");
			$(".player-content").css("display", "none");
			$(".accounts").css("display", "block");
			$(".admin-content").css("display", "block");
		} else if (hash == "#logout") {					
			$searchBar.fadeOut();
			$(".login-page").css("display", "block");
			$(".player-content").css("display", "none");
			$(".accounts").css("display", "none");
			$(".admin-content").css("display", "none");
		} else if (hash == "#settings") {
			$modalBackground.show();				
			$modalContainer.css("display","flex");
			$(".modals .settings").css("display","block");
		}

		evt.preventDefault();
	});

	$loginDivs.click(function(evt) {
		var $this = $(this);
		$this.find("input").focus();
	});

	$loginBtn.click(function(evt){
		evt.preventDefault();
		
		$(".login-page").hide();
		$(".accounts, .player-content").show();
		initAccount();

		/*
		var info = {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}
		var hash = makeBaseAuth(info);

		$.ajax({
			type:"POST",
			url: "/login",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", hash);
			},
			success: function(data) {
				console.log(data);
			}
		});
		*/
	});

	templates = {
		characterItem: function(obj) {
			return '' +
				'<div class="char">' +
				'<div class="icon"></div>' +
				'<div class="name">' + obj.name + '</div>' +
				'<div class="info">Level ' + obj.level + " " + obj.class + "</div>" +
				'</div>';
		}
	}

	$game = $(".game-screen");
	$gameClient = $(".game-screen .client");
	$clientIframe = $("<iframe src='../../debug.html'></iframe>");
	window.loadGame = function(){
		$game.css("visibility", "visible");
		$game.css({
			opacity: 1,
			top: 0
		});
		
		$game.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
			$game.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
			$gameClient.html($clientIframe);
			$clientIframe.load(initGame);
			console.log("TEEHEE");
		});
	}

	$(".selection").on("click", ".char", loadGame);

	window.initGame = function(){
		$gameClient.css("visibility", "visible");
		$gameClient.css({
			opacity: 1,
			top: 0
		});
		console.log("WHY");
	}

	$registerBtn.click(function(evt){
		evt.preventDefault();
		var info = {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}
		$.post("/register", info, function(data){
			
				var template = templates.characterItem(data);
			
		});
	});

	function initAccount() {
		$charSelect.html("");

		$.get("characters.json", function(data){
			console.log(data);
			var chars = data.chars;
			for(var obj in chars){
				var $template = $(templates.characterItem(chars[obj])).hide();
				$charSelect.append($template);
				$template.fadeIn();
			}
		});
	}	

	function makeBaseAuth(info) {
	  var tok = info.email + ':' + info.password;
	  var hash = btoa(tok);
	  return "Basic " + hash;
	}

	function goToPage(hash) {

	}

	$searchBar.focus(fadeInResults);
	$searchBar.focusout(fadeOutResults);

	function fadeInResults(){
		$results.css({
			"top": "74px",
			"opacity": 1,
			"pointer-events": "all"
		});	
	}

	function fadeOutResults(){
		$results.css({
			"top": "69px",
			"opacity": 0,
			"pointer-events": "none"
		});
	}
});