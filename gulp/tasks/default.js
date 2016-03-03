'use strict';

const gulp   = require('gulp');
const config = require('../config');
const bs 	   = require('browser-sync').create();


//Serve the site from .tmp directory
gulp.task('default', ['assemble', 'sass','jsbundle', 'fonts', 'notify:server'], () => {

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

    gulp.watch([config.html.all, config.images.all], config.watchOptions, bs.reload);
    gulp.watch(config.css.watch, config.watchOptions, ['sass', bs.reload]);
    gulp.watch(config.hbs.all, config.watchOptions, ['assemble']);
    gulp.watch(config.fonts.all, config.watchOptions, ['fonts', bs.reload]);
    gulp.watch(config.js.all, config.watchOptions, ['eslint', 'jsbundle', bs.reload]);

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
