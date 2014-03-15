define("AcceptQuest", ["MessageSender"], function() {

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

    p.show = function(questToShow) {
        p.currentQuest = questToShow;
        p.renderQuest(questToShow);
        $('div#accept-quest').toggleClass("open");
    };

    p.attachClickListeners = function(questToAccept) {
        $('button.quest-accept-button').on('click', function(questToShow) {
            console.log("got here");
            p.sendAcceptMessage(questToAccept);
        });
        $('button.quest-decline-button').on('click', function(questToShow) {
            $('div#accept-quest').removeClass("open");
        });
    };

    p.sendAcceptMessage = function(questToAccept) {
        console.log(questToAccept);
        //Send a message using p.message sender
        //questToAccept is the questMessage that was received so you can grab the ID from there
        //to create a new message to send back to the server
    }

    p.update = function(quests) {};
    return AcceptQuest;
});