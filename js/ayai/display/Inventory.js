define("Inventory", function() {

	function Inventory() {


		p.draggingItem = false;
		p.isOpen = false;
		p.previousJson = "";
	};

	var p = Inventory.prototype;
	p.toggle = function() {

		p.items = ayai.items;
		p.equipment = ayai.equipment;

		if(!p.isOpen) {
			p.renderEquipment();
			p.renderInventory();
			p.registerTooltipMouseovers();
			p.isOpen = true;
		}

		else 
			p.isOpen = false;

		$('div#char-window').toggleClass("open");

	};

	p.renderEquipment = function() {


		Handlebars.registerHelper('isWeapon', function(block) {
			if(this.itemType.type == "weapon")
				return block.fn(this);
		});

		Handlebars.registerHelper('isArmor', function(block) {
			if(this.itemType.type == "helmet" || this.itemType.type == "armor") // wat? armor types?
				return block.fn(this);
		});

        var tplSource = $("#equipmentItem-template").html();
        var template = Handlebars.compile(tplSource);
		var weapon1 = template(p.equipment.weapon1);
		$("li#weapon1").html(weapon1);



	};


	p.renderInventory = function() {


		Handlebars.registerHelper('isWeapon', function(block) {
			if(this.itemType.type == "weapon")
				return block.fn(this);
		});

		Handlebars.registerHelper('isArmor', function(block) {
			if(this.itemType.type == "helmet" || this.itemType.type == "armor") // wat? armor types?
				return block.fn(this);
		});

        var tplSource = $("#inventoryItemsView-template").html();
        var template = Handlebars.compile(tplSource);
		var html = template(p.items);
		$("div#items").html(html);

		$("div#char-window ul.slots li div.item").draggable({

				revert: 'invalid'
		});

		$("div#char-window ul.slots li").droppable({
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

	}

	p.registerTooltipMouseovers = function() {

		var tooltip = null;
		$("div#char-window ul.slots li").mouseover(function(e) {

			tooltip = $(this).children("div.item-tooltip");


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