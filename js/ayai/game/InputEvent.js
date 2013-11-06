(function() {

var InputEvent = function(key) {
    this.inputType = 0;
    this.key = key;
};
    var p = InputEvent.prototype;

    p.KEY_PRESS_EVENT = 0;
    p.KEY_RELEASE_EVENT = 1;
    p.MOUSE_CLICK_EVENT = 2;




    p.key = null;
    p.mouse_x = 0;
    p.mouse_y = 0;


window.InputEvent = InputEvent; }(window));
