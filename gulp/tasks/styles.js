'use strict';

let gulp         = require('gulp');
let config       = require('../config');
let autoprefixer = require('gulp-autoprefixer');
let plumber      = require('gulp-plumber');
let sass         = require('gulp-sass');
let gutil        = require('gulp-util');
let sourcemaps   = require('gulp-sourcemaps');


gulp.task('sass', function(){
  return gulp.src(config.css.all)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.css.appDest));
});


gulp.task('sass:dist', ['assemble:dist'], function(){
  gutil.log(gutil.colors.yellow('Compiling sass'));
  return gulp.src('app/assets/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.css.distDest));
});