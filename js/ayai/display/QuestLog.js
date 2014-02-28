define("QuestLog", function() {

    function QuestLog () {
        Handlebars.registerHelper('json', function(context) {
            return JSON.stringify(context);
        });
    };
    var p = QuestLog.prototype;

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
    p.update = function(quests) {};
    return QuestLog;
});