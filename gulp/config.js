module.exports = {
    
    app: 'app',
    tmp: '.tmp',
    dist: 'dist',
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
        all: 'app/{assets,components,pages}/**/*.js',
        vendor: '!app/assets/scripts/vendor/**'
    },
    images: {
        all: 'app/assets/images/**.*',
        distDest: 'dist/assets/images'
    },
    fonts: {
        all: 'app/assets/styles/fonts/**/*',
        appDest: '.tmp/assets/styles/fonts',
        distDest: 'dist/assets/styles/fonts'
    }
    
};