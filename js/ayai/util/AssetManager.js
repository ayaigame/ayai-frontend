this.ayai = this.ayai || {};
(function() {
    var AssetManager = function() {

         

    };
    var p = AssetManager.prototype;


   //  public properties 
   //  =================     

    p._jsonDeferred = null;
    p._assetDeferred = null;


    //  public methods
    //  ==============

    p.a = function() {
    }

    p.loadMapAssets = function(jsonFile, assetFile) {
    
        this._jsonDeferred = $.Deferred();
        this._assetDeferred = $.Deferred();

        var self = this;

        var loader = new PIXI.JsonLoader(jsonFile);
        loader.addEventListener("loaded", function(evt) {
            self.json = loader.json;
            self._jsonDeferred.resolve();
             
        }); 
        loader.load();


        var assetLoader = new PIXI.AssetLoader([assetFile]);
        assetLoader.addEventListener("onComplete", function() {
            self._assetDeferred.resolve();
        });
        assetLoader.load();

        $.when(this._jsonDeferred, this._assetDeferred).
            then(function() {
                var evt = new CustomEvent("assetsLoaded",{ 
                    detail: { 
                               json: self.json, 
                               asset: assetFile }
                        });    
                console.log(evt);
                document.dispatchEvent(evt);
                
            });

        

    };


    //  private methods
    //  ===============


ayai.AssetManager = AssetManager; }(window));
