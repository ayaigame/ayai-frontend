define("InteractMessage", function() {

    function InteractMessage(entityId) {
        // constructor
        this.data = {
            type: "interact",
            entityId: entityId
        };
    };
    var p = InteractMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return InteractMessage;
});
