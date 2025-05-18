import { load as parseYaml } from 'js-yaml'; 
export default function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addDataExtension("yml,yaml", (data) => {
		return parseYaml(data);
	})
};
