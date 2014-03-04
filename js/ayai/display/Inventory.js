define("Inventory", ["GameStateInterface"], function(GameStateInterface) {

	function Inventory() {


		p.isOpen = false;
		p.previousJson = "";
		p.itemBeingDragged = null;
		p.unequippingItemType = "";

		Handlebars.registerHelper('isWeapon', function(block) {
			if(this.itemType.type == "weapon")
				return block.fn(this);
		});

		Handlebars.registerHelper('isArmor', function(block) {
			if(this.itemType.type == "helmet" || this.itemType.type == "armor") // wat? armor types?
				return block.fn(this);
		});

	};

	var p = Inventory.prototype;
	p.toggle = function() {

		p.items = ayai.items;
		p.equipment = ayai.equipment;

		if(!p.isOpen) {
			p.renderEquipment();
			p.renderInventory();
			p.registerTooltipMouseovers();
			p.registerDraggables();
			p.isOpen = true;
		}

		else 
			p.isOpen = false;

		$('div#char-window').toggleClass("open");

	};

	p.renderEquipment = function() {

        var tplSource = $("#equipmentItem-template").html();
        var template = Handlebars.compile(tplSource);

		if(p.equipment.weapon1.name != "") {

			var weapon1 = template(p.equipment.weapon1);
			$("li#weapon1").html(weapon1);
		}

	};


	p.renderInventory = function() {

        var tplSource = $("#inventoryItemsView-template").html();
        var template = Handlebars.compile(tplSource);
		var html = template(p.items);
		$("div#items").html(html);

	}

	p.registerDraggables = function() {

		$("div#equipment ul.slots li#weapon1 div.item").draggable({

			revert: 'invalid',

			start: function(event, ui) {

				$("ul.slots li").css("z-index", "-10");
				$(this).parent().css("z-index", "100");
				p.unequippingItemType = $(this).parent().attr("id");
			},
			stop: function(event, ui) {
				$("ul.slots li").css("z-index", "");
			}
		});


		$("div#inventory ul.slots li div.item").draggable({

			distance: 10,
			zindex: 1000,
			revert: 'invalid',

			start: function(event, ui) {

				$("ul.slots li").css("z-index", "-10");
				$(this).parent().css("z-index", "100");
				//console.log("dragging item " + $(this).attr("index") + " from inventory");
				
				p.draggedItemIndex = parseInt($(this).attr("index"));
				//console.log(p.items[p.draggedItemIndex]);
			},

			stop: function(event, ui) {
				$("ul.slots li").css("z-index", "");
			}
		});

		$("div#equipment ul.slots li").droppable({

			greedy: true,
			over: function(event, ui) {
				$(this).addClass("over");

			},
			out: function(event, ui) {
				$(this).removeClass("over");
			},
			drop: function(event, ui) {
				$(this).removeClass("over");
				console.log("equipped ");
				var item = p.items[p.draggedItemIndex];
				console.log(item);

				ui.draggable.appendTo($(this));
				ui.draggable.css("left", "0px");
				ui.draggable.css("top", "0px");	

				var itemType = item.itemType.type;
				if(itemType == "weapon")
					itemType = "weapon1";

				GameStateInterface.prototype.sendEquip(p.draggedItemIndex, itemType);

				p.unequippingItemType = "";
			
				p.registerDraggables();
			}
		});

		$("div#inventory ul.slots li").droppable({

			greedy: true,
			over: function(event, ui) {
				$(this).addClass("over");
			},
			out: function(event, ui) {

				console.log("leaving inventory ");
				console.log(p.items[p.draggedItemIndex]);	
				$(this).removeClass("over");
			},
			drop: function(event, ui) {

				ui.draggable.appendTo($(this));
				ui.draggable.css("left", "0px");
				ui.draggable.css("top", "0px");	

				$(this).removeClass("over");

				if(p.unequippingItemType != "") {
					console.log("unequipping " + p.unequippingItemType);
					GameStateInterface.prototype.sendUnequip(p.unequippingItemType);
				}

				if($(this).parent().parent().attr("id") == "trash") {


					console.log("trashing " + p.draggedItemIndex);
					GameStateInterface.prototype.sendDropItem(p.draggedItemIndex);
				}

				p.unequippingItemType = "";
			

				p.registerDraggables();
			}
		});


	}

	p.registerTooltipMouseovers = function() {

		var tooltip = null;
		$("div#char-window ul.slots li").mouseover(function(e) {

			tooltip = $(this).children().children("div.item-tooltip");


			if (!($("div.item").hasClass("ui-draggable-dragging"))) {
				$(tooltip).addClass("open");
			}
			
			$(document).mousemove(function(ev) {
				if ($(tooltip).hasClass("open")) {
					$(tooltip).css({
						left: ev.clientX - 215 ,
						top: ev.clientY + 5
					});
				}
			});	
		});

		
		$("div#char-window ul.slots li").mouseout(function(ev) {
			$(tooltip).removeClass("open");
			$(tooltip).css({
						left: ev.clientX - 1500 ,
						top: ev.clientY - 1500
					});
			$(document).mousemove(function(ev) {});
		});
	};

	return Inventory;

});