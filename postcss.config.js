module.exports = {
	plugins: [
		require('postcss-import-ext-glob'),
		require('postcss-import'),
		require('postcss-lightningcss')({
			browsers: [
				"> 0.25%",
				"not IE 11"
			],
			lightningcssOptions: {
				minify: (process.env.NODE_ENV === "production" ? true : false),
				drafts: {
					customMedia: true,
					nesting: true,
				},
			},
		}),
	]
};
