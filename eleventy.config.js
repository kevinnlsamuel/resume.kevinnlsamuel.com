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
		const _tel = process.env['RESUME_TEL'] ?? '+91 00000 00000'
		const tel = {
			text: _tel,
			link: `tel:${_tel.replaceAll(' ','')}`,
			obfuscate: true,
		}
		const _email = process.env['RESUME_EMAIL'] ?? 'haha@kevinnlsamuel.com'
		const email = {
			text: _email,
			link: `mailto:${_email}`,
			obfuscate: true,
		}
		eleventyConfig.addGlobalData("socials.contacts.tel", tel)
		eleventyConfig.addGlobalData("socials.contacts.email", email)
	} else {
		eleventyConfig.addGlobalData("production", false);
		eleventyConfig.addPassthroughCopy("./dev/dev.css");
	}
	eleventyConfig.addDataExtension("yml,yaml", (data) => {
		return parseYaml(data);
	})
	eleventyConfig.addLiquidFilter("fmtDate", function(date, lang){
		const fmt = {
			month: "long",
			year: "numeric",
		}
		if (!(date instanceof Date)) {
			date = new Date(date.toString())
			delete(fmt.month)
		}
		return new Intl.DateTimeFormat(lang, fmt).format(date)
	})
	eleventyConfig.addFilter("machineDate", function(date){
		if (!(date instanceof Date)) {
			return date
		}
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
