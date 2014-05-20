$(document).ready(function() {

	$links = $(".links a, .hash");
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
	$classInfo = $(".modals .create .summaries");
	$classSummary = null;

	currentClass = null;

	currentState = 0;
	
	var states = {
		isLoggedIn: false,
		viewingAdmin: false
	}

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
		$loginBtn.html("loading");
		evt.preventDefault();

		var info = {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}
		var hash = makeBaseAuth(info);
		//initAccount();

		
		$.ajax({
			type:"POST",
			url: "/login",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", hash);
			},
			success: function(data) {
				initAccount(data);
			},
			error: function(data) {
				alert("Login failed.");
				resetLoginButtons();
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
		}, 
		classList: function(obj) {

		},
		classSummary: function(obj) {
			var stats = "";
			var statsobj = obj.baseStats.stats;
			//window.testy = statsobj;
			for(var item in statsobj) {
				var growth, statName, statBase;
				for(var stat in statsobj[item]){
					if(stat == "growth") {					
						growth = statsobj[item][stat];
					} else {
						statName = stat;
						statBase = statsobj[item][stat];
					}
 				}
				stats += '<div><span>' + statName + ':</span> ' + statBase + '</div>';
			}

			return ''+
				'<div class="info ' + obj.name + '">' +
				'<div class="stats">'+
					stats +
				'</div>' +
				'<div class="description">' +
					obj.description +
				'</div>' +
				'</div>';
		},
		classesModal: function() {
			return '<h2>character creation</h2>' +
					'<div class="title">' +
						'Step 1: Select class' +
					'</div>' +
					'<div class="list">' +
						'<$ _.each(classes, function(class) { %>' +
							'<div><%=class.name%></div>'+
						'<% }) %>'+
					'</div>' +
					'<div class="info">' +
						'<div class="stats">' +
							'<% _.each(classes.baseStats, function(stat) { %>' +
							 	'<div><span><%= stat %>:</span> <%= stat %></div>'+
							'<% }) %>' +
						'</div>' +
						'<div class="description">' +
							//<%= clas 
							
					'</div>';// +
		},
		searchResults: function() {
			return '' +
				'<% _.each(results, function(result) { %>' +
					'<div data-url="admin/<%=type%>/<%=id=%>"><span><%=result.name%></span> (<%=result.type%>)</div>' +
				'<% }) %>';
		},
		collectionPage: function() {
			return '' +
				'';
		},
		spellPage: function() { 
			return '' +
				'<form class="spell-form">' +
				'<h2><%= name %></h2>' +
				'<div class="option delete">delete</div>' +
				'<div class="option save">save</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#/admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/spells">spells</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/spells/<%=id%>"><%= name %></a>' +
				'</div>' +
				'<div class="spell-name">' +
					'<span class="label">Name</span>' +
					'<input type="text" name="name" value="<%= name %>"></input>' +
				'</div>' +
				'<div class="description">' +
					'<span class="label">Description</span>' +
					'<input type="text" name="description" value="<%= description %>"></input>' +
				'</div>' +
				'<div class="icon">' +
					'<span class="label">Icon</span>' +
					'<input type="text" name="icon" value="<%= icon %>"></input>' +
				'</div>' +
				'<div class="damage">' +
					'<span class="label">Damage</span>' +
					'<input type="text" name="damage" value="<%= damage %>"></input>' +
				'</div>' +
				'<div class="damageType">' +
					'<span class="label">Damage Type</span>' +
					'<input type="text" name="damageType" value="<%= damageType %>"></input>' +
				'</div>' +
				'<div>' +
					'<span class="label">Targeting</span>' +
					'<input type="text" name="targeting" value="<%= targeting %>"></input>' +
				'</div>' +
				'<div>' +
					'<span class="label">Effects</span>' +
					'<input type="text" name="effects" value="<%= effects %>"></input>' +
				'</div>' +
				'<div>' +
					'<span class="label">Range</span>' +
					'<input type="text" name="range" value="<%= range %>"></input>' +
				'</div>'+
			'</form>';
		}, 
		classPage: function() { 
			return '' +
				'<form class="class-form">' +
				'<h2><%= name %></h2>' +
				'<div class="option save">save</div>' +
				'<div class="option delete">delete</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#/admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/classes">classes</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/classes/<%=id%>"><%= name %></a>' +
				'</div>' +
				'<div class="class-name">' +
					'<span class="label">Name</span>' +
					'<input type="text" name="name" value="<%= name %>"></input>' +
				'</div>' +
				'<div class="description">' +
					'<span class="label">Description</span>' +
					'<input type="text" name="description" value="<%= description %>"></input>' +
				'</div>' +
				'<div class="health">' +
					'<span class="label">Base Health</span>' +
					'<input type="text" name="health" value="<%= health %>"></input>' +
				'</div>' +
				'<div class="mana">' +
					'<span class="label">Base Mana</span>' +
					'<input type="text" name="mana" value="<%= mana %>"></input>' +
				'</div>' +
				'<div class="stats">' +
					'<span class="label">Stats</span>' +
					'<input type="text" name="stats" value="<%= stats %>"></input>' +
				'</div>' +
				'<div class="base">' +
					'<span class="label">Base Stats</span>' +
					'<input type="text" name="base" value="<%= base %>"></input>' +
				'</div>' +
				'<div class="growth">' +
					'<span class="label">Stat Growth</span>' +
					'<input type="text" name="growth" value="<%= growth %>"></input>' +
				'</div>' +
				'<div class="spritesheet">' +
					'<span class="label">Spritesheet Location</span>' +
					'<input type="text" name="spritesheet" value="<%= spritesheet %>"></input>' +
				'</div>' +
			'</form>';
		},
		npcPage: function() { 
			return '' +
				'<form class="npc-form">' +
				'<h2><%= name %></h2>' +
				'<div class="option save">save</div>' +
				'<div class="option delete">delete</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#/admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/npcs">npcs</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/npcs/<%=id%>"><%= name %></a>' +
				'</div>' +
				'<div class="npc-name">' +
					'<span class="label">Name</span>' +
					'<input type="text" name="name" value="<%= name %>"></input>' +
				'</div>' +
				'<div class="description">' +
					'<span class="label">Description</span>' +
					'<input type="text" name="description" value="<%= description %>"></input>' +
				'</div>' +
				'<div class="faction">' +
					'<span class="label">Faction</span>' +
					'<select name="faction">'+
						'<option value="axis" <% if(faction=="axis"){%>selected<%}%>>Axis</option>' +
						'<option value="allied" <% if(faction=="allied"){%>selected<%}%>>Allied</option>' +
						'<option value="village" <% if(faction=="village"){%>selected<%}%>>Village</option>' +
					'</select>' + 
				'</div>' +				
				'<div class="health">' +
					'<span class="label">Max Health</span>' +
					'<input type="text" name="maximumHealth" value="<%= maximumHealth %>"></input>' +
				'</div>' +
				'<div class="mana">' +
					'<span class="label">Max Mana</span>' +
					'<input type="text" name="maximumMana" value="<%= maximumMana %>"></input>' +
				'</div>' +
				'<div class="room">' +
					'<span class="label">Room</span>' +
					'<input type="text" name="roomId" value="<%= roomId %>"></input>' +
				'</div>' +
				'<div class="weapon">' +
					'<span class="label">Weapon</span>' +
					'<input type="text" name="weapon1" value="<%= weapon1 %>"></input>' +
				'</div>' +
				'<div class="helmet">' +
					'<span class="label">Helmet</span>' +
					'<input type="text" name="helmet" value="<%= helmet %>"></input>' +
				'</div>' +
				'<div class="torso">' +
					'<span class="label">Torso</span>' +
					'<input type="text" name="torso" value="<%= torso %>"></input>' +
				'</div>' +
				'<div class="legs">' +
					'<span class="label">Legs</span>' +
					'<input type="text" name="legs" value="<%= legs %>"></input>' +
				'</div>' + 
				'<div class="feet">' +
					'<span class="label">Feet</span>' +
					'<input type="text" name="feet" value="<%= feet %>"></input>' +
				'</div>' +
				'<div class="experience">' +
					'<span class="label">Experience</span>' +
					'<input type="text" name="experience" value="<%= experience %>"></input>' +
				'</div>' +
				'<div class="level">' +
					'<span class="label">Level</span>' +
					'<input type="text" name="level" value="<%= level %>"></input>' +
				'</div>' +
			'</form>';
		},
		effectPage: function() { 
			return '' +
				'<form class="effect-form">' +
				'<h2><%= name %></h2>' +
				'<div class="option save">save</div>' +
				'<div class="option delete">delete</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#/admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/effects">effects</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/effects/<%=id%>"><%= name %></a>' +
				'</div>' +
				'<div class="effect-name">' +
					'<span class="label">Name</span>' +
					'<input type="text" name="name" value="<%= name %>"></input>' +
				'</div>' +
				'<div class="description">' +
					'<span class="label">Description</span>' +
					'<input type="text" name="description" value="<%= description %>"></input>' +
				'</div>' +
				'<div class="effect-type">' +
					'<span class="label">Effect Type</span>' +
					'<input type="text" name="effectType" value="<%= effectType %>"></input>' +
				'</div>' +
				'<div class="value">' +
					'<span class="label">Value</span>' +
					'<input type="text" name="value" value="<%= value %>"></input>' +
				'</div>' +
				'<div class="attribute">' +
					'<span class="label">Attribute</span>' +
					'<select name="attribute">'+
						'<option value="TimedInterval" <% if(attribute=="TimedInterval"){%>selected<%}%>>Timed Interval</option>' +
						'<option value="OneOff" <% if(attribute=="OneOff"){%>selected<%}%>>One Off</option>' +
						'<option value="Duration" <% if(attribute=="Duration"){%>selected<%}%>>Duration</option>' +
					'</select>' + 
				'</div>' +
				'<div class="multiplier">' +
					'<span class="label">Multiplier</span>' +
					'<input type="text" name="multiplier" value="<%= multiplier %>"></input>' +
				'</div>' +
				'<div class="is-rel">' +
					'<span class="label">Is Relative?</span>' +
					'<input type="checkbox" name="isRelative" <%if(isRelative){%>checked="yes"<%}%>></input>' +
				'</div>' + 
				'<div class="is-value">' +
					'<span class="label">Is Value Relative?</span>' +
					'<input type="checkbox" name="isValueRelative" <%if(isValueRelative){%>checked="yes"<%}%>></input>' +
				'</div>' +
				'<div class="icon">' +
					'<span class="label">Icon Location</span>' +
					'<input type="text" name="iconLocation" value="<%= iconLocation %>"></input>' +
				'</div>' +
				'<div class="length">' +
					'<span class="label">Length</span>' +
					'<input type="text" name="length" value="<%= length %>"></input>' +
				'</div>' +
				'<div class="icon">' +
					'<span class="label">Interval</span>' +
					'<input type="text" name="interval" value="<%= interval %>"></input>' +
				'</div>' +
			'</form>';
		},
		questPage: function() { 
			return '' +
				'<form class="quest-form">' +
				'<h2><%= name %></h2>' +
				'<div class="option save">save</div>' +
				'<div class="option delete">delete</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#/admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/quests">quests</a>&nbsp;>&nbsp;' +
					'<a href="#/admin/quests/<%=id%>"><%= name %></a>' +
				'</div>' +
				'<div class="quest-name">' +
					'<span class="label">Name</span>' +
					'<input type="text" name="name" value="<%= name %>"></input>' +
				'</div>' +
				'<div class="description">' +
					'<span class="label">Description</span>' +
					'<input type="text" name="description" value="<%= description %>"></input>' +
				'</div>' +
				'<div class="type">' +
					'<span class="label">Type</span>' +
					'<select name="type">'+
						'<option value="hunt" <% if(type=="hunt"){%>selected<%}%>">Hunt</option>' +
						'<option value="fetch" <% if(type=="fetch"){%>selected<%}%>>Fetch</option>' +
					'</select>' + 
				'</div>' +
				'<div class="ids">' +
					'<span class="label">ID</span>' +
					'<input type="text" name="ids" value="<%= ids %>"></input>' +
				'</div>' +
				'<div class="quantity">' +
					'<span class="label">Quantity</span>' +
					'<input type="text" name="quantity" value="<%= quantity %>"></input>' +
				'</div>' +
			'</form>';
		},
		itemPage: function() { 
			return '' +
				'<form class="item-form">' +
				'<h2><%= name %></h2>' +
				'<div class="option save">save</div>' +
				'<div class="option delete">delete</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#admin/items">items</a>&nbsp;>&nbsp;' +
					'<a href="#admin/items/<%=id%>"><%= name %></a>' +
				'</div>' +
				'<div class="spell-name">' +
					'<span class="label">Name</span>' +
					'<input type="text" name="name" value="<%= name %>"></input>' +
				'</div>' +
				'<div class="description">' +
					'<span class="label">Description</span>' +
					'<input type="text" name="description" value="<%= description %>"></input>' +
				'</div>' +
				'<div class="icon">' +
					'<span class="label">Icon</span>' +
					'<input type="text" name="image" value="<%= image %>"></input>' +
				'</div>' +
				'<div class="value">' +
					'<span class="label">Value</span>' +
					'<input type="text" name="value" value="<%= value %>"></input>' +
				'</div>' +
				'<div class="weight">' +
					'<span class="label">Weight</span>' +
					'<input type="text" name="weight" value="<%= weight %>"></input>' +
				'</div>' +
				'<div class="item-type">' +
					'<span class="label">Item Type</span>' +
					'<select name="itemType">'+
						'<option value="weapon" <% if(itemType=="weapon1"){%>selected<%}%>>Weapon</option>' +
						'<option value="armor" <% if(itemType=="armor"){%>selected<%}%>>Armor</option>' +
						'<option value="consumable" <% if(itemType=="consumable"){%>selected<%}%>>Consumable</option>' +
					'</select>' + 
				'</div>' +
				'<div class="range">' +
					'<span class="label">Range</span>' +
					'<input type="text" name="range" value="<%= range %>"></input>' +
				'</div>' +
				'<div class="damage">' +
					'<span class="label">Damage</span>' +
					'<input type="text" name="damage" value="<%= damage %>"></input>' +
				'</div>' +
				'<div class="damage-type">' +
					'<span class="label">Damage Type</span>' +
					'<input type="text" name="damageType" value="<%= damageType %>"></input>' +
				'</div>' +

				'<div class="slot">' +
					'<span class="label">Slot</span>' +
					'<input type="text" name="slot" value="<%= slot %>"></input>' +
				'</div>' +				
				'<div class="protection">' +
					'<span class="label">Protection</span>' +
					'<input type="text" name="protection" value="<%= protection %>"></input>' +
				'</div>' +
			'</form>';
		}, collectionView: function() {
			return '<div class="list-view">' + 
				'<h2><%=type%></h2>' +
				'<div data-url="admin/<%=type%>/new" class="option new">new</div>' +
				'<div class="clear breadcrumb">' +
					'<a href="#admin">home</a>&nbsp;>&nbsp;' +
					'<a href="#admin/<%=type%>"><%=type%></a>' +
				'</div>' +
				'<div class="labels">' +
					'<div class="title">Name</div>' +
						'<div class="description">Description</div>' +
						'<div class="last-modified">Last Modified</div>' +
					'</div>' +
					'<div class="spells">' +
						'<% _.each(items, function(item) { %>' +
						'<div data-id="<%=type%>/<%=item.id%>">' +
							'<div class="title"><%=item.name%></div>' +
							'<div class="description"><%=item.description%></div>' +
							'<div class="last-modified"><%=item.lastModified%></div>' +
						'</div>' +
						'<% }); %>' +
					'</div></div>';	
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

        $.post("/create", data, function(response){
        	//console.log(response);
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
	$clientIframe = $("<iframe src='../debug.html'></iframe>");
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
			$clientIframe.ready(initGame);
			//console.log("TEEHEE");
		});
	}

	$(".selection").on("click", ".char", loadGame);

	window.initGame = function(){
		//window.$clientIframeTest = $clientIframe;
		console.log("RDY");
		$gameClient.css("visibility", "visible");
		$gameClient.css({
			opacity: 1,
			top: 0
		});
		$('body').css("overflow", "hidden");
		$clientIframe.focus();
		//setTimeout(function() {$clientIframe.focus();}, 2000);
	}

	$registerBtn.click(function(evt){
		$registerBtn.html("loading");
		evt.preventDefault();
		var info = {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}

		//initAccount();
		
		$.ajax({
			type: "POST",
			url: "/register",
			data: info,
			success: function(data){
				initAccount(data);
			},
			error: function(data) {
				alert("Registration failed.");
				resetLoginButtons();
			}
			//var template = templates.characterItem(data);

		});
		
	});


	function resetLoginButtons() {
		$loginBtn.html("login");
		$registerBtn.html("register");
	}
	
	function initAccount(token) {
		setCookie("token",token,60*60);
		$charSelect.html("");
		states.isLoggedIn = true;
		var charsUrl = "characters.json";
		
		$.post("/chars", token, function(data){
			var chars = JSON.parse(data);
			//console.log("!",data);
			//var chars = data;
			console.log(chars);
			//var compiled = _.templates(templates.classesModal, chars);
			//$charSelect.html(compiled);
			for(var obj in chars){
				var $template = $(templates.characterItem(chars[obj])).hide();
				$charSelect.append($template);
				$template.fadeIn();
			}
			displayMain();
		});
		
		/*
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
		*/
	}

	$searchBar.focus(fadeInResults);
	$searchBar.focusout(fadeOutResults);

	$searchBar.keyup(function() {
		var results = searchCollections($searchBar.val());
		if(results.length > 0) {
			$results.html(_.template(templates.searchResults(), {results:results}));
			fadeInResults();
		} else {
			$results.html("");
			fadeOutResults();
		}
	});

	function searchCollections(query) {
		var results = [];
		for(var category in Collections) {
			_.each(Collections[category].models, function(model) {
				var lo = model.get("name").toLowerCase();			
				if(lo.contains(query) && query != "") {
					results.push({
						name: model.get('name'),
						type: category,
						id: model.get('id'),
						time: model.get('lastModified')
					});
				}
			});
		}
		return results;
	}

	function fadeInResults(){
		if($results.html() != "") {		
			$results.css({
				"top": "74px",
				"opacity": 1,
				"pointer-events": "all"
			});
		}
	}

	function fadeOutResults(){
		$results.css({
			"top": "69px",
			"opacity": 0,
			"pointer-events": "none"
		});
	}


	function makeBaseAuth(info) {
	  var tok = info.email + ':' + info.password;
	  var hash = btoa(tok);
	  return "Basic " + hash;
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
	
	var models = {
		classes: Backbone.Model.extend({
				defaults: {
					id: 0,
					name: "New Class",
					description: "",
					health: 0,
					mana: 0,
					stats: "Intelligence,Strength,Agility",
					base: "",
					growth: "",
					spritesheet: ""
				}			
			}),
		items: Backbone.Model.extend({
						defaults: {
							id: 0,
							name: "New Item",
							description: "",
							value: 0,
							weight: 0,
							image: "",
							itemType: "weapon1",
							
							range: 0,
							damage: 0,
							damageType: "",

							slot: "",
							protection: 0,
							armorType: "",
						}			
					}),
		quests: Backbone.Model.extend(),
		effects: Backbone.Model.extend(),
		npcs: Backbone.Model.extend(),
		spells: Backbone.Model.extend()
	}
	var SpellModel = Backbone.Model.extend();
	var NpcModel = Backbone.Model.extend();
	var QuestModel = Backbone.Model.extend();
	var ItemModel = Backbone.Model.extend();
	var EffectModel = Backbone.Model.extend();

	var DefaultDetailView = Backbone.View.extend({
		el: $('.admin-main'),
		checkboxes: [],
		ints: [],
		doubles: [],
		lists: [],
		events: {
			"change input": "update",
			"click .save": "saveChanges"
		},
		render: function() {
			this.$el.html(this.template(this.model.attributes));
    			return this;
		},
		update: function(evt) {
			var current = evt.currentTarget;
			var key = current.name;
			var value = current.value;
			this.model.set(key, value);
		},	
		saveChanges: function() {
			var data = this.$el.find("form").serializeArray();
			for(var key in this.checkboxes) {
				this.model.set(this.checkboxes[key], false);
				console.log("!");
			}
			for(var i = 0; i < data.length; i++) {
				var key = data[i].name;
				var value = data[i].value;
				if(_.contains(this.checkboxes, key)){
					console.log(key);
					this.model.set(key, true);
				} else if(_.contains(this.ints, key)){
					this.model.set(key, parseInt(value, 10));
				} else if(_.contains(this.doubles, key)){
					this.model.set(key, parseDouble(value, 10));
				} else if(_.contains(this.lists, key)){
					this.model.set(key, value.split(","));
				} else {
					this.model.set(key, value);
				}
			}	
			alert("Saved!");
		}
	});

	var ListView = Backbone.View.extend({
		el: $('.admin-main'),
		template: _.template(templates.collectionView()),
		events: {
			"click .option.new": "createNew"
		},
		createNew: function() {
			var url = this.$el.find(".option.new").data("url");
			console.log(this.$el.find(".option.new"), url);
			router.navigate(url, {trigger: true});
		},
		render: function(list) {
			console.log("??", list);
			this.$el.html(this.template(list));
			return this;
		}
	});

	var Collections = {
		spells: new (Backbone.Collection.extend({
			model: models["spells"],
			url: 'spells.json'
		})), 
		classes: new (Backbone.Collection.extend({
			model: models["classes"],
			url: '/classes',
			parse: function(response) {
				// flatten the json
				var items = [];
				var id = 0;
				for(var entry in response) {
					var count
					var item = response[entry];	
					var parsed = {
						id: item.id,
						name: item.name,
						description: item.description,
						health: item.baseHealth,
						mana: item.baseMana,
						spritesheet: "",
					}
			
					var stats = item.baseStats.stats;
					var statNames = [];
					var statBases = [];
					var statGrowths = [];
					for(var stat in stats) {
						var current = stats[stat];
						for(key in current) {
							if(key != "growth") {
								statNames.push(key);
								statBases.push(current[key]);
							} else {
								statGrowths.push(current[key]);
							}
						}
					}
					parsed.stats = statNames.join(",");
					parsed.base = statBases.join(",");					
					parsed.growth = statGrowths.join(",");
					items.push(parsed);
					id++;
				}
				return items;
			}
		})), 
		npcs: new (Backbone.Collection.extend({
			model: models["npcs"],
			//url: 'npcs.json'
			url: '/npcs',
			parse: function(response) {
				// fill in blank descriptions to prevent it from breaking
				for(var entry in response) {
					response[entry].description = "";
				}
				return response;
			}
		})), 
		effects: new (Backbone.Collection.extend({
			model: models["effects"],
			url: 'effects.json'
		})),
		quests: new (Backbone.Collection.extend({
			model: models["quests"],
			url: 'quests.json'
		})),
		items: new (Backbone.Collection.extend({
			model: models["items"],
			//url: 'items2.json',			
			url: '/items',
			parse: function(response) {
				// flatten the json
				var items = [];
				for(var entry in response) {
					var item = response[entry];	
					var parsed = {
						id: item.id,
						name: item.name,
						description: "",
						value: item.value,
						weight: item.weight,
						image: item.image,
						itemType: item.itemType.type,
						
						range: 0,
						damage: 0,
						damageType: "",

						slot: "",
						protection: 0,
						armorType: "",
					}
					if(parsed.itemType == "armor"){
						parsed.slot = item.itemType.slot;
						parsed.protection = item.itemType.protection;
					}

					if(parsed.itemType == "weapon1"){
						parsed.range = item.itemType.range;
						parsed.damage = item.itemType.damage;
						parsed.damageType = item.itemType.damageType;
					}
					items.push(parsed);
				}
				return items;
			}
		}))
	}

	var Views = {
		spells:  DefaultDetailView.extend({
			template: _.template(templates.spellPage()),
		}),
		classes:  DefaultDetailView.extend({
			template: _.template(templates.classPage()),
			lists: ["stats", "base", "growth"],
			ints: ["health", "mana"],
			saveChanges: function() {
				console.log("!!!");
				//this.model.set("name", this.model.get("id"));
				$.post("/class", _.extend(this.model.attributes,{token:getCookie("token")}), function(response){ 
					console.log(response);
					router.navigate("admin/classes", {trigger:true});					
				});
			}
		}),
		npcs:  DefaultDetailView.extend({
			template: _.template(templates.npcPage()),
			ints: ["room", "weapon", "helmet", "torso", "legs", "feet", "experience", "level", "maximumHealth", "maximumMana"],
		}),
		effects:  DefaultDetailView.extend({
			template: _.template(templates.effectPage()),
			checkboxes: ["isValueRelative", "isRelative"],
			ints: ["interval", "length", "value"],
			doubles: ["multiplier"]
		}),
		quests:  DefaultDetailView.extend({
			template: _.template(templates.questPage()),
			ints: ["quantity", "ids"],
		}),
		items:  DefaultDetailView.extend({
			template: _.template(templates.itemPage()),
			ints: ["value","weight", "range", "damage", "slot"],
			saveChanges: function() {
				$.post("/item", _.extend(this.model.attributes,{token:getCookie("token")}), function(response){ 
					console.log(response);	
					router.navigate("admin/items", {trigger:true});			
				});
				
			}
		})
	};

	var promises = {
		spells: $.Deferred(),
		classes: $.Deferred(),
		npcs: $.Deferred(),
		effects: $.Deferred(),
		quests: $.Deferred(),
		items: $.Deferred()
	}
	
	var loaders = {
		spells: function() {
			Collections.spells.fetch()
				.complete(promises.spells.resolve);
		},
		classes: function() {
			console.log("claz");
			Collections.classes.fetch()
				.complete(promises.classes.resolve);
		},
		npcs: function() {
			console.log("npcz");
			Collections.npcs.fetch()
				.complete(promises.npcs.resolve);
		},
		effects: function() {
			console.log("effectz");
			Collections.effects.fetch()
				.complete(promises.effects.resolve);
		},
		quests: function() {
			console.log("qustsz");
			Collections.quests.fetch()
				.complete(promises.quests.resolve);
		},
		items: function() {
			console.log("itemz");
			Collections.items.fetch()
				.complete(promises.items.resolve);
		},
	}

	var currentDetail;
	var renderers = {
		collection: function(type) {
			displayAdmin();
			var listView = new ListView();
			listView.render({
				type: type,
				items: Collections[type].toJSON()
			});
		},
		detail: function(type, id) {
			if(currentDetail) currentDetail.undelegateEvents(); 
			displayAdmin();
			var collection = Collections[type];
			//var View = Views[type];
			var model = collection.get(id);
			if(model != undefined) {
				currentDetail = new Views[type]({model: collection.get(id)});
			} else {
				var id = -1;
				_.each(collection.models, function(m) {
					id = (m.get("id") > id) ? m.get("id") : id;
				});
				id++;
				console.log("ID:",id);
				var newmodel = new models[type];
				newmodel.set("id", id);
				collection.add(newmodel);
				currentDetail = new Views[type]({model: newmodel});
			}
			currentDetail.render();
		}
	}

	var initializeData = $.Callbacks("once");
	initializeData.add(loaders.spells);
	initializeData.add(loaders.classes);		
	initializeData.add(loaders.npcs);		
	initializeData.add(loaders.effects);	
	initializeData.add(loaders.quests);
	initializeData.add(loaders.items);

	var Router = Backbone.Router.extend({
		routes : {
			"" : "main",
			"admin": "admin",
			"admin/:collection": "collectionView",
			"admin/:collection/:id": "itemView"
		},
		main: function() {
			displayMain();
			//initAccount();
		},
		admin: function() {
			console.log("lold");
			displayAdmin();
			this.navigate("admin/classes", {trigger:true});
		},
		collectionView: function(collection) {
			console.log(collection);
			initializeData.fire(loaders[collection]);
			promises[collection].done(function() {
				console.log("!?!");
				renderers.collection(collection);
			});
		},
		itemView: function(collection, id) {
			initializeData.fire(loaders[collection]);
			promises[collection].done(function(){
				console.log("4");
				renderers.detail(collection, id);			
			});
		}

	});
	var router = new Router();
	Backbone.history.start();

	function canShowAccounts() {
		console.log(states);
	
		if(states.isLoggedIn) {
			$searchBar.stop().fadeOut();
			$(".login-page").css("display", "none");
			$(".accounts").css("display", "block");
			return true	
		} else {
			console.log("show login screen");
			return false;
		}
	}

	function displayMain() {
		if(canShowAccounts()) {
			console.log("maining");
			resetLoginButtons();
			$(".login-page, .admin-content").hide();
			$(".accounts, .player-content").show();
			$searchBar.stop().fadeOut();

			$.get("/classes", function(data){
				var response = JSON.parse(data);
				$classInfo.html("");
				$classList.html("");
				var classes = response;
				for(var obj in classes){
					console.log(classes[obj].name);
					$classList.append('<div>'+classes[obj].name+'</div>');
					//console.log(templates.classSummary(classes[obj]));
					var $template = $(templates.classSummary(classes[obj]));
					$classInfo.append($template);
				}
				$classSummary = $(".modals .create .info");
			});
		}
	}

	function displayAdmin() {
		if (!canShowAccounts())
			return
		if(!states.viewingAdmin) {			
			$searchBar.stop().fadeIn();
			$(".player-content").css("display", "none");
			$(".admin-content").css("display", "block");
		}
	}

	//function i


	$(".admin-main").on("click", ".spells > div", function() {
		var url = $(this).data('id');
		console.log(url);
		router.navigate("/admin/" + url, {trigger:true});
	});
});
