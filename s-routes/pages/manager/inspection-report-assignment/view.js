// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../../s-middleware/Auth')
const inspectionReportAssignmentsCollection = require('../../../../s-collections/inspectionReportAssignmentsCollection')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:organization_id/:sort/:limit/:page',
	Auth.managerToken(),
	async (req, res) => {
		try {
			const reportEvents = await inspectionReportAssignmentsCollection.c_readAllSortedByOrganization({
				organization_id: req.params.organization_id,
				sort: 0,
				limit: 5,
				skip: 0,
			})

			res.send({
				executed: true,
				status: true,
				reportEvents: reportEvents.clients,
				location: '/pages/manager/inspection-report-assignment',
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/manager/inspection-report-assignment',
				message: `/pages/manager/inspection-report-assignment: Error --> ${err}`
			})
		}
	},
)
	
	
module.exports = router