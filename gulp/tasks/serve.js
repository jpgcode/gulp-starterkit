'use strict';

const gulp  = require('gulp');
const gutil = require('gulp-util');

gulp.task('serve', ['default'], () => {
  gutil.log(gutil.colors.yellow('The task "gulp serve" is deprecated, use "gulp" instead'));
});