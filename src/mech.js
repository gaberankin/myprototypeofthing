var ModelLoader = require('./loader'),
	SubObj = require('./subobj');

var KEY_W = 87,
	KEY_A = 65,
	KEY_S = 83,
	KEY_D = 68,
	KEY_SPACE = 32;

var setupListeners = function(mech){
	document.addEventListener("keydown", function(e){

		e.preventDefault();
		// mech.
		if(e.which == KEY_SPACE)
			mech.testAnim = true;
	});
	document.addEventListener("keyup", function(e){

		e.preventDefault();

		if(e.which == KEY_SPACE)
			mech.testAnim = false;
	});
}

var Mech = function(onload){
	this.dae = null;
	this.body = new SubObj();
	this.treads = new SubObj();
	this.armRight = new SubObj();
	this.armLeft = new SubObj();
	this.testAnim = false;

}

Mech.prototype.load = function(onload){
	var me = this,
		loader = new THREE.ColladaLoader();

	loader.options.convertUpAxis = true;
	loader.parse( ModelLoader.get('ver2'), function ( collada ) {

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

	}, './' );

}

Mech.prototype.update = function(time){
	if(this.testAnim) {
		console.log(THREE.Math.degToRad(0.1 * time));
		this.dae.rotateOnAxis(new THREE.Vector3( 0, 1, 0 ), THREE.Math.degToRad(0.1 * time));
	}
}


module.exports = Mech;