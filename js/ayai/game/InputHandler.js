this.ayai = this.ayai || {};
(function() {

	var InputHandler = function() {

		upKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.W);
	    downKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.S);
	    leftKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.A);
	    rightKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.D);

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

	};

	var p = InputHandler.prototype;

	p.update = function() {




	};



ayai.InputHandler = InputHandler;} (window));