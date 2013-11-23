//var conenction = new WebSocket("ws://localhost:8080");
var stage;
var renderer;

$(document).ready(function(){

    new ayai.Ayai();

    /*
    Window.verboseLogger = true;
    Window.gameState= new GameStateInterface();
    console.log(Window.gameState);

    stage = new PIXI.Stage(0xffffff);
    renderer = PIXI.autoDetectRenderer(800, 480);
    document.body.appendChild(renderer.view);

    var jsonFile = "assets/maps/maps.json";
    var assetFile = "assets/tiles/tiles.png";

    // initializing tiles 
    // TODO: make this code modular/not awful

    var tileMap = new ayai.TileMap(jsonFile, assetFile);
    this.addEventListener("MapLoaded", begin);

    function begin(evt) {
        console.log("assets loaded");   
        
        stage.addChild(tileMap.getMap());
       
        // test square for player
        Window.player = new PIXI.Graphics();
        Window.player.beginFill(0x000000);
        Window.player.drawRect(0,0,32,32);
        stage.addChild(Window.player);

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
    }

    function animate() {


        Window.gameState.update(renderer);
        requestAnimFrame(animate);
    } */
});
