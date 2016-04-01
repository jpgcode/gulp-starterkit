'use strict';

import assemble from 'assemble';
import gulp     from 'gulp';
import config   from '../config';
import get      from 'get-value';
import _        from 'lodash';
import extname  from 'gulp-extname';
import plumber  from 'gulp-plumber';
import flatten  from 'gulp-flatten';
import helpers  from 'handlebars-helpers';


//Initialize assemble
const app = assemble();

//Initialize hbs helpers
helpers();


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
