// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/',
	async (req, res) => {
		try {
			res.send({
				executed: true,
				status: true,
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/user/dashboard',
				message: `/pages/user/dashboard: Error --> ${err}`,
			})
		}
	}
)


module.exports = router