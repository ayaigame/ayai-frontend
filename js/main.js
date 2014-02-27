var stage;
var renderer;
window.trace = function(msg) {}
window.onload = function() {

	require.config( {

		paths: {

			Ayai: 'ayai/Ayai',
			InputEvent: 'ayai/game/InputEvent',
			InputHandler: 'ayai/game/InputHandler',
			Inventory: 'ayai/display/Inventory',
			Chat: 'ayai/display/hud/Chat',
			QuestLog: 'ayai/display/QuestLog',
			Character: 'ayai/display/Character',
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
		window.Ayai = new Ayai();
	});
};