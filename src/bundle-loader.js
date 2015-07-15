var BundleLoader = function(){
	this.bundles = [];
};

BundleLoader.prototype.add = function(loadFunction){
	if(typeof loadFunction !== 'function') {
		console.error("argument passed to bundle loader was not a function", loadFunction);
		return;
	}
	this.bundles.push(loadFunction);
};
BundleLoader.prototype.load = function(onComplete) {
	var self = this;
	var idx = 0, len = this.bundles.length;
	var loader = function(i) {
		if(i >= len) {
			self.bundles = [];
			if(typeof onComplete === 'function') {
				onComplete();
			}
			return;
		}
		self.bundles[i](function(){
			loader(i+1);
		});
	};
	loader(0);
};

module.exports = BundleLoader;