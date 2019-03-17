const del = require('del');
const gulp = require('gulp');

const config = require('./_config.js');

gulp.task('clean', del.bind(null, [config.paths.dest], { dot: true }));
