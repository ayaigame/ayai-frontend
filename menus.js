$(function() {
	
	$("ul li.settings").click(function() {

		$(this).toggleClass("active");
		$('.submenu.settings').toggleClass("active");

	});

	$("ul li.help").click(function() {

		$(this).toggleClass("active");
		$('.submenu.help').toggleClass("active");

	});



});