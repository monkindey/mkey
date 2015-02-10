/**
 * @author monkindey
 * @date 2014.11.16
 * @description resume grunt 配置文件
 */
'use strict';
module.exports = function(grunt) {
	var debugDir = 'asset/debug/';
	var distDir = 'asset/dist/';
	var DISTJS = distDir + 'js/impress_of_mine.min.js';
	var DISTCSS = distDir + 'css/impress.min.css';
	var homePage = 'index.html';
	var tasks = ['uglify', 'imagemin', 'cssmin', 'replace'];
	// Task configuration
	grunt.initConfig({
		jshint: {
			index: {
				src: [debugDir + 'js/*.js']
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				banner: '//<%= grunt.template.today("yyyy-mm-dd") %>'
			},
			// compact format
			js: {
				src: [debugDir + 'js/impress_of_mine.js'],
				dest: DISTJS
			}
		},
		cssmin: {
			// files object format
			css: {
				files: {
					'asset/dist/css/impress.min.css': [debugDir + 'css/impress.css', debugDir + 'css/resume.css']
				}
			}
		},
		imagemin: {
			options: {
				progressive: false,
			},
			img: {
				expand: true,
				cwd: debugDir + 'img',
				src: '*.{png,jpg,webp}',
				dest: distDir + 'img'
			}
		},
		replace: {
			timestamp: {
				src: homePage,
				overwrite: true,
				replacements: [{
					from: new RegExp(DISTJS + '(\\?t=\\d*)?'),
					to: DISTJS + '?t=<%=grunt.template.date("yyyymmddHHMMss")%>'
				}, {
					from: new RegExp(DISTCSS + '(\\?t=\\d*)?'),
					to: DISTCSS + '?t=<%=grunt.template.date("yyyymmddHHMMss")%>'
				}]
			},
		},
		watch: {
			main: {
				files: [debugDir + '/**'],
				tasks: tasks
			}
		}
	});

	grunt.registerTask('default', function() {
		grunt.task.run(tasks);
	});

	grunt.registerTask('watchfile', ['watch:main']);

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-text-replace');
};