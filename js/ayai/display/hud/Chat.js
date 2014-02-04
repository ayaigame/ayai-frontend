this.ayai = this.ayai || {};
(function() {

	var Chat = function() {

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
		$("#chat").scrollTop(99999);
	}

	p.send = function() {

		var editbox = $("#editbox input");

		if(editbox.val().length != 0) {
			$("#chat").append("<span class='character'>Character: </span>");
			$("#chat").append("<span class='msg'>" + editbox.val() + "<br/></span>");
		}

	}

ayai.Chat = Chat;} (window));