var gulp = require('gulp');
var del = require('del');
var get = require('get-value');
var $ = require('gulp-load-plugins')();
var multimatch = require('multimatch');
var bs = require("browser-sync").create();
var assemble = require('assemble');
var app = assemble();
var guppy = require('git-guppy')(gulp);
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var helpers = require('handlebars-helpers')();
var runSequence = require('run-sequence');


gulp.task('sass', function(){
  return gulp.src('app/assets/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/styles'));

});

gulp.task('sass:dist', ['assemble:dist'], function(){
  gutil.log(gutil.colors.yellow('Inside sass:dist'));
  return gulp.src('app/assets/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('notify:server', function(){
  return gulp.src("gulpfile.js")
      .pipe($.notify('Server ready!'));
});

//Images
gulp.task('images', function () {
    return gulp.src('app/assets/images/**/*')
      .pipe($.cache($.imagemin({
          progressive: true,
          interlaced: true
      })))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function(){
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function () {})
      .concat('app/assets/fonts/**/*'))
      .pipe(gulp.dest('.tmp/assets/fonts'));
});

gulp.task('fonts:dist', ['clean:dist'], function(){
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function () {})
      .concat('app/assets/styles/fonts/**/*'))
      .pipe(gulp.dest('dist/assets/styles/fonts'));
});

gulp.task('captions:dist', function() {
   gulp.src('app/assets/captions/**/*')
   .pipe(gulp.dest('dist/assets/captions'));
});

//Copy Task for assets that needs to be moved to /dist on build task
gulp.task('copy:vendorjs', ['clean:dist'], function(){
  return gulp.src(['app/assets/scripts/vendor/jquery-2.1.4.min.js'])
      .pipe(gulp.dest('dist/assets/scripts/vendor'));
});

gulp.task('clean:dist', function () {
  gutil.log(gutil.colors.yellow('inside clean:dist'));
  return del([
    'dist/**/*'
  ]);
});

//Lint task
gulp.task('eslint', function() {
  return gulp.src(['app/{assets,components,pages}/**/*.js', '!app/assets/scripts/vendor/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('pre-commit', function () {

  var filterVendorJs = ['app/**/*.js', '!app/assets/scripts/vendor/*'];
  var filesToTest = multimatch(guppy.src('pre-commit'), filterVendorJs);

  return gulp.src(filesToTest)
    .pipe($.plumber())
    .pipe($.eslint({ rulePaths: ['/'], configFile: '.eslintrc'}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

//Assemble load task
gulp.task('load', function(cb) {

  //Set main assemble options
  app.option('layout', 'default');
  app.layouts('app/layouts/*.hbs');
  app.pages('app/pages/**/*.hbs');
  app.partials('app/components/**/*.hbs');
  app.engine('hbs', require('engine-handlebars'));
  app.data(['app/{pages,components,data}/**/*.json']);
  
  // //Custom helpers
  app.helper('get', function(prop) {
    return get(this.context, prop);
  });
  
  cb();
});

//Assemble main task
gulp.task('assemble', ['load'], function(){
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe($.extname())
      .pipe($.flatten())
      .pipe($.plumber())
      .pipe(app.dest('.tmp'));
});

gulp.task('assemble:dist', ['load', 'clean:dist'], function(){
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe($.extname())
      .pipe($.flatten())
      .pipe($.plumber())
      .pipe(app.dest('dist'));
});

gulp.task('usemin', ['assemble:dist', 'sass:dist'], function() {
  return gulp.src('dist/**/*.html')
    .pipe($.foreach(function (stream) {
      return stream
        .pipe($.plumber())
        .pipe($.usemin({
          cssvendor: [$.cssnano()],
          css: [$.cssnano()],
          jsvendor: [$.uglify()],
          js: [$.uglify()]
        }))
        .pipe(gulp.dest('dist/'));
    }));

});

//Serve the site from .tmp directory
gulp.task('default', ['assemble', 'sass', 'fonts', 'notify:server'], function(){

    bs.init({
      notify: false,
      port: 9000,
      server: {
          baseDir: ['.tmp', 'app'],
          routes: {
            '/bower_components': 'bower_components'
          }
      }
    });

    var globs = [
      '.tmp/**/*.html',
      '.tmp/assets/styles/{,*/}*.css',
      '.tmp/assets/**/*.js',
      'app/assets/images/{,*/}*.*'
    ];

    watch(globs, function(cb){
      return executeTask(['reloadBrowsers']);
    });

    watch('app/{assets,components,pages}/**/*.scss', function(cb){
      return executeTask(['sass']);
    });

    watch('app/**/*.{hbs,json}', function(cb){
      return executeTask(['assemble']);
    });

    watch('app/assets/fonts/*', function(cb){
      return executeTask(['fonts','reloadBrowsers']);
    });
    watch('app/{assets,components,pages}/**/*.js', function(cb){
      return executeTask(['eslint','reloadBrowsers']);
    });

});


//executes the tasks on the args array
function executeTask(args){
  return runSequence.apply({},args);
}

gulp.task('reloadBrowsers',function(){
  return bs.reload();
});

gulp.task('serve', ['default'], function(){
  gutil.log(gutil.colors.yellow('The task "gulp serve" is deprecated, use "gulp" instead'));
});

//Serve the site from the dist directory
gulp.task('default:dist', function(){
  bs.init({
    notify: false,
    port: 9000,
    server: {
        baseDir: ['dist']
    }
  });
});

gulp.task('build', ['sass:dist', 'usemin', 'images', 'fonts:dist', 'copy:vendorjs','captions:dist'], function(){

});
