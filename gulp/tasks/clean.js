'use strict';

import gulp   from 'gulp';
import config from '../config';
import del    from 'del';
import gutil  from 'gulp-util';

//Copy assets to dist on build task
gulp.task('clean:dist', () => {
    return del(['dist/**/*']);
});