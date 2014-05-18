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
			AcceptQuest: 'ayai/display/AcceptQuest',
            ControlSettings: 'ayai/display/ControlSettings',
            SoundSettings: 'ayai/display/SoundSettings',


			Entity: 'ayai/game/Entity',
			UnitFrame: 'ayai/display/hud/UnitFrame',
			GameStateInterface: 'ayai/game/GameStateInterface',
			Connection: 'ayai/net/Connection',
			AbandonQuestMessage: 'ayai/net/messages/AbandonQuestMessage',
			AcceptQuestMessage: 'ayai/net/messages/AcceptQuestMessage',
			DropItemMessage: 'ayai/net/messages/DropItemMessage',
			UnequipMessage: 'ayai/net/messages/UnequipMessage',
			EquipMessage: 'ayai/net/messages/EquipMessage',
			AttackMessage: 'ayai/net/messages/AttackMessage',
      		ChatMessage: 'ayai/net/messages/ChatMessage',
		    InteractMessage: 'ayai/net/messages/InteractMessage',
			StartMovementMessage: 'ayai/net/messages/StartMovementMessage',
			StopMovementMessage: 'ayai/net/messages/StopMovementMessage',
			UseItemMessage: 'ayai/net/messages/UseItemMessage',

			SpawnMessage: 'ayai/net/messages/SpawnMessage',
			MessageSender: 'ayai/net/MessageSender',
			MessageReceiver: 'ayai/net/MessageReceiver',
			phaser: 'lib/phaser'

		},
		urlArgs: "bust=" +  (new Date()).getTime()

	});

	require(["Ayai"], function(Ayai) {
		new Ayai();
	});
};
