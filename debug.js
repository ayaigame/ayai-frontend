$(document).ready(function() {

    $('#context-menu').hide();
	$(document).tooltip({
		track:true,
		show:false,
		hide: false
	});
	$('a.debug-link').click(function() {

		$('div.debug').toggleClass('hidden');

		if($('div.debug').hasClass('hidden')) 
			$(this).html("Show debug pane");

		else
			$(this).html("Hide debug pane");

	});

	$('input#verboseLogger').change(function() {

		if ($(this).is(':checked')) {

			ayai.verboseLogger = true;
		}

		else
			ayai.verboseLogger = false;
  });



	$('input#spawnAtPlayer').change(function() {

		if ($(this).is(':checked')) {

			var playerPos = ayai.gameState.entities[ayai.characterId].sprite.position;

			$("input#spawnEntityLocationX").val(playerPos.x);
			$("input#spawnEntityLocationY").val(playerPos.y);
		}

		else
			ayai.verboseLogger = false;
  });


	$("div.debug input[type=text], div.debug select").click(function(e) {

		$(this).focus();
		e.stopPropagation();

	});


	$("body").click(function() {

		$("input").blur();
		$(this).focus();
	});

	$(".chosen").chosen({ disable_search: true});

});
