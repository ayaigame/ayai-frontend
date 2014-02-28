define("QuestLog", function() {

	var QuestLog = function() {

		Handlebars.registerHelper('json', function(context) {
		    return JSON.stringify(context);
		});

        };

	    var p  = QuestLog.prototype;

        
    
        

  



		p.isOpen = false;
		p.previousJson = "";

        


    p.renderQuests = function() {
        var tplSource = $("#questListView-template").html();
        var template = Handlebars.compile(tplSource);
        var html = template(p.questList);
        $("div#questList").html(html);



		p.attachClickListeners();

        if (p.selectedQuest == null) {
            return;
        }
        var templateSource = $("#questView-template").html();
        var template = Handlebars.compile(templateSource);
        var html = template(p.selectedQuest);

        $('div#questlogRight').html(html);

    };


	p.toggle = function() {
        p.questList = Ayai.quests;
        p.renderQuests();
       
      

        $('div#questlog').toggleClass("open");
    };

    p.attachClickListeners = function() {
        
        $('li.questListItem').on('click', function() {
            console.log("got here");
            p.selectedQuest = $(this).data('model'); 
            p.renderQuests();
            
        });

    };




	p.update = function(quests) {

	};


	return QuestLog;

});
