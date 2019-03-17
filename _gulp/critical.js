const critical = require('critical').stream;
const gulp = require('gulp');
const through2 = require('through2');

const { paths, isProduction } = require('./_config.js');

const criticalConfig = {
  inline: true,
  base: paths.dest,
  minify: true,
  width: 1280,
  height: 800,
  ignore: ['@font-face']
};

const htmlmin = require('gulp-htmlmin');
gulp.task('critical', function() {
  return gulp
    .src(paths.dest + 'index.html')
    .pipe(critical(criticalConfig))
    .on('error', function(err) {
      console.error(err.message);
    })
    .pipe(isProduction ? htmlmin({ collapseWhitespace: true }) : through2.obj())
    .pipe(gulp.dest(paths.dest));
});
