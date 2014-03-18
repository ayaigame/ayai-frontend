define("QuestLog", ["GameStateInterface", "AbandonQuestMessage"], function(GameStateInterface, AbandonQuestMessage) {

    function QuestLog() {

        Handlebars.registerHelper('json', function(context) {
            return JSON.stringify(context);
        });
    };

    var p = QuestLog.prototype;
    p.isOpen = false;

    p.questList = [{
        "title": "My Awesome Quest",
        objectives: [{
            "name": "Kill the Dragon lets break this with a really long line",
            totalComplete: 0,
            total: 1
        }],
        "story": "Smaug the dragon must be stopped. You must help bilbo on his journey to smaug and his misadventures on the way. He is an expert theif according to Gandalf so he will come im handy when we need to sneak around."
    }, {
        "title": "My Other quest",
        objectives: [{
            "name": "Kill the Rabbit lets break this with a really long line",
            totalComplete: 0,
            total: 1
        }],
        "story": "Smaug the rabbit must be stopped. You must help elmer fudd on his journey to smaug and his misadventures on the way. He is an expert theif according to Gandalf so he will come im handy when we need to sneak around."
    }];

    p.renderQuests = function() {

        var tplSource = $("#questListView-template").html();
        var template = Handlebars.compile(tplSource);
        var html = template(p.questList);
        $("div#questList").html(html);
        p.attachClickListeners();

        if (p.selectedQuest == null) {
            $('div#questlogRight').html("");
            return;
        }

        var templateSource = $("#questView-template").html();
        var template = Handlebars.compile(templateSource);
        p.selectedQuest.showAbandon = true;
        var html = template(p.selectedQuest);
        console.log(p.selectedQuest);
        p.selectedQuest.showAbandon = false;
        $('div#questlogRight').html(html);
        p.attachAbandonListener();
    };

    p.toggle = function() {

        p.questList = ayai.quests;
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

    p.attachAbandonListener = function() {
        $('button.abandonButton').on('click', function() {
            console.log("Clicked!");
            console.log($(this).data('questid'));
            var questId = $(this).data('questid');
            GameStateInterface.prototype.sendAbandonQuestMessage($(this).data('questid'));
            p.questList = _.filter(p.questList, function(quest){ return quest.id != questId; });
            p.selectedQuest = null;
            p.renderQuests();
        });
    }



    p.update = function(quests) {};
    return QuestLog;
});