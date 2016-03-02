'use strict';

const assemble = require('assemble');
const app      = assemble();
const gulp     = require('gulp');
const config   = require('../config');
const get      = require('get-value');
const extname  = require('gulp-extname');
const plumber  = require('gulp-plumber');
const flatten  = require('gulp-flatten');
const helpers  = require('handlebars-helpers')();


gulp.task('load', (cb) => {

  //Set main assemble options
  app.layouts('app/layouts/*.hbs');
  app.pages('app/pages/**/*.hbs');
  app.partials('app/components/**/*.hbs');
  app.engine('hbs', require('engine-handlebars'));
  app.data(['app/{pages,components,data}/**/*.json']);
  
  //Custom helpers
  app.helper('get', (prop) => {
    return get(this.context, prop);
  });
  
  cb();
});


gulp.task('assemble', ['load'], () => {
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe(extname())
      .pipe(flatten())
      .pipe(plumber())
      .pipe(app.dest(config.tmp));
});


gulp.task('assemble:dist', ['load', 'clean:dist'], () => {
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe(extname())
      .pipe(flatten())
      .pipe(plumber())
      .pipe(app.dest(config.dist));
});