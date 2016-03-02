'use strict';

const gulp   = require('gulp');
const config = require('../config');

gulp.task('build', ['sass:dist','jsbundle:dist', 'usemin', 'images', 'fonts:dist', 'copy:vendorjs']);
