define("Connection", ["MessageSender", "MessageReceiver"], function(MessageSender, MessageReceiver) {

    var p = Connection.prototype;

    function Connection(url) {
       // constructor
       p.url = url;

    };

   //  public properties 
   //  =================     
   
    p.url = null;
    p.WebSocket = null;

    //  public methods
    //  ==============

    p.connect = function() {
      console.log("connecting");
      p.WebSocket = new WebSocket(p.url);
      p.WebSocket.onopen = function(evt){

          var msg = {'type': 'init'};
          p.send(msg);

      }
      p.WebSocket.onmessage = function(evt){
        var receiver = new MessageReceiver(evt.data);
        document.dispatchEvent(receiver.createEvent());
      }
      p.WebSocket.onclose = function(evt){}
    };

   p.send = function(msg) {
      var sender = new MessageSender(p.WebSocket, msg);
    };

    //  private methods
    //  ===============

    return Connection;

});
