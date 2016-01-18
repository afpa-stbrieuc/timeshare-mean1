// Generated on 2014-01-16 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var appPath = 'app';
  var distPath = 'dist';

   // Configurable paths for the application
  var appConfig = {
    app: appPath,
    appApi: appPath + '/api',
    appPublic: appPath + '/public',
    appTest: appPath + '/test',
    distApi: distPath + '/api',
    distPublic: distPath + '/public',
  };


    // Watches files for changes and runs tasks based on the changed files
// Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    project: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'], //will check for .bowerrc at root dir first and find the real bower.json path
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= project.appPublic %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
      },
      jsTest: {
        files: ['<%= project.appPublic %>/test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= project.appPublic %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      express: {
        cwd: '<%= project.appApi %>',
        files: [
          'controllers/**/*.js',
          'models/*',
          'server.js',
        ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= project.appPublic %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= project.appPublic %>/scripts/{,*/}*.js',
          '<%= project.appPublic %>/images/{,*/}*',
          '<%= project.appApi %>/**/*.js'
        ]
      },

    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: '<%= project.appApi %>/server.js'
        }
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['<%= project.appApi %>/test/**/*.js']
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:3000'
      }
    },

    // Make sure code styles are up to parse and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= project.appPublic %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: '<%= project.appPublic %>/test/.jshintrc'
        },
        src: ['<%= project.appPublic %>/test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

   // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: ''
      },
      app: {
        src: ['<%= project.appPublic %>/index.html']
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },



    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= project.distPublic %>/scripts/{,*/}*.js',
          '<%= project.distPublic %>/styles/{,*/}*.css',
          '<%= project.distPublic %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= project.distPublic %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= project.appPublic %>/index.html',
      options: {
        dest: '<%= project.distPublic %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= project.distPublic %>/{,*/}*.html'],
      css: ['<%= project.distPublic %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= project.distPublic %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.appPublic %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= project.distPublic %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.appPublic %>/images',
          src: '{,*/}*.svg',
          dest: '<%= project.distPublic %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.distPublic %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= project.distPublic %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    // ngmin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '.tmp/concat/scripts',
    //       src: '*.js',
    //       dest: '.tmp/concat/scripts'
    //     }]
    //   }
    // },
    ngAnnotate: {
      options: {
        // Task-specific options go here. 
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '<%= project.appPublic %>/scripts/**/*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },



    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= project.distPublic %>/*.html']
      }
    },


    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.appApi %>',
          src: ['**'],
          dest: '<%= project.distApi %>'
        },{
          expand: true,
          cwd: '<%= project.appPublic %>',
          dest: '<%= project.distPublic %>',
          src: ['*.{ico,png,txt}',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*']
        },
        {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= project.distPublic %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= project.appPublic %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // make a zipfile
    compress: {
      zip: {
        options: {
          archive: 'release.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'mean-todo'
          } // includes files in path and its subdirs
        ]
      }
    },


    // By default, your `index.html`'s <!-- Usxemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= project.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= project.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= project.dist %>/scripts/scripts.js': [
    //         '<%= project.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: '<%= project.appPublic %>/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'express:dev',
      'autoprefixer',
      'open',
      'watch'
    ]);

  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    //'mochaTest',
    //'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'compress:zip'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};