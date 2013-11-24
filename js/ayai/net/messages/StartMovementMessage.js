this.ayai = this.ayai || {};
(function() {
    var StartMovementMessage = function(isUp, isLeft) {
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
