module.exports = function(grunt) {

	grunt.initConfig({
		'file-creator': {
			'models': {
				"src/res/generated/models.js" : function(fs, fd, done) {

					var glob = grunt.file.glob;
					var _ = grunt.util._;
					glob('models/*.dae', function (err, files) {
						fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
						fs.writeSync(fd, 'var Models = {};\n');

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
								fs.writeSync(fd, 'Models["' + modelIdx + '"] = ' + JSON.stringify(fileContents) + ';\n');
							} catch(e) {
								console.error(filename + ":", e);
							}
						});
						fs.writeSync(fd, '\nmodule.exports = function(modelName) {\n' +
										'	if(typeof Models[modelName] === "undefined") return "";\n' +
										'	return Models[modelName];\n' +
										'};\n');

						done();
					});
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-file-creator');

	grunt.registerTask('default', ['file-creator']);

};