// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const validator = require('validator')


// [REQUIRE] Personal //
const organizationsCollection = require('../../../s-collections/organizationsCollection')
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


/******************* [CRUD] *******************/
// [CREATE] Auth Required //
router.post(
	'/create',
	Auth.managerToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				(validator.isAscii(req.body.name) || req.body.name == '') &&
				(validator.isAscii(req.body.email) || req.body.name == '') &&
				(validator.isAscii(req.body.phone) || req.body.phone == '') &&
				(validator.isAscii(req.body.fax) || req.body.fax == '') &&
				(validator.isAscii(req.body.url) || req.body.url == '') &&
				(validator.isAscii(req.body.logo_url) || req.body.logo_url == '') &&
				(validator.isAscii(req.body.address.street) || req.body.address.street == '') &&
				(validator.isAscii(req.body.address.city) || req.body.address.city == '') &&
				(validator.isAscii(req.body.address.state) || req.body.address.state == '') &&
				(validator.isAscii(req.body.address.zip) || req.body.address.zip == '') &&
				(validator.isAscii(req.body.address.country) || req.body.address.country == '')
			) {
				// [CREATE] Organization //
				const organization = await organizationsCollection.c_create({
					manager_id: req.manager_decoded.manager_id,
					name: req.body.name,
					email: req.body.email,
					phone: req.body.phone,
					fax: req.body.fax,
					url: req.body.url,
					logo_url: req.body.logo_url,
					address: req.body.address,
				})
				
				res.send(organization)
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/organization/create',
					message: '/api/manager/organization/create: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/organization/create',
				message: `/api/manager/organization/create: Error --> ${err}`,
			})
		}
	}
)


module.exports = router