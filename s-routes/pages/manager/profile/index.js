// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const managersCollection = require('../../../../s-collections/managersCollection')
const Auth = require('../../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [READ] Auth Required - user_decoded //
router.get(
	'/',
	Auth.managerTokenByPassVerification(),
	async (req, res) => {
		try {
			const managerObj = await managersCollection.c_readSelect({
				manager_id: req.manager_decoded.manager_id
			})
			
			if (managerObj.status) {
				res.send({
					executed: true,
					status: true,
					manager: managerObj.manager,
				})
			}
			else { res.send(managerObj) }
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/pages/manager/profile: Error --> ${err}`
			})
		}
	}
)


module.exports = router