// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] Personal //
const clientsCollection = require('../../../s-collections/clientsCollection')
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
				mongoose.isValidObjectId(req.body.organization_id) &&
				(validator.isAscii(req.body.name) || req.body.name == '') &&
				(validator.isAscii(req.body.phone) || req.body.phone == '') &&
				(validator.isAscii(req.body.fax) || req.body.fax == '') &&
				(validator.isAscii(req.body.email) || req.body.email == '') &&
				(validator.isAscii(req.body.url) || req.body.url == '') &&
				(validator.isAscii(req.body.notes) || req.body.notes == '') &&
				(validator.isAscii(req.body.address.street) || req.body.address.street == '') &&
				(validator.isAscii(req.body.address.unit) || req.body.address.unit == '') &&
				(validator.isAscii(req.body.address.city) || req.body.address.city == '') &&
				(validator.isAscii(req.body.address.state) || req.body.address.state == '') &&
				(validator.isAscii(req.body.address.country) || req.body.address.country == '') &&
				(validator.isAscii(req.body.address.zip) || req.body.address.zip == '')
			) {
				// [VERIFY] Organization Owned //
				const oObj = await organizationsCollection.c_readByManagerAndOrganization({
					manager_id: req.manager_decoded.manager_id,
					organization_id: req.body.organization_id
				})

				if (oObj.status) {
					// [CREATE] Organization //
					const cObj = await clientsCollection.c_create({
						organization_id: req.body.organization_id,
						name: req.body.name,
						phone: req.body.phone,
						fax: req.body.fax,
						email: req.body.email,
						url: req.body.url,
						notes: req.body.notes,
						address: req.body.address,
						representative: req.body.representative,
					})
					
					res.send(cObj)
				}
				else { res.send(oObj) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/clients/create',
					message: '/api/manager/clients/create: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/clients/create',
				message: `/api/manager/clients/create: Error --> ${err}`,
			})
		}
	}
)


module.exports = router