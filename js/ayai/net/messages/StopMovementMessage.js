define("StopMovementMessage", function() {

      var p = StopMovementMessage.prototype;

    function StopMovementMessage(id) {
        this.data = {
          type: "move",
          start: false,
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

    return StopMovementMessage;

});