define("Entity", ["phaser"], function(Phaser) {

	var p = Entity.prototype;

	function Entity(json) {

 		this.id = json.id;
        this.name = json.name;
        this.position = json.position;
        this.level = json.level;
        this.experience = json.experience;
        this.health = json.health;
        this.Mana = json.Mana;
        this._startDamagePos = {x: 0, y: 0};
        this.state = p.STATE.IDLE;
        this.facing = p.FACING.DOWN;
        this.currentAnimation = null;


	};

    //  public properties 
    //  =================    
  	this.id = null;
    this.name = null;
    this.experience = null;
    this.level = null;
    this.sprite = null;
    this.position = {x: 0, y: 0};
    this.health = {currHealth : 0, maximumHealth: 0};
    this.Mana = {currMana : 0, maximumMana: 0}
    this.damages = [];
    this.facing = null;
    this.state = null;

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


    this._startDamagePos = {x: 0, y: 0};


	p.buildSprite = function(game, spriteName) {

        this.sprite = game.add.sprite(this.position.x, this.position.y, spriteName);
        this.sprite.inputEnabled = true;
        this.sprite.input.pixelPerfect = true;
        this.sprite.input.useHandCursor = true;

        this.sprite.events.onInputDown.add(function() {
            
            $("ul.unitframes li#target").css("display", "none");

            Window.target = this;
            console.log(Window.target);

            $("ul.unitframes li#target").css("display", "block");

        }, this);

        this.sprite.animations.add('facedown', [1]);
        this.sprite.animations.add('faceleft', [4]);
        this.sprite.animations.add('faceright', [7]);
        this.sprite.animations.add('faceup', [10]);
        this.sprite.animations.add('walkdown', [0, 1, 2]);
        this.sprite.animations.add('walkleft', [3, 4, 5]);
        this.sprite.animations.add('walkright', [6, 7, 8]);
        this.sprite.animations.add('walkup', [9, 10, 11]);


        var attackDown = this.sprite.animations.add('attackdown', [12, 13, 14, 15]);
        var attackLeft = this.sprite.animations.add('attackleft', [18, 19, 20, 21]);
        var attackRight = this.sprite.animations.add('attackright', [24, 25, 26, 27]);
        var attackUp = this.sprite.animations.add('attackup', [30, 31, 32, 33]);

        var self = this;
        this.sprite.events.onAnimationComplete.add(function() {

            self.resolveAnimation();

        })


        var style = { font: "14px Arial", fill: "#ffffff", align: "center" };

        this.namePlate =  game.add.text(this.sprite.x + 16, this.sprite.y - 16, this.name, style);

        this.healthBar = game.add.sprite(this.sprite.x - 8, this.sprite.y - 32, 'healthframe');
        this.healthBar.animations.add('bar', [0]);
        this.healthBar.animations.play('bar', 1, true);
        this.healthBar.width = 0;

        this.healthFrame = game.add.sprite(this.sprite.x - 8, this.sprite.y - 32, 'healthframe');
        this.healthFrame.animations.add('frame', [1]);
        this.healthFrame.animations.play('frame', 1, true);


        this.setAnimation('facedown', 15, false);

        //.to( {props}, duration, easing, autostart, delay, repeats, yoyo)
		//game.add.tween(this.healthBar).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		//game.add.tween(this.healthFrame).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    };

     p.syncEntity = function(e) {

        this.sprite.x = e.position.x;
        this.sprite.y = e.position.y;
        this.name = e.name;
        this.level = e.level;
        this.experience = e.experience;
        this.health = e.health;
        this.Mana = e.Mana;
        var healthPercent = Math.floor((e.health.currHealth / e.health.maximumHealth) * 100) + "%";
        var manaPercent = Math.floor((e.Mana.currMana / e.Mana.maximumMana) * 100) + "%";


        this.namePlate.x = this.sprite.x;
        this.namePlate.y = this.sprite.y - 18;
        this.namePlate.content = this.name;

        this.healthBar.x = this.sprite.x - 8;
        this.healthBar.y = this.sprite.y - 32;


        ayai.game.add.tween(this.healthBar).to({ width: 48 * (e.health.currHealth / e.health.maximumHealth) }, 250, Phaser.Easing.Linear.None, true, 0);

        this.healthFrame.x = this.sprite.x - 8;
        this.healthFrame.y = this.sprite.y - 32;

    };

    p.resolveAnimation = function() {

        if (this.currentAnimation.indexOf("attack") != -1) {

            var anim = ""

            switch(this.state) {

                case p.STATE.WALKING:
                    anim += "walk";
                    break;

                case p.STATE.IDLE:
                    anim += "face";
                    break;

            }

            switch(this.facing) {

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

    p.displayDamage = function(amount) {

    	var x = amount;
        var style = { font: "30px Arial", fill: "#ff0000", align: "center" };
        var styleOutline = { font: "30px Arial", fill: "#000000", align: "center" };
      
        var digits =  x.toString().split("");
        digits.unshift("-");
        var digitTexts = [];
        var digitTextOutlines = [];

        for(var i = 0; i < digits.length; i++) {

        	this._startDamagePos.x = this.sprite.x;
        	this._startDamagePos.y = this.sprite.y;

            var digitTextOutline = ayai.game.add.text((this.sprite.x + 26) + (i * 15), this.sprite.y - 17,  digits[i], styleOutline);
        	var digitText = ayai.game.add.text((this.sprite.x + 24) + (i * 15), this.sprite.y - 18, digits[i], style);


        	digitTexts.push(digitText);
        	digitTextOutlines.push(digitTextOutline);
        	ayai.game.add.tween(digitText)
		    	.to({ y: this.sprite.y + 7 }, 750, Phaser.Easing.Bounce.Out, true, (i * 100))
		    	.to({ alpha: 0}, 500, Phaser.Easing.Linear.None, true, (100))
		    	.start();

		    ayai.game.add.tween(digitTextOutline)
		    	.to({ y: this.sprite.y + 8 }, 750, Phaser.Easing.Bounce.Out, true, (i * 100))
		    	.to({ alpha: 0}, 500, Phaser.Easing.Linear.None, true, (100))
		    	.start();
        }

        damages.push({ digits: digitTexts, digitOutlines: digitTextOutlines});
 		

		
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
        ayai.stage.removeChild(this.sprite);
    }

	return Entity;

});