module.exports = function(eleventyConfig) {
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
