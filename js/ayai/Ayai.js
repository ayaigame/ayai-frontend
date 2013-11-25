this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        Window.verboseLogger = false;
        ayai.gameState = new ayai.GameStateInterface();

        ayai.playerId = null;
        ayai.charTexture = null;
        //ayai.json = [{id: 0, x: 0, y: 0}, {id: 1, x: 200, y: 0}, {id: 2, x: 300, y: 100}];
        this.assetManager = new ayai.AssetManager();
        this.connection = new ayai.Connection("ws://localhost:8007");
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
        ayai.charTexture = e.detail.charSheet;
        ayai.stage.addChild(tileMap.getMap());
        

        requestAnimFrame( animate );
         
        registerKeyEvents();
    }

    function registerKeyEvents() {
        console.log("Registering Key Events");
        console.log(new InputEvent("d"));
    
         kd.W.press(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("isUp")) });
         kd.A.press(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("isLeft")) });
         kd.S.press(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("isDown")) });
         kd.D.press(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("isRight")) });
 
        kd.W.up(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("!isUp")) });
        kd.A.up(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("!isLeft")) });
        kd.S.up(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("!isDown")) });
        kd.D.up(function(e) { ayai.gameState.sendInputToGameState(new InputEvent("!isRight")) });  
        
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
        ayai.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        document.body.appendChild(ayai.renderer.view);
    }


    p._registerListeners = function() {

        document.addEventListener("msgReceived", this._messageReceived);
        document.addEventListener('assetsLoaded', this.showMap);
    }
    
    p._loadAssets = function() {
        
        this.assetManager.loadTestAssets(
                "/assets/maps/maps2.json", 
                "/assets/tiles/tiles.png",
                "/assets/sprites/guydown.png");
    
    }

    p._messageReceived = function (evt) {


    //    console.log(evt.detail);

        switch(evt.detail.msg.type){

            case "id":
                ayai.playerId = evt.detail.msg.id;
                break;

            case "fullsync":
                ayai.gameState.updateEntities(evt.detail.msg.players);
                break;
        }

    }


ayai.Ayai = Ayai; }(window));
