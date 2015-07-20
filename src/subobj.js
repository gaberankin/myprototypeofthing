
var SubObject = function(){
	this.animating = false;
	this.obj = null;
}

SubObject.prototype.setObj = function(obj){
	this.obj = obj;
}

SubObject.prototype.rotateOnAxis = function(axis, deg){
	try {
		this.obj.rotateOnAxis(axis, deg);
	} catch(e){}
}

module.exports = SubObject;