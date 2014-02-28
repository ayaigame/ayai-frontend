define("GameStateInterface", ["Character", "StartMovementMessage", "StopMovementMessage", "AttackMessage"], 
    function(Character, StartMovementMessage, StopMovementMessage, AttackMessage) {
    //  constructor
    //  ===========
    var p = GameStateInterface.prototype;

    function GameStateInterface(game, connection, characterId) {
        p.isUp = false;
        p.isDown = false;
        p.isRight = false;
        p.isLeft = false;
        p.isLoaded = false;
        p.game = game;
        p.connection = connection;
        p.characterId = characterId;
    };
    
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
    p.entitiesLayer = null;

    //  public methods
    //  ==============

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
            var message = new StartMovementMessage(p.characterId, vertical, horizontal);
            p.connection.send(message.data);
        } else {
            var message = new StopMovementMessage(p.characterId);
            p.connection.send(message.data);
        }
    };

    p.sendAttack = function() {
        var message = new AttackMessage();
        p.connection.send(message.data);
    };


    p.updateEntities = function(json) {
        var newEntities = json.others;
        Window.character.syncPlayer(json.you);
        //  ayai.inventory.update(json.you.inventory);
        for (var index in newEntities) {
            var characterJson = newEntities[index];
            if (this.entities[characterJson.id] == null) {
                this.addCharacter(characterJson);
            } else {
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
    };

    p.addCharacter = function(json) {
        console.log("adding " + json.id);
        var newChar = new Character(json);
        newChar.buildSprite(p.game);
        this.entities[json.id] = newChar;
        return newChar;
    };

    p.removeCharacter = function(e) {
        e.removeFromStage();
        delete this.entities[e.id.toString()];
    };

    p.clearEntities = function() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].removeFromStage();
        }
        this.entities = {};
    };

    p.sendInputToGameState = function(inputEvent) {
        if (Window.verboseLogger) {
            console.log("got input");
        }
        this.handleKeyEventsInputEvent(inputEvent);
    };

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
                    if (!p.isDown)
                        Window.character.setAnimation('walkup');
                    else Window.character.setAnimation('faceup');
                    p.sendMovement();
                    break;
                case "isLeft":
                    p.isLeft = true;
                    if (!p.isRight)
                        Window.character.setAnimation('walkleft');
                    else Window.character.setAnimation('faceleft');
                    p.sendMovement();
                    break;
                case "isRight":
                    p.isRight = true;
                    if (!p.isLeft)
                        Window.character.setAnimation('walkright');
                    else Window.character.setAnimation('faceright');
                    p.sendMovement();
                    break;
                case "isDown":
                    p.isDown = true;
                    if (!p.isUp)
                        Window.character.setAnimation('walkdown');
                    else Window.character.setAnimation('facedown');
                    p.sendMovement();
                    break;
                case "!isUp":
                    p.isUp = false;
                    if (p.isRight)
                        Window.character.setAnimation('walkright');
                    if (p.isLeft)
                        Window.character.setAnimation('walkleft');
                    if (p.isDown)
                        Window.character.setAnimation('walkdown');
                    if (!p.isDown && !p.isRight && !p.isLeft)
                        Window.character.setAnimation('faceup');
                    p.sendMovement();
                    break;
                case "!isLeft":
                    p.isLeft = false;
                    if (p.isUp)
                        Window.character.setAnimation('walkup');
                    if (p.isDown)
                        Window.character.setAnimation('walkdown');
                    if (p.isRight)
                        Window.character.setAnimation('walkright');
                    if (!p.isDown && !p.isUp && !p.isRight)
                        Window.character.setAnimation('faceleft');
                    p.sendMovement();
                    break;
                case "!isRight":
                    p.isRight = false;
                    if (p.isUp)
                        Window.character.setAnimation('walkup');
                    if (p.isDown)
                        Window.character.setAnimation('walkdown');
                    if (p.isLeft)
                        Window.character.setAnimation('walkleft');
                    if (!p.isDown && !p.isUp && !p.isLeft)
                        Window.character.setAnimation('faceright');
                    p.sendMovement();
                    break;
                case "!isDown":
                    p.isDown = false;
                    if (p.isRight)
                        Window.character.setAnimation('walkright');
                    if (p.isLeft)
                        Window.character.setAnimation('walkleft');
                    if (p.isUp)
                        Window.character.setAnimation('walkup');
                    if (!p.Up && !p.isRight && !p.isLeft)
                        Window.character.setAnimation('facedown');
                    p.sendMovement();
                    break;
            }
        }
    };
    //  private methods
    //  ===============

    return GameStateInterface;
});