/*globals canvas C*/
const Engine = {

	debug: false,

	thingsToUpdate: [],

	gravity: 0.9,

	running: false,

	frameRefreshMSec: 50,

	init: () => {
		//Run vai acontecer no Keys, pra esperar o keyup
		Engine.run();
	},


	run: () => {
		// window.requestAnimationFrame(Engine.run);
		Engine.looper = setTimeout(Engine.run, Engine.frameRefreshMSec);

		Engine.running = true;

		Engine.elapsedFrames++;

		C.clearRect(0, 0, canvas.width, canvas.height);

		Engine.thingsToUpdate.forEach(item => {
			item.update();
		});
	},


	keepRatioX: x => {
		return x*canvas.width/1024;
	},


	keepRatioY: y => {
		return y*canvas.height/576;
	},


	rect: (pos, color) => {
		if(!color) color = 'gray';
		C.fillStyle = color;
		C.strokeStyle = 'red';
		C.fillRect(
			Engine.keepRatioX(pos.x),
			Engine.keepRatioY(pos.y),
			Engine.keepRatioX(pos.w),
			Engine.keepRatioY(pos.h)
		);
	},


	img: (image, pos, cutImg) => {

		let imgX = 0,
			imgY = 0,
			imgW = image.width,
			imgH = image.height,
			posW = image.width,
			posH = image.height;

		if(cutImg) {
			imgX = cutImg.x;
			imgY = cutImg.y;
			imgW = cutImg.w;
			imgH = cutImg.h;
		}

		C.drawImage(
			image,
			Engine.keepRatioX(imgX),
			Engine.keepRatioY(imgY),
			Engine.keepRatioX(imgW),
			Engine.keepRatioY(imgH),
			Engine.keepRatioX(pos.x),
			Engine.keepRatioY(pos.y),
			Engine.keepRatioX(posW),
			Engine.keepRatioY(posH)
		);
	},


	log: (...msg) => {
		if(Engine.debug) {
			console.log(msg);
		}
	}
};