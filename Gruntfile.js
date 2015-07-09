module.exports = function(grunt) {

	grunt.initConfig({
		'file-creator': {
			'models': {
				"dist/models.js" : function(fs, fd, done) {

					var glob = grunt.file.glob;
					var _ = grunt.util._;
					glob('models/*.dae', function (err, files) {
						fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
						fs.writeSync(fd, 'var Models = {};\n');
						fs.writeSync(fd, '(function(){\n');
						fs.writeSync(fd, '\n' +
										'	var parseXml;' +
										'	if (window.DOMParser) {\n' +
										'		parseXml = function(xmlStr) {\n' +
										'			return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");\n' +
										'		};\n' +
										'	} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {\n' +
										'		parseXml = function(xmlStr) {\n' +
										'			var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");\n' +
										'			xmlDoc.async = "false";\n' +
										'			xmlDoc.loadXML(xmlStr);\n' +
										'			return xmlDoc;\n' +
										'		};\n' +
										'	} else {\n' +
										'		parseXml = function() { return null; }\n' +
										'	}\n');
						_.each(files, function(filename) {
							try {
								//grab the contents of the collada files
								var fileContents = fs.readFileSync(filename, {encoding: 'utf-8'});

								//clean the files up some by removing leading tabs and unnecessary line breaks
								fileContents = fileContents.replace(/>\n[ \t]+</g, '><');
								var modelIdx = filename.
												replace('models/', '').
												replace(/\.dae$/, '').
												replace(/[\[\]]/g, '_');
								fs.writeSync(fd, 'Models["' + modelIdx + '"] = parseXml(' + JSON.stringify(fileContents) + ');\n');
							} catch(e) {
								console.error(filename + ":", e);
							}
						});
						fs.writeSync(fd, '})();\n');

						done();
					});
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-file-creator');

	grunt.registerTask('default', ['file-creator']);

};