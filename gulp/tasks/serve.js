'use strict';

let gulp  = require('gulp');
let gutil = require('gulp-util');

gulp.task('serve', ['default'], function(){
  gutil.log(gutil.colors.yellow('The task "gulp serve" is deprecated, use "gulp" instead'));
});