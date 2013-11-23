this.ayai = this.ayai || {};
(function() {
    var Character = function(id,x,y) {
        // constructor
        this.id = id;
        this.graphic = new PIXI.Square(0,0,32,32);
        this.graphic.x = x;
        this.graphic.y = y;
        ayai.stage.addChild(this.graphic);
    };
    var p = Character.prototype;


    //  public properties 
    //  =================     
    p.id = null;
    p.graphic = null;

    //  private properties
    //  ==================


    //  public methods
    //  ==============


    //  private methods
    //  ===============



ayai.Character = Character; }(window));
