this.ayai = this.ayai || {};
(function() {

    var Connection = function(url) {
       // constructor
       this.url = url;
       console.log("connection established");
       this.connect();
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
      ayai.WebSocket.onopen = function(evt){
          var msg = {'type': 'init'};
          this.send(JSON.stringify(msg));

      }
      ayai.WebSocket.onmessage = function(evt){
        var receiver = new ayai.MessageReceiver(evt.data);
        document.dispatchEvent(receiver.createEvent());
      }
      ayai.WebSocket.onclose = function(evt){}
    }

   p.send = function(msg) {
      var sender = new ayai.MessageSender(msg);

    }

    //  private methods
    //  ===============



ayai.Connection = Connection; }(window));
