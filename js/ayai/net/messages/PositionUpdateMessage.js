define("PositionUpdateMessage", function() {
    
    var p = PositionUpdateMessage.prototype;

    function PositionUpdateMessage(id, x, y) {
        this.data = {
          type: "position",
          id: id,
          x: y,
          y: y
        };
    };



   //  public properties 
   //  =================     
 
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return PositionUpdateMessage;

});