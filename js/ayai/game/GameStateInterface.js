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

   p.isUp = null;
   p.isDown = null;
   p.isRight = null;
   p.isLeft = null;

    //  public methods
    //  ==============


    p.update = function(renderer){
        //requestAnimFrame(animate);
        renderer.render(ayai.stage);
        kd.tick();
        
        var vertical = null;
        if(isUp && !isDown) {
            vertical = true;
        } else if (isDown && !isUp) {
            vertical = false;
        }

        var horizontal = null;
        if(isLeft && !isRight) {
            horizontal = true;
        } else if (!isLeft && isRight) {
            horizontal = false;
        }

        var id = 0;
        if(vertical != null || horizontal != null) {
            var message = new ayai.StartMovementMessage(id, vertical, horizontal);
            var sender = new ayai.MessageSender(message);
        }
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
                case "w":
                    Window.player.position.y -= 2; break;
                case "a":
                    Window.player.position.x -= 2; break;
                case "s":
                    Window.player.position.y += 2; break;
                case "d":
                    Window.player.position.x += 2; break;
                case "isUp":
                    isUp = true; 
                case "isLeft": 
                    isLeft = true; 
                case "isRight": 
                    isRight = true;
                case "isDown": 
                    isDown = true;
                case "!isUp":
                    isUp = false; 
                case "!isLeft": 
                    isLeft = false; 
                case "!isRight": 
                    isRight = false;
                case "!isDown": 
                    isDown = false;
            }
        }
    }

    //  private methods
    //  ===============

    
ayai.GameStateInterface = GameStateInterface; }(window));


/*

function GameStateInterface() {

    function receiveEntitiesInRoom() {

    }




    function sendRoomId(roomId) {

    }

    function update() {
        requestAnimFrame(animate);
        renderer.render(stage);
        kd.tick();
    }

   // test movement
   function handleKeyEventsInputEvent(ev) {
        if (ev.inputType == InputEvent.KEY_PRESS_EVENT) {
            switch (ev.key) {
                case "w": player.position.y -= 2; break;
                case "a": player.position.x -= 2; break;
                case "s": player.position.y += 2; break;
                case "d": player.position.x += 2; break;
            }
        }
    }
}

*/

