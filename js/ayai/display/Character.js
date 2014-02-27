define("Character", ["phaser"], function(Phaser) {


    var p = Character.prototype;

    function Character (json) {
        // constructor

        p.id = json.id;
        p.name = json.name
        p.level = json.level
        p.experience = json.experience
        p.health = json.health;
        p.Mana = json.Mana;

    };


    //  public properties 
    //  =================     
    p.id = null;
    p.name = null;
    p.experience = null;
    p.level = null;
    p.sprite = null;
    p.position = {x: 0, y: 0};
    p.health = {currHealth : 0, maximumHealth: 0};
    p.Mana = {currMana : 0, maximumMana: 0}

    //  private properties
    //  ==================


    //  public methods
    //  ==============

    p.buildSprite = function(game) {

        p.sprite = game.add.sprite(p.position.x, p.position.y, 'guy');
        p.sprite.inputEnabled = true;
        p.sprite.input.pixelPerfect = true;
        p.sprite.input.useHandCursor = true;

        p.sprite.events.onInputDown.add(function() {
            
            $("ul.unitframes li#target").css("display", "none");

            Window.target = this;
            console.log(Window.target);

            $("ul.unitframes li#target").css("display", "block");

        }, this);

        p.sprite.animations.add('facedown', [1]);
        p.sprite.animations.add('faceleft', [4]);
        p.sprite.animations.add('faceright', [7]);
        p.sprite.animations.add('faceup', [10]);
        p.sprite.animations.add('walkdown', [0, 1, 2]);
        p.sprite.animations.add('walkleft', [3, 4, 5]);
        p.sprite.animations.add('walkright', [6, 7, 8]);
        p.sprite.animations.add('walkup', [9, 10, 11]);

        var style = { font: "14px Arial", fill: "#ffffff", align: "center" };

        p.namePlate =  game.add.text(p.sprite.x + 16, p.sprite.y - 16, p.name, style);

        //  And this starts the animation playing by using its key ("static")
        //  1 is the frame rate (1fps)
        //  true means it will loop when it finishes
        p.sprite.animations.play('facedown', 1, true);
    }


    p.syncPlayer = function(e) {
        p.sprite.x = e.position.x;
        p.sprite.y = e.position.y;
        p.name = e.name
        p.level = e.level
        p.experience = e.experience
        p.health = e.health;
        p.Mana = e.Mana;
        var healthPercent = Math.floor((e.health.currHealth / e.health.maximumHealth) * 100) + "%";
        var manaPercent = Math.floor((e.Mana.currMana / e.Mana.maximumMana) * 100) + "%";

        p.namePlate.x = p.sprite.x;
        p.namePlate.y = p.sprite.y - 24;
        p.namePlate.content = p.name;

        $("ul.unitframes li#player span.name").html(p.name);
        $("ul.unitframes li#player span.level").html(p.level);

        $("ul.unitframes li#player div.health span.total").html(e.health.currHealth.toString() + "/" + e.health.maximumHealth.toString());
        $("ul.unitframes li#player div.health span.percent").html(healthPercent);
        $("ul.unitframes li#player div.health div.bar").css("width", healthPercent);

        $("ul.unitframes li#player div.mana span.total").html(e.Mana.currMana.toString() + "/" + e.Mana.maximumMana.toString());
        $("ul.unitframes li#player div.mana span.percent").html(manaPercent);
        $("ul.unitframes li#player div.mana div.bar").css("width", manaPercent);

        p.targetEntity(e);

    }

    p.targetEntity = function(e) {
        if(Window.target != null) {

            if(Window.target.id == p.id) {

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
        p.sprite.animations.play(animationName, 15, true);

    }

    p.syncCharacter = function(e) {
        p.sprite.x = e.position.x;
        p.sprite.y = e.position.y;
        p.health = e.health;
        p.Mana = e.Mana;
        p.setAnimation(e.action);

        p.namePlate.x = p.sprite.x;
        p.namePlate.y = p.sprite.y - 24;
        p.namePlate.content = p.name;

        p.targetEntity(e);

    }

    p.removeFromStage = function() {
        ayai.stage.removeChild(p.sprite);
    }

    //  private methods
    //  ===============


    return Character;

});
