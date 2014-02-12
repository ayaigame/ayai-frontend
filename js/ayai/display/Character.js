this.ayai = this.ayai || {};
(function() {
    var Character = function(json) {
        // constructor

        this.id = json.id;
        this.name = "";
        this.sprite = ayai.game.add.sprite(json.position.x, json.position.y, 'guy');

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

    //  private properties
    //  ==================


    //  public methods
    //  ==============


    p.syncPlayer = function(e) {
        this.sprite.x = e.position.x;
        this.sprite.y = e.position.y;
        var healthPercent = Math.floor((e.health.currHealth / e.health.maximumHealth) * 100) + "%";
        var manaPercent = Math.floor((e.Mana.currMana / e.Mana.maximumMana) * 100) + "%";

        $("div#player div.health span.total").html(e.health.currHealth.toString() + "/" + e.health.maximumHealth.toString());
        $("div#player div.health span.percent").html(healthPercent);
        $("div#player div.health div.bar").css("width", healthPercent);

        $("div#player div.mana span.total").html(e.Mana.currMana.toString() + "/" + e.Mana.maximumMana.toString());
        $("div#player div.mana span.percent").html(manaPercent);
        $("div#player div.mana div.bar").css("width", manaPercent);

    }

    p.setAnimation = function(animationName) {
        this.sprite.animations.play(animationName, 15, true);

    }

    p.syncCharacter = function(e) {
        this.sprite.x = e.position.x;
        this.sprite.y = e.position.y;
    }

    p.removeFromStage = function() {
        ayai.stage.removeChild(this.sprite);
    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
