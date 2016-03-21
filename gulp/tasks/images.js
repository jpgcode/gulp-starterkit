'use strict';

import gulp     from 'gulp';
import config   from '../config';
import imagemin from 'gulp-imagemin';

gulp.task('images', ['clean:dist'],  () => {
    return gulp.src(config.images.all)
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.images.distDest));
});