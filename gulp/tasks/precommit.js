'use strict';

import gulp       from 'gulp';
import config     from '../config';
import multimatch from 'multimatch';
import eslint     from 'gulp-eslint';
import guppy      from 'git-guppy';

//Initialize git guppy
guppy(gulp);

gulp.task('pre-commit', () => {

  var filterVendorJs = ['app/**/*.js', '!app/assets/scripts/vendor/*'];
  var filesToTest = multimatch(guppy.src('pre-commit'), filterVendorJs);

  return gulp.src(filesToTest)
    .pipe(plumber())
    .pipe(eslint({ rulePaths: ['/'], configFile: '.eslintrc'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});