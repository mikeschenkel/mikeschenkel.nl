const gulp = require('gulp');
const webpackMerge = require('webpack-merge');
const webpackStream = require('webpack-stream');

const config = require('./_config.js');
const { isProduction } = require('./_config.js');

const webpackConfig = {
  common: {
    entry: config.scripts.bundle,
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },
  development: {
    mode: 'development',
    devtool: 'source-map'
  },
  production: {
    mode: 'production'
  }
};

const webpackDevelopment = webpackMerge(
  webpackConfig.common,
  webpackConfig.development
);

const webpackProduction = webpackMerge(
  webpackConfig.common,
  webpackConfig.production
);

gulp.task('scripts', function() {
  return gulp
    .src(config.paths.assetsSrc + config.scripts.src)
    .pipe(
      isProduction
        ? webpackStream(webpackProduction)
        : webpackStream(webpackDevelopment)
    )
    .pipe(gulp.dest(config.paths.assetsDest + config.scripts.dest));
});
