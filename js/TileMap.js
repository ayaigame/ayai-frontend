function TileMap(json) {

    var layers = json.layers;    
    var tilesets = json.tilesets;

    var tileheight = json.tileheight;
    var tilewidth = json.tilewidth;

    var mapwidth = json.width;
    var mapheight = json.height;

    var map = new PIXI.DisplayObjectContainer();

    var renderMap = function() {
        for(var i = 0; i < layers.length; i++)
            renderLayer(layers[i]);
    }

    var renderLayer = function(layer) {
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
    
    renderMap();

    return {
        map: function() { return map; },
    }   
}
