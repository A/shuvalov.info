'use strict';

module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    stylus:
      compile:
        files:
          'assets/css/main.css': '_src/stylus/main.styl'
        options:
          paths: ['_src/stylus']
          'include css': true
          use: 
            [require('nib')]
    jade:
      compile:
        files:
          'index.html': '_src/jade/index.jade'
          'post.html': '_src/jade/post.jade'
    watch:
      stylus:
        files: '_src/stylus/**'
        tasks: 'stylus'
      jade:
        files: '_src/jade/**'
        tasks: 'jade'

  grunt.registerTask 'default', ['stylus', 'jade', 'watch']