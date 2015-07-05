module.exports = function(grunt) {

  // Initial config
  var config = {
    pkg: grunt.file.readJSON("package.json"),
	
	concat: {
		dist: {
			src: [
				"src/js/*.js"
			],
			dest: "src/js/build/production.js"
		},
		options: {
			sourceMap: true
		}
	},
	
	uglify: {
		dist: {
			src: "src/js/build/production.js",
			dest: "src/js/build/production.min.js"
		},
		options: {
			sourceMap: true,
			sourceMapIncludeSources: true,
			sourceMapIn: "src/js/build/production.js"
		}
	}
  };

  grunt.initConfig(config);
  
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default Task is basically a rebuild
  grunt.registerTask("default", ["concat", "uglify"]);
};
