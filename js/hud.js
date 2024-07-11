const Hud = {

	marks: [],


	update: () => {
		Hud.draw();
	},


	draw: () => {
		Hud.camMarks();

		if(Hud.marks.length) {
			Hud.marks.forEach(item => {
				Engine.rect(item, 'green');
			});
		}
	},


	camMarks: () => {
		Engine.rect({x: canvasHeroEdge.left, y: 0, w: 2, h: canvas.height}, 'yellow');
		Engine.rect({x: canvasHeroEdge.right, y: 0, w: 2, h: canvas.height}, 'yellow');
		Engine.rect({x: 0, y: canvasHeroEdge.top, w: canvas.width, h: 2}, 'yellow');
		Engine.rect({x: 0, y: canvasHeroEdge.bottom, w: canvas.width, h: 2}, 'yellow');
		Engine.rect({x: canvasHeroEdge.center-1, y: canvasHeroEdge.middle-1, w: 2, h: 2}, 'red');
	},




};