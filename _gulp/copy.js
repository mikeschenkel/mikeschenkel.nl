const gulp = require('gulp');

const config = require('./_config.js');

gulp.task('copy:assets', function() {
  const assetGlobs = [
    config.paths.assetsSrc + 'fonts/**/*',
    config.paths.assetsSrc + 'images/**/*'
  ];

  return gulp
    .src(assetGlobs, { base: config.paths.assetsSrc })
    .pipe(gulp.dest(config.paths.assetsDest));
});

gulp.task('copy:media', function() {
  const baseDir = './src/media/';
  const mediaGlobs = [
    baseDir + '**/*.{jpg,jpeg,png,gif,webp,mp3,mp4,webm,ogg}'
  ];

  return gulp
    .src(mediaGlobs, { base: baseDir })
    .pipe(gulp.dest('./dist/media'));
});

gulp.task('copy', gulp.parallel(['copy:assets', 'copy:media']));
