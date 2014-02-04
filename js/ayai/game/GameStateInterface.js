this.ayai = this.ayai || {};
(function() {
    //  constructor
    //  ===========
    var GameStateInterface = function() {
        p.isUp = false;
        p.isDown = false;
        p.isRight = false;
        p.isLeft = false;
        p.isLoaded = false;
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
    p.isLoaded = false;
    //  public methods
    //  ==============
    p.update = function(renderer) {
        //requestAnimFrame(animate);
        renderer.render(ayai.stage);
        kd.tick();
    }
    p.sendMovement = function() {
        var vertical = null;
        if (p.isUp && !p.isDown) {
            vertical = true;
        } else if (p.isDown && !p.isUp) {
            vertical = false;
        }
        var horizontal = null;
        if (p.isLeft && !p.isRight) {
            horizontal = true;
        } else if (!p.isLeft && p.isRight) {
            horizontal = false;
        }
        if (vertical != null || horizontal != null) {
            var message = new ayai.StartMovementMessage(ayai.characterId, vertical, horizontal);
            var sender = new ayai.MessageSender(message);

        } else {
            var message = new ayai.StopMovementMessage(ayai.characterId);
            var sender = new ayai.MessageSender(message);

        }
    }


    p.sendAttack = function() {

    }

    p.updateEntitiesFull = function() {
        this.removeAll();
        var newEntities = ayai.json;
        for (var i = 0; i < newEntities.length; i++) {
            var entity = newEntities[i];
            console.log('does entity ' + entity.id + ' exist?');
            if (this.entities[entity.id.toString()] == null) {
                console.log('found new entity ' + entity.id);
                this.addCharacter(entity.id, entity.x, entity.y, entity.currHealth, entity.maximumHealth);
            } else {
                console.log('should update entity ' + entity.id)
            }
        }

        Window.character = ayai.gameState.entities[ayai.characterId];
    };


    p.updateEntities = function(json) {

        if(this.isLoaded) {

            var you = json.you;
            var newEntities = json.others;
            this.updateCharacter(you);

            for (var index in newEntities) {
                var key = newEntities[index].id;
                var entity = newEntities[index];

                if (this.entities[key] == null) {
                    this.addCharacter(entity.id, entity.position.x, entity.position.y, entity.health.current, entity.health.max);
                }
                else
                    this.updateCharacter(entity);
            }

            
            /*
            for(var key in this.entities) {
                var entity = this.entities[key];
                if(!(key in newEntities))
                    this.removeCharacter(entity);
            }*/
        }
    }

    p.addCharacter = function(id, x, y, currHealth, maximumHealth) {
        var newChar = new ayai.Character(id, x, y, currHealth, maximumHealth);
        this.entities[id] = newChar;

        return newChar;
    }
    p.updateCharacter = function(e) {
        var entity = this.entities[e.id.toString()];
        entity.setPosition(e.position.x, e.position.y);
        entity.setHealth(e.health.currHealth, e.health.maximumHealth);
    }
    p.removeCharacter = function(e) {
        e.removeFromStage();
        delete this.entities[e.id.toString()];
    }
    p.removeAll = function() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].removeFromStage();
        }
        this.entities = {};
    }
    p.sendInputToGameState = function(inputEvent) {
        if (Window.verboseLogger) {
            console.log("got input");
        }
        this.handleKeyEventsInputEvent(inputEvent);
    }
    p.handleKeyEventsInputEvent = function(ev) {
        if (Window.verboseLogger) {
            console.log("GOT AN EVENT");
            console.log(ev);
        }
        if (ev.inputType == 0) {
            //Change this to not a magic number
            switch (ev.key) {
                case "isUp":
                    p.isUp = true;
                    Window.character.setAnimation('walkup');
                    p.sendMovement();
                    break;
                case "isLeft":
                    p.isLeft = true;
                    Window.character.setAnimation('walkleft');
                    p.sendMovement();
                    break;
                case "isRight":
                    p.isRight = true;
                    Window.character.setAnimation('walkright');
                    p.sendMovement();
                    break;
                case "isDown":
                    p.isDown = true;
                    Window.character.setAnimation('walkdown');
                    p.sendMovement();
                    break;
                case "!isUp":
                    p.isUp = false;
                    Window.character.setAnimation('faceup');
                    p.sendMovement();
                    break;
                case "!isLeft":
                    p.isLeft = false;
                    Window.character.setAnimation('faceleft');
                    p.sendMovement();
                    break;
                case "!isRight":
                    p.isRight = false;
                    Window.character.setAnimation('faceright');
                    p.sendMovement();
                    break;
                case "!isDown":
                    p.isDown = false;
                    Window.character.setAnimation('facedown');
                    p.sendMovement();
                    break;
            }
        }
    }
    //  private methods
    //  ===============
    ayai.GameStateInterface = GameStateInterface;
}(window));
