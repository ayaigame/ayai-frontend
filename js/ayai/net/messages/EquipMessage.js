define("EquipMessage", function() {

    function EquipMessage() {
        // constructor
        this.data = {
            type: "equip",
            slot: 1,
            equipmentType: "helmet"
        };
    };
    var p = EquipMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return EquipMessage;
});
