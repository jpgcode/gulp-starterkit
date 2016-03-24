'use strict';

import gulp       from 'gulp';
import config     from '../config';
import gutil      from 'gulp-util';
import path       from 'path';
import babelify   from 'babelify';
import browserify from 'browserify';
import source     from 'vinyl-source-stream';
import buffer     from 'gulp-buffer';
import exorcist   from 'exorcist';


gulp.task('jsbundle', ['eslint'], () => {
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
