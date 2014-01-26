this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        ayai.verboseLogger = false;
        ayai.connection = new ayai.Connection("ws://localhost:8007");

        ayai.gameState = new ayai.GameStateInterface();
        ayai.uiElements = [];

        ayai.characterId = null;
        ayai.charTexture = null;
        this._registerListeners();

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
        ayai.game.load.audio('zelda', ['../assets/audio/overworld.mp3']);

        console.log(ayai.game.load);
    }

    window.onresize = function() {

        if(ayai.gameState.isLoaded) {
            var width = $(window).width();
            var height = $(window).height();   


            $('canvas')[0].width = width;
            $('canvas')[0].height = height;

            ayai.game.width = width;
            ayai.game.height = height;

            //ayai.game.stage.bounds.width = width;
            //ayai.game.stage.bounds.height = height;

            //ayai.game.renderer.resize(width, height);

            //TODO: Re-render all the sprites, tilemaplayers, and probably ui elements

            //renderMap('tileset', 'tilemap') //this works, but is really inefficient. need to figure out why.

            for(var i = 0; i < ayai.uiElements.length; i++) {
                ayai.uiElements[i].reposition();
            }
        }
    }

    function create() {

        console.log("Assets loaded. Ready to PLAY!!!111");

        //Tell the gamestate that we have loaded all the assets and that it can start updating from update messages
        ayai.gameState.isLoaded = true;
        
        ayai.inputHandler = new ayai.InputHandler();

        renderMap('tileset', 'tilemap');

        //Create UI Elements
        ayai.actionBar = new ayai.ActionBar();
        ayai.uiElements.push(ayai.actionBar);

        music = ayai.game.add.audio('zelda');
        music.play();
    }

    function renderMap(tileSheet, jsonFile){
        
        ayai.game.world.destroy();
        var tileset = ayai.game.add.tileset(tileSheet);
        var map = ayai.game.add.tilemap(jsonFile);

        console.log(map);

        //needs jquery
        var browserWidth = $(window).width();
        var browserHeight = $(window).height();
        var mapWidth =  map.layers[0].width * ayai.TILE_WIDTH;
        var mapHeight = map.layers[0].height * ayai.TILE_HEIGHT;

        //if the dimensions of the browser are less than the dimensions of the map, the camera gets set to the dimensions of the map.
        var width = Math.min(browserWidth, mapWidth);
        var height = Math.min(browserHeight, mapHeight);

        for(var i = 0; i < map.layers.length; i++) {
            ayai.game.add.tilemapLayer(0, 0, width, height, tileset, map, i);
        }

        Window.character = ayai.gameState.addCharacter(ayai.characterId, ayai.startingX, ayai.startingY, 1, 1);
        ayai.game.world.setBounds(0, 0, mapWidth, mapHeight);

        ayai.game.camera.follow(Window.character.sprite, Phaser.Camera.FOLLOW_TOPDOWN);



        ayai.game.camera.setSize(width, height);


    }


    function update() {

        //ayai.inputHandler.update();

    };

    function render() {};

    p._messageReceived = function(evt) {

        if(ayai.verboseLogger)
            console.log(evt.detail.msg);

        switch (evt.detail.msg.type) {
            case "id":
                console.log(evt.detail.msg);
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

            case "map":

                ayai.tileset2 = "/assets/tiles/" + evt.detail.msg.tilesets[0].image;
                ayai.tilemap2 = "/assets/maps/"+ evt.detail.msg.tilemap;

                ayai.game.load.tilemap('tilemap2', ayai.tilemap2, null, Phaser.Tilemap.TILED_JSON); 
                ayai.game.load.tileset('tileset2', ayai.tileset2, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
                ayai.game.load.start();
                ayai.gameState.isLoaded = false;
                
                ayai.game.load.onLoadComplete.dispatch = function() {
                    ayai.gameState.isLoaded = true;
                    renderMap('tileset2', 'tilemap2');
                }


            case "update":
                ayai.gameState.updateEntities(evt.detail.msg);

                break;
        }
    }
    ayai.Ayai = Ayai;
}(window));
