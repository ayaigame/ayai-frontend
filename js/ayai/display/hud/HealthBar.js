this.ayai = this.ayai || {};
(function() {

	var HealthBar = function() {

		this.frame = ayai.game.add.sprite(0, 0, '');
		this.bar = ayai.game.add.sprite(0, 0, '');

		//this.frame.animations.add('frame', [0]);
		//this.bar.animations.add('bar', [1]);

		//this.frame.animations.play('frame', 1, true);
		//this.bar.animations.play('bar', 1, true);


	};
	var p = HealthBar.prototype;

	p.setPosition = function(x, y) {

        this.frame.x = x - 50;
        this.frame.y = y - 40;

        this.bar.x = x - 50;
        this.bar.y = y - 40;
	}

	p.setHealth = function(currHealth, maximumHealth) {
		this.bar.width = Math.ceil((currHealth / maximumHealth) * 128);
	}

	ayai.HealthBar = HealthBar;}(window));