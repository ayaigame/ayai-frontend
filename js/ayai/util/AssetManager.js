this.ayai = this.ayai || {};
(function() {
    var AssetManager = function() {

         

    };
    var p = AssetManager.prototype;


   //  public properties 
   //  =================     

    p._jsonDeferred = null;
    p._assetDeferred = null;
    p._charDeferred = null;

    p.charSheet = null;


    p.json = null;

    //  public methods
    //  ==============

    p.a = function() {
    }

    p.loadTestAssets = function(mapFile, mapTiles, charSheet)
    {

        var self = this;

        this._jsonDeferred = $.Deferred();
        this._assetDeferred = $.Deferred();
        this._charDeferred = $.Deferred();

        this.loadMapAssets(mapFile, mapTiles);
        this.loadCharacterAssets(charSheet);
    
        
        $.when(this._jsonDeferred, this._assetDeferred, this._charDeferred).
            then(function() {
                var evt = new CustomEvent("assetsLoaded",{ 
                    detail: { 
                               json: self.json, 
                               asset: mapTiles,
                               charSheet: charSheet}
                        });
                document.dispatchEvent(evt);
                
            });

        }

    p.loadMapAssets = function(jsonFile, assetFile) {
    
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

        
    };


    p.loadCharacterAssets = function(file) {

        var self = this;

        var assetLoader = new PIXI.AssetLoader([file]);
            assetLoader.addEventListener("onComplete", function() {
                  self._charDeferred.resolve();
        });
    
        assetLoader.load();

    }

    //  private methods
    //  ===============


ayai.AssetManager = AssetManager; }(window));
