'use strict';

const gulp   = require('gulp');
const config = require('../config');

gulp.task('build', ['sass:dist', 'usemin', 'images', 'fonts:dist', 'copy:vendorjs']);