'use strict';

let gulp   = require('gulp');
let config = require('../config');

gulp.task('build', ['sass:dist', 'usemin', 'images', 'fonts:dist', 'copy:vendorjs']);