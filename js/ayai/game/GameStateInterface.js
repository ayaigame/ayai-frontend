this.ayai = this.ayai || {};
(function() {


    //  constructor
    //  ===========

    var GameStateInterface = function() {

        p.isUp = false;
        p.isDown = false;
        p.isRight = false;
        p.isLeft = false;
    
    
    };
    var p = GameStateInterface.prototype;



   //  public properties 
   //  =================     

   p.isUp = null;
   p.isDown = null;
   p.isRight = null;
   p.isLeft = null;

   p.entities = {};
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
    }

	p.sendMovement = function() {
		var vertical = null;
        if(p.isUp && !p.isDown) {
            vertical = true;
        } else if (p.isDown && !p.isUp) {
            vertical = false;
        }

        var horizontal = null;
        if(p.isLeft && !p.isRight) {
            horizontal = true;
        } else if (!p.isLeft && p.isRight) {
            horizontal = false;
        }

        if(vertical != null || horizontal != null) {
            var message = new ayai.StartMovementMessage(ayai.playerId, vertical, horizontal);
            var sender = new ayai.MessageSender(message);
            console.log(sender);
        } else {
			var message = new ayai.StopMovementMessage(ayai.playerId);
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
                this.addCharacter(entity.id, entity.x, entity.y, entity.currHealth, entity.maximumHealth);
            }

            else {

                console.log('should update entity '+entity.id)
            }

        }

        Window.player = ayai.gameState.entities[ayai.playerId];
    };

    p.updateEntities = function(json) {

        var newEntities = json;

        for(var index in newEntities) {

            var key = newEntities[index].id;
            var entity = newEntities[index];

            if(this.entities[key] == null)
                this.addCharacter(entity.id, entity.x, entity.y, entity.currHealth, entity.maximumHealth);
            else
                this.updateCharacter(entity);
        }

        // TODO: Need to figure out a diff way for this
        /**
        for(var key in this.entities) {
            var entity = this.entities[key];
            console.log(key);
            console.log(newEntities);
            console.log(newEntities["1"]);
            console.log("YO");
            if(!(key in newEntities))
                this.removeCharacter(entity);
        }
        **/

        Window.player = this.entities[ayai.playerId];


    }

    p.addCharacter = function(id, x, y, currHealth, maximumHealth) {

        var newChar = new ayai.Character(id, x, y, currHealth, maximumHealth);
        ayai.gameState.entities[id] = newChar;

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

        this.entities = {};
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
                    p.isUp = true;
					p.sendMovement();
                    break;
                case "isLeft": 
                    p.isLeft = true; 
					p.sendMovement();
                    break;
                case "isRight": 
                    p.isRight = true;
					p.sendMovement();
                    break;
                case "isDown": 
                    p.isDown = true; 
					p.sendMovement();
                    break;
                case "!isUp":
                    p.isUp = false;  
					p.sendMovement();
                    break;
                case "!isLeft": 
                    p.isLeft = false; 
					p.sendMovement(); 
                    break;
                case "!isRight": 
                    p.isRight = false; 
					p.sendMovement();
                    break;
                case "!isDown": 
                    p.isDown = false; 
					p.sendMovement();
                    break;
            }
        }
    }
    //  private methods
    //  ===============

    
ayai.GameStateInterface = GameStateInterface; }(window));


