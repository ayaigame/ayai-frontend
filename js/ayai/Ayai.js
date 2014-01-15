this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        ayai.verboseLogger = false;
        ayai.connection = new ayai.Connection("ws://localhost:8007");
        ayai.gameState = new ayai.GameStateInterface();
        ayai.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WebGL, '', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });
        ayai.characterId = null;
        ayai.charTexture = null;
        this._registerListeners();
        this.registerKeyEvents();



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
        document.addEventListener('assetsLoaded', this.showMap);
    }

    function preload() {
        ayai.game.load.spritesheet('guy', '../assets/sprites/guy/guysheet.png', 32, 32);
        ayai.game.load.tilemap('map2', '../assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        ayai.game.load.tileset('grasstiles', '../assets/tiles/grasstiles.png', 32, 32);
        ayai.game.load.spritesheet('frames', '../assets/sprites/ui/framesheet.png', 128, 16);
        ayai.game.load.image('skillicon', '../assets/sprites/ui/skillsheet.png');

        ayai.game.load.tilemap('map3', '../assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
        ayai.game.load.tileset('sd3', '../assets/tiles/sd33.png', 32, 32);
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

        ayai.connection.connect();

        //hardcoded values for the map bounds (100 * 32 = 3200)
        ayai.game.world.setBounds(0, 0, 1280, 1280);

        //renderMap('grasstiles', 'map2');
        renderMap('sd3', 'map3')
        var actionBar = new ayai.ActionBar();

    }

    function renderMap(tileSheet, jsonFile){
        
        var map = ayai.game.add.tilemap(jsonFile);
        var tileset = ayai.game.add.tileset(tileSheet);

        for(var i = 0; i < map.layers.length; i++) {
            ayai.game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, tileset, map, i);
        }
    }

    function update() {};

    function render() {};

    p._messageReceived = function(evt) {

        switch (evt.detail.msg.type) {
            case "id":
                ayai.characterId = evt.detail.msg.id;
                console.log("connection established");

                break;

            case "fullsync":
                ayai.gameState.updateEntities(evt.detail.msg.characters);
                ayai.gameState.setCamera();
                break;
        }
    }
    ayai.Ayai = Ayai;
}(window));
