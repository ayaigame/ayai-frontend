(function() {


    //  constructor
    //  ===========

    var GameStateInterface = function() {
        
    };
    var p = GameStateInterface.prototype;


   //  public properties 
   //  =================     


    //  public methods
    //  ==============


    p.update = function(renderer){
        //requestAnimFrame(animate);
        renderer.render(stage);
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

    //  private methods
    //  ===============

    
window.GameStateInterface = GameStateInterface; }(window));


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

