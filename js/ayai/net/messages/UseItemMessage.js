define("UseItemMessage", function() {
    
    var p = UseItemMessage.prototype;

    function UseItemMessage(id) {
        this.data = {
          type: "useitem",
          itemId: id,
        };
    };



   //  public properties 
   //  =================     
 
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return UseItemMessage;

});