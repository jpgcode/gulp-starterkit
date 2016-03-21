'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')(config.fonts.all, () => {})
      .concat(config.fonts.all))
      .pipe(gulp.dest(config.fonts.appDest));
});

gulp.task('fonts:dist', ['clean:dist'], () => {
  return gulp.src(require('main-bower-files')(config.fonts.all, () => {})
      .concat(config.fonts.all))
      .pipe(gulp.dest(config.fonts.distDest));
});