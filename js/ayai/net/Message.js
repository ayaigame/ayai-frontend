(function() {

    window.ayai = ayai || {};
    var Message = function(type, data) {
       // constructor
       this.type = type;
       this.data = data;
    };
    var p = Message.prototype;


   //  public properties 
   //  =================     

    p.type = null;    
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


window.ayai.Message = Message; }(window));
