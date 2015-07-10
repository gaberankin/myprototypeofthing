var models = require('./res/generated/models');
var parseXml = require('./utils').parseXml;
var xmlList = {};

module.exports = {
	get: function(modelName){
		if(typeof xmlList[modelName] === 'undefined') {
			var model = models(modelName);
			if(!model) {
				throw Error("Model with name " + modelName + " not found");
			}
			xmlList[modelName] = parseXml(model);
		}
		return xmlList[modelName];

	}
}