//var conenction = new WebSocket("ws://localhost:8080");
var stage;
var renderer;
var json;

$(document).ready(function(){

    window.gameState = GameStateInterface();

    stage = new PIXI.Stage(0xffffff);
    renderer = PIXI.autoDetectRenderer(800, 480);
    document.body.appendChild(renderer.view);

    // initializing tiles 
    // TODO: make this code modular/not awful
    var json; 
    var loader = new PIXI.JsonLoader("assets/maps/maps.json");
    loader.addEventListener("loaded", function(evt) {
        json = loader.json;
    });
    loader.load();

    var assetLoader = new PIXI.AssetLoader(["assets/tiles/tiles.png"]);
    assetLoader.addEventListener("onComplete", begin);
    assetLoader.load();

    var tileMap, player;
    function begin(evt) {
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

        tileMap = new TileMap(json).map();
        stage.addChild(tileMap);
       
        // test square for player
        player = new PIXI.Graphics();
        player.beginFill(0x000000);
        player.drawRect(0,0,32,32);
        stage.addChild(player);

        requestAnimFrame( animate );
         
        registerKeyEvents();
    }

    function registerKeyEvents() {
        kd.W.down(function(e) { gameState.sendInputToGameState(InputEvent.getKeypress("w")) });
        kd.A.down(function(e) { gameState.sendInputToGameState(InputEvent.getKeypress("a")) });
        kd.S.down(function(e) { gameState.sendInputToGameState(InputEvent.getKeypress("s")) });
        kd.D.down(function(e) { gameState.sendInputToGameState(InputEvent.getKeypress("d")) });
    }

    function animate() {
        gameState.update();
    } 
});
