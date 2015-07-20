module.exports = function(grunt) {

	grunt.initConfig({
		webpack: {
			main: require('./webpack.config')
		},
		copy: {
			main: {
				files: [
					// includes files within path
					{expand: true, src: ['./*.html'], dest: 'dist/', filter: 'isFile'},
				],
			}
		},
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['webpack','copy']);

};