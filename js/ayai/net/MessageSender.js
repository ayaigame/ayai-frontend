this.ayai = this.ayai || {};
(function() {

    var MessageSender = function(msg) {
      // constructor
      this.encodeMessage(msg);
    };
    var p = MessageSender.prototype;


   //  public properties 
   //  =================     
   p.message = null;

    //  public methods
    //  ==============



    p.encodeMessage = function(msg) {
      this.message = JSON.stringify(msg.data);

      //other input checking and stuff
      
      //ayai.WebSocket.send(this.message);
      trace(this.message);


    }

    //  private methods
    //  ===============



ayai.MessageSender = MessageSender; }(window));
