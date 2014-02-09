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
            var message = new ayai.AttackMessage();
            var sender = new ayai.MessageSender(message);
    }

    p.updateEntities = function(json) {

        if(this.isLoaded) {

            var newEntities = json.others;
            var player = this.entities[json.you.id];
            player.syncPlayer(json.you);
            ayai.inventory.update(json.you.inventory);

            for (var index in newEntities) {
                var characterJson = newEntities[index];

                if (this.entities[characterJson.id] == null) {
                    this.addCharacter(characterJson);
                }
                else {
                    var entity = this.entities[characterJson.id];
                    entity.syncCharacter(characterJson);
                }
                    
            }
            
            /*  TODO: If an entity hasn't been updated in 10-20 syncs, remove it?
            for(var key in this.entities) {
                var entity = this.entities[key];
                if(!(newEntities.contains(entity))) {
                    console.log("should remove entity "entity.id);
                }
            }*/
        }
    }

    p.addCharacter = function(json) {
        var newChar = new ayai.Character(json);
        this.entities[json.id] = newChar;
        return newChar;
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
