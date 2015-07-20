var SubObj = require('./subobj'),
	mechmodel = require('file!../models/ver2.dae');
	THREEDCOLLADA = require("bundle?path=dist!../bower_components/threejs/examples/js/loaders/ColladaLoader.js");

var KEY_W = 87,
	KEY_A = 65,
	KEY_S = 83,
	KEY_D = 68,
	KEY_SPACE = 32;

var setupListeners = function(mech){
	document.addEventListener("keydown", function(e){

		e.preventDefault();
		console.log('fire');
		// mech.
		if(e.which == KEY_SPACE)
			mech.testAnim = true;
		if(e.which == KEY_A)
			mech.modifiers.base.rotationCC = true;
		if(e.which == KEY_D)
			mech.modifiers.base.rotationC = true;
		if(e.which == KEY_W)
			mech.modifiers.base.forwardMovement = true;
		if(e.which == KEY_S)
			mech.modifiers.base.backwardMovement = true;
	});
	document.addEventListener("keyup", function(e){

		e.preventDefault();

		if(e.which == KEY_SPACE)
			mech.testAnim = false;
		if(e.which == KEY_A)
			mech.modifiers.base.rotationCC = false;
		if(e.which == KEY_D)
			mech.modifiers.base.rotationC = false;
		if(e.which == KEY_W)
			mech.modifiers.base.forwardMovement = false;
		if(e.which == KEY_S)
			mech.modifiers.base.backwardMovement = false;
	});
}

var Mech = function(onload){
	this.dae = null;
	this.body = new SubObj();
	this.treads = new SubObj();
	this.armRight = new SubObj();
	this.armLeft = new SubObj();
	this.testAnim = false;

	this.modifiers = {
		base: {
			rotationCC: false,	//counter clockwise, +
			rotationC: false,	//clockwise, -
			forwardMovement: false, 
			backwardMovement: false
		}
	}

	this.stats = {
		rotationDegreesPerSecond: 72 * 2,
		movementSpeed: 10
	}

}

Mech.prototype.load = function(onload, onProgress){
	var me = this;
	if(!THREE.ColladaLoader) {
		THREEDCOLLADA(function(){
			me.load(onload);
		})
	}

	var args = [mechmodel, function ( collada ) {

		me.dae = collada.scene;

		me.dae.traverse( function ( child ) {

			if ( child instanceof THREE.SkinnedMesh ) {

				var animation = new THREE.Animation( child, child.geometry.animation );
				animation.play();

			} 
			switch(child.name){
				case 'body': me.body.setObj(child); break;
				case 'cannon-right': me.armRight.setObj(child); break;
				case 'cannon-left': me.armLeft.setObj(child); break;
				case 'treads': me.treads.setObj(child); break;
			}

		} );

		//dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
		me.dae.updateMatrix();

		setupListeners(me);

		if(onload){
			onload();
		}

	}]

	if(onProgress) {
		args.push(onProgress);
	}

	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load.apply(loader, args);

}

Mech.prototype.update = function(time){
	if((rotSpeed = this.currentRotationSpeed()) !== 0)
		this.dae.rotateOnAxis(new THREE.Vector3( 0, 1, 0 ), THREE.Math.degToRad(time * 1000 * rotSpeed));
	if((moveSpeed = this.currentMovementSpeed()) !== 0)
		this.dae.translateX(time * 1000 * moveSpeed);
	if(this.testAnim) {
		console.log(time, this.dae.rotation, THREE.Math.radToDeg(this.dae.rotation.y), this.modifiers);
	}
}

Mech.prototype.currentRotationSpeed = function(){
	if (this.modifiers.base.rotationCC && !this.modifiers.base.rotationC) {
		return this.stats.rotationDegreesPerSecond;
	} else if (!this.modifiers.base.rotationCC && this.modifiers.base.rotationC) {
		return -1 * this.stats.rotationDegreesPerSecond;
	} else {
		return 0;
	}
}

Mech.prototype.currentMovementSpeed = function(){
	if (this.modifiers.base.forwardMovement && !this.modifiers.base.backwardMovement) {
		return this.stats.movementSpeed;
	} else if (!this.modifiers.base.forwardMovement && this.modifiers.base.backwardMovement) {
		return -1 * this.stats.movementSpeed;
	} else {
		return 0;
	}
}
module.exports = Mech;