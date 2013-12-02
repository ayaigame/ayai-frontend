this.ayai = this.ayai || {};
(function() {

    var MessageReceiver = function(msg) {
       // constructor
       this.parseMessage(msg);
    };
    var p = MessageReceiver.prototype;


   //  public properties 
   //  =================     
   p.message = null;

    //  public methods
    //  ==============

    p.parseMessage = function(msg) {
      this.message = JSON.parse(msg);
    }

    p.createEvent = function() {
      return new CustomEvent("msgReceived", {
        detail: { msg: this.message }
      });
    }

    //  private methods
    //  ===============



ayai.MessageReceiver = MessageReceiver; }(window));
