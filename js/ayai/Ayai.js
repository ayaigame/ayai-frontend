this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        this._initializeRenderer();
        this._registerListeners();
        this._loadAssets();
    };
    var p = Ayai.prototype;


    //  public properties 
    //  =================     

    p.stage = null;
    p.renderer = null;
    p.assets = null;

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
        this.stage = new PIXI.Stage(0xffffff);
        this.renderer = PIXI.autoDetectRenderer(800, 480);
        document.body.appendChild(renderer.view);
    }

    p._registerListeners = function() {
        //
    }

    p._loadAssets = function() {
        this.assets = new ayai.AssetManager();
    }



ayai.Ayai = Ayai; }(window));
