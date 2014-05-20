define("LootPickupMessage", function() {

    function LootPickupMessage(entityId, itemId) {
        // constructor
        this.data = {
            type: "loot-pickup",
            entityId: entityId,
            itemId: itemId
        };
    };
    var p = LootPickupMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return LootPickupMessage;
});