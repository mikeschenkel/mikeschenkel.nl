module.exports = {
  /**
   * Wrap an emoji with accessible markup.
   * https://tink.uk/accessible-emoji/
   *
   * @param {String} emoji
   */
  emoji: function(emoji) {
    return `<span aria-hidden="true" role="img">${emoji}</span>`;
  }
};
