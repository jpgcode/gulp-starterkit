'use strict';

let gulp   = require('gulp');
let notify = require('gulp-notify'); 


gulp.task('notify:server', function(){
  return gulp.src('gulpfile.js')
      .pipe(notify('Server ready!'));
});