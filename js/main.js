//var conenction = new WebSocket("ws://localhost:8080");
var stage;
var renderer;
var json;

$(document).ready(function(){


    Window.gameState= new GameStateInterface();
    console.log(Window.gameState);

    stage = new PIXI.Stage(0xffffff);
    renderer = PIXI.autoDetectRenderer(800, 480);
    document.body.appendChild(renderer.view);

    var jsonDeferred = $.Deferred();
    var assetDeferred = $.Deferred();

    // initializing tiles 
    // TODO: make this code modular/not awful
    var json; 
    var loader = new PIXI.JsonLoader("assets/maps/maps.json");
    loader.addEventListener("loaded", function(evt) {
        jsonDeferred.resolve();
        json = loader.json;
    });
    loader.load();




    var assetLoader = new PIXI.AssetLoader(["assets/tiles/tiles.png"]);
    assetLoader.addEventListener("onComplete", function() {
        assetDeferred.resolve();
    });
    assetLoader.load();

    var tileMap, player;
    $.when(jsonDeferred, assetDeferred).then(function begin(evt) {
        console.log("assets loaded");   
        
        // adding each tile to cache   
        for(var i = 0; i < 36; i++) {
            var tile = new PIXI.Texture.fromFrame("assets/tiles/tiles.png");
            var x = i%6;
            var y = parseInt(i/6);
            tile.setFrame(new PIXI.Rectangle(x*32, y*32, 32, 32));
            var temp = new PIXI.RenderTexture(33,33);
            temp.render(new PIXI.Sprite(tile));
            PIXI.Texture.addTextureToCache(temp, "tile" + i);
        }
        PIXI.Texture.removeTextureFromCache("assets/tiles/tiles.png");

        tileMap = new ayai.TileMap(json).getMap();
        stage.addChild(tileMap);
       
        // test square for player
        Window.player = new PIXI.Graphics();
        Window.player.beginFill(0x000000);
        Window.player.drawRect(0,0,32,32);
        stage.addChild(Window.player);

        requestAnimFrame( animate );
         
        registerKeyEvents();
    });

    function registerKeyEvents() {
        console.log("Registering Key Events");
        console.log(new InputEvent("d"));
        kd.W.down(function(e) {
            console.log("GOT W");
            Window.gameState.sendInputToGameState(new InputEvent("w"))
        });
        kd.A.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("a")) });
        kd.S.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("s")) });
        kd.D.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("d")) });
    }

    function animate() {


        Window.gameState.update(renderer);
        requestAnimFrame(animate);
    } 
});
