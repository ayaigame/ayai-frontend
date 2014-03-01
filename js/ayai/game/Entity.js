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

        var style = { font: "14px Arial", fill: "#ffffff", align: "center" };

        this.namePlate =  game.add.text(this.sprite.x + 16, this.sprite.y - 16, this.name, style);

        //  this starts the animation playing by using its key ("facedown")
        //  1 is the frame rate (1fps)
        //  true means it will loop when it finishes
        this.sprite.animations.play('facedown', 1, true);
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
        this.namePlate.y = this.sprite.y - 24;
        this.namePlate.content = this.name;

    };



    p.setAnimation = function(animationName) {
        this.sprite.animations.play(animationName, 15, true);

    }


    p.removeFromStage = function() {
        ayai.stage.removeChild(this.sprite);
    }

	return Entity;

});