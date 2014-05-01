define("GameStateInterface", ["Entity", "UnitFrame",  "StartMovementMessage", "StopMovementMessage", "AttackMessage", "EquipMessage", "UnequipMessage", "DropItemMessage", "InteractMessage", "AbandonQuestMessage", "AcceptQuestMessage"], 
    function(Entity, UnitFrame, StartMovementMessage, StopMovementMessage, AttackMessage, EquipMessage, UnequipMessage, DropItemMessage, InteractMessage, AbandonQuestMessage, AcceptQuestMessage) {
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
            Window.character.state = Entity.prototype.STATE.WALKING;
            var message = new StartMovementMessage(p.characterId, vertical, horizontal);
            p.connection.send(message.data);
        } else {
            Window.character.state = Entity.prototype.STATE.IDLE;
            var message = new StopMovementMessage(p.characterId);
            p.connection.send(message.data);
        }
    };

    p.sendAbandonQuestMessage = function(questId) {
        var message = new AbandonQuestMessage(questId);
        p.connection.send(message.data);
    };

    p.sendAcceptQuestMessage = function(questId, entityId) {
        var message = new AcceptQuestMessage(questId, entityId);
        p.connection.send(message.data);
    };

    p.sendAttack = function() {

        var attackAnim;
        switch (Window.character.facing)
        {
            case Entity.prototype.FACING.UP:
                attackAnim = "attackup";
                break;
            case Entity.prototype.FACING.RIGHT:
                attackAnim = "attackright";
                break;
            case Entity.prototype.FACING.LEFT:
                attackAnim = "attackleft";
                break;
            case Entity.prototype.FACING.DOWN:
                attackAnim = "attackdown";
                break;
        }
        Window.character.setAnimation(attackAnim, 8, false);
        var message = new AttackMessage();
        p.connection.send(message.data);
    };

    p.sendEquip = function(slot, equipmentType) {
        var message = new EquipMessage(slot, equipmentType);
        p.connection.send(message.data);
    };

    p.sendUnequip = function(equipmentType) {
        var message = new UnequipMessage(equipmentType);
        p.connection.send(message.data);
    };

    p.sendDropItem = function(slot) {
        var message = new DropItemMessage(slot);
        p.connection.send(message.data);
    };

    p.displayAttack = function(json) {

        var initiator = json.initator;
        var victim = json.victim;

        if(this.entities[victim] != undefined)
            this.entities[victim].displayDamage(json.damage);
    };

    p.sendNPCInteractionMessage = function(npcId) {
        console.log("Sending NPCID: " + npcId)
        var message = new InteractMessage(npcId);
        p.connection.send(message.data);
    };

    p.updateEntities = function(json) {

        var players = json.players;
        var npcs = json.npcs;
        var projectiles = json.projs;

        var entities = players.concat(npcs);
        var entities = entities.concat(projectiles);

        ayai.quests = json.models.quests;
        ayai.inventory.sync(json.models.inventory, json.models.equipment);

        for (var index in entities) {

            var characterJson = entities[index];

            if(characterJson.id == Window.character.id) {
                UnitFrame.prototype.syncPlayerFrame(characterJson);
            }

            if(Window.target != null && Window.target.id == characterJson.id) {
                UnitFrame.prototype.syncTargetFrame(characterJson);
            }
            
            if (this.entities[characterJson.id] == null) {

                //new entity

                this.addPlayerCharacter(characterJson);
                
            } 

            else {

                //update an existing entity
                var entity = this.entities[characterJson.id];
                entity.syncEntity(characterJson);

                if(characterJson.id != Window.character.id) {
                    entity.setAnimation(characterJson.action);
                }
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

    p.addPlayerCharacter = function(json) {

        console.log("adding player character" + json.id);
        var newChar = new Entity(json);
        this.entities[json.id] = newChar;
        return newChar;
    };

    p.addNonPlayerCharacter = function(json) {

        console.log("adding non-player character" + json.id);
        var newChar = new Entity(json);
        this.entities[json.id] = newChar;
        return newChar;
    }


    p.disconnect = function(json) {

        console.log("removing character " + json.id);
        this.removeCharacter(this.entities[json.id]);
    }

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
                    if (!p.isDown) {
                        Window.character.setAnimation('walkup');
                        Window.character.facing = Entity.prototype.FACING.UP;
                    }
                    else Window.character.setAnimation('faceup');
                    p.sendMovement();
                    break;
                case "isLeft":
                    p.isLeft = true;
                    if (!p.isRight) {
                        Window.character.setAnimation('walkleft');
                        Window.character.facing = Entity.prototype.FACING.LEFT;
                    }
                    else Window.character.setAnimation('faceleft');
                    p.sendMovement();
                    break;
                case "isRight":
                    p.isRight = true;
                    if (!p.isLeft) {
                        Window.character.setAnimation('walkright');
                        Window.character.facing = Entity.prototype.FACING.RIGHT;
                    }
                    else Window.character.setAnimation('faceright');
                    p.sendMovement();
                    break;
                case "isDown":
                    p.isDown = true;
                    if (!p.isUp) {
                        Window.character.setAnimation('walkdown');
                        Window.character.facing = Entity.prototype.FACING.DOWN;
                    }
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
                    if (!p.isDown && !p.isRight && !p.isLeft) {
                        Window.character.setAnimation('faceup');
                        Window.character.facing = Entity.prototype.FACING.UP;
                    }
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
                    if (!p.isDown && !p.isUp && !p.isRight) {
                        Window.character.setAnimation('faceleft');
                        Window.character.facing = Entity.prototype.FACING.LEFT;
                    }
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
                    if (!p.isDown && !p.isUp && !p.isLeft) {
                        Window.character.setAnimation('faceright');
                        Window.character.facing = Entity.prototype.FACING.RIGHT;
                    }
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
                    if (!p.Up && !p.isRight && !p.isLeft) {
                        Window.character.setAnimation('facedown');
                        Window.character.facing = Entity.prototype.FACING.DOWN;
                    }
                    p.sendMovement();
                    break;
            }
        }
    };
    //  private methods
    //  ===============

    return GameStateInterface;
});
