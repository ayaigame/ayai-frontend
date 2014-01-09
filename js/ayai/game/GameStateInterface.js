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
            var message = new ayai.StartMovementMessage(ayai.playerId, vertical, horizontal);
            var sender = new ayai.MessageSender(message);

        } else {
            var message = new ayai.StopMovementMessage(ayai.playerId);
            var sender = new ayai.MessageSender(message);

        }
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
        Window.player = ayai.gameState.entities[ayai.playerId];
    };


    //Have to call this using this singleton-esque way
    //because the player sprite is not created until we get
    //a message back from the server.
    p.setCameraOnce = true;
    p.setCamera = function() {
        if (Window.player == null) {
            return;
        }

        if(p.setCameraOnce) {
            //needs jquery
            var browserWidth = $(window).width();
            var browserHeight = $(window).height();

            console.log("CAMERA IS SET!");
            console.log(Window.player);
            ayai.game.camera.follow(Window.player.sprite, Phaser.Camera.FOLLOW_TOPDOWN);

            ayai.game.camera.setSize(Math.floor(browserWidth *.95), Math.floor(browserHeight *.95) );

        }

    }


    p.updateEntities = function(json) {
        var newEntities = json;
        for (var index in newEntities) {
            var key = newEntities[index].id;
            var entity = newEntities[index];
            if (this.entities[key] == null)
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
        p.setCamera();
    }
    p.addCharacter = function(id, x, y, currHealth, maximumHealth) {
        var newChar = new ayai.Character(id, x, y, currHealth, maximumHealth);
        ayai.gameState.entities[id] = newChar;



        return newChar;
    }
    p.updateCharacter = function(e) {
        var entity = this.entities[e.id.toString()];
        entity.setPosition(e.x, e.y);
        entity.setHealth(e.currHealth, e.maximumHealth);
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
                case "w":
                    //Window.player.position.y -= 2;
                    break;
                case "a":
                    //Window.player.position.x -= 2;
                    break;
                case "s":
                    //Window.player.position.y += 2;
                    break;
                case "d":
                    //Window.player.position.x += 2;
                    break;
                case "isUp":
                    p.isUp = true;
                    Window.player.setAnimation('walkup');
                    p.sendMovement();
                    break;
                case "isLeft":
                    p.isLeft = true;
                    Window.player.setAnimation('walkleft');
                    p.sendMovement();
                    break;
                case "isRight":
                    p.isRight = true;
                    Window.player.setAnimation('walkright');
                    p.sendMovement();
                    break;
                case "isDown":
                    p.isDown = true;
                    Window.player.setAnimation('walkdown');
                    p.sendMovement();
                    break;
                case "!isUp":
                    p.isUp = false;
                    Window.player.setAnimation('faceup');
                    p.sendMovement();
                    break;
                case "!isLeft":
                    p.isLeft = false;
                    Window.player.setAnimation('faceleft');
                    p.sendMovement();
                    break;
                case "!isRight":
                    p.isRight = false;
                    Window.player.setAnimation('faceright');
                    p.sendMovement();
                    break;
                case "!isDown":
                    p.isDown = false;
                    Window.player.setAnimation('facedown');
                    p.sendMovement();
                    break;
            }
        }
    }
    //  private methods
    //  ===============
    ayai.GameStateInterface = GameStateInterface;
}(window));