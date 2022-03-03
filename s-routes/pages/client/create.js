// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const geo = require('../../../s-defaults/geo')
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/',
	Auth.managerToken(),
	async (req, res) => {
		try {
			res.send({
				executed: true,
				status: true,
				location: '/pages/client/create',
				geo: geo,
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/client/create',
				message: `/pages/client/create: Error --> ${err}`
			})
		}
	},
)
	
	
module.exports = router