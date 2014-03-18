
define("Ayai", ["phaser", "InputHandler", "Connection", "GameStateInterface", "Inventory", "Chat", "QuestLog", "AcceptQuest", "CreateAIMessage"], 
    function(Phaser, InputHandler, Connection, GameStateInterface, Inventory, Chat, QuestLog, AcceptQuest, CreateAIMessage) {
    // constructor

    ayai = Ayai.prototype;

    function Ayai() {

        ayai.gameLoaded = false;
        ayai.verboseLogger = false; 
        ayai.connection = new Connection("ws://192.168.100.10/ws");

        ayai.TILE_WIDTH = 32;
        ayai.TILE_HEIGHT = 32;
        ayai.characterId = null;

        ayai._registerListeners();

        ayai.connection.connect();
    };

    //  private methods
    //  ===============

    ayai._registerListeners = function() {
        document.addEventListener("msgReceived", ayai._messageReceived);
    };

    
    $('button#createAI').click(function() {
      var message = new CreateAIMessage();
      ayai.connection.send(message.data);
      console.log("Creating AI");
    });


    ayai.renderMap = function(tileset, tilemap, options) {

        ayai.game.world.destroy();
        ayai.gameState.clearEntities();
        placeNpcs();

        var tileset = ayai.game.add.tileset(tileset);
        ayai.map = ayai.game.add.tilemap(tilemap);
        var map = ayai.map;
        //console.log(map);

        //check whether "optional" parameter has been passed in
        var a = options == 'undefined' ? options : {};

        //needs jquery
        var browserWidth = $(window).width();
        var browserHeight = $(window).height();
        var mapWidth = map.layers[0].width * ayai.TILE_WIDTH;
        var mapHeight = map.layers[0].height * ayai.TILE_HEIGHT;

        //if the dimensions of the browser are less than the dimensions of the map, the camera gets set to the dimensions of the map.
        var width = Math.min(browserWidth, mapWidth);
        var height = Math.min(browserHeight, mapHeight);

        for (var i = 0; i < map.layers.length; i++) {
            if (map.layers[i].name != "collision")
                ayai.game.add.tilemapLayer(0, 0, width, height, tileset, map, i);
        }

        Window.character = ayai.gameState.addPlayerCharacter ({
            id: ayai.characterId,
            position: {
                x: ayai.startingX,
                y: ayai.startingY
            },
            health: {
                currHealth: 1,
                maximumHealth: 1
            }
        });

        ayai.game.world.setBounds(0, 0, mapWidth, mapHeight);
        ayai.game.camera.follow(Window.character.sprite, Phaser.Camera.FOLLOW_TOPDOWN);
        ayai.game.camera.setSize(width, height);
        ayai.game.stage.width = width;
        ayai.game.stage.height = height;
        ayai.gameLoaded = true;
    };

    ayai.preload = function() {
        console.log("Loading assets...");
        ayai.game.load.spritesheet('guy', '../assets/sprites/guy/guysheet.png', 32, 32);
        ayai.game.load.spritesheet('npc', '../assets/sprites/npc/npcsheet.png', 32, 48);
        ayai.game.load.spritesheet('healthframe', '../assets/sprites/ui/healthframe.png', 48, 13);
        ayai.game.load.spritesheet('itemicons', '../assets/sprites/ui/itemicons.png', 40, 40);
        ayai.game.load.image('skillicon', '../assets/sprites/ui/skillsheet.png');
        ayai.game.load.tilemap('tilemap', ayai.tilemap, null, Phaser.Tilemap.TILED_JSON);
        ayai.game.load.tileset('tileset', ayai.tileset, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
        ayai.game.load.audio('zelda', ['../assets/audio/overworld.mp3']);
    };


    ayai.create = function() {

        ayai.gameState = new GameStateInterface(ayai.game, ayai.connection, ayai.characterId);

        console.log("Assets loaded. Ready to PLAY!!!");

        // ---- Instantiate JS logic for HTML5 UI Elements
        ayai.inventory = new Inventory();
        ayai.chat = new Chat(ayai.connection, ayai.characterId);
        ayai.questLog = new QuestLog();
        ayai.acceptQuest = new AcceptQuest(); 


        $("ul#skills").css("left", (($("div#chat").position().left + $("ul.unitframes").width())/2) - $("ul#skills").width() / 2);

        // -----------------------------------------------


        //pass references to everything into the input handler for now. baaaad rob
        ayai.inputHandler = new InputHandler(ayai.game, ayai.gameState, ayai.inventory, ayai.chat, ayai.questLog, ayai.acceptQuest);

        ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);

        music = ayai.game.add.audio('zelda');
        //music.play();
    }
    
    window.onresize = function() {
        //Since the window can be resized before the game is loaded,
        //check if it is actually done loading. Otherwise, very crash :(

        if (ayai.gameLoaded) {
            ayai.gameLoaded = false;
            var width = $(window).width();
            var height = $(window).height();
            $('canvas')[0].width = width;
            $('canvas')[0].height = height;
            ayai.game.width = width;
            ayai.game.height = height;
            ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);
        }


        $("ul#skills").css("left", (($("div#chat").position().left + $("ul.unitframes").width())/2) - $("ul#skills").width() / 2);


    }

    function placeNpcs() {
        $.get(ayai.tilemap, function(val) {
            var npcs = val.npcs;
            for (var i = 0; i < npcs.length; i++) {
                var npc = npcs[i];
                var newnpc = ayai.game.add.sprite(npc.position.x, npc.position.y, 'npc');
                switch (npc.sprite_id) {
                    case "0":
                        newnpc.animations.add('facedown', [0]);
                        break;
                }
            }
            newnpc.animations.play('facedown', 1, true);
        });
    };

    ayai._messageReceived = function(evt) {

        if (ayai.verboseLogger)
            console.log(evt.detail.msg);

        switch (evt.detail.msg.type) {
            case "id":
                console.log(evt.detail.msg);
                console.log("connection established");
                ayai.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WebGL, '', {
                    preload: ayai.preload,
                    create: ayai.create,
                    update: update,
                    render: render
                });
                ayai.characterId = evt.detail.msg.id;
                ayai.startingX = evt.detail.msg.x;
                ayai.startingY = evt.detail.msg.y;
                ayai.tileset = "/assets/tiles/" + evt.detail.msg.tilesets[0].image;
                ayai.tilemap = "/assets/maps/" + evt.detail.msg.tilemap;
                ayai.currentTileset = 'tileset';
                ayai.currentTilemap = 'tilemap';
                break;

            case "map":
                ayai.tileset2 = "/assets/tiles/" + evt.detail.msg.tilesets[0].image;
                ayai.tilemap2 = "/assets/maps/" + evt.detail.msg.tilemap;
                ayai.game.load.tilemap('tilemap', ayai.tilemap2, null, Phaser.Tilemap.TILED_JSON);
                ayai.game.load.tileset('tileset', ayai.tileset2, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
                ayai.game.load.start();
                ayai.gameLoaded = false;
                ayai.game.load.onLoadComplete.dispatch = function() {
                    ayai.currentTileset = 'tileset'
                    ayai.currentTilemap = 'tilemap';
                    ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);
                }
                break;

            case "update":
                if (ayai.gameLoaded)
                    ayai.gameState.updateEntities(evt.detail.msg);
                break;

            case "quest":
                p.acceptQuest.show(evt.detail.msg);

            case "attack":
                //ayai.gameState.displayAttack(evt.detail.msg);
                break; 

            case "chat":
                ayai.chat.displayMessage(evt.detail.msg);
                break;

            case "disconnect":
                console.log(evt.detail.msg);
                break;


        }
    };

    console.log(ayai);
    return Ayai;
});
//  private properties
//  ==================
//  public methods
//  ==============


function update() {
    //ayai.inputHandler.update();
};

function render() {};
