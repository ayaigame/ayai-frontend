define("SoundSettings",["phaser"],  function(Phaser) {

    function SoundSettings(game) {

        p.game = game;
        p.createElements();
        $("#sound-settings-button").click(function() {

            p.show();
        });

        $("#close-sound-settings").click(function() {
            $("#sound-settings").toggleClass("open");
        });


    };

    var p = SoundSettings.prototype;


    p.createElements = function() {
        $( "#master-sound-slider" ).slider({
            value: 100,
            orientation: "horizontal",
            range: "min",
            animate: true
        });
        $( "#music-sound-slider" ).slider({
            value: 100,
            orientation: "horizontal",
            range: "min",
            animate: true
        });
       $( "#sfx-sound-slider" ).slider({
            value: 100,
            orientation: "horizontal",
            range: "min",
            animate: true
        });

        $( "#master-sound-slider").on("slidestop", function(event) {
            var sliderValue = $( "#master-sound-slider").slider("value");
            console.log(sliderValue);
            ayai.game.sound.masterGain.gain.value = sliderValue / 100.0;
        });

        $( "#music-sound-slider").on("slidestop", function(event) {
            var sliderValue = $( "#music-sound-slider").slider("value");
            console.log(sliderValue);
            _.map(ayai.music, function(soundObject) {
                soundObject.gainNode.gain.value = sliderValue / 100.0;
            })
        });

        $( "#sfx-sound-slider").on("slidestop", function(event) {
            var sliderValue = $( "#sfx-sound-slider").slider("value");
            console.log(sliderValue);
            _.map(ayai.sfx, function(soundObject) {
                soundObject.gainNode.gain.value = sliderValue / 100.0;
            })
        });
    };





    p.show = function() {
        $("#sound-settings").toggleClass("open");
    };




    return SoundSettings;
});