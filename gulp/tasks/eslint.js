'use strict';

const gulp   = require('gulp');
const config = require('../config');
const eslint = require('gulp-eslint');


gulp.task('eslint', () => {
  return gulp.src([config.js.all, '!app/assets/scripts/vendor/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});