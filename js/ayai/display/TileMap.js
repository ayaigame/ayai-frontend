(function() {

    var TileMap = function(json) {
       // constructor
       this.layers = json.layers;    
		 this.tilesets = json.tilesets;
		 this.tileheight = json.tileheight;
		 this.tilewidth = json.tilewidth;
		 this.mapwidth = json.width;
		 this.mapheight = json.height;
       this.map = new PIXI.DisplayObjectContainer();
		 this.renderMap();
    };
    var p = TileMap.prototype;

 

   //  public properties 
   //  =================     

    p.layers = null;    
    p.tilesets = null;
    p.tileheight = null;
    p.tilewidth = null;
    p.mapwidth = null;
    p.mapheight = null;
    p.map = null;



    //  public methods
    //  ==============

    p.renderMap = function() {
        for(var i = 0; i < layers.length; i++)
            this._renderLayer(layers[i]);
    }



    //  private methods
    //  ===============

    p._renderLayer = function() {
        var position = 0;
        for (var i = 0; i < mapheight; i++) {
            for (var j = 0; j < mapwidth; j++) {
                var tile = layer.data[position]-1;
                if(tile > 0) {
                    var texture = new PIXI.Texture.fromFrame("tile" + tile);
                    var sprite = new PIXI.Sprite(texture);
                    sprite.position.x = j*tilewidth;
                    sprite.position.y = i*tilewidth;
                    map.addChild(sprite);
                }
                position++;
            }
        }       
    }



window.TileMap = TileMap; }(window));
