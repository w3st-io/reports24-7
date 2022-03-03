// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const Auth = require('../../../../s-middleware/Auth')
const clientsCollection = require('../../../../s-collections/clientsCollection')
const organizationsCollection = require('../../../../s-collections/organizationsCollection')
const organizationInvitesCollection = require('../../../../s-collections/organizationInvitesCollection')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:organization_id/:sort/:limit/:page',
	Auth.managerToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				mongoose.isValidObjectId(req.params.organization_id) &&
				Number.isInteger(parseInt(req.params.sort)) &&
				Number.isInteger(parseInt(req.params.limit)) &&
				Number.isInteger(parseInt(req.params.page))
			) {
				// [INIT] //
				const sort = parseInt(req.params.sort)
				const limit = parseInt(req.params.limit)
				const pageIndex = parseInt(req.params.page) - 1
				const skip = pageIndex * limit

				// [READ] organization //
				const oObj = await organizationsCollection.c_readByManagerAndOrganization({
					manager_id: req.manager_decoded.manager_id,
					organization_id: req.params.organization_id
				})

				if (oObj.status) {
					// [READ-ALL] organizationInvites | organization_id //
					const oIObj = await organizationInvitesCollection.c_readAllByOrganizationAndResponseAccepted({
						organization_id: req.params.organization_id,
					})

					if (oIObj.status) {
						// [READ-ALL] clients //
						const cObj = await clientsCollection.c_readAllSortedByOrganization({
							organization_id: req.params.organization_id,
							sort: sort,
							limit: limit,
							skip: skip,
						})

						let { count } = await clientsCollection.c_countByOrganization(
							req.params.query,
						)

						const totalPages = Math.ceil(count / limit)
	
						if (cObj.status) {
							res.send({
								executed: true,
								status: true,
								totalPages: totalPages,
								organization: oObj.organization,
								organizationInvites: oIObj.organizationInvites,
								clients: cObj.clients,
								totalPages: '',
							})
						}
						else { res.send(cObj) }
					}
					else { res.send(oIObj) }
				}
				else {
					res.send({
						executed: true,
						status: false,
						message: oObj.message
					})
				}
			}
			else {
				res.send({
					executed: false,
					status: false,
					location: '/pages/manager/organization/view',
					message: '/pages/manager/organization/view: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/manager/organization/view',
				message: `/pages/manager/organization/view: Error --> ${err}`,
			})
		}
	},
)
	
	
module.exports = router