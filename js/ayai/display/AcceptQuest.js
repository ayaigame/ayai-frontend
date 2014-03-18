define("AcceptQuest", ["GameStateInterface"], function(GameStateInterface) {

    function AcceptQuest(MessageSender) {
        p.messageSender = MessageSender;

    };

    var p = AcceptQuest.prototype;


    p.renderQuest = function(questToShow) {

        var tplSource = $("#questView-template").html();
        var template = Handlebars.compile(tplSource);
        var html = template(questToShow);
        $("div#accept-questview").html(html);
        p.attachClickListeners(questToShow);

    };

    p.show = function(message) {
        //Fix this hack
        var questToShow = message.quest;
        message.quest.entityId = message.entityId;
        p.currentQuest = questToShow;
        p.renderQuest(questToShow);
        $('div#accept-quest').toggleClass("open");
    };

    p.attachClickListeners = function(questToAccept) {
        $('button.quest-accept-button').on('click', function(questToShow) {
            console.log("got here");
            p.sendAcceptMessage(questToAccept);
            $('div#accept-quest').removeClass("open");
        });
        $('button.quest-decline-button').on('click', function(questToShow) {
            $('div#accept-quest').removeClass("open");
        });
    };

    p.sendAcceptMessage = function(questToAccept) {
        console.log(questToAccept);
        GameStateInterface.prototype.sendAcceptQuestMessage(questToAccept.id, questToAccept.entityId);
    }

    p.update = function(quests) {};
    return AcceptQuest;
});