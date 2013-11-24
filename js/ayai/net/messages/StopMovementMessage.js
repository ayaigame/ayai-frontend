this.ayai = this.ayai || {};
(function() {
    var StopMovementMessage = function(id) {
        this.data = {
          type: "move",
          start: false,
          id: id
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
