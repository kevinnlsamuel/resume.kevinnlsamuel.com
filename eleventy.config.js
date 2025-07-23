import { load as parseYaml } from 'js-yaml';
import { readFileSync as read } from 'fs';

const langs = parseYaml(read(process.cwd() + '/_data/site.yml')).langs

export default function(eleventyConfig) {
	eleventyConfig.addBundle("autoredirect");
	eleventyConfig.addBundle("contentid");
	eleventyConfig.setServerOptions({
		watch: ["_site/style.css"]
	});
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({
		"./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2": "assets/fa6-free.solid.woff2"})
	eleventyConfig.addPassthroughCopy({
		"./node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2": "assets/fa6-free.brands.woff2"})
	if (process.env['NODE_ENV'] === 'production'){
		eleventyConfig.addGlobalData("production", true);
		eleventyConfig.ignores.add("dev/");
	} else {
		eleventyConfig.addGlobalData("production", false);
		eleventyConfig.addPassthroughCopy("./dev/dev.css");
	}
	eleventyConfig.addDataExtension("yml,yaml", (data) => {
		return parseYaml(data);
	})
	eleventyConfig.addLiquidFilter("fmtDate", function(date, lang){
		return new Intl.DateTimeFormat(lang, {
			month: "long",
			year: "numeric",
		}).format(date)
	})
	eleventyConfig.addLiquidFilter("machineDate", function(date){
		const m = date.getMonth().toString().padStart(2, "0")
		const y = date.getFullYear().toString()
		return `${y}-${m}`
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
