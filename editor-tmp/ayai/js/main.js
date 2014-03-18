$(document).ready(function() {

	$links = $(".links a");
	$registerBtn = $(".register.button");
	$loginBtn = $(".login.button");

	$emailInput = $(".login-page .email-input");
	$passwordInput = $(".login-page .pw-input");
	$charSelect = $(".selection");

	$searchBar = $(".search input");
	$results = $(".header .results");

	$loginDivs = $(".login-page .side div");
	$modalContainer = $(".modals");
	$modalBackground = $(".modal-background");
	$modals = $(".modals > div");

	$classList = $(".modals .create .list");
	$classSummary = null;
	$classInfo = $(".modals .create .summaries");

	currentClass = null;

	$classList.on("click", "div", function() {
		$classSummary.hide();
		currentClass = $(this).html();
		$(".modals .create .info."+currentClass).show();
	});

	$(".create .primary-button").click(function(){
		createCharacter($(".create .name-input").val(), currentClass);	

		//$.post("/create", data, function() {

		//});
	});

	classInformation = {};

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
		} else if (hash == "#create") {
			$modalBackground.show();
			$modalContainer.css("display","flex");
			$(".modals .create").css("display","block");
			//var character = prompt("Create a new character using '<name>,<class' (eg 'Tim,Asian'))","");
			//var response = character.split(',');
			//createCharacter(response[0], response[1]); 
		}

		evt.preventDefault();
	});

	$loginDivs.click(function(evt) {
		var $this = $(this);
		$this.find("input").focus();
	});

	$loginBtn.click(function(evt){
		evt.preventDefault();

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
				initAccount(data);
			}
		});

	});

	templates = {
		characterItem: function(obj) {
			return '' +
				'<div class="char" data-name="' + obj.name + '"">' +
				'<div class="icon"></div>' +
				'<div class="name">' + obj.name + '</div>' +
				'<div class="info">Level ' + obj.level + " " + obj.class + "</div>" +
				'</div>';
		}
	}


    function createCharacter(username, classType) {
    	var token = getCookie("token");
    	var data = {
    		token: token,
    		name: username,
    		class: classType
    	}


		console.log(data);	

        $.post("/create", data, function(response, text, code){

        	console.log(response,text,code);
        	var character = {
        		name: username,
        		level: 1,
        		class: classType
        	}
        	var $template = $(templates.characterItem(character));
			$charSelect.append($template);
			$modalBackground.hide();
			$modalContainer.hide();
			$modals.hide();
        });
    }

	$game = $(".game-screen");
	$gameClient = $(".game-screen .client");
	$clientIframe = $("<iframe src='../../debug.html'></iframe>");
	window.loadGame = function(evt){
		setCookie("name", $(this).data("name"), 60*60);

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
		$clientIframe[0].contentWindow.focus();
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

				initAccount(token);
				alert("registered " + token);
		});
	});

	function initAccount(token) {
		$(".login-page").hide();
		$(".accounts, .player-content").show();

		setCookie("token",token,60*60);

		$charSelect.html("");

		console.log(token);
			
		$.get("/classes", function(data){
			var response = JSON.parse(data);
			$classInfo.html("");
			$classList.html("");
			console.log("!",data);
			var classes = data.classes;
			for(var obj in classes){
				$classList.append('<div>'+classes[obj].name+'</div>');
				console.log(templates.classSummary(classes[obj]));
				var $template = $(templates.classSummary(classes[obj]));
				$classInfo.append($template);
			}

			$classSummary = $(".modals .create .info");
		});
		
		$.post("/chars", token, function(data){
			var response = JSON.parse(data);
			console.log(response,data);
			var chars = response;
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

	window.setCookie = function(key, value, expires) {
		document.cookie = key + "=" + value + ";path=/;max-age=" + expires;
	}

	window.getCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function fadeOutResults(){
		$results.css({
			"top": "69px",
			"opacity": 0,
			"pointer-events": "none"
		});
	}
});