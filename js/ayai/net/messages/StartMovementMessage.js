define("StartMovementMessage", function() {
    
    var p = StartMovementMessage.prototype;

    function StartMovementMessage(id, isUp, isLeft) {
        var direction;

        if(isUp == null) {
          if(isLeft) {
            direction = 6;
          } else {
            direction = 2;
          }

        } else if(isLeft == null) {
          
          if(isUp) {
            direction = 0;
          } else {
            direction = 4;
          }

        } else {
          
          if(isUp && isLeft) {
            direction = 7;
          } else if (isUp && !isLeft) {
            direction = 1;
          } else if (!isUp && isLeft) {
            direction = 5;
          } else {
            direction = 3;
          }

        }

        this.data = {
          type: "move",
          start: true,
          dir: direction,
          id: id
        };
    };



   //  public properties 
   //  =================     
 
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return StartMovementMessage;

});