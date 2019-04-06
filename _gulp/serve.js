const browserSync = require('browser-sync');
const fs = require('fs');
const gulp = require('gulp');

const config = require('./_config.js');

const browserSyncConfig = {
  server: { baseDir: 'dist' },
  callbacks: {
    ready: function(err, browserSync) {
      const content_404 = fs.readFileSync(config.paths.dest + '404/index.html');

      browserSync.addMiddleware('*', (req, res) => {
        // Provides the 404 content without redirect.
        res.write(content_404);
        res.end();
      });
    }
  }
};

/**
 * Reload the browser.
 */
const reloadBrowser = done => {
  browserSync.reload();
  done();
};

gulp.task('browsersync', function(done) {
  browserSync.create();
  browserSync.init(browserSyncConfig);
  done();
});

gulp.task('watch', function() {
  gulp.watch(
    config.paths.assetsSrc + config.styles.src,
    gulp.series('styles', reloadBrowser)
  );

  gulp.watch(
    config.paths.assetsSrc + config.scripts.src,
    gulp.series('scripts', reloadBrowser)
  );

  gulp.watch(config.eleventy.watch, gulp.series('eleventy', reloadBrowser));
});

gulp.task('serve', gulp.series('browsersync', 'watch'));
