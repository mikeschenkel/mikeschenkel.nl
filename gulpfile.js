const gulp = require('gulp');

require('require-dir')('./_gulp');

// Asset pipeline task
gulp.task('assets', gulp.parallel('copy', 'scripts', 'styles'));

// Build task
gulp.task('build', gulp.series('clean', 'eleventy', 'assets', 'critical'));
