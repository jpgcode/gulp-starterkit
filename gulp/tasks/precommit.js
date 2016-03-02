'use strict';

const gulp  	 = require('gulp');
const multimatch = require('multimatch');
const eslint     = require('gulp-eslint');
const config     = require('../config');
const guppy 	 = require('git-guppy')(gulp);


gulp.task('pre-commit', () => {

  var filterVendorJs = ['app/**/*.js', '!app/assets/scripts/vendor/*'];
  var filesToTest = multimatch(guppy.src('pre-commit'), filterVendorJs);

  return gulp.src(filesToTest)
    .pipe(plumber())
    .pipe(eslint({ rulePaths: ['/'], configFile: '.eslintrc'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});