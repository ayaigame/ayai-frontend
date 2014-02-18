this.ayai = this.ayai || {};
(function() {

	var QuestLog = function() {


	};

	var p  = QuestLog.prototype;

	p.toggle = function() {

		$("div#quest-log").toggleClass("open");

	};

	ayai.QuestLog = QuestLog;}(window));