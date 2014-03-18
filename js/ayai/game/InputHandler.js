define("InputHandler", ["phaser", "InputEvent", "UnitFrame"], function (Phaser, InputEvent, UnitFrame) {
	var p = InputHandler.prototype;

	function InputHandler(game, gameState, inventory, chat, questLog, acceptQuest) {

		p.game = game;
		p.gameState = gameState;
		p.inventory = inventory;
		p.chat = chat;
		p.questLog = questLog;
		p.acceptQuest = acceptQuest;
		boundKeys = [];

		upKey = p.game.input.keyboard.addKey(Phaser.Keyboard.W);
		downKey = p.game.input.keyboard.addKey(Phaser.Keyboard.S);
		leftKey = p.game.input.keyboard.addKey(Phaser.Keyboard.A);
		rightKey = p.game.input.keyboard.addKey(Phaser.Keyboard.D);
		spaceKey = p.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		iKey = p.game.input.keyboard.addKey(Phaser.Keyboard.I);
		lKey = p.game.input.keyboard.addKey(Phaser.Keyboard.L);
		gKey = p.game.input.keyboard.addKey(Phaser.Keyboard.G);
		tKey = p.game.input.keyboard.addKey(Phaser.Keyboard.T);
		escKey = p.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

		boundKeys.push(upKey);
		boundKeys.push(downKey);
		boundKeys.push(leftKey);
		boundKeys.push(rightKey);
		boundKeys.push(spaceKey);
		boundKeys.push(iKey);
		boundKeys.push(lKey);
		boundKeys.push(gKey);
		boundKeys.push(tKey);
		boundKeys.push(escKey);

		enterKey = p.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);


		enterKey.onDown.add(function() {

			if (!p.chat.isEditBoxOpen) {
				p.chat.openEditBox();
				p.gameState.sendInputToGameState(new InputEvent("!isUp"));
				p.gameState.sendInputToGameState(new InputEvent("!isRight"));
				p.gameState.sendInputToGameState(new InputEvent("!isLeft"));
				p.gameState.sendInputToGameState(new InputEvent("!isDown"));
				for (var i = 0; i < boundKeys.length; i++) {
					p.game.input.keyboard.removeKey(boundKeys[i].keyCode);
				}
				p.game.input.keyboard.clearCaptures();
			} 

			else {
				p.chat.send();
				p.chat.closeEditBox();
				upKey = p.game.input.keyboard.addKey(Phaser.Keyboard.W);
				downKey = p.game.input.keyboard.addKey(Phaser.Keyboard.S);
				leftKey = p.game.input.keyboard.addKey(Phaser.Keyboard.A);
				rightKey = p.game.input.keyboard.addKey(Phaser.Keyboard.D);
				spaceKey = p.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				iKey = p.game.input.keyboard.addKey(Phaser.Keyboard.I);
				lKey = p.game.input.keyboard.addKey(Phaser.Keyboard.L);
				gKey = p.game.input.keyboard.addKey(Phaser.Keyboard.G);
				escKey = p.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
				p.registerKeyPresses();
			}
		});
		p.registerKeyPresses();
	};

	p.registerKeyPresses = function() {


		escKey.onDown.add(function() {

			UnitFrame.prototype.clearTarget();
		})

		spaceKey.onDown.add(function() {

			ayai.sfx.sword.play();
			p.gameState.sendAttack();
		});
		iKey.onDown.add(function() {
			p.inventory.toggle();
		});
		lKey.onDown.add(function() {
			p.questLog.toggle();
		});
		tKey.onDown.add(function() {
			var quest = {title:"Test Quest", description:"You must kill troublesome boars in the forest",
						objectives:[{name:"Kill Boars", totalCompleted:1, totalNeeded:1000}]};
			p.acceptQuest.show(quest);
		})
		gKey.onDown.add(function() {
			Window.character.displayDamage();
		});
		upKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isUp"));
		});
		rightKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isRight"));
		});
		leftKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isLeft"));
		});
		downKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isDown"));
		});
		upKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isUp"));
		});
		rightKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isRight"));
		});
		leftKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isLeft"));
		});
		downKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isDown"));
		});
	};
	return InputHandler;
});
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