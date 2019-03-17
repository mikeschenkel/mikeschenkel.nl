const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const through2 = require('through2');

const config = require('./_config.js');
const { isProduction } = require('./_config.js');
const browserslist = require('../package.json').browserslist;

sass.compiler = require('sass');

const stylesConfig = {
  sass: {
    outputStyle: 'expanded',
    includePaths: 'node_modules'
  },
  postcss: {
    development: [autoprefixer({ browsers: browserslist })],
    production: [csso()]
  }
};

gulp.task('styles', function() {
  return gulp
    .src(config.paths.assetsSrc + config.styles.src)
    .pipe(!isProduction ? sourcemaps.init() : through2.obj())
    .pipe(sass(stylesConfig.sass).on('error', sass.logError))
    .pipe(postcss(stylesConfig.postcss.development))
    .pipe(
      isProduction ? postcss(stylesConfig.postcss.production) : through2.obj()
    )
    .pipe(!isProduction ? sourcemaps.write() : through2.obj())
    .pipe(gulp.dest(config.paths.assetsDest + config.styles.dest));
});
