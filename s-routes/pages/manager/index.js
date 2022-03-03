// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../s-middleware/Auth')
const OrganizationModel = require('../../../s-models/OrganizationModel')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/',
	Auth.managerToken(),
	async (req, res) => {
		try {
			const organization = await OrganizationModel.findOne({
				manager: req.manager_decoded.manager_id
			})

			res.send({
				executed: true,
				status: true,
				organization: organization,
				message: 'Your Organization ID'
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/pages/manager: Error --> ${err}`
			})
		}
	},
)
	
	
module.exports = router