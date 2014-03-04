define("DropItemMessage", function() {

    function DropItemMessage(slot) {
        // constructor
        this.data = {
            type: "dropitem",
            slot: slot
        };
    };
    var p = DropItemMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return DropItemMessage;
});
