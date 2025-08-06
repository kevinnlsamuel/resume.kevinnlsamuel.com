const _tel = process.env['RESUME_TEL'] ?? '+91 00000 00000'
const _email = process.env['RESUME_EMAIL'] ?? 'haha@kevinnlsamuel.com'

const tel = {
	text: _tel,
	link: `tel:${_tel.replaceAll(' ','')}`,
	obfuscate: true,
}

const email = {
	text: _email,
	link: `mailto:${_email}`,
	obfuscate: true,
}
const website = {
    text: 'kevinnlsamuel.com',
    link: 'https://kevinnlsamuel.com',
}

export default { tel, email, website }
