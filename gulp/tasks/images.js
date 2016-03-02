'use strict';

let gulp     = require('gulp');
let config   = require('../config');
let cache    = require('gulp-cache');
let imagemin = require('gulp-imagemin');

gulp.task('images', function() {
    return gulp.src(config.images.all)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.images.distDest));
});