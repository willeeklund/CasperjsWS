/*global module:false*/
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    /**
     * Tests using CasperJS
     */
    casperjs: {
      options: {
        async: {
          parallel: true
        }
      },
      files: ['tests/**/*.js']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.registerTask('default', ['casperjs']);
};
