this.ayai = this.ayai || {};
(function() {
    var StartMovementMessage = function(isDown, isRight) {
        direction = 0;
        if(isDown) direction += 1;
        if(isRight) direction += 1 << 1;
        this.data = {
          type: "move",
          start: true,
          direction: direction,
        };
    };
    var p = StartMovementMessage.prototype;


   //  public properties 
   //  =================     
 
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


ayai.StartMovementMessage = StartMovementMessage; }(window));
