define("InputHandler", ["phaser", "InputEvent", "UnitFrame"], function (Phaser, InputEvent, UnitFrame) {
	var p = InputHandler.prototype;

    //To add a new key you must update the following
    //1. you must update loadKeyConfigurate to set the default value
    //2. you must add your key to fixReferences
    //3. you must add your keys functionality to registerKeypresses

	function InputHandler(game, gameState, inventory, chat, questLog, acceptQuest) {

		p.game = game;
		p.gameState = gameState;
		p.inventory = inventory;
		p.chat = chat;
		p.questLog = questLog;
		p.acceptQuest = acceptQuest;
        p.loadKeyConfiguration();


		enterKey = p.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);


		enterKey.onDown.add(function() {
            p.handleChatButtonPress();
		});

		p.registerKeyPresses();
	};

    p.handleChatButtonPress = function() {
        if (!p.chat.isEditBoxOpen) {
            p.chat.openEditBox();
            p.unattachClickHandlers();
        }

        else {
            p.chat.send();
            p.chat.closeEditBox();
            p.reattachClickHandlers();
        }
    }

    p.changeControlForName = function(name, newKeycode) {
        var keyToChange = _.where(p.boundKeys, {"name":name})[0]; //should only return one, this is why we need to have the names unique


        p.game.input.keyboard.removeKey(keyToChange.key.keyCode);
        var actualKey = keyToChange.key;
        console.log(actualKey);
        keyToChange.key = p.game.input.keyboard.addKey(newKeycode);
        keyToChange.boundString = p.charCodeToString(newKeycode);
        console.log(p.rightKey);
        p.fixReferences();
        p.registerKeyPresses();
    }

    p.loadKeyConfiguration = function() {

        p.upKey = p.game.input.keyboard.addKey(Phaser.Keyboard.W);
		p.downKey = p.game.input.keyboard.addKey(Phaser.Keyboard.S);
		p.leftKey = p.game.input.keyboard.addKey(Phaser.Keyboard.A);
		p.rightKey = p.game.input.keyboard.addKey(Phaser.Keyboard.D);
		p.attackKey = p.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		p.inventoryKey = p.game.input.keyboard.addKey(Phaser.Keyboard.I);
		p.questLogKey = p.game.input.keyboard.addKey(Phaser.Keyboard.L);
		p.displayDamageKey = p.game.input.keyboard.addKey(Phaser.Keyboard.G);
		p.clearTargetKey = p.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        p.boundKeys = [];

        //Names must be unique!

        p.boundKeys.push({"key": p.upKey, "name":"up", "boundString": p.charCodeToString(p.upKey.keyCode)});
		p.boundKeys.push({"key": p.downKey, "name":"down", "boundString": p.charCodeToString(p.downKey.keyCode)});
		p.boundKeys.push({"key": p.leftKey, "name":"left", "boundString": p.charCodeToString(p.leftKey.keyCode)});
		p.boundKeys.push({"key": p.rightKey, "name":"right", "boundString": p.charCodeToString(p.rightKey.keyCode)});
		p.boundKeys.push({"key": p.attackKey, "name":"attack", "boundString": p.charCodeToString(p.attackKey.keyCode)});
		p.boundKeys.push({"key": p.inventoryKey, "name":"inventory", "boundString": p.charCodeToString(p.inventoryKey.keyCode)});
		p.boundKeys.push({"key": p.questLogKey, "name":"quest log", "boundString": p.charCodeToString(p.questLogKey.keyCode)});
		p.boundKeys.push({"key": p.displayDamageKey, "name":"display damage", "boundString": p.charCodeToString(p.displayDamageKey.keyCode)});
		p.boundKeys.push({"key": p.clearTargetKey, "name":"clear target", "boundString": p.charCodeToString(p.clearTargetKey.keyCode)});

    }

    p.unattachClickHandlers = function() {
        p.gameState.sendInputToGameState(new InputEvent("!isUp"));
        p.gameState.sendInputToGameState(new InputEvent("!isRight"));
        p.gameState.sendInputToGameState(new InputEvent("!isLeft"));
        p.gameState.sendInputToGameState(new InputEvent("!isDown"));

        _.map(p.boundKeys, function(key) {
            p.game.input.keyboard.removeKey(key.key.keyCode);
            console.log(key);
        })
        p.game.input.keyboard.clearCaptures();
    }

    p.reattachClickHandlers = function() {
        _.map(p.boundKeys, function(keyDict) {
            keyDict.key = p.game.input.keyboard.addKey(keyDict.key.keyCode);
        });
        p.fixReferences();
        p.registerKeyPresses();
    }

    p.charCodeToString = function(charCode) {
        var toReturn = String.fromCharCode(charCode);

        //console.log(toReturn);
        if (toReturn.match("[A-Z]")) {
            return toReturn;
        }

        switch (charCode) {
            case Phaser.Keyboard.SPACEBAR:
                return "space";
            case Phaser.Keyboard.ESCAPE:
                return "escape";
            case Phaser.Keyboard.UP:
                return "up arrow";
            case Phaser.Keyboard.DOWN:
                return "down arrow";
            case Phaser.Keyboard.LEFT:
                return "left arrow";
            case Phaser.Keyboard.RIGHT:
                return "right arrow";
            case Phaser.Keyboard.DELETE:
                return "delete";
            case Phaser.Keyboard.INSERT:
                return "insert";
            case Phaser.Keyboard.HOME:
                return "home";
            case Phaser.Keyboard.END:
                return "end";
            case Phaser.Keyboard.PAGE_UP:
                return "page up";
            case Phaser.Keyboard.PAGE_DOWN:
                return "page down";
            case Phaser.Keyboard.ESC:
                return "escape";
        }

        return "unknown key";
    }

    p.fixReferences = function() {
        p.upKey = _.where(p.boundKeys, {"name":"up"})[0].key;
		p.downKey = _.where(p.boundKeys, {"name":"down"})[0].key;
		p.leftKey = _.where(p.boundKeys, {"name":"left"})[0].key;
		p.rightKey = _.where(p.boundKeys, {"name":"right"})[0].key;
		p.attackKey = _.where(p.boundKeys, {"name":"attack"})[0].key;
		p.inventoryKey = _.where(p.boundKeys, {"name":"inventory"})[0].key;
		p.questLogKey = _.where(p.boundKeys, {"name":"quest log"})[0].key;
		p.displayDamageKey = _.where(p.boundKeys, {"name":"display damage"})[0].key;
		p.clearTargetKey = _.where(p.boundKeys, {"name":"clear target"})[0].key;
    }

	p.registerKeyPresses = function() {

		p.clearTargetKey.onDown.add(function() {

			UnitFrame.prototype.clearTarget();
		})
		p.attackKey.onDown.add(function() {
			ayai.sfx.sword.play();
			p.gameState.sendAttack();
		});
		p.inventoryKey.onDown.add(function() {
			p.inventory.toggle();
		});
		p.questLogKey.onDown.add(function() {
			p.questLog.toggle();
		});

		p.displayDamageKey.onDown.add(function() {
			Window.character.displayDamage();
		});
		p.upKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isUp"));
		});
		p.rightKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isRight"));
		});
		p.leftKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isLeft"));
		});
		p.downKey.onDown.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("isDown"));
		});
		p.upKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isUp"));
		});
		p.rightKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isRight"));
		});
		p.leftKey.onUp.add(function() {
			p.gameState.sendInputToGameState(new InputEvent("!isLeft"));
		});
		p.downKey.onUp.add(function() {
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