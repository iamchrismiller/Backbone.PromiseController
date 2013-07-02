/*global module */

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean : {
      build: {
        src: ["dest"]
      }
    },


    copy : {
      build: {
        files: [
          {
            expand: true,
            src: ['**'],
            dest: 'dist/',
            cwd: 'src/'
          },
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/Backbone.PromiseController.min.js': ['src/Backbone.PromiseController.js']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options : {
        jshintrc : './.jshintrc'
      }
    },

    jasmine : {
      test : {
        options : {
          vendor : [
            'http://code.jquery.com/jquery-2.0.2.min.js',
            'http://underscorejs.org/underscore-min.js',
            'http://backbonejs.org/backbone.js'
          ],

          specs : [
            'test/**/*Spec.js',
          ]
        },
        src : [
          'src/*.js'
        ]
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('build', [
    'jshint',
    'jasmine',
    'clean',
    'copy',
    'uglify'
  ]);

};