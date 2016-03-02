'use strict';

const gulp    = require('gulp');
const config  = require('../config');
const plumber = require('gulp-plumber');
const foreach = require('gulp-foreach');
const usemin  = require('gulp-usemin');
const cssnano = require('gulp-cssnano');
const uglify  = require('gulp-uglify');


gulp.task('usemin', ['assemble:dist', 'sass:dist'], () => {
  return gulp.src('dist/**/*.html')
    .pipe(foreach((stream) => {
      return stream
        .pipe(plumber())
        .pipe(usemin({
          cssvendor: [cssnano()],
          css: [cssnano()],
          jsvendor: [uglify()],
          js: [uglify()]
        }))
        .pipe(gulp.dest(config.dist));
    }));
});