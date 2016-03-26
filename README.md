<p align="center">
    <img height="326" width="590" src="https://raw.githubusercontent.com/jpgcode/gulp-starterkit/master/gulp-sk.jpg">
</p>

# Gulp Starter Kit

> A web front end project from scratch with Gulp and other awesome technologies!

## Features

> [Gulp](http://gulpjs.com/) the task automation tool,
> [Node.js](https://nodejs.org/) Containing
> modern web development tools such as 
> [Handlebars](http://handlebarsjs.com/) template system,
> [Sass](http://sass-lang.com/) CSS pre processor,
> [eslint](http://eslint.org/) Javascript linter,
> [Babel](http://babeljs.io/) and [BrowserSync](http://www.browsersync.io/).
> Helping you to stay productive following the best practices. A solid starting
> point for both professionals and newcomers to the industry.

## Directory Layout

```
├── /app/                       # The source code of the application
│   ├── /assets/                # The main folder for assets
│   ├── /components/            # The application components
│   ├── /data/                  # Json file containing data shared with the templates
│   ├── /layouts/               # The application handlebars layouts
│   └── /pages/                 # The application pages
├── /node_modules/              # 3rd-party libraries and utilities
│── .eslintrc                   # The configuration file from eslint
│── .gitignore                  # Git ignore rules
│── bower.json                  # The main bower dependencies file
│── gulpfile.js                 # The Gulp task manager configuration
│── package.json                # The node.js modules dependencies file
└── README.md                   # Important information related
```

## Getting Started

Make sure you install [Node.js](https://nodejs.org/en/) v5.8.0+, [npm](https://www.npmjs.com/) v3.7.3+ and [Gulp](http://gulpjs.com/) 3.9.1+ installed.

Just clone the repo:

```shell
$ git clone -o https://github.com/jpgcode/gulp-starterkit.git
$ cd MyApp                      # Change MyApp with the name of your app
$ npm install                   # Install Node.js components listed in ./package.json
$ bower install                 # Install Bower dependencies listed in ./bower.json
```

## Development server

```shell
$ gulp                          # Start the static node.js server and runs it in browser
```

This will start a light-weight development server with "live reload" and
synchronized browsing across multiple devices and browsers.

## Generate dist files

```shell
$ gulp build                    # This will generate a dist folder ready for production use
```

## Authors

**Jose Pablo Granados**
 
+ [github/jpgcode](https://github.com/jpgcode)
+ [twitter/jpgcode](http://twitter.com/jpgcode) 

## License

Copyright (c) 2016 Jose Pablo Granados
Released under the MIT license
