'use strict';

const gulp        = require('gulp');
const config      = require('../config');
const gutil       = require('gulp-util');
const path        = require('path');
const babelify    = require('babelify');
const browserify  = require('browserify');
const source      = require('vinyl-source-stream');
const buffer      = require('gulp-buffer');
const exorcist    = require('exorcist');
const taskListing = require('gulp-task-listing');


gulp.task('jsbundle', () => {
  return browserify({
      paths: [ path.join(__dirname, config.app) ],
      entries: config.js.entryFile,
      debug: true
  })
  .transform(babelify)
  .bundle().on('error', function(error){
        gutil.log(gutil.colors.red('[Build Error]', error.message));
        this.emit('end');
  })
  .pipe(exorcist(config.js.sourcemapFile))
  .pipe(source(config.js.outputFile))
  .pipe(buffer())
  .pipe(gulp.dest(config.js.appOutputPath));
});

gulp.task('jsbundle:dist', () => {
  return browserify({
      paths: [ path.join(__dirname, config.app) ],
      entries: config.js.entryFile,
      debug: true
  })
  .transform(babelify)
  .bundle().on('error', function(error){
        gutil.log(gutil.colors.red('[Build Error]', error.message));
        this.emit('end');
  })
  .pipe(source(config.js.outputFile))
  .pipe(buffer())
  .pipe(gulp.dest(config.js.distOutputPath));
});
