'use strict';

import gulp   from 'gulp';
import config from '../config';
import notify from 'gulp-notify';

gulp.task('notify:server', () => {
  return gulp.src('./gulpfile.js')
      .pipe(notify('Server ready!'));
});