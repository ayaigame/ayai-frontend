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
                ayai.assetManager._buildMap(assetFile);
                console.log(evt);
                document.dispatchEvent(evt);

                
            });

        

    };

        p._buildMap = function(assetFile) {
        console.log("WTF");
                    // adding each tile to cache
        for(var i = 0; i < 36; i++) {
            var tile = new PIXI.Texture.fromFrame(assetFile);
            var x = i%6;
            var y = parseInt(i/6);
            tile.setFrame(new PIXI.Rectangle(x*32, y*32, 32, 32));
            var temp = new PIXI.RenderTexture(33,33);
            temp.render(new PIXI.Sprite(tile));
            PIXI.Texture.addTextureToCache(temp, "tile" + i);
            console.log("tile" + i);
            console.log(new PIXI.Texture.fromFrame("tile" + i));
        }

        PIXI.Texture.removeTextureFromCache(assetFile);
        //this.renderMap();


    }

    p.loadJsonFile = function(file, result) {
        var deferred = $.Deferred();

        var loader = new PIXI.JsonLoader(file);
        loader.addEventListener("loaded", function(evt) {
            console.log(result);
            result.json = loader.json;
            console.log(result);
            deferred.resolve();
        });
        loader.load();
        return deferred;
    };


    //  private methods
    //  ===============


ayai.AssetManager = AssetManager; }(window));
