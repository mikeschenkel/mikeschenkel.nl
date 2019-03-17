module.exports = function(collection) {
  let tagSet = new Set();
  collection.getAll().forEach(function(item) {
    if ('tags' in item.data) {
      let tags = item.data.tags;

      tags = tags.filter(function(item) {
        switch (item) {
          // This list should match the `filter` list in `./src/tag.njk`
          case 'all':
          case 'nav':
          case 'post':
          case 'posts':
          case 'links':
            return false;
        }

        return true;
      });

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  return [...tagSet];
};
