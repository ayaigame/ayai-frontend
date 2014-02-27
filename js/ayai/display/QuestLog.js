define("QuestLog", function() {


		function QuestLog() {
		/*$('div#char-window').draggable({

			drag: function() {
			
				$('div#char-window').width($('div#char-window div#container').width());	
				$('div#char-window').height($('div#char-window div#container').height());	
			}

		});*/
  



		p.isOpen = false;
		p.previousJson = "";

	};

	var p  = QuestLog.prototype;

	p.toggle = function() {

        var selectedQuest = {"title":"My Awesome Quest", objectives:[{"name":"Kill the Dragon lets break this with a really long line", totalComplete:0, total:1}], "story":"Smaug the dragon must be stopped. You must help bilbo on his journey to smaug and his misadventures on the way. He is an expert theif according to Gandalf so he will come im handy when we need to sneak around."};

        var templateSource = $("#questView-template").html();
        var template = Handlebars.compile(templateSource);
        var html = template(selectedQuest);

        $('div#questlogRight').html(html);
		$('div#questlog').toggleClass("open");
        console.log("OK");
        
	};

	p.update = function(quests) {

		if(this.previousJson == "")
		{


		}
	};


	return QuestLog;

});