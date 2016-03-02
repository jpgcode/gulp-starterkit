'use strict';

const gulp   = require('gulp');
const config = require('../config');
const bs 	   = require('browser-sync').create();


//Serve the site from .tmp directory
gulp.task('default', ['assemble', 'sass', 'fonts', 'notify:server'], () => {

    bs.init({
      notify: false,
      port: 9000,
      server: {
          baseDir: [config.tmp, config.app],
          routes: {
            '/bower_components': 'bower_components'
          }
      }
    });

    gulp.watch([config.html.all, config.images.all], bs.reload);
    gulp.watch(config.css.watch, ['sass', bs.reload]);
    gulp.watch(config.hbs.all, ['assemble']);
    gulp.watch(config.fonts.all, ['fonts', bs.reload]);
    gulp.watch(config.js.all, ['eslint', bs.reload]);

});

//Serve the site from the dist directory
gulp.task('default:dist', () => {
  bs.init({
    notify: false,
    port: 9000,
    server: {
        baseDir: [config.dist]
    }
  });
});