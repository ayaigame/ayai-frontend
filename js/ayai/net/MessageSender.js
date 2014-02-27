define("MessageSender", function () {

    var p = MessageSender.prototype;


    function MessageSender(WebSocket, msg) {
      // constructor
      p.encodeMessage(WebSocket, msg);
    };


   //  public properties 
   //  =================     

    //  public methods
    //  ==============



    p.encodeMessage = function(WebSocket, msg) {

      var message = JSON.stringify(msg);
      //other input checking and stuff

      WebSocket.send(message);
      trace(this.message);


    }

    //  private methods
    //  ===============


    return MessageSender;

 });
