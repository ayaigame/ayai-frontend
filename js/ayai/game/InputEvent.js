define("InputEvent", function() {

	var p = InputEvent.prototype;

	function InputEvent(key) {
	    p.inputType = 0;
		p.key = key;
	};


    p.KEY_PRESS_EVENT = 0;
    p.KEY_RELEASE_EVENT = 1;
    p.MOUSE_CLICK_EVENT = 2;

    p.key = null;
    p.mouse_x = 0;
    p.mouse_y = 0;


    return InputEvent;

});

