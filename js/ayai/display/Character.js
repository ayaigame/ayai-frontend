this.ayai = this.ayai || {};
(function() {
    var Character = function(id,x,y,currHealth, maximumHealth) {
        // constructor
        this.id = id;
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000);
        this.graphic.drawRect(0, 0, 32, 32);
        this.graphic.beginFill(0xff0000);
        this.graphic.drawRect(0, -10, 32, 5);
        this.setPosition(x,y);
        this.setHealth(currHealth,maximumHealth);
        ayai.stage.addChild(this.graphic);
    };
    var p = Character.prototype;


    //  public properties 
    //  =================     
    p.id = null;
    p.graphic = null;
    p.position = {x: 0, y: 0};
    p.health = {currHealth : 0, maximumHealth: 0};

    //  private properties
    //  ==================


    //  public methods
    //  ==============


    p.setPosition = function(x, y){

        this.graphic.position.x = x;
        this.graphic.position.y = y;


    }

    p.setHealth = function(currHealth, maximumHealth) {
        this.health.currHealth = currHealth;
        this.health.maximumHealth = maximumHealth;
            
    }

    p.removeFromStage = function() {

        ayai.stage.removeChild(this.graphic);

    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
