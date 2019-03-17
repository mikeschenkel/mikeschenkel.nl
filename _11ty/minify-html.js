const htmlmin = require('html-minifier');

const { isProduction } = require('../_gulp/_config.js');

module.exports = function(content, outputPath) {
  if (isProduction && outputPath.endsWith('.html')) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  }
  return content;
};
