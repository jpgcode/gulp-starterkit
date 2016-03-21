'use strict';

import gulp    from 'gulp';
import config  from '../config';
import plumber from 'gulp-plumber';
import foreach from 'gulp-foreach';
import usemin  from 'gulp-usemin';
import cssnano from 'gulp-cssnano';
import uglify  from 'gulp-uglify'; 


gulp.task('usemin', ['assemble:dist', 'sass','jsbundle','jsbundle:dist'], () => {
  return gulp.src('dist/**/*.html')
    .pipe(foreach((stream) => {
      return stream
        .pipe(plumber())
        .pipe(usemin({
          cssvendor: [cssnano()],
          css: [cssnano()],
          jsvendor: [uglify()]
        }))
        .pipe(gulp.dest(config.dist));
    }));
});
