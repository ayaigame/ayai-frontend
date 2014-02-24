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
			drag: function(event, ui) {},
			over: function(event, ui) {
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
		p.draggingItem = false;
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
				$("div#char-window").append("<div class='item-tooltip'><span class='title'>" + items[i].name + "</span></div>");
			}
			$("div#inventory ul.slots li div.item").draggable({
				snap: "div#equipment ul.slots li, div#inventory ul",
				snapMode: 'inner',
				revert: 'invalid'
			});
			$("div#inventory ul.slots li div.item").mouseover(function(e) {
				if (!($("div.item").hasClass("ui-draggable-dragging"))) {
					$("div.item-tooltip").addClass("open");
				}
				$(document).mousemove(function(ev) {
					if ($("div.item-tooltip").hasClass("open")) {
						$('div.item-tooltip').css({
							left: ev.pageX - 60,
							top: ev.pageY - 20
						});
					}	
				});
			});
			$("div#inventory ul.slots li div.item").mouseout(function(e) {
				$("div.item-tooltip").removeClass("open");
				$(document).mousemove(function(ev) {});
			});
		}
	};
	ayai.Inventory = Inventory;
}(window));