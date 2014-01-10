this.ayai = this.ayai || {};
(function() {

	var ActionBar = function() {

		var style = {font: "10px Arial", fill: "#000000", align: "left"};

		var iconGroup = ayai.game.add.group();

		for(var i = 0; i < 5; i++) {
			var pos = {
				x: 20 + (i *55),
				y: $(window).height() - 60
			};

			var icon = new Phaser.Sprite(ayai.game, pos.x, pos.y, 'skillicon');
			icon.fixedToCamera = true;
			icon.cameraOffset.x = pos.x;
			icon.cameraOffset.y = pos.y;

			//ayai.game.add.text(pos.x, pos.y, (i+1), style);
			iconGroup.add(icon);
		}

	};

	var p  = ActionBar.prototype;


	ayai.ActionBar = ActionBar;}(window));