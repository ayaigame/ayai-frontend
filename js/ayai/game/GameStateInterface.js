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


    p.update = function(){

    }

    //  private methods
    //  ===============

    
window.GameStateInterface = GameStateInterface; }(window));


/*

function GameStateInterface() {

    function receiveEntitiesInRoom() {

    }

    function sendInputToGameState(inputEvent) {
        this.handleKeyEventsInputEvent(inputEvent);
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
