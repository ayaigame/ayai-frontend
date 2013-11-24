this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        Window.verboseLogger = false;
        Window.gameState = new ayai.GameStateInterface();
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

        Window.player = new PIXI.Graphics();
        Window.player.beginFill(0x000000);
        Window.player.drawRect(0,0,32,32);
        ayai.stage.addChild(Window.player);

        requestAnimFrame( animate );
         
        registerKeyEvents();
    }

    function registerKeyEvents() {
        console.log("Registering Key Events");
        console.log(new InputEvent("d"));

        kd.W.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("w")) });
        kd.A.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("a")) });
        kd.S.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("s")) });
        kd.D.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("d")) });

        kd.W.press(function(e) { Window.gameState.sendInputToGameState(new InputEvent("isUp")) });
        kd.A.press(function(e) { Window.gameState.sendInputToGameState(new InputEvent("isLeft")) });
        kd.S.press(function(e) { Window.gameState.sendInputToGameState(new InputEvent("isDown")) });
        kd.D.press(function(e) { Window.gameState.sendInputToGameState(new InputEvent("isRight")) });

        kd.W.up(function(e) { Window.gameState.sendInputToGameState(new InputEvent("!isUp")) });
        kd.A.up(function(e) { Window.gameState.sendInputToGameState(new InputEvent("!isLeft")) });
        kd.S.up(function(e) { Window.gameState.sendInputToGameState(new InputEvent("!isDown")) });
        kd.D.up(function(e) { Window.gameState.sendInputToGameState(new InputEvent("!isRight")) });
    }

    function animate() {

        Window.gameState.update(ayai.renderer);
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
    
        console.log(evt.detail);
    }


ayai.Ayai = Ayai; }(window));
