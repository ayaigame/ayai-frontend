define("Chat", ["ChatMessage"],  function(ChatMessage) {

	function Chat(connection, characterId) {
    p.connection = connection;
    p.characterId = characterId
		p.isEditBoxOpen = false;
		p.data = {};

	};

	var p = Chat.prototype;

	p.openEditBox = function() {
		this.isEditBoxOpen = true;

		$("#editbox").addClass("open");
		$("#chat").addClass("open");
		$("#editbox input").focus();

	};

	p.closeEditBox = function() {

		this.isEditBoxOpen = false;
		var editbox = $("#editbox input");

		$("#editbox").removeClass("open");
		$("#chat").removeClass("open");

		editbox.val("");
		editbox.blur();
	}

	p.displayMessage = function(msg) {

		$("#chat-pane").append("<span class='character'>" + msg.sender + ": </span>");
		$("#chat-pane").append("<span class='msg'>" + msg.message + "</span><br />");
        $("#chat-pane").scrollTop(99999);
	}

	p.send = function(name) {

		var editbox = $("#editbox input");

		if(editbox.val().length != 0) {
		      var message = new ChatMessage(editbox.val(), name);
		      console.log("Sending: " + message.data);
		      p.connection.send(message.data);
		      editbox.val("");
		}

	}

	return Chat;
});
