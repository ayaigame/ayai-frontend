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

          var msg = {'type': 'init', 'name': getCookie("name"), 'token': getCookie("token")};
          p.send(msg);

          function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1,c.length);
              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
          }

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
