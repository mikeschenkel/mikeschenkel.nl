const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const { isProduction } = require('./_gulp/_config.js');
const filters = require('./_11ty/filters.js');
const shortcodes = require('./_11ty/shortcodes.js');

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach(shortCodeName => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // Markdown
  eleventyConfig.setLibrary('md', require('./_11ty/markdown.js'));

  // Collections: Main
  eleventyConfig.addCollection('main', function(collection) {
    const pathsRegex = /\/posts\/|\/links\//;
    return collection
      .getAllSorted()
      .filter(item => item.inputPath.match(pathsRegex) !== null)
      .filter(item => item.data.permalink !== false);
  });

  // Collections: Posts
  eleventyConfig.addCollection('posts', function(collection) {
    const pathsRegex = /\/posts\/|\/drafts\//;
    return collection
      .getAllSorted()
      .filter(item => item.inputPath.match(pathsRegex) !== null)
      .filter(item => item.data.permalink !== false)
      .filter(item => !(item.data.draft && isProduction));
  });

  // Collections: Links
  eleventyConfig.addCollection('links', function(collection) {
    return collection
      .getAllSorted()
      .filter(item => item.inputPath.match(/\/links\//) !== null)
      .filter(item => item.data.permalink !== false)
      .filter(item => !(item.data.draft && isProduction));
  });

  // Collections: Taglist
  eleventyConfig.addCollection('tagList', require('./_11ty/getTagList.js'));

  // Collections: Navigation
  eleventyConfig.addCollection('nav', function(collection) {
    return collection.getFilteredByTag('nav').sort(function(a, b) {
      return a.data.navOrder - b.data.navOrder;
    });
  });

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', require('./_11ty/minify-html.js'));

  // Eleventy Data Deep Merge
  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: 'data',
      includes: 'includes'
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
