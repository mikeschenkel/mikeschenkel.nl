const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
	// Plugins
	eleventyConfig.addPlugin(pluginRss);

	eleventyConfig.addWatchTarget("./src/css/");

	eleventyConfig.addPassthroughCopy("./src/fonts");
	eleventyConfig.addPassthroughCopy("./src/img");
	eleventyConfig.addPassthroughCopy({'./src/img/favicon/*': '/'});
	eleventyConfig.addPassthroughCopy('./src/manifest.webmanifest');

	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	return {
		dir: {
			input: "src",
			output: "public",
			layouts: "_layouts",
		},
	};
};
