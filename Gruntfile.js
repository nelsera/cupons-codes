'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var config = { app: 'develop' };

  grunt.initConfig({
    config: config,
    clean: ['.tmp'],
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      bower: {
        files: ['bower.json']
      },
      compass: {
        files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*',
          '<%= config.app %>/scripts/{,*/}*.js'
        ]
      }
    },
    connect: {
      options: {
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= config.app %>/styles',
        cssDir: '.tmp/styles',
        relativeAssets: true,
        assetCacheBuster: false,
        noLineComments: false
      },
      develop: {
        options: {
          debugInfo: false
        }
      }
    }
  });

  grunt.registerTask('serve', ['clean', 'compass', 'connect', 'watch']);
};