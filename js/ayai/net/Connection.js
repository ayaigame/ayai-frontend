this.ayai = this.ayai || {};
(function() {

    var Connection = function(url) {
       // constructor
       this.url = url;
    };
    var p = Connection.prototype;

   //  public properties 
   //  =================     
   
    p.url = null;
   p.readQueue = [];

    //  public methods
    //  ==============

    p.connect = function() {
      var self = this;
      ayai.WebSocket = new WebSocket(this.url);
      ayai.WebSocket.onload = function(evt){}
      ayai.WebSocket.onmessage = function(evt){
        var receiver = new ayai.MessageReceiver(evt.data);
        self.dispatchEvent(receiver.createEvent());
      }
      ayai.WebSocket.onclose = function(evt){}
    }

   p.send = function(msg) {
      var sender = new ayai.MessageSender(msg);

    }

    //  private methods
    //  ===============



ayai.Connection = Connection; }(window));
