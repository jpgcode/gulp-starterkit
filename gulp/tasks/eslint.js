'use strict';

import gulp    from 'gulp';
import config  from '../config';
import eslint  from 'gulp-eslint';
import notify  from 'gulp-notify';
import plumber from 'gulp-plumber';

gulp.task('eslint', () => {
  return gulp.src([config.js.all, '!app/assets/scripts/vendor/**'])
    .pipe(eslint())
    .pipe(plumber())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', notify.onError({ message: 'There is a JS error, please look the console for details'}));
    
});