const JSONminify = require('jsonminify');
const { DateTime } = require('luxon');

const { isProduction } = require('../_gulp/_config.js');

module.exports = {
  /**
   * Format date to ISO.
   *
   * @param {String} date
   */
  isoDate: function(date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: true
    });
  },

  /**
   * Format date to something more readable on the front-end.
   *
   * @param {String} date
   */
  readableDate: function(date) {
    return DateTime.fromJSDate(date, { zone: 'Europe/Amsterdam' })
      .setLocale('nl')
      .toFormat('dd LLLL yyyy');
  },

  /**
   * Format date to a custom format.
   *
   * @param {String} date
   * @param {String} format
   */
  formatDate: function(date, format) {
    return DateTime.fromJSDate(date).toFormat(String(format));
  },

  /**
   * SlugDate
   *
   * @param {String} date
   */
  slugDate: function(date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy/MM');
  },

  /**
   * Minify JSON code.
   *
   * @param {String} code
   */
  jsonmin: function(code) {
    if (isProduction) {
      return JSONminify(code);
    } else {
      return code;
    }
  },

  /**
   * Obfuscate a string. Useful for email addresses.
   *
   * @param {String} str
   */
  obfuscate: function(str) {
    const chars = [];
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  },

  /**
   * currentPage
   *
   * @param {Object} allPages
   * @param {Object} currentPage
   */
  currentPage: function(allPages, currentPage) {
    const matches = allPages.filter(
      page => page.inputPath === currentPage.inputPath
    );
    if (matches && matches.length) {
      return matches[0];
    }
    return null;
  },

  /**
   * Generate an excerpt of the given string.
   *
   * @param {String} content
   */
  excerpt: function(content) {
    const excerptMinimumLength = 80;
    const excerptSeparator = '<!--more-->';
    const findExcerptEnd = content => {
      if (content === '') {
        return 0;
      }

      const paragraphEnd = content.indexOf('</p>', 0) + 4;
      if (paragraphEnd < excerptMinimumLength) {
        return (
          paragraphEnd +
          findExcerptEnd(content.substring(paragraphEnd), paragraphEnd)
        );
      }

      return paragraphEnd;
    };

    if (!content) {
      return;
    }

    if (content.includes(excerptSeparator)) {
      return content.substring(0, content.indexOf(excerptSeparator));
    } else if (content.length <= excerptMinimumLength) {
      return content;
    }

    const excerptEnd = findExcerptEnd(content);
    return content.substring(0, excerptEnd);
  },

  /**
   * Transform a filename into the correct path where the file will be located.
   *
   * @param {String} filename
   * @param {Object} page
   */
  media: function(filename, page) {
    const path = page.inputPath.split('/');
    if (path.length) {
      return `/media/${filename}`;
    }
    return filename;
  },

  /**
   * Remove duplicated words and remove less useful and common short words.
   *
   * @param {String} body
   */
  squash: function(body) {
    const content = new String(body);

    // Remove all HTML elements
    let re = /(<.+?>)/gi;
    let plain = content.replace(re, '');
    re = /(&.+?;)/gi;
    plain = plain.replace(re, '');

    // Remove duplicated words
    let words = plain.split(' ');
    let deduped = [...new Set(words)];
    let dedupedStr = deduped.join(' ');

    // Remove short and less meaningful words (English)
    let result = dedupedStr.replace(
      /\b(\.|,|a|all|am|an|and|as|at|be|but|do|for|has|I|if|in|is|it|me|my|no|not|of|off|on|or|so|the|to|up|was|we|you|)\b/gi,
      ''
    );
    // Remove short and less meaningful words (Dutch)
    result = dedupedStr.replace(
      /\b(\.|,|al|als|ben|bij|dat|de|die|dus|een|en|hebben|heeft|het|ik|in|is|ja|je|jij|maar|met|mijn|naar|nee|niet|of|op|over|te|van|voor|was|wij|worden|zijn)\b/gi,
      ''
    );
    // Remove newlines and punctuation
    result = result.replace(/\.|,|\?|-|—|\n/g, '');
    // Remove repeated spaces
    result = result.replace(/[ ]{2,}/g, ' ');

    return result;
  }
};
