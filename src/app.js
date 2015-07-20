var Mech = require('./mech');
var Settings = require('./settings');
var THREED = require("bundle?path=dist!../bower_components/threejs/build/three.min.js");

var container, camera, scene, renderer, objects;
var particleLight, player, clock;

function begin() {

	player = new Mech();
	player.load(function(){
		init();
		animate();
	});
}

function init() {

	clock = new THREE.Clock();

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 2, 2, 3 );

	scene = new THREE.Scene();

	// Add the player
	scene.add( player.dae );


	// Grid

	var size = 14, step = 1;

	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { color: 0x303030 } );

	for ( var i = - size; i <= size; i += step ) {

		geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

		geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

	}

	var line = new THREE.Line( geometry, material, THREE.LinePieces );
	scene.add( line );


	// Lights

	scene.add( new THREE.AmbientLight( 0xcccccc ) );

	// var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
	// directionalLight.position.x = Math.random() - 0.5;
	// directionalLight.position.y = Math.random() - 0.5;
	// directionalLight.position.z = Math.random() - 0.5;
	// directionalLight.position.normalize();
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
	directionalLight.position.set( 0, 1, .25 );
	scene.add( directionalLight );


	var light = new THREE.AmbientLight( 0xCCCCCC );
	scene.add(light);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );


	Settings({
		container: document.body,
		camera: camera,
		scene: scene,
		lights: [directionalLight]
	});

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	var timer = Date.now() * 0.0005;

	// camera.position.x = Math.cos( timer ) * 10;
	// camera.position.y = 2;
	// camera.position.z = Math.sin( timer ) * 10;

	camera.lookAt( scene.position );

	// particleLight.position.x = Math.sin( timer * 4 ) * 3009;
	// particleLight.position.y = Math.cos( timer * 5 ) * 4000;
	// particleLight.position.z = Math.cos( timer * 4 ) * 3009;

	THREE.AnimationHandler.update( clock.getDelta() );

	player.update(clock.getDelta())

	renderer.render( scene, camera );

}

window.addEventListener('load', function(){
	THREED(function(){
		begin();
	});
});
