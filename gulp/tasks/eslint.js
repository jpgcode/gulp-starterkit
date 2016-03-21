'use strict';

import gulp   from 'gulp';
import config from '../config';
import eslint from 'gulp-eslint';

gulp.task('eslint', () => {
  return gulp.src([config.js.all, '!app/assets/scripts/vendor/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});