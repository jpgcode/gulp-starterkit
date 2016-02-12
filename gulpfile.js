//Require specific modules
var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();
var bs = require("browser-sync").create();
var assemble = require('assemble');
var guppy = require('git-guppy')(gulp);
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var multimatch = require('multimatch');

//Sass task
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
    .pipe($.debug())
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

//Notify when the server is ready
gulp.task('notify:server', function(){
  return gulp.src("gulpfile.js")
      .pipe($.notify('Server ready!'));
});

//Images task
gulp.task('images', function () {
  	return gulp.src('app/assets/images/**/*')
    	.pipe($.cache($.imagemin({
      		progressive: true,
      		interlaced: true
    	})))
    .pipe(gulp.dest('dist/assets/images'));
});

//Fonts task
gulp.task('fonts', function(){
	return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function () {})
      .concat('app/assets/styles/fonts/**/*'))
      .pipe(gulp.dest('.tmp/assets/fonts'));
});

gulp.task('clean:dist', function () {
  gutil.log(gutil.colors.yellow('inside clean:dist'));
  return del([
    'dist/**/*'
  ]);
});

/*gulp.task('copy', function(){
  return gulp.src([''])
    .pipe(gulp.dest(''));
});*/

//Lint task
gulp.task('eslint', function() {
  return gulp.src(['app/{assets,components,pages}/**/*.js', '!app/assets/scripts/vendor/*'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('babel', function() {
    return gulp.src('app/{assets,components,pages}/**/*.js')
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(extname('dist.js'))
        .pipe(gulp.dest(function(file){
          return file.base;
        }));
});

gulp.task('pre-commit', function () {

  var filterVendorJs = ['**/*.js', '!app/assets/scripts/vendor/*'];
  var filesToTest = multimatch(guppy.src('pre-commit'), filterVendorJs);

  return gulp.src(filesToTest)
    .pipe($.plumber())
    .pipe($.debug())
    .pipe($.eslint({ rulePaths: ['/'], configFile: '.eslintrc'}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

//Assemble task
gulp.task('assemble', function(){

    assemble.option('layout', 'default');
    assemble.partials('app/components/**/*.hbs');
    assemble.layouts('app/layouts/*.hbs');
    assemble.pages('app/pages/**/*.hbs');
    assemble.data(['app/{pages,components,data}/**/*.json']);  

    assemble.helper('pages', function () {
      return this.app.views.pages;
    });

    return assemble.src('app/pages/**/*.hbs', { layout: 'default' })
        .pipe($.extname())
        .pipe($.flatten())
        .pipe($.plumber())
        .pipe(assemble.dest('.tmp'));
});

gulp.task('assemble:dist', ['clean:dist'], function(){
    gutil.log(gutil.colors.yellow('Inside assemble:dist'));
    assemble.option('layout', 'default');
    assemble.partials('app/components/**/*.hbs');
    assemble.layouts('app/layouts/*.hbs');
    assemble.pages('app/pages/**/*.hbs');
    assemble.data(['app/{pages,components,data}/**/*.json']);  

    assemble.helper('pages', function () {
      return this.app.views.pages;
    });

    return assemble.src('app/pages/**/*.hbs', { layout: 'default' })
        .pipe($.extname())
        .pipe($.flatten())
        .pipe($.plumber())
        .pipe(assemble.dest('dist'));
});

gulp.task('usemin', ['assemble:dist', 'sass:dist'], function() {
  return gulp.src('dist/**/*.html')
    .pipe($.foreach(function (stream) {
      return stream
        .pipe($.plumber())
        .pipe($.debug())
        .pipe($.usemin({
          css: [$.minifyCss()],
          js: [$.uglify()]
        }))
        .pipe(gulp.dest('dist/'));
    }));
});

// gulp.task('striplogs', [], function () {
//     return gulp.src('dist/**/*.js')
//         .pipe($.stripDebug())
//         .pipe(gulp.dest('dist'));
// });

//Serve the site from .tmp directory
gulp.task('default', ['assemble', 'sass', 'notify:server'], function(){

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
  	
    gulp.watch([
      '.tmp/*.html',
      '.tmp/assets/styles/{,*/}*.css',
      '.tmp/assets/**/*.js',
      'app/assets/images/{,*/}*.*'
    ]).on('change', bs.reload);

    gulp.watch('app/{assets,components,pages}/**/*.js', ['eslint']);
    gulp.watch('app/{assets,components,pages}/**/*.scss', ['sass']);
    gulp.watch('app/assets/styles/fonts/*', ['fonts']);
    gulp.watch('app/**/*.{hbs,json}', ['assemble']);

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

gulp.task('build', ['sass:dist', 'usemin', 'images'], function(){  
// gulp.task('build', ['clean:dist', 'assemble:dist', 'usemin'], function(){  
  // gutil.log(gutil.colors.yellow('doing callback. Calling assemble'));
  gutil.log(gutil.colors.yellow('Inside Build'));
  // return gulp.start('assemble:dist', );
}); 