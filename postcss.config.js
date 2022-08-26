module.exports = {
	plugins: [
		require('postcss-import-ext-glob'),
		require('postcss-import'),

		require('autoprefixer'),
		require('postcss-custom-media'),
		require('postcss-media-minmax'),
		require('postcss-nesting'),

		...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
	]
};
