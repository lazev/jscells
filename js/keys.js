const Keys = {

	pressed: {},
	released: {},

	map: {
		left:    'a',
		right:   'd',
		up:      'w',
		down:    's',
		jump:    ' ',
		attack1: 'j',
		attack2: 'k',
		attack3: 'l',
		dash:    'shift',
		pause:   'p'
	},


	isPressed: key => {
		return (Keys.pressed[Keys.map[key]]);
	},


	unpress: key => {
		Keys.pressed[Keys.map[key]] = false;
	},


	isReleased: key => {
		return (Keys.released[Keys.map[key]]);
	},


	clearReleased: () => {
		Keys.released = {};
	},


	monitor: () => {

		window.addEventListener('keydown', function(ev){
			//Engine.log(ev.key);
			Keys.pressed[ev.key.toLowerCase()] = true;
		});

		window.addEventListener('keyup', function(ev){
			//Engine.run();
			Keys.pressed[ev.key.toLowerCase()] = false;
			Keys.released[ev.key.toLowerCase()] = true;
		});

	}

};