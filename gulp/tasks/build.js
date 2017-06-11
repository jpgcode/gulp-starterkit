'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('build', ['sass:dist','jsbundle:dist', 'usemin', 'images', 'fonts:dist']);
