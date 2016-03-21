'use strict';

import gulp     from 'gulp';
import config   from '../config';

//Copy assets to dist on build task
gulp.task('copy:vendorjs', ['clean:dist'], () => {
  return gulp.src(['app/assets/scripts/vendor/jquery-2.1.4.min.js'])
      .pipe(gulp.dest('dist/assets/scripts/vendor'));
});