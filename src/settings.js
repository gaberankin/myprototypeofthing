var settings = null;

var onChangeFunctionName = 'oninput';
var tmp = document.createElement('input');

tmp.type = 'range';
if(!('oninput' in tmp))
	onChangeFunctionName = 'onchange';

tmp = null;

module.exports = function(options) {
	var row = null, label = null;

	if(!options.container) {
		options.container = document.body;
	}

	if(settings === null) {
		settings = document.createElement('div');
	}

	settings.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
	settings.style.position = 'absolute';
	settings.style.bottom = '10px';
	settings.style.left = '10px';
	settings.style.width = '200px';
	settings.style.padding = '10px';

	options.container.appendChild(settings);

	if(options.camera) {
		var fovSlider = document.createElement('input');
		var fovSliderValue = document.createElement('span');
		fovSlider.type = 'range';
		fovSlider.setAttribute('min', 45);
		fovSlider.setAttribute('max', 110);
		fovSlider.setAttribute('step', 1);
		fovSlider.value = options.camera.fov;
		fovSlider.id = 'fov';
		fovSlider[onChangeFunctionName] = function(){
			fovSliderValue.innerHTML = this.value;
			options.camera.fov = parseInt(this.value, 10);
			options.camera.updateProjectionMatrix();
		};
		fovSlider[onChangeFunctionName]();
		row = document.createElement('div');
		label = document.createElement('label');
		label.setAttribute('for', 'fov');
		label.innerHTML = 'FOV';
		settings.appendChild(row);
		row.appendChild(label);
		row.appendChild(fovSlider);
		row.appendChild(fovSliderValue);
	}

	if(options.lights && options.lights.length) {
		var light = null, lightSlider = null, lightSliderValue = null;
		for(var x = 0, len = options.lights.length; x < len; x++){
			light = options.lights[x];
			if(light instanceof THREE.Light) {
				// intensity
				lightSlider = document.createElement('input');
				lightSliderValue = document.createElement('span');
				lightSlider.type = 'range';
				lightSlider.setAttribute('min', 1);
				lightSlider.setAttribute('max', 5);
				lightSlider.setAttribute('step', 0.1);
				lightSlider.value = light.intensity;
				lightSlider.id = 'light' + x;
				lightSlider[onChangeFunctionName] = (function(idx){
					var light = options.lights[idx], sliderValue = lightSliderValue;
					return function(){
						sliderValue.innerHTML = this.value;
						light.intensity = parseInt(this.value, 10);
					};
				})(x);
				lightSlider[onChangeFunctionName]();
				row = document.createElement('div');
				label = document.createElement('label');
				label.setAttribute('for', 'light' + x);
				label.innerHTML = 'Light ' + x + ' intensity';
				settings.appendChild(row);
				row.appendChild(label);
				row.appendChild(lightSlider);
				row.appendChild(lightSliderValue);

				// R
				lightSlider = document.createElement('input');
				lightSliderValue = document.createElement('span');
				lightSlider.type = 'range';
				lightSlider.setAttribute('min', 0);
				lightSlider.setAttribute('max', 100);
				lightSlider.setAttribute('step', 1);
				lightSlider.value = light.color.r * 100;
				lightSlider.id = 'lightR' + x;
				lightSlider[onChangeFunctionName] = (function(idx){
					var light = options.lights[idx], sliderValue = lightSliderValue;
					return function(){
						sliderValue.innerHTML = this.value + '%';
						light.color.r = this.value / 100;
					};
				})(x);
				lightSlider[onChangeFunctionName]();
				row = document.createElement('div');
				label = document.createElement('label');
				label.setAttribute('for', 'lightR' + x);
				label.innerHTML = 'Light ' + x + ' Red Value';
				settings.appendChild(row);
				row.appendChild(label);
				row.appendChild(lightSlider);
				row.appendChild(lightSliderValue);

				// G
				lightSlider = document.createElement('input');
				lightSliderValue = document.createElement('span');
				lightSlider.type = 'range';
				lightSlider.setAttribute('min', 0);
				lightSlider.setAttribute('max', 100);
				lightSlider.setAttribute('step', 1);
				lightSlider.value = light.color.g * 100;
				lightSlider.id = 'lightG' + x;
				lightSlider[onChangeFunctionName] = (function(idx){
					var light = options.lights[idx], sliderValue = lightSliderValue;
					return function(){
						sliderValue.innerHTML = this.value + '%';
						light.color.g = this.value / 100;
					};
				})(x);
				lightSlider[onChangeFunctionName]();
				row = document.createElement('div');
				label = document.createElement('label');
				label.setAttribute('for', 'lightG' + x);
				label.innerHTML = 'Light ' + x + ' Green Value';
				settings.appendChild(row);
				row.appendChild(label);
				row.appendChild(lightSlider);
				row.appendChild(lightSliderValue);

				// B
				lightSlider = document.createElement('input');
				lightSliderValue = document.createElement('span');
				lightSlider.type = 'range';
				lightSlider.setAttribute('min', 0);
				lightSlider.setAttribute('max', 100);
				lightSlider.setAttribute('step', 1);
				lightSlider.value = light.color.b * 100;
				lightSlider.id = 'lightB' + x;
				lightSlider[onChangeFunctionName] = (function(idx){
					var light = options.lights[idx], sliderValue = lightSliderValue;
					return function(){
						sliderValue.innerHTML = this.value + '%';
						light.color.b = this.value / 100;
					};
				})(x);
				lightSlider[onChangeFunctionName]();
				row = document.createElement('div');
				label = document.createElement('label');
				label.setAttribute('for', 'lightB' + x);
				label.innerHTML = 'Light ' + x + ' Blue Value';
				settings.appendChild(row);
				row.appendChild(label);
				row.appendChild(lightSlider);
				row.appendChild(lightSliderValue);

			}
		}
	}
};