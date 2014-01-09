this.ayai = this.ayai || {};
(function() {
    var Character = function(id,x,y,currHealth,maximumHealth) {
        // constructor
        //
        this.id = id;
        this.name = "";
        this.sprite = ayai.game.add.sprite(x, y, 'guy');
        this.healthframe = ayai.game.add.sprite(x - 5, y - 40, 'frames');
        this.healthbar = ayai.game.add.sprite(x - 5, y - 40, 'frames');

        this.sprite.animations.add('facedown', [1]);
        this.sprite.animations.add('faceleft', [4]);
        this.sprite.animations.add('faceright', [7]);
        this.sprite.animations.add('faceup', [10]);
        this.sprite.animations.add('walkdown', [0, 1, 2]);
        this.sprite.animations.add('walkleft', [3, 4, 5]);
        this.sprite.animations.add('walkright', [6, 7, 8]);
        this.sprite.animations.add('walkup', [9, 10, 11]);

        this.healthframe.animations.add('frame', [0]);
        this.healthbar.animations.add('bar', [1]);

        //  And this starts the animation playing by using its key ("static")
        //  1 is the frame rate (1fps)
        //  true means it will loop when it finishes
        this.sprite.animations.play('facedown', 1, true);
        this.healthframe.animations.play('frame', 1, true);
        this.healthbar.animations.play('bar', 1, true);

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


    p.setAnimation = function(animationName) {
        this.sprite.animations.play(animationName, 15, true);

    }

    p.setPosition = function(x, y) {

        this.sprite.x = x;
        this.sprite.y = y;
        this.healthframe.x  = x - 50;
        this.healthframe.y = y - 40;
        this.healthbar.x = x  - 50;
        this.healthbar.y = y - 40;
     }

    p.setHealth = function(currHealth, maximumHealth) {
        this.health.currHealth = currHealth;
        this.health.maximumHealth = maximumHealth;
        this.healthbar.width = (currHealth / maximumHealth) * 126;

    }

    p.removeFromStage = function() {

        ayai.stage.removeChild(this.sprite);

    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
