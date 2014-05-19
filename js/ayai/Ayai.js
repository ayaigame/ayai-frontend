
define("Ayai", ["phaser", "InputHandler", "Connection", "GameStateInterface", "Inventory", "Chat", "QuestLog", "AcceptQuest", "SpawnMessage", "ControlSettings", "SoundSettings"],
    function(Phaser, InputHandler, Connection, GameStateInterface, Inventory, Chat, QuestLog, AcceptQuest, SpawnMessage, ControlSettings, SoundSettings) {

    // constructor

    ayai = Ayai.prototype;

    function Ayai() {

        ayai.gameLoaded = false;
        ayai.verboseLogger = false; 
        ayai.connection = new Connection("ws://localhost:8007");
        // ayai.connection = new Connection("ws://localhost/ws");

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

    
    $('button#spawnEntity').click(function() {

        var typeTitle = $("div.debug a.chosen-single span").html();
        var entityType = "";

        $("select.chosen option").each(function(index, item) {

            if( $(item).html() == typeTitle)
                entityType = $(item).val();
        });

        var entityTypeId = $("input#spawnEntityType").val();
        var x = $("input#spawnEntityLocationX").val();
        var y = $("input#spawnEntityLocationY").val(); 
 
        var message = new SpawnMessage(entityType, entityTypeId, x, y);
        ayai.connection.send(message.data);

        console.log("spawning");
        console.log(message.data);

    });



    ayai.renderMap = function(tileset, tilemap, options) {

        ayai.game.world.destroy();
        ayai.gameState.clearEntities();

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
            },
            spritesheet: ayai.spritesheet
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

        ayai.game.load.spritesheet('fireball', '../assets/sprites/projectiles/fireball.png', 32, 32);
        ayai.game.load.spritesheet('arrows', '../assets/sprites/projectiles/arrowSheet.png', 24, 24);

        ayai.game.load.spritesheet('npc', '../assets/sprites/npc/npcsheet.png', 32, 48);
        ayai.game.load.spritesheet('props', '../assets/sprites/props/gravesheet.png', 40, 40);
        ayai.game.load.spritesheet('healthframe', '../assets/sprites/ui/healthframe.png', 48, 13);
        ayai.game.load.spritesheet('itemicons', '../assets/sprites/ui/itemicons.png', 40, 40);
        ayai.game.load.spritesheet('sword', '../assets/sprites/weapons/swordsheet.png', 18, 18)
        ayai.game.load.image('skillicon', '../assets/sprites/ui/skillsheet.png');
        ayai.game.load.tilemap('tilemap', null, ayai.tilemap, Phaser.Tilemap.TILED_JSON);
        ayai.game.load.tileset('tileset', ayai.tileset, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
        ayai.game.load.audio('zelda', ['../assets/audio/music/overworld.mp3']);
        ayai.game.load.audio('sword', ['../assets/audio/sfx/sword.mp3']);
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
        $("div.ui-modal").css("left", (($("div#chat").position().left + $("ul.unitframes").width())/2) - $("div#char-window").width() / 2);

        // -----------------------------------------------

        $("ul li#logout").click(function() {

            ayai.connection.close();
            
        });


        //pass references to everything into the input handler for now. baaaad rob
        ayai.inputHandler = new InputHandler(ayai.game, ayai.gameState, ayai.inventory, ayai.chat, ayai.questLog, ayai.acceptQuest);
        //Have to make the controlSettings after the input handler.
        ayai.controlSettings = new ControlSettings(ayai.inputHandler, ayai.game);

        ayai.soundSettings = new SoundSettings(ayai.game);

        ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);

        ayai.music = {zelda: ayai.game.add.audio('zelda')};
        ayai.sfx = {sword: ayai.game.add.audio('sword')};


        //ayai.music.zelda.play();

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




        $("div.ui-modal").css("left", (($("div#chat").position().left + $("ul.unitframes").width())/2) - $("div#char-window").width() / 2);
        $("ul#skills").css("left", (($("div#chat").position().left + $("ul.unitframes").width())/2) - $("ul#skills").width() / 2);

    }


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
                ayai.spritesheet = evt.detail.msg.spritesheet;
                ayai.tileset = "/assets/tiles/" + evt.detail.msg.tilesets[0].image;
                ayai.tilemap = evt.detail.msg.tilemap//"/assets/maps/" + evt.detail.msg.tilemap;
                ayai.currentTileset = 'tileset';
                ayai.currentTilemap = 'tilemap';
                break;

            case "map":
                ayai.tileset2 = "/assets/tiles/" + evt.detail.msg.tilesets[0].image;
                ayai.tilemap2 = "/assets/maps/" + evt.detail.msg.tilemap;
                ayai.game.load.tilemap('tilemap',  null, evt.detail.msg.tilemap, Phaser.Tilemap.TILED_JSON);
                ayai.game.load.tileset('tileset', ayai.tileset2, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
                ayai.game.load.start();
                ayai.gameLoaded = false;
                ayai.game.load.onLoadComplete.dispatch = function() {
                    ayai.currentTileset = 'tileset';
                    ayai.currentTilemap = 'tilemap';
                    ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);
                }
                break;

            case "update":
                if (ayai.gameLoaded)
                    ayai.gameState.updateEntities(evt.detail.msg);
                break;

            case "quest-offer":
                ayai.acceptQuest.show(evt.detail.msg);

            case "attack":
                ayai.gameState.displayAttack(evt.detail.msg);
                break; 

            case "chat":
                ayai.chat.displayMessage(evt.detail.msg);
                break;

            case "disconnect":
                ayai.gameState.disconnect(evt.detail.msg);
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
