// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const organizationsCollection = require('../../../../s-collections/organizationsCollection')
const Auth = require('../../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:sort/:limit/:page',
	Auth.userToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				Number.isInteger(parseInt(req.params.sort)) &&
				Number.isInteger(parseInt(req.params.limit)) &&
				Number.isInteger(parseInt(req.params.page))
			) {
				// [INIT] //
				const sort = parseInt(req.params.sort)
				const limit = parseInt(req.params.limit)
				const pageIndex = parseInt(req.params.page) - 1
				const skip = pageIndex * limit
					
				res.send({
					executed: true,
					status: true,
					organizationsObj: [],
				})
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/pages/user/dashboard',
					message: '/pages/user/dashboard: Invalid Params',
				})
			}
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