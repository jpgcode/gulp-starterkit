'use strict';

let gulp   = require('gulp');
let config = require('../config');

gulp.task('fonts', function(){
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function () {})
      .concat(config.fonts.all))
      .pipe(gulp.dest(config.fonts.appDest));
});

gulp.task('fonts:dist', ['clean:dist'], function(){
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function () {})
      .concat(config.fonts.all))
      .pipe(gulp.dest(config.fonts.distDest));
});