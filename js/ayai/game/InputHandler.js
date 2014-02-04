this.ayai = this.ayai || {};
(function() {

	var InputHandler = function() {

		upKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.W);
	    downKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.S);
	    leftKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.A);
	    rightKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.D);
	    enterKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);


		enterKey.onDown.add(function() {

	    	if(!ayai.chat.isEditBoxOpen) {
		    	ayai.chat.openEditBox();

		    	//ayai.game.input.keyboard.stop();
		    	upKey.onDown.removeAll();
		    	upKey.onUp.removeAll();

				ayai.gameState.sendInputToGameState(new InputEvent("!isUp"));
				ayai.gameState.sendInputToGameState(new InputEvent("!isRight"));
				ayai.gameState.sendInputToGameState(new InputEvent("!isLeft"));
				ayai.gameState.sendInputToGameState(new InputEvent("!isDown"));
		    	ayai.game.input.keyboard.removeKey(Phaser.Keyboard.W);
		    	ayai.game.input.keyboard.removeKey(Phaser.Keyboard.A);
		    	ayai.game.input.keyboard.removeKey(Phaser.Keyboard.S);
		    	ayai.game.input.keyboard.removeKey(Phaser.Keyboard.D);
		    	ayai.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
		    	ayai.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
		    	ayai.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
		    	ayai.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
		    }
		    else {
		    	ayai.chat.send();
		    	ayai.chat.closeEditBox();
		    	upKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.W);
			    downKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.S);
			    leftKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.A);
			    rightKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.D);
		    	registerKeyPresses();
		    	//ayai.game.input.keyboard.start();
		    }

		});
		
		registerKeyPresses();

	};


	var p = InputHandler.prototype;

	p.update = function() {

	};

	function registerKeyPresses() {

		upKey.onDown.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("isUp"));
		});
		rightKey.onDown.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("isRight"));
		});
		leftKey.onDown.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("isLeft"));
		});
		downKey.onDown.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("isDown"));
		});

		upKey.onUp.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("!isUp"));
		});
		rightKey.onUp.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("!isRight"));
		});
		leftKey.onUp.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("!isLeft"));
		});
		downKey.onUp.add(function() {
			ayai.gameState.sendInputToGameState(new InputEvent("!isDown"));
		});

	}



ayai.InputHandler = InputHandler;} (window));