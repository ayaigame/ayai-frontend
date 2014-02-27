define("AttackMessage", function() {

    function AttackMessage() {
        // constructor
        this.data = {
            type: "attack"
        };
    };
    var p = AttackMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return AttackMessage;
});
