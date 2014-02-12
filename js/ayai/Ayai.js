this.ayai = this.ayai || {};
(function() {
    var Ayai = function() {
        // constructor
        ayai.game = this;
        ayai.gameLoaded = false;
        ayai.verboseLogger = false;
        ayai.connection = new ayai.Connection("ws://localhost:8007");

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
        ayai.game.load.spritesheet('npc', '../assets/sprites/npc/npcsheet.png', 32, 48);
        ayai.game.load.spritesheet('frames', '../assets/sprites/ui/framesheet.png', 128, 16);
        ayai.game.load.spritesheet('itemicons', '../assets/sprites/ui/itemicons.png', 40, 40);
        ayai.game.load.image('skillicon', '../assets/sprites/ui/skillsheet.png');


        ayai.game.load.tilemap('tilemap', ayai.tilemap, null, Phaser.Tilemap.TILED_JSON); 
        ayai.game.load.tileset('tileset', ayai.tileset, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
        ayai.game.load.audio('zelda', ['../assets/audio/overworld.mp3']);
    }

    window.onresize = function() {

        if(ayai.gameLoaded) {
            ayai.gameLoaded = false;
            var width = $(window).width();
            var height = $(window).height();   

            $('canvas')[0].width = width;
            $('canvas')[0].height = height;

            ayai.game.width = width;
            ayai.game.height = height;

            ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);
        }
    }

    function create() {

        ayai.gameState = new ayai.GameStateInterface();

        console.log("Assets loaded. Ready to PLAY!!!111");

        ayai.chat = new ayai.Chat();
        ayai.inventory = new ayai.Inventory();
        ayai.inputHandler = new ayai.InputHandler();

        ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);

        music = ayai.game.add.audio('zelda');
        //music.play();
    }

    ayai.renderMap = function(tileset, tilemap, options){

        ayai.game.world.destroy();
        ayai.gameState.clearEntities();
        placeNpcs();

        var tileset = ayai.game.add.tileset(tileset);
        ayai.map = ayai.game.add.tilemap(tilemap);
        var map = ayai.map;

        console.log(map);

        var a = options == 'undefined' ? options : {};

        //needs jquery
        var browserWidth = $(window).width();
        var browserHeight = $(window).height();
        var mapWidth =  map.layers[0].width * ayai.TILE_WIDTH;
        var mapHeight = map.layers[0].height * ayai.TILE_HEIGHT;

        console.log(mapWidth);

        //if the dimensions of the browser are less than the dimensions of the map, the camera gets set to the dimensions of the map.
        var width = Math.min(browserWidth, mapWidth);
        var height = Math.min(browserHeight, mapHeight);

        for(var i = 0; i < map.layers.length; i++) {
            if(map.layers[i].name != "collision")
                ayai.game.add.tilemapLayer(0, 0, width, height, tileset, map, i);
        }

        Window.character = ayai.gameState.addCharacter({id: ayai.characterId, position: {x: ayai.startingX, y: ayai.startingY}, health: {currHealth: 1, maximumHealth: 1}});
        ayai.game.world.setBounds(0, 0, mapWidth, mapHeight);

        ayai.game.camera.follow(Window.character.sprite, Phaser.Camera.FOLLOW_TOPDOWN);
        ayai.game.camera.setSize(width, height);
        ayai.game.stage.width = width;
        ayai.game.stage.height = height;


        //Create UI Elements
        //ayai.actionBar = new ayai.ActionBar();
        //ayai.uiElements.push(ayai.actionBar);
        
        ayai.gameLoaded = true;

    }

    function placeNpcs() {

        $.get(ayai.tilemap, function(val) {

            var npcs = val.npcs;
            for(var i = 0; i < npcs.length; i++) {

            var npc = npcs[i];
            var newnpc = ayai.game.add.sprite(npc.position.x, npc.position.y, 'npc');

            switch(npc.sprite_id)
            {
                case "0":
                        newnpc.animations.add('facedown', [0]);
                break;
                }
            }

            newnpc.animations.play('facedown', 1, true);
        });
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
                ayai.currentTileset = 'tileset';
                ayai.currentTilemap = 'tilemap';

                break;

            case "map":

                ayai.tileset2 = "/assets/tiles/" + evt.detail.msg.tilesets[0].image;
                ayai.tilemap2 = "/assets/maps/"+ evt.detail.msg.tilemap;

                ayai.game.load.tilemap('tilemap', ayai.tilemap2, null, Phaser.Tilemap.TILED_JSON); 
                ayai.game.load.tileset('tileset', ayai.tileset2, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
                ayai.game.load.start();
                ayai.gameLoaded = false;
                
                ayai.game.load.onLoadComplete.dispatch = function() {
                    ayai.currentTileset = 'tileset'
                    ayai.currentTilemap = 'tilemap';
                    ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);
                }


            case "update":
                if (ayai.gameLoaded)
                ayai.gameState.updateEntities(evt.detail.msg);

                break;
        }
    }
    ayai.Ayai = Ayai;
}(window));
