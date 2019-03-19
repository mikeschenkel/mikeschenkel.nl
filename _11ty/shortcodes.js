module.exports = {
  /**
   * Wrap an emoji with accessible markup.
   * {@link https://tink.uk/accessible-emoji/}
   *
   * @example
   * {% emoji '🔥' %}
   * {% emoji '😀', 'Happy Face' %}
   *
   * @param {string} emoji
   * @param {string} ariaLabel
   */
  emoji: function(emoji, ariaLabel) {
    let ariaAttr = `aria-hidden="true"`;
    if (ariaLabel) {
      ariaAttr = `aria-label="${ariaLabel}"`;
    }

    return `<span role="img" ${ariaAttr}>${emoji}</span>`;
  }
};
