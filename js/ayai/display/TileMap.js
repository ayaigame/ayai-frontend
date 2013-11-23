
this.ayai = this.ayai || {};

(function() {

    var TileMap = function(json, assetFile) {
        // constructor

        this.layers = json.layers;    
        this.tilesets = json.tilesets;
        this.tileheight = json.tileheight;
        this.tilewidth = json.tilewidth;
        this.mapwidth = json.width;
        this.mapheight = json.height;
        this.map = new PIXI.DisplayObjectContainer();
        
        this._buildMap(assetFile);

    };

    var p = TileMap.prototype;


    p.getMap = function() {
        return this.map;
    }

 

   //  public properties 
   //  =================     

    p.layers = null;
    p.tilesets = null;
    p.tileheight = null;
    p.tilewidth = null;
    p.mapwidth = null;
    p.mapheight = null;
    p.map = null;

    p._jsonDeferred = null;
    p._assetDeferred = null;


        //  public methods
    //  ==============

    p.renderMap = function() {
        for(var i = 0; i < this.layers.length; i++)
            this._renderLayer(this.layers[i]);
    }


    //  private methods
    //  ===============


    p._buildMap = function(assetFile) {
    
                    // adding each tile to cache   
        for(var i = 0; i < 36; i++) {
            var tile = new PIXI.Texture.fromFrame(assetFile);
            var x = i%6;
            var y = parseInt(i/6);
            tile.setFrame(new PIXI.Rectangle(x*32, y*32, 32, 32));
            var temp = new PIXI.RenderTexture(33,33);
            temp.render(new PIXI.Sprite(tile));
            PIXI.Texture.addTextureToCache(temp, "tile" + i);
        }

        PIXI.Texture.removeTextureFromCache(assetFile);
        this.renderMap();
        

    }

    p._renderLayer = function(layer) {
        var position = 0;
        for (var i = 0; i < this.mapheight; i++) {
            for (var j = 0; j < this.mapwidth; j++) {
                var tile = layer.data[position]-1;
                if(tile > 0) {
                    var texture = new PIXI.Texture.fromFrame("tile" + tile);
                    var sprite = new PIXI.Sprite(texture);
                    sprite.position.x = j*this.tilewidth;
                    sprite.position.y = i*this.tilewidth;
                    this.map.addChild(sprite);
                }
                position++;
            }
        }       
    }



ayai.TileMap = TileMap; }(window));
