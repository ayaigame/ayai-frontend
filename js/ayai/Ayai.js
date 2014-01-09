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
        ayai.playerId = null;
        ayai.charTexture = null;
        //ayai.json = [{id: 0, x: 0, y: 0}, {id: 1, x: 200, y: 0}, {id: 2, x: 300, y: 100}];
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
    }
    window.onresize = function() {

        ayai.game.width = window.innerWidth;
        ayai.game.height = window.innerHeight;
    }

    function create() {

        ayai.connection.connect();
        var map = ayai.game.add.tilemap('map2');
        var tileset = ayai.game.add.tileset('grasstiles');
        layer = ayai.game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, tileset, map, 0);
    }

    function update() {};

    function render() {};

    p._messageReceived = function(evt) {

        switch (evt.detail.msg.type) {
            case "id":
                ayai.playerId = evt.detail.msg.id;
                    console.log("connection established");
                break;
            case "fullsync":
                ayai.gameState.updateEntities(evt.detail.msg.players);
                break;
        }
    }
    ayai.Ayai = Ayai;
}(window));
