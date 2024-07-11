/*globals Engine Players Keys Scenario Cam Hud*/

const canvas  = document.querySelector('canvas');
canvas.width  = 1024;
canvas.height = canvas.width*576/1024;

const C = canvas.getContext('2d');

const canvasHeroEdge = {
	top:    canvas.height/6*2,
	bottom: canvas.height/6*4,
	left:   canvas.width/5*2,
	right:  canvas.width/5*3,
	center: canvas.width/2,
	middle: canvas.height/2
}


document.addEventListener('DOMContentLoaded', function() {

	Engine.init();

	Keys.monitor();

	const theOne = new Players({
		pos: {
			x: 550,
			y: 300,
			w: 30,
			h: 75
		},
		color: 'blue',
		trailColor: 'cyan'
	});

	console.log('theOne', theOne);

	Cam.target    = theOne;
	Scenario.hero = theOne;

	// let ballon = new Players({
	// 	pos: {
	// 		x: 200,
	// 		y: 100,
	// 		w: 80,
	// 		h: 80
	// 	},
	// 	color: 'red',
	// 	gravity: 0.2
	// });


	let room41 = new Room({
		imageSrc: 'assets/rooms/bgRoom4.png',
		map:      mapRoom4.floor
	});

	let room42 = new Room({
		imageSrc: 'assets/rooms/bgRoom4.png',
		map:      mapRoom4.floor,
		pos: {
			x: 1920,
			y: -781,
			w: 1000,
			h: 1000
		}
	});

	Scenario.addRoom(room41);
	Scenario.addRoom(room42);
	//Scenario.objects.push(ballon);

	//Engine.thingsToUpdate.push(ballon);
	Engine.thingsToUpdate.push(theOne);
	Engine.thingsToUpdate.push(Scenario);
	Engine.thingsToUpdate.push(Cam);
	Engine.thingsToUpdate.push(Hud); //Last to update

}, false);