'use strict';

const gulp   = require('gulp');
const del    = require('del');
const config = require('../config');
const gutil  = require('gulp-util');

//Copy assets to dist on build task
gulp.task('clean:dist', () => {
    return del(['dist/**/*']);
});