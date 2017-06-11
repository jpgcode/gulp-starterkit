'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('build', ['sass:dist','jsbundle:dist', 'copy:vendorjs', 'usemin', 'images', 'fonts:dist']);
