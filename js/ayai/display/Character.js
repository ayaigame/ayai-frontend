this.ayai = this.ayai || {};
(function() {
    var Character = function(id,x,y,currHealth,maximumHealth) {
        // constructor

        this.id = id;
        this.name = "";
        this.sprite = ayai.game.add.sprite(x, y, 'guy');


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

        this.healthbar = new ayai.HealthBar();

        this.setPosition(x,y);
        this.setHealth(currHealth,maximumHealth);

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


    p.setHealth = function(currHealth, maximumHealth) {

        this.healthbar.setHealth(currHealth, maximumHealth);
    }

    p.setAnimation = function(animationName) {
        this.sprite.animations.play(animationName, 15, true);

    }

    p.setPosition = function(x, y) {

        this.sprite.x = x;
        this.sprite.y = y;
        this.healthbar.setPosition(x, y);
     }

    p.removeFromStage = function() {
        ayai.stage.removeChild(this.sprite);
    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
