define("InteractMessage", function() {

    function InteractMessage(npcId) {
        // constructor
        this.data = {
            type: "interact",
            npcId: npcId
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
