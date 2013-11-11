this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        this.connection = new ayai.Connection("ws://localhost:8000");
        this._initializeRenderer();
        this._registerListeners();
        this._loadAssets();
    };
    var p = Ayai.prototype;


    //  public properties 
    //  =================     

    //p.stage = null;
    //p.renderer = null;
    p.assets = null;
    p.connection = null;

    //  private properties
    //  ==================


    //  public methods
    //  ==============

    p.renderMap = function() {
        for(var i = 0; i < layers.length; i++)
            this._renderLayer(layers[i]);
    }


    //  private methods
    //  ===============

    p._initializeRenderer = function() {
        ayai.stage = new PIXI.Stage(0xffffff);
        ayai.renderer = PIXI.autoDetectRenderer(800, 480);
        document.body.appendChild(renderer.view);
    }

    p._registerListeners = function() {
        this.connection.addEventListener("msgReceived", this._messageRecieved);
    }

    p._loadAssets = function() {
        this.assets = new ayai.AssetManager();
    }

    p._messageRecieved = function (evt) {
        
    }



ayai.Ayai = Ayai; }(window));
