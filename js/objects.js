class Objects {

	constructor({
		pos = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		},

		hit = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		},

		color = 'red',

		sprite,

		state = 'idle',

		faceTo = 'left',

		trailColor = '',

		velocity = {
			x: 0,
			y: 0
		}

	}) {

		this.pos = {
			x: pos.x,
			y: pos.y,
			w: pos.w,
			h: pos.h
		};

		this.hit = {
			x: hit.x,
			y: hit.y,
			w: hit.w,
			h: hit.h
		};

		this.velocity =  { x: 0, y: 0 };

		this.knockback = { x: 0, y: 0 };

		this.gravity = Engine.gravity;

		if(sprite) {
			this.sprite = sprite;
			this.scale  = this.sprite.scale;
		}

		this.color = color;

		this.state = state;

		this.faceTo = faceTo;

		this.falling        = false;
		this.jumping        = false;
		this.touchingGround = false;
		this.touchingWall   = ''; //left or right

		this.currentFrame = 0;

		this.trailColor = trailColor;
		this.arrTrail = [];
	}


	changeState(state, faceTo) {
		if(this.state != state || (typeof faceTo != 'undefined' && this.faceTo != faceTo)) {
			this.currentFrame = 0;
		}

		if(faceTo) this.faceTo = faceTo;
		this.state = state;
	}


	draw() {

		if(this.sprite) {
			let loop      = this.sprite.map[this.state].loop ?? true;
			let buffer    = this.sprite.map[this.state].framesToChange;
			let frames    = this.sprite.map[this.state][this.faceTo];
			let imgToDraw = this.sprite.img[this.faceTo];

			if(Engine.elapsedFrames % buffer === 0) {
				this.currentFrame++;
				if(this.currentFrame >= frames.length) {
					if(loop) {
						this.currentFrame = 0;
					} else {
						this.currentFrame = null;
						return;
					}
				}
			}

			if(this.currentFrame !== null) {

				let item = frames[this.currentFrame];

				this.hit = item.hit;

				this.pos.w = item.hit.w * this.scale;
				this.pos.h = item.hit.h * this.scale;

				C.drawImage(
					imgToDraw,

					item.pos.x,
					item.pos.y,
					item.pos.w,
					item.pos.h,

					this.pos.x - item.hit.x * this.scale,
					this.pos.y - item.hit.y * this.scale,
					item.pos.w * this.scale,
					item.pos.h * this.scale
				);
			}
		}

		else {

			Engine.rect(this.pos, this.color);

		}

		if(this.trailColor != '') {

			this.drawTrail();

			this.addTrailPoint();
		}
	}


	applyGravity() {

		let gravity = this.gravity;

		if(this.velocity.y > -2 && this.velocity.y < 2)
			gravity = gravity/2;

		if(this.velocity.y < 0)
			this.velocity.y += gravity;
		else
			this.velocity.y += gravity*1.5;
	}


	applyVelocity() {

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		this.pos.x += this.knockback.x;
		this.pos.y += this.knockback.y;

		if(this.knockback.x > 0) this.knockback.x--;
		else if(this.knockback.x < 0) this.knockback.x++;

		if(this.knockback.y > 0) this.knockback.y--;
		else if(this.knockback.y < 0) this.knockback.y++;

		if(typeof this.onApplyVelocity == 'function') {
			this.onApplyVelocity();
		}
	}


	checkBlockCollision() {

		let touchedArr = Collisions.checkScenario(this);

		let hasWallCollision = false;

		if(touchedArr.length) {

			touchedArr.forEach(touched => {

				if(touched.side == 'bottom') {
					this.touchGround(touched.obj);
				}

				if(touched.side == 'top') {
					this.touchRoof(touched.obj);
				}

				if(touched.side == 'left' || touched.side == 'right') {
					this.debug = true;
					this.touchWall(touched.obj, touched.side);
					hasWallCollision = true;
				}

			});
		}

		if(!hasWallCollision) {

			if(this.debug) {
				// Hud.marks.push(this.pos);
			}

			this.touchingWall = '';

			if(typeof this.onNotTouchWall == 'function') {
				this.onNotTouchWall();
			}
		}

		if(this.velocity.y < 0) {
			this.jumping = true;
			this.touchingGround = false;
		}

		else if(this.velocity.y > 0) {
			this.falling = true;
			this.touchingGround = false;
			if(typeof this.onFalling == 'function') this.onFalling();
		}
		else {
			this.jumping = false;
			this.falling = false;
		}
	}


	touchGround(block) {
		if(!this.lostScenarioFloor) {

			this.touchingGround = true;

			if(typeof this.onTouchGround == 'function') {
				this.onTouchGround();
			}

			this.pos.y = block.pos.y - this.pos.h;

			this.velocity.y = 0;
		}
	}


	touchRoof(block) {
		if(!this.lostScenarioFloor) {

			if(typeof this.onTouchRoof == 'function') {
				this.onTouchRoof();
			}

			this.pos.y = block.pos.y + block.pos.h + 0.01;

			this.velocity.y = 0;
		}
	}


	touchWall(block, side) {

		// let dist = this.pos.y + this.pos.h - block.pos.y;
		// if(dist < 10) return;

		this.touchingWall = side;

		if(typeof this.onTouchWall == 'function') {
			this.onTouchWall(block, side);
		}

		//this.stay();
		this.velocity.x = 0;

		if(side == 'right') {
			this.pos.x = block.pos.x - this.pos.w;
		}

		if(side == 'left') {
			this.pos.x = block.pos.x + block.pos.w;
		}
	}


	drawTrail() {
		if(this.arrTrail.length) {
			C.fillStyle = this.trailColor;
			this.arrTrail.forEach(item => {
				//C.arc(item[0],item[1], 1, 0, 2 * Math.PI, true);
				C.fillRect(item[0],item[1],5,5);
			});
		}
	}


	addTrailPoint() {
		this.arrTrail.push([this.pos.x, this.pos.y+this.pos.h/2 ]);
		if(this.arrTrail.length >= 100) this.arrTrail.shift();
	}
}