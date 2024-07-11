const Scenario = {

	thingsToUpdate: [],

	floors: [],

	bridges: [],

	objects: [],

	roomList: [],

	hero: null,


	addRoom: room => {
		Scenario.roomList.push(room);
	},


	addFloorMap: (map, pos) => {
		if(map.length) {
			let startX = 0;
			let startY = 0;
			if(pos) {
				startX = pos.x || 0;
				startY = pos.y || 0;
			}
			map.forEach(item => {
				Scenario.floors.push({pos: {x: item[0]+startX, y: item[1]+startY, w: item[2], h: item[3]}});
			});
		}
	},


	moveAll: pos => {
		if(Scenario.roomList.length) {
			Scenario.roomList.forEach(item => {
				item.pos.x += pos.x;
				item.pos.y += pos.y;
			});
		}

		if(Scenario.floors.length) {
			Scenario.floors.forEach(item => {
				item.pos.x += pos.x;
				item.pos.y += pos.y;
			});
		}

		if(Scenario.objects.length) {
			Scenario.objects.forEach(item => {
				item.pos.x += pos.x;
				item.pos.y += pos.y;
			});
		}

		if(Scenario.hero.arrTrail.length) {
			Scenario.hero.arrTrail.forEach(item => {
				item[0] += pos.x;
				item[1] += pos.y;
			})
		}

		Scenario.hero.pos.x += pos.x;
		Scenario.hero.pos.y += pos.y;
	},


	update: () => {
		if(Scenario.roomList.length) {
			Scenario.roomList.forEach(item => {
				item.update();
			});
		}
	}

}