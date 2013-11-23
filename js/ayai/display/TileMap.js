
this.ayai = this.ayai || {};

(function () {

    var TileMap = function (json) {
        // constructor
        this.mapdata = json;
        this.renderMap();

    };

    var p = TileMap.prototype;
    p.mapdata = null;
    p.map =  new PIXI.DisplayObjectContainer();

    p.renderMap = function() {
        console.log(this.mapdata);
        for (var i = 0; i < this.mapdata.json.length; i++) {
            var ent = this.mapdata.json[i];
            var texture = new PIXI.Texture.fromFrame(ent.sprite);
            var sprite = new PIXI.Sprite(texture);
            sprite.position.x = ent.position_x;
            sprite.position.y = ent.position_y;
            console.log(ent);
            this.map.addChild(sprite);
        }
        console.log(this.map);
        //this.showMap();
    }

    p.getMap = function() {
        return this.map;
    }



ayai.TileMap = TileMap; }(window));
