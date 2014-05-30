Ayai (HTML5 Frontend)
=====================

##Overview
The front-end component of Ayai is a browser game written in Javascript, leveraging the HTML5 canvas element to render sprites and terrain in WebGL. We used styled divs and Handlebars templates for other UI elements.

Note: The main branch is 'develop'.

##Installation

###Unix
```
git clone https://github.com/ayaigame/ayai-frontend.git
sudo su
apt-get update 
apt-get install python-software-properties
add-apt-repository ppa:nginx/stable
apt-get update
apt-cache show nginx
```
Find the one with nginx version 1.4.4 and copy and paste it below where $VERSION is
(for example 1.4.4-1~precise)

```
apt-get install nginx=$VERSION 
cd /etc/nginx/sites-enabled 
rm default
wget https://raw2.github.com/ayaigame/ayai/master/provisioning/roles/common/files/conf/ayai.conf
service nginx restart
iptables -t nat -A OUTPUT -d 192.168.100.10 -j DNAT --to-destination 127.0.0.1

```
Then just edit ayai.conf and point it to the root of your frontend directory, and sudo nginx restart.

You should then be able to access the following URLs from your local machine:

Editor: http://192.168.100.10/editor <br />
Game: http://192.168.100.10/debug.html


###Windows
```
git clone https://github.com/ayaigame/ayai-frontend.git
python run-windows.py
```

###Mac
```
git clone https://github.com/ayaigame/ayai-frontend.git
```

##Documentation

###Phaser.js - Terrain and Sprites
We make extensive use of the [Phaser.js](http://phaser.io/) library to render images in WebGL.This library provides a layer of abstraction above the PIXI.js WebGL renderer, making it much easier to create 2D browser games with WebGL. 

The current version used by the project is Phaser v1.1.3 - Released: 21st Nov 2013. At the time of this writing, the newest stable release of Phaser.js is Version: 2.0.5 "Tanchico" - Released: 20th May 2014. Adapting the project to use the new version would likely provide some benefits in stability and efficiency.

[Examples of Phaser.js code](http://examples.phaser.io/)<br />
[Phaser.js documentation](http://docs.phaser.io/)

####Terrain

Phaser.js allows you to easily render a tilemap that is in [Tiled](http://www.mapeditor.org/) JSON format to the HTML canvas. 
Refer to [`js/ayai/Ayai.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/Ayai.js)

Step 1: Load the assets.
```javascript
//ayai.tilemap = filename OR raw tiled JSON
//ayai.tileset = URL of tileset to reference
ayai.preload = function() {
    ayai.game.load.tileset('tileset', ayai.tileset, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);
    ayai.game.load.tilemap('tilemap', null, ayai.tilemap, Phaser.Tilemap.TILED_JSON);
}
```

Step 2: Render the assets.

```javascript

ayai.create = function() {
    ayai.renderMap('tileset', 'tilemap');
}

```

For loading assets while the game is running, ensure that the assets are loaded before rendering the map, i.e.:

```javascript
ayai.currentTileset = 'nextTileset';
ayai.currentTilemap = 'nextTilemap';
ayai.game.load.tilemap(ayai.currentTilemap, null, ayai.tilemap2, Phaser.Tilemap.TILED_JSON);
ayai.game.load.tileset(ayai.currentTileset, ayai.tileset2, ayai.TILE_WIDTH, ayai.TILE_HEIGHT);

ayai.game.load.onLoadComplete.dispatch = function() {
    ayai.renderMap(ayai.currentTileset, ayai.currentTilemap);
}
```

####Sprites

Phaser.js allows you to easily load spritesheets and display/move sprites on the HTML canvas. Refer to [`js/ayai/Ayai.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/Ayai.js) and [`js/ayai/game/Entity.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/game/Entity.js).

Step 1. Load the assets

```javascript
ayai.preload = function() {
    //ayai.game.load.spritesheet(spritesheetName, URL, frameWidth, frameHeight)
    ayai.game.load.spritesheet('guy', '../assets/sprites/guy/guysheet.png', 32, 32);
    ayai.game.load.spritesheet('fireball', '../assets/sprites/projectiles/fireball.png', 32, 32);
}

```

Step 2. Render sprites

```javascript
function Entity(json) {
    //....
    
    this.sprite = ayai.game.add.sprite(json.position.x, json.position.y, json.spritesheet);
    
    for (var i = 0; i < json.animations.length; i++) {
			var animation = json.animations[i];
			var frames = [];
			for (var x = animation.startFrame; x <= animation.endFrame; x++) {
				frames.push(x);
			}

			this.sprite.animations.add(animation.name, frames);
		}
		
    //this.sprite.animations.play(animation, fps, loop)
	this.sprite.animations.play(this.animations[0], 12, true);

    //....
}
```

Phaser.js also allows mouse listening on each sprite as well as many other built-in features. You are encouraged to check out the [Phaser.js Examples](http://examples.phaser.io/) to learn more about what this framework is capable of.

###Game State Interface

The Ayai backend server pushes update messages to the client at a specified interval. For each message received, the client hands the message to the [`js/ayai/game/GameStateInterface.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/game/GameStateInterface.js) class, which then updates the display.


###UI Elements

To put it bluntly, the UI elements were coded hastily. A huge improvement would be the usage of a framework such as Backbone.js. We tried to work the UI elements into our GameState synchronization pipeline to match the way we synchronized our Phaser.js graphics, but things ended up getting very complicated.

The UI elements could be greatly simplified by adding a DOM-binding framework to the project and asking the views to update when the models change, instead of having to manually synchronize the views in the update loop.

UI Element classes include:
* [`js/ayai/display/AcceptQuest.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/display/AcceptQuest.js)
* [`js/ayai/display/ControlSettings.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/display/ControlSettings.js)
* [`js/ayai/display/Inventory.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/display/Inventory.js)
* [`js/ayai/display/Menus.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/display/Menus.js)
* [`js/ayai/display/QuestLog.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/display/QuestLog.js)
* [`js/ayai/display/SoundSettings.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/display/SoundSettings.js)

###Input Handling

The [`js/ayai/game/InputHandler.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/game/InputHandler.js) class uses Phaser's Keyboard capturing functions in order to map keys to certain functionality.


###Networking

The Ayai client uses a lightweight asynchronous event-based system to send and receive network messages. Refer to the [`js/ayai/net`](https://github.com/ayaigame/ayai-frontend/tree/develop/js/ayai/net) namespace for more information.

####Message Receiving
Each message received spawns an event which bubbles up to the main Ayai class, and then gets routed to the GameStateInterface class to update the corresponding view.

```javascript

 //Message handling in Ayai.js

ayai._messageReceived = function(evt) {

	switch (evt.detail.msg.type) {
	
	  case "update":
                    ayai.gameState.updateEntities(evt.detail.msg);
                    break;
	
	  //.....
	}

}


```

####Message Sending
Each message that can be sent is a separate class. Refer to the [`js/ayai/net/messages`](https://github.com/ayaigame/ayai-frontend/tree/develop/js/ayai/net/messages) namespace and the [`js/ayai/game/GameStateInterface.js`](https://github.com/ayaigame/ayai-frontend/blob/develop/js/ayai/game/GameStateInterface.js) class for more information.


