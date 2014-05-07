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

});
