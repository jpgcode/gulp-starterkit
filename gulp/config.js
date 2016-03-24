module.exports = {
    app: './app',
    tmp: '.tmp',
    dist: 'dist',
    watchOptions: {
        cwd: '.'
    },
    html: {
        all: '.tmp/**/*.html'
    },
    hbs: {
        all: 'app/**/*.{hbs,json}'
    },
    css: {
    	all: 'app/assets/styles/**/*.scss',
        watch: 'app/{assets,components,pages}/**/*.scss',
        appDest: '.tmp/assets/styles',
        distDest: 'dist/assets/styles'
    },
    js: {
        basePath: 'assets/scripts',
        all: 'app/{assets,components,pages}/**/**/*.js',
        vendor: '!app/assets/scripts/vendor/**',
        entryFile: './app/assets/scripts/global.js',
        appOutputPath: './.tmp/assets/scripts',
        distOutputPath: 'dist/assets/scripts',
        outputFile: 'main.js',
        sourcemapFile : './.tmp/assets/scripts/main.js.map'
    },
    images: {
        all: 'app/assets/images/**/*',
        distDest: 'dist/assets/images'
    },
    fonts: {
        all: 'app/assets/styles/fonts/**/*.{eot,svg,ttf,woff,woff2}',
        appDest: '.tmp/assets/styles/fonts',
        distDest: 'dist/assets/styles/fonts'
    }
};
