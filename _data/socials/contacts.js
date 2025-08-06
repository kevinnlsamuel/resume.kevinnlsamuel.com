let _tel = '+91 00000 00000'
let _email = 'haha@kevinnlsamuel.com'

if (process.env['NODE_ENV'] === 'production') {
	_tel = process.env['RESUME_TEL'] ?? _tel
	_email = process.env['RESUME_EMAIL'] ?? _email
}

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
