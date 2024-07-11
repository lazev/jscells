const Cam = {

	target: null,

	distX: 0,

	update: () => {
		let moveX = Cam.getMoveCamX();
		let moveY = Cam.getMoveCamY();

		Scenario.moveAll({x:moveX, y:moveY});
	},


	getMoveCamX: () => {

		let dist = Math.round(Cam.target.pos.x+Cam.target.pos.w/2-canvasHeroEdge.center);

		let move = (dist > 0) ? -1 : 1;

		let speedCam = 3;

		//Close to center
		if(dist > -5 && dist < 5) return 0;
		else if(dist > -10 && dist < 10) speedCam = 1;

		//Out of screen
		else if(
			Cam.target.pos.x > canvas.width ||
			Cam.target.pos.x < 0
		) {
			speedCam = Math.abs(Cam.target.runSpeed*7);
		}

		//Far from center level 2
		else if(
			Cam.target.pos.x > canvasHeroEdge.right+50 ||
			Cam.target.pos.x < canvasHeroEdge.left-50
		) {
			speedCam = Math.abs(Cam.target.runSpeed*3);
		}

		//Far from center level 1
		else if(
			Cam.target.pos.x > canvasHeroEdge.right ||
			Cam.target.pos.x < canvasHeroEdge.left
		) {
			speedCam = Math.abs(Cam.target.runSpeed);
		}

		return move*speedCam;
	},


	getMoveCamY: () => {

		let dist = Cam.target.pos.y-canvasHeroEdge.middle;

		if(dist > -20 && dist < 20) return 0;

		let move = (dist > 0) ? -1 : 1;

		let speedCam = 5;

		let moveSpeed = Math.abs(Cam.target.velocity.y) || Math.abs(Cam.target.runSpeed);

		if( //Out of screen
			Cam.target.pos.y > canvas.height ||
			Cam.target.pos.y < 0
		) {
			speedCam = moveSpeed*7;
		}

		//Far from middle
		else if(
			Cam.target.pos.y > canvasHeroEdge.top ||
			Cam.target.pos.y < canvasHeroEdge.bottom
		) {
			speedCam = moveSpeed;
		}

		return move*speedCam;
	}

};