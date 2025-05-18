import { load as parseYaml } from 'js-yaml';
import { readFileSync as read } from 'fs';

const site = parseYaml(read(process.cwd() + '/_data/site.yml'))

export default function(eleventyConfig) {
	eleventyConfig.addBundle("autoredirect");
	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addDataExtension("yml,yaml", (data) => {
		return parseYaml(data);
	})

	for (const lang of site.langs) {
		eleventyConfig.addTemplate(
			`${lang}.liquid`, '',
			{ layout: 'resume.liquid', lang }
		)
	}
};
