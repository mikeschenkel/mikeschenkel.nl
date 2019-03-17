const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = markdownIt({
  html: true,
  breaks: true,
  typographer: true,
  linkify: true
}).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: 'c-direct-link',
  permalinkSymbol: '#'
});
