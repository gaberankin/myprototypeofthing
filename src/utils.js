
//following code from http://stackoverflow.com/questions/3054108/how-to-convert-string-to-xml-object-in-javascript
var parseXml;
if (window.DOMParser) {
	parseXml = function(xmlStr) {
		return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
	};
} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
	parseXml = function(xmlStr) {
		var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(xmlStr);
		return xmlDoc;
	};
} else {
	parseXml = function() { return null; }
}


module.exports = {
	parseXml: parseXml
};
