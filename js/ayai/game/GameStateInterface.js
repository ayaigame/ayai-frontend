this.ayai = this.ayai || {};
(function() {


    //  constructor
    //  ===========

    var GameStateInterface = function() {
        var that = this;
        this.mapdata = {};
        this.getAndCreateRoom();
    };
    var p = GameStateInterface.prototype;

    p.getAndCreateRoom = function() {
        var that = this;

        $.when(ayai.assetManager.loadJsonFile("assets/maps/room.json", that.mapdata)).then(function(){
            that.getTileMap(that);
        });
    }

   //  public properties 
   //  =================     


    //  public methods
    //  ==============

    p.currentMap = null;

    p.getTileMap = function(that) {
        var tileMap = new ayai.TileMap(that.mapdata);
        this.currentMap = tileMap;
        this.showMap();


    }


    p.getMap = function() {
        return this.currentMap.getMap();
    }


    p.update = function(renderer){
        //requestAnimFrame(animate);
        renderer.render(ayai.stage);
        kd.tick();
    }


    p.sendInputToGameState = function(inputEvent) {
        if(Window.verboseLogger) {
            console.log("got input");
        }
        this.handleKeyEventsInputEvent(inputEvent);
    }

    p.handleKeyEventsInputEvent = function(ev) {
        if(Window.verboseLogger) {
            console.log("GOT AN EVENT");
            console.log(ev);
        }
        if (ev.inputType == 0) { //Change this to not a magic number
            switch (ev.key) {
                case "w": Window.player.position.y -= 2; break;
                case "a": Window.player.position.x -= 2; break;
                case "s": Window.player.position.y += 2; break;
                case "d": Window.player.position.x += 2; break;
            }
        }
    }



    p.tileMap = {};

    p.showMap = function() {
        //this.tileMap = new ayai.TileMap(e.detail.json, e.detail.asset);
        console.log(this.getMap());
        ayai.stage.addChild(this.getMap());

        Window.player = new PIXI.Graphics();
        Window.player.beginFill(0x000000);
        Window.player.drawRect(0,0,32,32);
        ayai.stage.addChild(Window.player);


        document.dispatchEvent(new CustomEvent("gameStateDoneLoading"));



        this.registerKeyEvents();
    }

    //  private methods
    //  ===============


    p.registerKeyEvents = function() {
        console.log("Registering Key Events");
        console.log(new InputEvent("d"));
        kd.W.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("w")) });
        kd.A.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("a")) });
        kd.S.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("s")) });
        kd.D.down(function(e) { Window.gameState.sendInputToGameState(new InputEvent("d")) });
    }
    
ayai.GameStateInterface = GameStateInterface; }(window));
