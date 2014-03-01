var stage;
var renderer;
window.trace = function(msg) {}
window.onload = function() {

	require.config( {

		paths: {

			Ayai: 'ayai/Ayai',
			Util: 'ayai/Util',
			InputEvent: 'ayai/game/InputEvent',
			InputHandler: 'ayai/game/InputHandler',
			Inventory: 'ayai/display/Inventory',
			Chat: 'ayai/display/hud/Chat',
			QuestLog: 'ayai/display/QuestLog',
			Entity: 'ayai/game/Entity',
			UnitFrame: 'ayai/display/hud/UnitFrame',
			GameStateInterface: 'ayai/game/GameStateInterface',
			Connection: 'ayai/net/Connection',
			AttackMessage : 'ayai/net/messages/AttackMessage',
			StartMovementMessage: 'ayai/net/messages/StartMovementMessage',
			StopMovementMessage: 'ayai/net/messages/StopMovementMessage',
			MessageSender: 'ayai/net/MessageSender',
			MessageReceiver: 'ayai/net/MessageReceiver',
			phaser: 'lib/phaser'

		}

	});

	require(["Ayai"], function(Ayai) {
		new Ayai();
	});
};