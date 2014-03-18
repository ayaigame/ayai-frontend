define("AcceptQuestMessage", function() {

    function AcceptQuestMessage(questId) {
        // constructor
        this.data = {
            type: "quest-accept",
            questId: questId
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