define("SpawnMessage", function() {

    function SpawnMessage(entityType, entityTypeId, x, y) {
        // constructor
        this.data = {
            type: "spawn",
            entityType: entityType,
            entityTypeId: entityTypeId,
            x: x,
            y: y
        };
    };
    var p = SpawnMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return SpawnMessage;
});