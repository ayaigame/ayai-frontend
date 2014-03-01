define("UnitFrame", function() {
	var p = UnitFrame.prototype;

	function UnitFrame() {};

	p.syncTargetFrame = function() {

		var targetHealthPercent = Math.floor((Window.target.health.currHealth / Window.target.health.maximumHealth) * 100) + "%";
		var targetManaPercent = Math.floor((Window.target.Mana.currMana / Window.target.Mana.maximumMana) * 100) + "%";
		
		$("ul.unitframes li#target span.name").html(Window.target.name);
		$("ul.unitframes li#target span.level").html(Window.target.level);
		$("ul.unitframes li#target div.health span.total").html(Window.target.health.currHealth.toString() + "/" + Window.target.health.maximumHealth.toString());
		$("ul.unitframes li#target div.health span.percent").html(targetHealthPercent);
		$("ul.unitframes li#target div.health div.bar").css("width", targetHealthPercent);
		$("ul.unitframes li#target div.mana span.total").html(Window.target.Mana.currMana.toString() + "/" + Window.target.Mana.maximumMana.toString());
		$("ul.unitframes li#target div.mana span.percent").html(targetManaPercent);
		$("ul.unitframes li#target div.mana div.bar").css("width", targetManaPercent);
	};

	p.syncPlayerFrame = function(e) {

		var healthPercent = Math.floor((e.health.currHealth / e.health.maximumHealth) * 100) + "%";
        var manaPercent = Math.floor((e.Mana.currMana / e.Mana.maximumMana) * 100) + "%";

		$("ul.unitframes li#player span.name").html(e.name);
		$("ul.unitframes li#player span.level").html(e.level);
		$("ul.unitframes li#player div.health span.total").html(e.health.currHealth.toString() + "/" + e.health.maximumHealth.toString());
		$("ul.unitframes li#player div.health span.percent").html(healthPercent);
		$("ul.unitframes li#player div.health div.bar").css("width", healthPercent);
		$("ul.unitframes li#player div.mana span.total").html(e.Mana.currMana.toString() + "/" + e.Mana.maximumMana.toString());
		$("ul.unitframes li#player div.mana span.percent").html(manaPercent);
		$("ul.unitframes li#player div.mana div.bar").css("width", manaPercent);
	};
	return UnitFrame;
});