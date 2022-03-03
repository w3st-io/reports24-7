const companyInfo = require('../companyInfo')

module.exports = {
	parallax: require('../../assets/images/pages/index/parallax.jpeg'),

	cnt1: {
		// Contact Us //
		r1: {
			c1: {
				title: `Welcome to ${companyInfo.companyName}!`,
				caption: 'Wanna get started? Great! Heres how..',
			},
		},

		r2: {
			cx: [
				'1. Create an Organization!',
				'2. Create a Client',
				'3. Generate a report',
			]
		},

		r3: {
			c1: {
				title: 'If you already have an account then go to the your dashboard'
			}
		}
	}
}