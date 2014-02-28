define("Character", ["phaser"], function(Phaser) {


    var p = Character.prototype;

    function Character (json) {
        // constructor

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

    //  private properties
    //  ==================


    //  public methods
    //  ==============

    p.buildSprite = function(game) {

        this.sprite = game.add.sprite(this.position.x, this.position.y, 'guy');
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
    }


    p.syncPlayer = function(e) {
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

        $("ul.unitframes li#player span.name").html(e.name);
        $("ul.unitframes li#player span.level").html(e.level);

        $("ul.unitframes li#player div.health span.total").html(e.health.currHealth.toString() + "/" + e.health.maximumHealth.toString());
        $("ul.unitframes li#player div.health span.percent").html(healthPercent);
        $("ul.unitframes li#player div.health div.bar").css("width", healthPercent);

        $("ul.unitframes li#player div.mana span.total").html(e.Mana.currMana.toString() + "/" + e.Mana.maximumMana.toString());
        $("ul.unitframes li#player div.mana span.percent").html(manaPercent);
        $("ul.unitframes li#player div.mana div.bar").css("width", manaPercent);

        p.targetEntity(e);

    }


    p.syncCharacter = function(e) {
        this.sprite.x = e.position.x;
        this.sprite.y = e.position.y;
        this.health = e.health;
        this.Mana = e.Mana;
        this.setAnimation(e.action);

        this.namePlate.x = this.sprite.x;
        this.namePlate.y = this.sprite.y - 24;
        this.namePlate.content = e.name;

        this.targetEntity(e);

    }


    p.targetEntity = function(e) {
        if(Window.target != null) {

            if(Window.target.id == e.id) {

                var targetHealthPercent = Math.floor((Window.target.health.currHealth / Window.target.health.maximumHealth) * 100) + "%";
                var targetManaPercent = Math.floor((Window.target.Mana.currMana / Window.target.Mana.maximumMana) * 100) + "%";

                $("ul.unitframes li#target span.name").html(Window.target.name);
                $("ul.unitframes li#target span.level").html(Window.target.level);

                $("ul.unitframes li#target div.health span.total").html(Window.target.health.currHealth.toString() + "/" + Window.target.health.maximumHealth.toString());
                $("ul.unitframes li#target div.health span.percent").html(targetHealthPercent);
                $("ul.unitframes li#target div.health div.bar").css("width", targetHealthPercent);

                $("ul.unitframes li#target div.mana span.total").html(Window.target.Mana.currMana.toString() + "/" + Window.target.Mana.maximumMana.toString());
                $("ul.unitframes li#target div.mana span.percent").html(targetManaPercent);
                $("ul.unitframes li#target div.mana div.bar").css("width", targetManaPercent);
            }
        }

    }

    p.targetVitals = function() {


    }

    p.setAnimation = function(animationName) {
        this.sprite.animations.play(animationName, 15, true);

    }

    p.removeFromStage = function() {
        ayai.stage.removeChild(this.sprite);
    }

    //  private methods
    //  ===============


    return Character;

});
