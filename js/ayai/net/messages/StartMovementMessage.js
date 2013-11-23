this.ayai = this.ayai || {};
(function() {
    var StopMovementMessage = function(isDown, isRight) {
        this.data = {
          type: "move",
          start: false,
        };
    };
    var p = StopMovementMessage.prototype;


   //  public properties 
   //  =================     
 
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


ayai.StopMovementMessage = StopMovementMessage; }(window));
