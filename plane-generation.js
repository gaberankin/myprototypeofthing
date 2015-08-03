//example of something i put together than can generate a plane based on a width and height.  this should be combined with the
// procedural terrain generator stuff to generate the terrain.
var container, camera, scene, renderer, objects;
var particleLight, clock, controls, geometry;

var getxy = function(i, w, h) {
	var x = i % w;
	var y = (i - x) / w;
	return [x, y];
};
var getz = function(min, max) {
	return Math.random()*(max-min+1)+min;
};

function init() {

	clock = new THREE.Clock();

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 20, 20, 30 );
	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.2;
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();

	// Grid
	var width = 30, height = 15;
	var size = 15, step = 1;

	geometry = new THREE.Geometry();
	var material = new THREE.MeshPhongMaterial( { color: 0x5750BA, shading: THREE.FlatShading } );

	var xy = [0, 0], z = null, n = 0;
	for(var i = 0, l = width * height; i < l; i++) {
		//set up vertices
		xy = getxy(i, width, height);
		z = getz(0, 1);
		geometry.vertices.push(new THREE.Vector3( xy[0] - width / 2, z, xy[1] - height / 2 ));
	}
	for(n = 0, i = 0, l = ((width - 1) * (height - 1)); i < l; i++, n++) {
		//set up the triangles.
		if((n + 1) % width === 0){	//don't get the right edge
			n++;
		}

		geometry.faces.push( new THREE.Face3( n, n + width, n + width + 1 ) );
		geometry.faces.push( new THREE.Face3( n, n + width + 1, n + 1 ) );
	}

	var floor = new THREE.Mesh(geometry, material);
	scene.add( floor );


	// Lights

	scene.add( new THREE.AmbientLight( 0xcccccc ) );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
	directionalLight.position.set( 0, 1, 0.25 );
	scene.add( directionalLight );


	var light = new THREE.AmbientLight( 0xCCCCCC );
	scene.add(light);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function render() {
	renderer.render( scene, camera );
}

window.addEventListener('load', function(){
	init();
	render();
});
