'use strict';

import gulp   from 'gulp';
import config from '../config';
import gutil  from 'gulp-util';
import notify from 'gulp-notify';

gulp.task('notify:server', () => {
  return gulp.src('./gulpfile.babel.js')
      .pipe(gutil.env.type !== 'ci' ? notify('Server ready!') : gutil.noop());
});
