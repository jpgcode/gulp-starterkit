'use strict';

let assemble = require('assemble');
let app      = assemble();
let gulp     = require('gulp');
let config   = require('../config');
let get      = require('get-value');
let extname  = require('gulp-extname');
let plumber  = require('gulp-plumber');
let flatten  = require('gulp-flatten');
let helpers  = require('handlebars-helpers')();


gulp.task('load', function(cb) {

  //Set main assemble options
  app.option('layout', 'default');
  app.layouts('app/layouts/*.hbs');
  app.pages('app/pages/**/*.hbs');
  app.partials('app/components/**/*.hbs');
  app.engine('hbs', require('engine-handlebars'));
  app.data(['app/{pages,components,data}/**/*.json']);
  
  //Custom helpers
  app.helper('get', function(prop) {
    return get(this.context, prop);
  });
  
  cb();
});


gulp.task('assemble', ['load'], function(){
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe(extname())
      .pipe(flatten())
      .pipe(plumber())
      .pipe(app.dest(config.tmp));
});


gulp.task('assemble:dist', ['load', 'clean:dist'], function(){
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe(extname())
      .pipe(flatten())
      .pipe(plumber())
      .pipe(app.dest(config.dist));
});