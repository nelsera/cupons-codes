'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'develop'
  };

  grunt.initConfig({
    config: {
      app: 'develop'
    },
    clean: {
      files: ['.tmp']
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      bower: {
        files: ['bower.json'],
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: [],
        options: {
          livereload: true
        }
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
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
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

  grunt.registerTask('serve', [
    'clean',
    'compass',
    'connect:livereload',
    'watch'
  ]);
};