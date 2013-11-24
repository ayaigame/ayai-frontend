this.ayai = this.ayai || {};
(function() {


    //  constructor
    //  ===========

    var GameStateInterface = function() {
        
    };
    var p = GameStateInterface.prototype;



   //  public properties 
   //  =================     


   p.entities = [];


    //  public methods
    //  ==============


    p.update = function(renderer){
       
        //requestAnimFrame(animate);

        renderer.render(ayai.stage);
        kd.tick();
    }

    p.updateEntitiesFull = function(){
        
        this.removeAll();

        var newEntities = ayai.json;

        for(var i = 0; i < newEntities.length; i++){
       
            var entity = newEntities[i];
            console.log('does entity '+ entity.id +' exist?');

            if(this.entities[entity.id.toString()] == null) {

                console.log('found new entity '+entity.id);
                this.addCharacter(entity.id, entity.x, entity.y);
            }

            else {

                console.log('should update entity '+entity.id)
            }

        }

        Window.player = ayai.gameState.entities[ayai.playerId];
    }

    p.updateEntities = function(json) {

        var newEntities = json;
        console.log(newEntities);

        for(var key in newEntities) {

            var entity = newEntities[key];
            if(this.entities[key] == null)
                this.addCharacter(entity.id, entity.x, entity.y);
            else
                this.updateCharacter(entity);
        }

        for(var key in this.entities) {
            
            var entity = this.entities[key];
            if(!(key in newEntities))
                this.removeCharacter(entity);
            
        }

        Window.player = this.entities[0];


    }

    p.addCharacter = function(id, x, y) {

        newChar = new ayai.Character(id, x, y);
        this.entities[id] = newChar;
        return newChar;
    }

    p.updateCharacter = function(e) {

        var entity = this.entities[e.id.toString()];
        
        entity.setPosition(e.x, e.y);

    }

    p.removeCharacter = function(e) {
   
        e.removeFromStage();
        delete this.entities[e.id.toString()];
    }

    p.removeAll  = function(){

        for(var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].removeFromStage();
        }

        this.entities = [];
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
                case "w": Window.player.graphic.position.y -= 2; break;
                case "a": Window.player.graphic.position.x -= 2; break;
                case "s": Window.player.graphic.position.y += 2; break;
                case "d": Window.player.graphic.position.x += 2; break;
            }
        }
    }

    //  private methods
    //  ===============

    
ayai.GameStateInterface = GameStateInterface; }(window));


