// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] Personal //
const organizationInvitesCollection = require('../../../s-collections/organizationInvitesCollection')
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


/******************* [OTHER-CRUD] *******************/
// [CREATE] Auth Required //
router.get(
	'/read-notifications',
	Auth.userToken(),
	async (req, res) => {
		try {
			const oIObj = await organizationInvitesCollection.c_readNotifications({
				user_id: req.user_decoded.user_id
			})

			res.send({
				executed: true,
				status: true,
				organizationInvites: oIObj.organizationInvites
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/organization-invite/read-all',
				message: `/api/manager/organization-invite/read-all: Error --> ${err}`,
			})
		}
	}
)


// Respond Invite //
router.post(
	'/respond',
	Auth.userToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				mongoose.isValidObjectId(req.body.organizationInvite_id) &&
				validator.isAscii(req.body.response)
			) {
				// [READ] organizationInvite - validate invite //
				const oIObj = await organizationInvitesCollection.c_read({
					user_id: req.user_decoded.user_id,
					organizationInvite_id: req.body.organizationInvite_id,
				})

				if (oIObj.organizationInvite) {
					// [VERIFY] organization has not already been responded too //
					if (oIObj.organizationInvite.response == null) {
						// [UPDATE] organizationInvite //
						const updatedOIObj = await organizationInvitesCollection.c_update({
							organizationInvite_id: req.body.organizationInvite_id,
							read: true,
							response: req.body.response,
						})
						
						res.send(updatedOIObj)
					}
					else {
						res.send({
							executed: true,
							status: false,
							message: 'You have already responded to this invite',
						})
					}
				}
				else {
					res.send({
						executed: true,
						status: false,
						message: 'You have no invite from this organization',
					})
				}
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/organization-invite/respond',
					message: 'Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/organization-memberships/create',
				message: `/api/manager/organization-memberships/create: Error --> ${err}`,
			})
		}
	}
)


module.exports = router