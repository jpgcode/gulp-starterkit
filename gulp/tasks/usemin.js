'use strict';

let gulp    = require('gulp');
let config  = require('../config');
let plumber = require('gulp-plumber');
let foreach = require('gulp-foreach');
let usemin  = require('gulp-usemin');
let cssnano = require('gulp-cssnano');
let uglify  = require('gulp-uglify');


gulp.task('usemin', ['assemble:dist', 'sass:dist'], function() {
  return gulp.src('dist/**/*.html')
    .pipe(foreach(function (stream) {
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