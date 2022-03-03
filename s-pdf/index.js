const pdf = require('html-pdf')

// [INIT] //
const defaultOptions = {
	format: 'A4',
	orientation: 'portrait',
	width: '400px',
	dpi: 100,
	quality: 100,
	border: {
		left: '1cm',
		right: '1cm',
		top: '1cm',
		bottom: '1cm',
	},
	header: { height: '10mm' },
	footer: { height: '10mm' }
}

module.exports = {
	createBufferFromHTML: async function (pdfHTML, options = defaultOptions) {
		return new Promise((resolve, reject) => {
			pdf.create(pdfHTML, options).toBuffer(function (err, buffer) {
				if (err) { reject(err) }

				resolve(buffer)
			})
		})
	},


	formatPhoneNumber: function (phoneNumberString) {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3]
		}
	
		return null
	}
}