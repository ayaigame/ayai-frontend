this.ayai = this.ayai || {};
(function() {
	var Inventory = function() {
		/*$('div#char-window').draggable({

			drag: function() {
			
				$('div#char-window').width($('div#char-window div#container').width());	
				$('div#char-window').height($('div#char-window div#container').height());	
			}

		});*/



		$("div#equipment ul.slots li").droppable({
			over: function( event, ui ) {

				$(this).addClass("over");
			},

			out: function(event, ui) {
				$(this).removeClass("over");
			},

			drop: function(event, ui) {
				$(this).removeClass("over");
			}
		});

		$("div#inventory ul.slots li").droppable();

		p.isOpen = false;
		p.previousJson = "";
	};


	var p = Inventory.prototype;
	p.toggle = function() {
		$('div#char-window').toggleClass("open");
	};

	p.update = function(items) {
		if (this.previousJson == "") {
			this.previousJson = items;
			for (var i = 0; i < items.length; i++) {
				var slot = $("div#char-window div#inventory ul.slots").find("li")[i];
				$(slot).html("<div class='item item-1'></div>");
			}

			$("div#inventory ul.slots li div").draggable( {

				snap: "div#equipment ul.slots li, div#inventory ul",
				snapMode: 'inner',
				revert: 'invalid'
			});
		}
	};

	ayai.Inventory = Inventory;
}(window));