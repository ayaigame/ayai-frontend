this.ayai = this.ayai || {};
(function() {
    var InitMessage = function(id) {
        // constructor
        this.data = {
            type: "init",
            id: id
        };
    };
    var p = InitMessage.prototype;


   //  public properties 
   //  =================     
   
    p.data = null;


    //  public methods
    //  ==============


    //  private methods
    //  ===============


ayai.InitMessage = InitMessage; }(window));
