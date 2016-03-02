'use strict';

let gulp   = require('gulp');
let del    = require('del');
let config = require('../config');
let gutil  = require('gulp-util');

//Copy assets to dist on build task
gulp.task('clean:dist', function() {
    gutil.log(gutil.colors.yellow('Cleaning dist directory'));
    return del([
        'dist/**/*'
    ]);
});