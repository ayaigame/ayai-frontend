this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        ayai.verboseLogger = false;
        ayai.connection = new ayai.Connection("ws://localhost:8007");

        ayai.gameState = new ayai.GameStateInterface();

        ayai.characterId = null;
        ayai.charTexture = null;
        this._registerListeners();
        this.registerKeyEvents();

        ayai.TILE_WIDTH = 32;
        ayai.TILE_HEIGHT = 32;

        ayai.connection.connect();


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
    p.registerKeyEvents = function() {
        console.log("Registering Key Events");
        console.log(new InputEvent("d"));
        kd.W.press(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("isUp"))
        });
        kd.A.press(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("isLeft"))
        });
        kd.S.press(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("isDown"))
        });
        kd.D.press(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("isRight"))
        });
        kd.W.up(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("!isUp"))
        });
        kd.A.up(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("!isLeft"))
        });
        kd.S.up(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("!isDown"))
        });
        kd.D.up(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("!isRight"))
        });
        kd.W.down(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("w"))
        });
        kd.A.down(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("a"))
        });
        kd.S.down(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("s"))
        });
        kd.D.down(function(e) {
            ayai.gameState.sendInputToGameState(new InputEvent("d"))
        });
    }
    //  private methods
    //  ===============
    p._registerListeners = function() {
        document.addEventListener("msgReceived", this._messageReceived);
    }

    function preload() {

        console.log("Loading assets...");
        ayai.game.load.spritesheet('guy', '../assets/sprites/guy/guysheet.png', 32, 32);
        ayai.game.load.spritesheet('frames', '../assets/sprites/ui/framesheet.png', 128, 16);
        ayai.game.load.image('skillicon', '../assets/sprites/ui/skillsheet.png');

        ayai.game.load.tilemap('tilemap', ayai.tilemap, null, Phaser.Tilemap.TILED_JSON); 
        ayai.game.load.tileset('tileset', ayai.tileset, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
    }

    window.onresize = function() {

        var width = $(window).width();
        var height = $(window).height();   


        $('canvas')[0].width = width;
        $('canvas')[0].height = height;

        ayai.game.width = width;
        ayai.game.height = height;

        ayai.game.stage.bounds.width = width;
        ayai.game.stage.bounds.height = height;

        ayai.game.renderer.resize(width, height);

        //TODO: Re-render all the sprites, tilemaplayers, and probably ui elements


    }

    function create() {

        console.log("Assets loaded. Ready to PLAY!!!111")

        //Tell the gamestate that we have loaded all the assets and that it can start updating from sync messages
        ayai.gameState.isLoaded = true;

        renderMap('tileset', 'tilemap');
        ayai.gameState.createPlayerCharacter(ayai.characterId, ayai.startingX, ayai.startingY);

        //Create UI Elements
        var actionBar = new ayai.ActionBar();

    }

    function renderMap(tileSheet, jsonFile){
        
        var tileset = ayai.game.add.tileset(tileSheet);
        var map = ayai.game.add.tilemap(jsonFile);

        ayai.game.world.setBounds(0, 0, map.layers[0].width * ayai.TILE_WIDTH, map.layers[0].height * ayai.TILE_HEIGHT);

        for(var i = 0; i < map.layers.length; i++) {
            ayai.game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, tileset, map, i);
        }
    }


    function update() {};

    function render() {};

    p._messageReceived = function(evt) {
        
        if(ayai.verboseLogger)
            console.log(evt.detail.msg);

        switch (evt.detail.msg.type) {
            case "id":
                console.log("connection established");
                ayai.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WebGL, '', {
                    preload: preload,
                    create: create,
                    update: update,
                    render: render
                });

                ayai.characterId = evt.detail.msg.id;
                ayai.startingX  = evt.detail.msg.x;
                ayai.startingY = evt.detail.msg.y;
                ayai.tileset = evt.detail.msg.tileset;
                ayai.tilemap = evt.detail.msg.tilemap;

                break;

            case "fullsync":
                ayai.gameState.updateEntities(evt.detail.msg.characters);
                break;
        }
    }
    ayai.Ayai = Ayai;
}(window));
