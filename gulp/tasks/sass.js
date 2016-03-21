'use strict';

import gulp         from 'gulp';
import config       from '../config';
import autoprefixer from 'gulp-autoprefixer';
import plumber      from 'gulp-plumber';
import sass         from 'gulp-sass';
import sourcemaps   from 'gulp-sourcemaps';

gulp.task('sass', () => {
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

gulp.task('sass:dist', ['assemble:dist'], () => {
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
