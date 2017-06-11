'use strict';

import gulp     from 'gulp';
import config   from '../config';

//Copy assets to dist on build task
gulp.task('copy:vendorjs', ['clean:dist'], () => {
  return gulp.src(['app/assets/scripts/vendor/**/*'])
      .pipe(gulp.dest('dist/assets/scripts/vendor'));
});
