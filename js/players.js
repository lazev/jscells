class Players extends Objects {

	constructor(params) {
		super(params);

		this.gravity = params.gravity ?? Engine.gravity;

		this.velocity = params.velocity ?? { x: 0, y: 0 };

		this.goDash = { x: 0, y: 0 };

		this.dashDistance = 10; //x5

		this.runMaxSpeed = 10;
		this.runSpeed = 0;
		this.acceleration = 0.5;
		this.deceleration = 1;

		this.jumpStrength = 15;

		this.jumpsAllowed = 2;
		this.jumpCountdown = this.jumpsAllowed;

		this.coyoteJumpFrames = 10;
		this.coyoteJumpCounter = this.coyoteJumpFrames;

		this.bufferJumpFrames = 3;
		this.bufferJumpCounter = 0;
	}


	update() {

		this.applyGravity();

		this.applyVelocity();

		this.checkBlockCollision();

		// Colocado após o block collision pra ter a informação de encostado na parede ao pular
		this.checkActions();

		this.draw();

	}


	checkActions() {


		if(Keys.isPressed('down')) {

			this.crouch();

		} else {

			if(Keys.isPressed('jump')) {
				Keys.unpress('jump');
				this.jump();
			}

			if(Keys.isPressed('dash')) {
				Keys.unpress('dash');
				this.dash();
			}

			else if(Keys.isPressed('right')) {
				this.runRight();
			}

			else if(Keys.isPressed('left')) {
				this.runLeft();
			}

			else {
				this.stay();
			}
		}

		if(Keys.isReleased('down')) {
			this.stand();
		}

		Keys.clearReleased();

		this.velocity.x = this.runSpeed;
	}


	resetRunSpeed() {
		if(Math.abs(this.runSpeed) < this.deceleration) this.runSpeed = 0;
		else {
			if(this.runSpeed > 0)      this.runSpeed -= this.deceleration;
			else if(this.runSpeed < 0) this.runSpeed += this.deceleration;
		}
	}


	stay() {
		this.resetRunSpeed();
	}


	canJump() {
		if(
			!this.jumpCountdown &&
			!this.touchingGround &&
			!this.touchingWall &&
			!this.coyoteJumpCounter
		)
		return false;

		return true;
	}


	jump() {

		if(!this.canJump()) {
			if(this.falling) {
				this.bufferJumpCounter = this.bufferJumpFrames;
			}
			return;
		}

		this.coyoteJumpCounter = 0;
		this.bufferJumpCounter = 0;

		setTimeout(() => {
			this.velocity.y = -this.jumpStrength;

			this.jumpCountdown--;

			if(this.touchingWall == 'right') {
				if(this.faceTo != 'left') {
					this.knockback.x = -15;
				}
			}

			else if(this.touchingWall == 'left') {
				if(this.faceTo != 'right') {
					this.knockback.x = 15;
				}
			}

		}, 0);

			//Scenario.moveAll({ x:0, y: -this.velocity.y });
	}

	resetJump() {
		this.jumpCountdown = this.jumpsAllowed;
	}


	runRight() {
		if(this.runSpeed < this.runMaxSpeed) {
			this.runSpeed += this.acceleration;
		}

		if(this.runSpeed < 0) this.resetRunSpeed();

		this.faceTo = 'right';

	}


	runLeft() {
		if(this.runSpeed > -this.runMaxSpeed) {
			this.runSpeed -= this.acceleration;
		}

		if(this.runSpeed > 0) this.resetRunSpeed();

		this.faceTo = 'left';
	}


	crouch() {
		this.resetRunSpeed();
		this.pos.y += 20;
		this.pos.h = 45;
	}


	stand() {
		this.pos.h = 70;
	}


	dash() {
		if(this.faceTo == 'right') {
			this.goDash.x = this.dashDistance;
		}
		else if(this.faceTo == 'left') {
			this.goDash.x = -this.dashDistance;
		}
	}


	onApplyVelocity() {

		this.pos.x += this.goDash.x*4;

		if(this.goDash.x > 0) this.goDash.x--;
		else if(this.goDash.x < 0) this.goDash.x++;
	}


	onFalling() {
		if(this.coyoteJumpCounter > 0) this.coyoteJumpCounter--;
		if(this.bufferJumpCounter > 0) this.bufferJumpCounter--;
	}


	onTouchGround() {
		this.resetJump();
		this.coyoteJumpCounter = this.coyoteJumpFrames;
		if(this.bufferJumpCounter > 0) this.jump();
	}


	onTouchWall(block, wallSide) {

		this.resetRunSpeed();

		this.resetJump();
		this.coyoteJumpCounter = this.coyoteJumpFrames;

		if(this.velocity.y > 0) this.velocity.y = 1;
	}


	onNotTouchWall() {
		this.touchingWall = '';
	}

}