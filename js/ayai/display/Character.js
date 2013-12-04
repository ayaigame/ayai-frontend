this.ayai = this.ayai || {};
(function() {
<<<<<<< HEAD
    var Character = function(id,x,y,currHealth, maximumHealth) {
=======
    var Character = function(texture, id, x, y) {
>>>>>>> 7a9c09e132be1081d39d21f436d04033bbb30b82
        // constructor
        //
        this.id = id;
<<<<<<< HEAD
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0x000000);
        this.graphic.drawRect(0, 0, 32, 32);
        this.graphic.beginFill(0xff0000);
        this.graphic.drawRect(0, -10, 32, 5);
        this.setPosition(x,y);
        this.setHealth(currHealth,maximumHealth);
        ayai.stage.addChild(this.graphic);
=======
        var texture = new PIXI.Texture.fromFrame(ayai.charTexture);
      
        this.sprite = new PIXI.Sprite(texture);

        console.log(this.sprite);
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        ayai.stage.addChild(this.sprite);
>>>>>>> 7a9c09e132be1081d39d21f436d04033bbb30b82
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


    p.setPosition = function(x, y){

        this.sprite.position.x = x;
        this.sprite.position.y = y;


    }

    p.setHealth = function(currHealth, maximumHealth) {
        this.health.currHealth = currHealth;
        this.health.maximumHealth = maximumHealth;
            
    }

    p.removeFromStage = function() {

        ayai.stage.removeChild(this.sprite);

    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
