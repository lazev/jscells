/*globals Scenario*/
const Collisions = {

	checkScenario: (obj1) => {

		let side = '';
		let retArr = [];

		if(Scenario.floors.length) {
			for(let k in Scenario.floors) {
				side = Collisions.checkFull(obj1, Scenario.floors[k]);

				if(side) {
					retArr.push({
						obj:  Scenario.floors[k],
						side: side
					});
				}
			}
		}

		if(Scenario.bridges.length) {
			for(let k in Scenario.bridges) {
				side = Collisions.checkFull(obj1, Scenario.bridges[k]);

				if(side) {
					retArr.push({
						obj:  Scenario.floors[k],
						side: side
					});
				}
			}
		}

		return retArr;
	},


	checkHitEnemy: (obj1, multiple) => {
		let arrRet = [];
		if(Scenario.enemiesArray.length) {
			for(let k in Scenario.enemiesArray) {
				if(Scenario.enemiesArray[k].dead == false) {
					if(Collisions.checkFull(obj1, Scenario.enemiesArray[k])) {
						arrRet.push(k);
						if(!multiple) return arrRet;
					}
				}
			}
		}

		if(arrRet.length) return arrRet;

		return false;
	},


	checkEnemyTouch: obj1 => {
		if(Scenario.enemiesArray.length) {
			for(let k in Scenario.enemiesArray) {
				if(Collisions.checkFull(obj1, Scenario.enemiesArray[k])) return k;
			}
		}

		return false;
	},


	checkFull: (obj1, obj2) => {

		if(obj1.pos.y + obj1.pos.h >= obj2.pos.y &&
			obj1.pos.y <= obj2.pos.y + obj2.pos.h &&
			obj1.pos.x <= obj2.pos.x + obj2.pos.w &&
			obj1.pos.x + obj1.pos.w >= obj2.pos.x) {
				return Collisions.getCollisionSide(obj1, obj2);
		}

		return false;
	},


	getCollisionSide: (obj1, obj2) => {
		// Most of this stuff would probably be good to keep stored inside the player
		// along side their x and y position. That way it doesn't have to be recalculated
		// every collision check
		var obj1HalfW = obj1.pos.w / 2
		var obj1HalfH = obj1.pos.h / 2
		var obj2HalfW = obj2.pos.w / 2
		var obj2HalfH = obj2.pos.h / 2
		var obj1CenterX = obj1.pos.x + obj1.pos.w / 2
		var obj1CenterY = obj1.pos.y + obj1.pos.h / 2
		var obj2CenterX = obj2.pos.x + obj2.pos.w / 2
		var obj2CenterY = obj2.pos.y + obj2.pos.h / 2

		// Calculate the distance between centers
		var diffX = obj1CenterX - obj2CenterX
		var diffY = obj1CenterY - obj2CenterY

		// Calculate the minimum distance to separate along X and Y
		var minXDist = obj1HalfW + obj2HalfW
		var minYDist = obj1HalfH + obj2HalfH

		// Calculate the depth of collision for both the X and Y axis
		var depthX = diffX > 0 ? minXDist - diffX : -minXDist - diffX
		var depthY = diffY > 0 ? minYDist - diffY : -minYDist - diffY

		// Now that you have the depth, you can pick the smaller depth and move
		// along that axis.
		if (depthX != 0 && depthY != 0) {
			if (Math.abs(depthX) < Math.abs(depthY)) {
				// Collision along the X axis. React accordingly
				if (depthX > 0) {
					return 'left';
				}
				else {
					return 'right';
				}
			}
			else {
				// Collision along the Y axis.
				if (depthY > 0) {
					return 'top';
				}
				else {
					return 'bottom';
				}
			}
		}
	},


	checkObjArr: (obj1, arr) => {
		return (
			obj1.pos.y + obj1.pos.h >= arr[1] && obj1.pos.y <= arr[1] + arr[3] &&
			obj1.pos.x <= arr[0] + arr[2] && obj1.pos.x + obj1.pos.w >= arr[0]
		);
	},


	checkFall: (obj1, obj2) => {
		return (
			obj1.pos.y + obj1.pos.h >= obj2.pos.y && obj1.pos.y + obj1.pos.h <= obj2.pos.y + obj2.pos.h &&
			obj1.pos.x <= obj2.pos.x + obj2.pos.w && obj1.pos.x + obj1.pos.w >= obj2.pos.x
		);
	}

};