this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        Window.verboseLogger = false;
        ayai.gameState = new ayai.GameStateInterface();

        ayai.json = [{id: 0, x: 0, y: 0}, {id: 1, x: 200, y: 0}, {id: 2, x: 300, y: 100}];
        this.assetManager = new ayai.AssetManager();
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

        tileMap = new ayai.TileMap(e.detail.json, e.detail.asset);
        ayai.stage.addChild(tileMap.getMap());
        
        var time = setInterval(function() {ayai.gameState.updateEntities();}, 1000);


        requestAnimFrame( animate );
         
        registerKeyEvents();
    }

    function registerKeyEvents() {
        console.log("Registering Key Events");
        console.log(new InputEvent("d"));
        kd.W.down(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("w")) });
        kd.A.down(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("a")) });
        kd.S.down(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("s")) });
        kd.D.down(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("d")) });
    }

    function animate() {

        ayai.gameState.update(ayai.renderer);
        requestAnimFrame(animate);
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
        document.addEventListener('assetsLoaded', this.showMap);
    }
    
    p._loadAssets = function() {
        
        this.assetManager.loadMapAssets(
                "/assets/maps/maps.json", 
                "/assets/tiles/tiles.png");

    }

    p._messageReceived = function (evt) {

        gameState.UpdateEntities(evt.detail.entities);
        console.log(evt.detail);
    }


ayai.Ayai = Ayai; }(window));
