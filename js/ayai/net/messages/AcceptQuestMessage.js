define("AcceptQuestMessage", function() {

    function AcceptQuestMessage(questId, entityId) {
        // constructor
        this.data = {
            type: "quest-accept",
            questId: questId,
            entityId: entityId
        };
    };
    var p = AcceptQuestMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return AcceptQuestMessage;
});