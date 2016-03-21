'use strict';

import gulp  from 'gulp';
import gutil from 'gulp-util';

gulp.task('serve', ['default'], () => {
  gutil.log(gutil.colors.yellow('The task "gulp serve" is deprecated, use "gulp" instead'));
});