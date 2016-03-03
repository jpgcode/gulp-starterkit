'use strict';

const assemble = require('assemble');
const app      = assemble();
const gulp     = require('gulp');
const config   = require('../config');
const get      = require('get-value');
const _        = require('lodash');
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
  app.helper('get', function(prop) {
    return get(this.context, prop);
  });

  app.helper('pagename', function(){
    let url = get(this.context, 'view.path');;
    let pagenameArr = url.split('/');
    let pagename = _.last(pagenameArr);
        pagename = pagename.split('.')[0];
    return pagename;
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