this.ayai = this.ayai || {};
(function() {


    //  constructor
    //  ===========

    var GameStateInterface = function() {

        this.isUp = false;
        this.isDown = false;
        this.isRight = false;
        this.isLeft = false;
    
    
    };
    var p = GameStateInterface.prototype;



   //  public properties 
   //  =================     


   p.entities = [];
    p.isUp = null;
    p.isDown = null;
    p.isLeft = null;
    p.isRight = null;


    //  public methods
    //  ==============


 p.update = function(renderer){
        //requestAnimFrame(animate);
        renderer.render(ayai.stage);
        kd.tick();
       
        var vertical = null;
        if(this.isUp && !this.isDown) {
            vertical = true;
        } else if (this.isDown && !this.isUp) {
            vertical = false;
        }

        var horizontal = null;
        if(this.isLeft && !this.isRight) {
            horizontal = true;
        } else if (!this.isLeft && this.isRight) {
            horizontal = false;
        }

        if(vertical != null || horizontal != null) {
            var message = new ayai.StartMovementMessage(ayai.playerId, vertical, horizontal);
            var sender = new ayai.MessageSender(message);
            console.log(sender);
        }
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
        if (ev.inputType == 0) { 
            
            //Change this to not a magic number
            switch (ev.key) {
                case "w":
                    Window.player.position.y -= 2; break;
                case "a":
                    Window.player.position.x -= 2; break;
                case "s":
                    Window.player.position.y += 2; break;
                case "d":
                    Window.player.position.x += 2; break;
                case "isUp":
                    this.isUp = true;
                    break;
                case "isLeft": 
                    this.isLeft = true; 
                    break;
                case "isRight": 
                    this.isRight = true;
                    break;
                case "isDown": 
                    this.isDown = true;
                    break;
                case "!isUp":
                    this.isUp = false; 
                    break;
                case "!isLeft": 
                    this.isLeft = false; 
                    break;
                case "!isRight": 
                    this.isRight = false;
                    break;
                case "!isDown": 
                    this.isDown = false;
                    break;
            }
        }
    }
    //  private methods
    //  ===============

    
ayai.GameStateInterface = GameStateInterface; }(window));


