'use strict';

let gulp  	   = require('gulp');
let multimatch = require('multimatch');
let eslint     = require('gulp-eslint');
let config     = require('../config');
let guppy 	   = require('git-guppy')(gulp);


gulp.task('pre-commit', function () {

  var filterVendorJs = ['app/**/*.js', '!app/assets/scripts/vendor/*'];
  var filesToTest = multimatch(guppy.src('pre-commit'), filterVendorJs);

  return gulp.src(filesToTest)
    .pipe(plumber())
    .pipe($.eslint({ rulePaths: ['/'], configFile: '.eslintrc'}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});