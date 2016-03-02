'use strict';

let gulp   = require('gulp');
let config = require('../config');

//Copy assets to dist on build task
gulp.task('copy:vendorjs', ['clean:dist'], function(){
  return gulp.src(['app/assets/scripts/vendor/jquery-2.1.4.min.js'])
      .pipe(gulp.dest('dist/assets/scripts/vendor'));
});