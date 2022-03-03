// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../../s-middleware/Auth')
const clientsCollection = require('../../../../s-collections/clientsCollection')
const organizationInvitesCollection = require('../../../../s-collections/organizationInvitesCollection')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:organization_id/:pre_client_id/:pre_user_id',
	Auth.managerToken(),
	async (req, res) => {
		try {
			// [READ-ALL] organizationInvites | organization_id //
			const organizationInvites = await organizationInvitesCollection.c_readAllByOrganizationAndResponseAccepted({
				organization_id: req.params.organization_id
			})

			const clients = await clientsCollection.c_readAllAllSortedByOrganization({
				organization_id: req.params.organization_id
			})

			res.send({
				executed: true,
				status: true,
				location: '/pages/manager/inspection-report-assignment/create',
				clients: clients.clients,
				organizationInvites: organizationInvites.organizationInvites,
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/manager/inspection-report-assignment/create',
				message: `/pages/manager/inspection-report-assignment/create: Error --> ${err}`
			})
		}
	},
)
	
	
module.exports = router