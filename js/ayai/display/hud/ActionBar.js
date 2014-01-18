this.ayai = this.ayai || {};
(function() {

	var ActionBar = function() {

		var style = {font: "10px Arial", fill: "#000000", align: "left"};

		this.iconGroup = ayai.game.add.group();

		for(var i = 0; i < 5; i++) {
			this.pos = {
				x: 20 + (i *55),
				y: $(window).height() - 60
			};

			var icon = new Phaser.Sprite(ayai.game, this.pos.x, this.pos.y, 'skillicon');
			icon.fixedToCamera = true;
			icon.cameraOffset.x = this.pos.x;
			icon.cameraOffset.y = this.pos.y;

			//ayai.game.add.text(pos.x, pos.y, (i+1), style);
			this.iconGroup.add(icon);
		}

	};


	var p  = ActionBar.prototype;

	p.reposition = function() {

		this.pos.y = $(window).height() - 60;
		var self = this;

		this.iconGroup.forEach(function(item) {
			item.cameraOffset.y = self.pos.y;
		});

	};

	ayai.ActionBar = ActionBar;}(window));