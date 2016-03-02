'use strict';

const gulp   = require('gulp');
const config = require('../config');
const notify = require('gulp-notify');


gulp.task('notify:server', () => {
  return gulp.src('./gulpfile.js')
      .pipe(notify('Server ready!'));
});