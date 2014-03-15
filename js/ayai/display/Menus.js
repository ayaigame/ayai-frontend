define("Menus", function() {	

    function Menus() {
        console.log("got here thank fuck");

	    $("ul li.settings").click(function() {

		    $(this).toggleClass("active");
		    $('.submenu.settings').toggleClass("active");

	    });

	    $("ul li.help").click(function() {

		    $(this).toggleClass("active");
		    $('.submenu.help').toggleClass("active");

	    });

        $("#graphics-button").click(function() {
            $("#graphics-settings").toggleClass("open");
        });

        $("#sound-button").click(function() {
            $("#sound-settings").toggleClass("open");
        });

    }

    return Menus;
    


});
