define("UnequipMessage", function() {

    function UnequipMessage(equipmentType) {
        // constructor
        this.data = {
            type: "unequip",
            equipmentType: equipmentType
        };
    };
    var p = UnequipMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return UnequipMessage;
});
