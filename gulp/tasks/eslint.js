'use strict';

let gulp   = require('gulp');
let config = require('../config');
let eslint = require('gulp-eslint');


gulp.task('eslint', function() {
  return gulp.src([config.js.all, '!app/assets/scripts/vendor/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});