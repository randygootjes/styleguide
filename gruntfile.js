'use strict';

var build = 'build/';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 6003,
                    base: './',
                    livereload: true,
                    open: {
                        target: 'http://localhost:6003'
                    }
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            files: ['js/*.js'],
        },
        htmlhint: {
            build: {
                options: { // check options
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': false,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html', 'html/*.html']
            }
        },
        sass: {
            dist: {
                files: {
                    'css/style.css': ['sass/style.scss']
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'js/main.min.js': 'js/*.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['index.html', 'html/*.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['js/*.js'],
                tasks: []
            },
            css: {
                files: ['sass/**'],
                tasks: ['sass', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-htmlhint');

    // Default task(s).
    grunt.registerTask('default', ['sass','cssmin', 'jshint', 'htmlhint', 'connect', 'watch']);

};