define("AbandonQuestMessage", function() {

    function AbandonQuestMessage(questId) {
        // constructor
        this.data = {
            type: "quest-abandon",
            questId: questId
        };
    };
    var p = AbandonQuestMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return AbandonQuestMessage;
});
