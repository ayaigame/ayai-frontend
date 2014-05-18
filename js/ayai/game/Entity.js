define("Entity", ["phaser"], function(Phaser) {

	var p = Entity.prototype;

	function Entity(json) {

		this.id = json.id;

		this.name = json.name;
		this.spritesheet = json.spritesheet.path;
		this.animations = json.spritesheet.animations;
		this.position = json.position;        


		this.currentAnimation = null;

		console.log(json);

		if (json.name === undefined && json.id != ayai.characterId) {
			this.entityType = p.ENTITY_TYPE.PROJECTILE;
			this.healthBarEnabled = false;
		} 

        else {

			this.entityType = p.ENTITY_TYPE.CHARACTER;
            this.healthBarEnabled = true;

			this.level = json.level;
			this.experience = json.experience;
			this.health = json.health;
			this.Mana = json.Mana;
			this.state = p.STATE.IDLE;
			this.facing = p.FACING.DOWN;
		}

		this.buildSprite();

	};

	//  public properties 
	//  =================    
	this.id = null;
	this.name = null;
	this.sprite = null;

	this.position = {
		x: 0,
		y: 0
	};

	this.experience = null;
	this.level = null;
	this.damages = [];
	this._startDamagePos = {
		x: 0,
		y: 0
	};

	this.Mana = {
		currMana: 0,
		maximumMana: 0
	};

	this.damages = [];
	this.facing = null;
	this.state = null;
	this.entityType = null;

	p.ENTITY_TYPE = {

		CHARACTER: 0,
		PROJECTILE: 1
	}

	p.FACING = {
		UP: 0,
		RIGHT: 1,
		DOWN: 2,
		LEFT: 3
	};

	p.STATE = {
		IDLE: 0,
		WALKING: 1,
	};

	this.health = {
		currHealth: 0,
		maximumHealth: 0
	};

	p.buildSprite = function() {

		this.sprite = ayai.game.add.sprite(this.position.x, this.position.y, this.spritesheet);

		for (var i = 0; i < this.animations.length; i++) {
			var animation = this.animations[i];
			var frames = [];
			for (var x = animation.startFrame; x <= animation.endFrame; x++) {
				frames.push(x);
			}

			this.sprite.animations.add(animation.name, frames);
		}

		if (this.healthBarEnabled) {

			var style = {
				font: "14px Arial",
				fill: "#ffffff",
				align: "center"
			};

			this.namePlate = ayai.game.add.text(this.sprite.x + 16, this.sprite.y - 16, this.name, style);
			this.healthBar = ayai.game.add.sprite(this.sprite.x - 8, this.sprite.y - 32, 'healthframe');
			this.healthBar.animations.add('bar', [0]);
			this.healthBar.animations.play('bar', 1, true);
			this.healthBar.width = 0;

			this.healthFrame = ayai.game.add.sprite(this.sprite.x - 8, this.sprite.y - 32, 'healthframe');
			this.healthFrame.animations.add('frame', [1]);
			this.healthFrame.animations.play('frame', 1, true);
			this.setAnimation('facedown', 15, false);

		}

        if(this.entityType == p.ENTITY_TYPE.CHARACTER) {

            this.registerSpriteTargeting();
        }

	};

	p.syncEntity = function(e) {

		this.sprite.x = e.position.x;
		this.sprite.y = e.position.y;

		if (this.entityType == p.ENTITY_TYPE.CHARACTER) {

			this.name = e.name;
			this.level = e.level;
			this.experience = e.experience;
			this.health = e.health;
			this.Mana = e.Mana;
		}

		if (this.healthBarEnabled) {

			var healthPercent = Math.floor((e.health.currHealth / e.health.maximumHealth) * 100) + "%";
			var manaPercent = Math.floor((e.Mana.currMana / e.Mana.maximumMana) * 100) + "%";

			this.namePlate.x = this.sprite.x;
			this.namePlate.y = this.sprite.y - 18;
			this.namePlate.content = this.name;
			this.healthBar.x = this.sprite.x - 8;
			this.healthBar.y = this.sprite.y - 32;

			ayai.game.add.tween(this.healthBar).to({
				width: 48 * (e.health.currHealth / e.health.maximumHealth)
			}, 250, Phaser.Easing.Linear.None, true, 0);

			this.healthFrame.x = this.sprite.x - 8;
			this.healthFrame.y = this.sprite.y - 32;
		}
	};

	p.displayDamage = function(amount) {

		if (this.healthBarEnabled) {

			var x = amount;
			var style = {
				font: "30px Arial",
				fill: "#ff0000",
				align: "center"
			};
			var styleOutline = {
				font: "30px Arial",
				fill: "#000000",
				align: "center"
			};

			var digits = x.toString().split("");
			digits.unshift("-");
			var digitTexts = [];
			var digitTextOutlines = [];

			for (var i = 0; i < digits.length; i++) {

				var digitTextOutline = ayai.game.add.text((this.sprite.x + 26) + (i * 15), this.sprite.y - 17, digits[i], styleOutline);
				var digitText = ayai.game.add.text((this.sprite.x + 24) + (i * 15), this.sprite.y - 18, digits[i], style);

				digitTexts.push(digitText);
				digitTextOutlines.push(digitTextOutline);
				ayai.game.add.tween(digitText)
					.to({
						y: this.sprite.y + 7
					}, 750, Phaser.Easing.Bounce.Out, true, (i * 100))
					.to({
						alpha: 0
					}, 500, Phaser.Easing.Linear.None, true, (100))
					.start();

				ayai.game.add.tween(digitTextOutline)
					.to({
						y: this.sprite.y + 8
					}, 750, Phaser.Easing.Bounce.Out, true, (i * 100))
					.to({
						alpha: 0
					}, 500, Phaser.Easing.Linear.None, true, (100))
					.start();
			}

			damages.push({
				digits: digitTexts,
				digitOutlines: digitTextOutlines
			});

		}

	}

	p.setAnimation = function(animationName, fps, loop) {

		var a = loop == undefined ? true : loop;
		var b = fps == undefined ? 15 : fps;

		//  this starts the animation playing by using its key 
		//  1 is the frame rate (1fps)
		//  true means it will loop when it finishes

		this.currentAnimation = animationName;
		this.sprite.animations.play(animationName, b, a);
	}

	p.removeFromStage = function() {

		if (this.healthBarEnabled) {

			this.namePlate.destroy();
			this.healthFrame.destroy();
			this.healthBar.destroy();
		}

		this.sprite.destroy();

	}

	p.registerSpriteTargeting = function() {

		this.sprite.inputEnabled = true;
		this.sprite.input.pixelPerfect = true;
		this.sprite.input.useHandCursor = true;

		this.sprite.events.onInputDown.add(function() {
			Window.target = this;
			console.log(Window.target.id);
			$("ul.unitframes li#target").css("display", "none");
			$("ul.unitframes li#target").css("display", "block");
			ayai.gameState.sendNPCInteractionMessage(Window.target.id);
		}, this);

		var self = this;
		this.sprite.events.onAnimationComplete.add(function() {
			self.resolveAnimation();
		});

	}

	p.resolveAnimation = function() {

		if (this.currentAnimation != undefined) {
			if (this.currentAnimation.indexOf("attack") != -1) {

				var anim = ""

				switch (this.state) {

					case p.STATE.WALKING:
						anim += "walk";
						break;

					case p.STATE.IDLE:
						anim += "face";
						break;

				}

				switch (this.facing) {

					case p.FACING.RIGHT:
						anim += "right";
						break;

					case p.FACING.LEFT:
						anim += "left";
						break;
					case p.FACING.UP:
						anim += "up";
						break;
					case p.FACING.DOWN:
						anim += "down";
						break;

				}

				this.setAnimation(anim);

			}
		}
	}

	return Entity;

});