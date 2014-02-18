this.ayai = this.ayai || {};
(function() {
	var InputHandler = function() {
		boundKeys = [];
		upKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.W);
		downKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.S);
		leftKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.A);
		rightKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.D);
		spaceKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		iKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.I);
		lKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.L);

		boundKeys.push(upKey);
		boundKeys.push(downKey);
		boundKeys.push(leftKey);
		boundKeys.push(rightKey);
		boundKeys.push(spaceKey);
		boundKeys.push(iKey);
		boundKeys.push(lKey);

		enterKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		
		enterKey.onDown.add(function() {
			if (!ayai.chat.isEditBoxOpen) {
				ayai.chat.openEditBox();
				ayai.gameState.sendInputToGameState(new InputEvent("!isUp"));
				ayai.gameState.sendInputToGameState(new InputEvent("!isRight"));
				ayai.gameState.sendInputToGameState(new InputEvent("!isLeft"));
				ayai.gameState.sendInputToGameState(new InputEvent("!isDown"));
				for (var i = 0; i < boundKeys.length; i++) {
					ayai.game.input.keyboard.removeKey(boundKeys[i].keyCode);
				}
				ayai.game.input.keyboard.clearCaptures();
			} else {
				ayai.chat.send();
				ayai.chat.closeEditBox();
				upKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.W);
				downKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.S);
				leftKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.A);
				rightKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.D);
				spaceKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				iKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.I);
				lKey = ayai.game.input.keyboard.addKey(Phaser.Keyboard.L);
				registerKeyPresses();
			}
		});
		registerKeyPresses();
	};
	var p = InputHandler.prototype;
	p.update = function() {};

	function registerKeyPresses() {
		spaceKey.onDown.add(function() {
			ayai.gameState.sendAttack();
		});
		iKey.onDown.add(function() {
			ayai.inventory.toggle();
		});
		lKey.onDown.add(function() {
			ayai.questLog.toggle();
		});
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
	ayai.InputHandler = InputHandler;
}(window));
/*Phaser.Keyboard.A = "A".charCodeAt(0);
Phaser.Keyboard.B = "B".charCodeAt(0);
Phaser.Keyboard.C = "C".charCodeAt(0);
Phaser.Keyboard.D = "D".charCodeAt(0);
Phaser.Keyboard.E = "E".charCodeAt(0);
Phaser.Keyboard.F = "F".charCodeAt(0);
Phaser.Keyboard.G = "G".charCodeAt(0);
Phaser.Keyboard.H = "H".charCodeAt(0);
Phaser.Keyboard.I = "I".charCodeAt(0);
Phaser.Keyboard.J = "J".charCodeAt(0);
Phaser.Keyboard.K = "K".charCodeAt(0);
Phaser.Keyboard.L = "L".charCodeAt(0);
Phaser.Keyboard.M = "M".charCodeAt(0);
Phaser.Keyboard.N = "N".charCodeAt(0);
Phaser.Keyboard.O = "O".charCodeAt(0);
Phaser.Keyboard.P = "P".charCodeAt(0);
Phaser.Keyboard.Q = "Q".charCodeAt(0);
Phaser.Keyboard.R = "R".charCodeAt(0);
Phaser.Keyboard.S = "S".charCodeAt(0);
Phaser.Keyboard.T = "T".charCodeAt(0);
Phaser.Keyboard.U = "U".charCodeAt(0);
Phaser.Keyboard.V = "V".charCodeAt(0);
Phaser.Keyboard.W = "W".charCodeAt(0);
Phaser.Keyboard.X = "X".charCodeAt(0);
Phaser.Keyboard.Y = "Y".charCodeAt(0);
Phaser.Keyboard.Z = "Z".charCodeAt(0);
Phaser.Keyboard.ZERO = "0".charCodeAt(0);
Phaser.Keyboard.ONE = "1".charCodeAt(0);
Phaser.Keyboard.TWO = "2".charCodeAt(0);
Phaser.Keyboard.THREE = "3".charCodeAt(0);
Phaser.Keyboard.FOUR = "4".charCodeAt(0);
Phaser.Keyboard.FIVE = "5".charCodeAt(0);
Phaser.Keyboard.SIX = "6".charCodeAt(0);
Phaser.Keyboard.SEVEN = "7".charCodeAt(0);
Phaser.Keyboard.EIGHT = "8".charCodeAt(0);
Phaser.Keyboard.NINE = "9".charCodeAt(0);
Phaser.Keyboard.NUMPAD_0 = 96;
Phaser.Keyboard.NUMPAD_1 = 97;
Phaser.Keyboard.NUMPAD_2 = 98;
Phaser.Keyboard.NUMPAD_3 = 99;
Phaser.Keyboard.NUMPAD_4 = 100;
Phaser.Keyboard.NUMPAD_5 = 101;
Phaser.Keyboard.NUMPAD_6 = 102;
Phaser.Keyboard.NUMPAD_7 = 103;
Phaser.Keyboard.NUMPAD_8 = 104;
Phaser.Keyboard.NUMPAD_9 = 105;
Phaser.Keyboard.NUMPAD_MULTIPLY = 106;
Phaser.Keyboard.NUMPAD_ADD = 107;
Phaser.Keyboard.NUMPAD_ENTER = 108;
Phaser.Keyboard.NUMPAD_SUBTRACT = 109;
Phaser.Keyboard.NUMPAD_DECIMAL = 110;
Phaser.Keyboard.NUMPAD_DIVIDE = 111;
Phaser.Keyboard.F1 = 112;
Phaser.Keyboard.F2 = 113;
Phaser.Keyboard.F3 = 114;
Phaser.Keyboard.F4 = 115;
Phaser.Keyboard.F5 = 116;
Phaser.Keyboard.F6 = 117;
Phaser.Keyboard.F7 = 118;
Phaser.Keyboard.F8 = 119;
Phaser.Keyboard.F9 = 120;
Phaser.Keyboard.F10 = 121;
Phaser.Keyboard.F11 = 122;
Phaser.Keyboard.F12 = 123;
Phaser.Keyboard.F13 = 124;
Phaser.Keyboard.F14 = 125;
Phaser.Keyboard.F15 = 126;
Phaser.Keyboard.COLON = 186;
Phaser.Keyboard.EQUALS = 187;
Phaser.Keyboard.UNDERSCORE = 189;
Phaser.Keyboard.QUESTION_MARK = 191;
Phaser.Keyboard.TILDE = 192;
Phaser.Keyboard.OPEN_BRACKET = 219;
Phaser.Keyboard.BACKWARD_SLASH = 220;
Phaser.Keyboard.CLOSED_BRACKET = 221;
Phaser.Keyboard.QUOTES = 222;
Phaser.Keyboard.BACKSPACE = 8;
Phaser.Keyboard.TAB = 9;
Phaser.Keyboard.CLEAR = 12;
Phaser.Keyboard.ENTER = 13;
Phaser.Keyboard.SHIFT = 16;
Phaser.Keyboard.CONTROL = 17;
Phaser.Keyboard.ALT = 18;
Phaser.Keyboard.CAPS_LOCK = 20;
Phaser.Keyboard.ESC = 27;
Phaser.Keyboard.SPACEBAR = 32;
Phaser.Keyboard.PAGE_UP = 33;
Phaser.Keyboard.PAGE_DOWN = 34;
Phaser.Keyboard.END = 35;
Phaser.Keyboard.HOME = 36;
Phaser.Keyboard.LEFT = 37;
Phaser.Keyboard.UP = 38;
Phaser.Keyboard.RIGHT = 39;
Phaser.Keyboard.DOWN = 40;
Phaser.Keyboard.INSERT = 45;
Phaser.Keyboard.DELETE = 46;
Phaser.Keyboard.HELP = 47;
Phaser.Keyboard.NUM_LOCK = 144;*/