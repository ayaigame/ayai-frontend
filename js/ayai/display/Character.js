this.ayai = this.ayai || {};
(function() {
    var Character = function(texture, id, x, y) {
        // constructor
        //
        this.id = id;
        var texture = new PIXI.Texture.fromFrame(ayai.charTexture);
      
        this.sprite = new PIXI.Sprite(texture);

        console.log(this.sprite);
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        ayai.stage.addChild(this.sprite);
    };
    var p = Character.prototype;


    //  public properties 
    //  =================     
    p.id = null;
    p.sprite = null;
    p.position = {x: 0, y: 0};
    

    //  private properties
    //  ==================


    //  public methods
    //  ==============


    p.setPosition = function(x, y){

        this.sprite.position.x = x;
        this.sprite.position.y = y;


    }

    p.removeFromStage = function() {

        ayai.stage.removeChild(this.sprite);

    }

    //  private methods
    //  ===============



ayai.Character = Character; }(window));
