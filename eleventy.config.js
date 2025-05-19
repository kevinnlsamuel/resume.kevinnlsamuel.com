import { load as parseYaml } from 'js-yaml';
import { readFileSync as read } from 'fs';

const langs = parseYaml(read(process.cwd() + '/_data/langs.yml'))

export default function(eleventyConfig) {
	eleventyConfig.addBundle("autoredirect");
	eleventyConfig.setServerOptions({
		watch: ["_site/style.css"]
	});
	eleventyConfig.addDataExtension("yml,yaml", (data) => {
		return parseYaml(data);
	})

	for (const lang in langs) {
		eleventyConfig.addTemplate(
			`${lang}.liquid`, '',
			{ layout: 'resume.liquid', lang }
		)
	}
};
