this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        Window.verboseLogger = false;
        ayai.assetManager = new ayai.AssetManager();
        this.assetManager = ayai.assetManager;


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


    p.showMap = function(e) {


    }



    p.animate = function() {
        console.log("Animating");
        Window.gameState.update(ayai.renderer);
        window.requestAnimFrame(ayai.game.animate);
    } 

    //  private methods
    //  ===============

    p._initializeRenderer = function() {
        ayai.stage = new PIXI.Stage(0xffffff);
        ayai.renderer = PIXI.autoDetectRenderer(800, 480);
        document.body.appendChild(ayai.renderer.view);
    }


    p._registerListeners = function() {

        document.addEventListener("msgReceived", this._messageReceived);
        //document.addEventListener('assetsLoaded', this.showMap);
        document.addEventListener('assetsLoaded', this.createGamestate);
        document.addEventListener("gameStateDoneLoading", this.animate);
    }

    p.createGamestate = function() {
        Window.gameState = new ayai.GameStateInterface();
    }
    
    p._loadAssets = function() {
        
        this.assetManager.loadMapAssets(
                "/assets/maps/maps.json", 
                "/assets/tiles/tiles.png");

    }

    p._messageReceived = function (evt) {
    
        console.log(evt.detail);
    }


ayai.Ayai = Ayai; }(window));
