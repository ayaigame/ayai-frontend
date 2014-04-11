define("ControlSettings",["phaser"],  function(Phaser) {

    function ControlSettings(InputHandler, game) {
        p.inputHandler = InputHandler;
        p.game = game;

        $("#control-settings-button").click(function() {
            p.show();
        });

        $("#close-control-settings").click(function() {
            $("#control-settings").toggleClass("open");
        });

        p.controlToChange = "";

    };

    var p = ControlSettings.prototype;


    p.render = function() {

        var tplSource = $("#controlSettings-template").html();
        var template = Handlebars.compile(tplSource);
        var html = template(p.inputHandler.boundKeys);
        $("div#control-settings-body").html(html);

        p.attachClickHandlers();
    };


    p.attachClickHandlers = function() {
      $("td.key-value").click(function() {

          p.controlToChange = $(this).data('name');
          $("#change-control-popup").toggleClass("open");

          p.game.input.keyboard.onUpCallback = function(context) {

              p.inputHandler.changeControlForName(p.controlToChange, context.keyCode);

              p.game.input.keyboard.onUpCallback = null;
              $("#change-control-popup").toggleClass("open");
              p.render();
          }

      });
      $("#cancel-changing-key").click(function() {
            $("#change-control-popup").toggleClass("open");
      });

    };





    p.show = function() {
        p.render();
        $("#control-settings").toggleClass("open");
    };




    return ControlSettings;
});