// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const organizationInvitesCollection = require('../../../s-collections/organizationInvitesCollection')
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
				mongoose.isValidObjectId(req.body.user_id) &&
				mongoose.isValidObjectId(req.body.organization_id)
			) {
				// [VALIDATE] Organization owned //
				const oObj = await organizationsCollection.c_readByManagerAndOrganization({
					manager_id: req.manager_decoded.manager_id,
					organization_id: req.body.organization_id,
				})

				if (oObj.status && oObj.organization) {
					// [READ] Check if existant and prevent double creation //
					const found_organizationInvite = await organizationInvitesCollection.c_readByUserAndOrganization({
						user_id: req.body.user_id,
						organization_id: oObj.organization._id
					})

					if (!found_organizationInvite.organizationInvite) {
						// [CREATE] Organization //
						const organizationInvite = await organizationInvitesCollection.c_create({
							user_id: req.body.user_id,
							organization_id: oObj.organization._id
						})
						
						res.send(organizationInvite)
					}
					else {
						res.send({
							executed: true,
							status: false,
							location: '/api/manager/organization-invites/create',
							message: 'organizationInvite already exists',
						})
					}
				}
				else { res.send(oObj) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/organization-invites/create',
					message: '/api/manager/organization-invites/create: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/organization-invites/create',
				message: `/api/manager/organization-invites/create: Error --> ${err}`,
			})
		}
	}
)


module.exports = router