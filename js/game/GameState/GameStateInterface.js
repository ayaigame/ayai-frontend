function GameStateInterface() {

	




	function getEntitiesInRoom(roomId) {

	}

	function sendInputToGameState(inputEvent) {

	}


	function update() {
		requestAnimFrame(animate);
        renderer.render(stage);
        kd.tick();
	}

	    // test movement
    function registerKeyEvents() {
        kd.W.down(function(e) { player.position.y -= 2; });
        kd.A.down(function(e) { player.position.x -= 2; });
        kd.S.down(function(e) { player.position.y += 2; });
        kd.D.down(function(e) { player.position.x += 2; });
    }


}