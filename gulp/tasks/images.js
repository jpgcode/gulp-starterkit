'use strict';

const gulp     = require('gulp');
const config   = require('../config');
const cache    = require('gulp-cache');
const imagemin = require('gulp-imagemin');

gulp.task('images', ['clean:dist'],  () => {
    return gulp.src(config.images.all)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.images.distDest));
});