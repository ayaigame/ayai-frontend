define("ChatMessage", function() {

    function ChatMessage(message, sender) {
        // constructor
        this.data = {
            type: "chat",
            message: message,
            sender: sender
        };
    };
    var p = ChatMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


    return ChatMessage;
});
