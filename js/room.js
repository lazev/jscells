class Room {

	constructor({ imageSrc, pos, map }) {

		this.pos = pos || {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};

		this.image = new Image();
		this.image.src = imageSrc;

		Scenario.addFloorMap(map, pos);

		Engine.bridges = map.bridges;
	}


	update() {

		this.draw();

		// Scenario.floors.forEach(item => {
		// 	Engine.rect(item.pos, 'rgb(188, 186, 186, 90)');
		// });

	}


	draw() {

		if(this.image.width > 0) {
			Engine.img(this.image, this.pos);
		}
	}

}