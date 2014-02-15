this.ayai = this.ayai || {};
(function() {
    var Character = function(json) {
        // constructor

        this.id = json.id;
        this.name = "";
        this.sprite = ayai.game.add.sprite(json.position.x, json.position.y, 'guy');
        this.sprite.inputEnabled = true;
        this.sprite.input.pixelPerfect = true;
        this.sprite.input.useHandCursor = true;

        this.sprite.events.onInputDown.add(function() {
            
            $("ul.unitframes li#target").css("display", "none");

            Window.target = this;
            console.log(Window.target);

            $("ul.unitframes li#target").css("display", "block");

        }, this);

        //ayai.gameState.entitiesLayer.add(this.sprite);

        this.sprite.animations.add('facedown', [1]);
        this.sprite.animations.add('faceleft', [4]);
        this.sprite.animations.add('faceright', [7]);
        this.sprite.animations.add('faceup', [10]);
        this.sprite.animations.add('walkdown', [0, 1, 2]);
        this.sprite.animations.add('walkleft', [3, 4, 5]);
        this.sprite.animations.add('walkright', [6, 7, 8]);
        this.sprite.animations.add('walkup', [9, 10, 11]);

        //  And this starts the animation playing by using its key ("static")
        //  1 is the frame rate (1fps)
        //  true means it will loop when it finishes
        this.sprite.animations.play('facedown', 1, true);

        //this.healthbar = new ayai.HealthBar();

        //this.syncPlayer(json);

    };

    var p = Character.prototype;


    //  public properties 
    //  =================     
    p.id = null;
    p.sprite = null;
    p.position = {x: 0, y: 0};
    p.health = {currHealth : 0, maximumHealth: 0};
    p.Mana = {currMana : 0, maximumMana: 0}

    //  private properties
    //  ==================


    //  public methods
    //  ==============


    p.syncPlayer = function(e) {
        this.sprite.x = e.position.x;
        this.sprite.y = e.position.y;
        var healthPercent = Math.floor((e.health.currHealth / e.health.maximumHealth) * 100) + "%";
        var manaPercent = Math.floor((e.Mana.currMana / e.Mana.maximumMana) * 100) + "%";


        $("ul.unitframes li#player span.name").html(this.id);

        $("ul.unitframes li#player div.health span.total").html(e.health.currHealth.toString() + "/" + e.health.maximumHealth.toString());
        $("ul.unitframes li#player div.health span.percent").html(healthPercent);
        $("ul.unitframes li#player div.health div.bar").css("width", healthPercent);

        $("ul.unitframes li#player div.mana span.total").html(e.Mana.currMana.toString() + "/" + e.Mana.maximumMana.toString());
        $("ul.unitframes li#player div.mana span.percent").html(manaPercent);
        $("ul.unitframes li#player div.mana div.bar").css("width", manaPercent);


    }

    p.targetEntity = function(e) {


    }

    p.targetVitals = function() {


    }

    p.setAnimation = function(animationName) {
        this.sprite.animations.play(animationName, 15, true);

    }

    p.syncCharacter = function(e) {
        this.sprite.x = e.position.x;
        this.sprite.y = e.position.y;
        this.health.currHealth = e.health.currHealth;
        this.health.maximumHealth = e.health.maximumHealth;
        this.Mana.currMana = e.Mana.currMana;
        this.Mana.maximumMana = e.Mana.maximumMana;
        this.setAnimation(e.action);

        if(Window.target != null) {

            if(Window.target.id == this.id) {

                var targetHealthPercent = Math.floor((Window.target.health.currHealth / Window.target.health.maximumHealth) * 100) + "%";
                var targetManaPercent = Math.floor((Window.target.Mana.currMana / Window.target.Mana.maximumMana) * 100) + "%";

                $("ul.unitframes li#target span.name").html(Window.target.id);

                $("ul.unitframes li#target div.health span.total").html(Window.target.health.currHealth.toString() + "/" + Window.target.health.maximumHealth.toString());
                $("ul.unitframes li#target div.health span.percent").html(targetHealthPercent);
                $("ul.unitframes li#target div.health div.bar").css("width", targetHealthPercent);

                $("ul.unitframes li#target div.mana span.total").html(Window.target.Mana.currMana.toString() + "/" + Window.target.Mana.maximumMana.toString());
                $("ul.unitframes li#target div.mana span.percent").html(targetManaPercent);
                $("ul.unitframes li#target div.mana div.bar").css("width", targetManaPercent);
            }
        }

    }

    p.removeFromStage = function() {
        ayai.stage.removeChild(this.sprite);
    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
