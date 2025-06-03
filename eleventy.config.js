import { load as parseYaml } from 'js-yaml';
import { readFileSync as read } from 'fs';

const langs = parseYaml(read(process.cwd() + '/_data/langs.yml'))

export default function(eleventyConfig) {
	eleventyConfig.addBundle("autoredirect");
	eleventyConfig.addBundle("contentid");
	eleventyConfig.setServerOptions({
		watch: ["_site/style.css"]
	});
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({
		"./node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2": "/assets/fa6-free.brands.woff2"})
	if (process.env['NODE_ENV'] === 'production'){
		eleventyConfig.addGlobalData("production", true);
	} else {
		eleventyConfig.addGlobalData("production", false);
		eleventyConfig.addPassthroughCopy("dev.css");
	}
	eleventyConfig.addDataExtension("yml,yaml", (data) => {
		return parseYaml(data);
	})

	for (const lang in langs) {
		eleventyConfig.addTemplate(
			`${lang}.liquid`, null, {
				layout: 'resume.liquid',
				lang,
			}
		)
	}
};
