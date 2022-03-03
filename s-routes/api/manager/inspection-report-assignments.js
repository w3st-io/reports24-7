// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] Personal //
const clientsCollection = require('../../../s-collections/clientsCollection')
const organizationsCollection = require('../../../s-collections/organizationsCollection')
const inspectionReportAssignmentsCollection = require('../../../s-collections/inspectionReportAssignmentsCollection')
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
				mongoose.isValidObjectId(req.body.client_id) &&
				mongoose.isValidObjectId(req.body.user_id) &&
				validator.isAscii(req.body.due_date)
			) {
				// [VERIFY] Organization Owned //
				const oObj = await organizationsCollection.c_readByManagerAndOrganization({
					manager_id: req.manager_decoded.manager_id,
					organization_id: req.body.organization_id
				})

				if (oObj.status) {
					// [VERIFY] Organization Owns Client //
					const cObj = await clientsCollection.c_readByIdAndOrganization({
						client_id: req.body.client_id,
						organization_id: req.body.organization_id,
					})
					
					if (cObj.client) {
						// [CREATE] reportEvent //
						const rEObj = await inspectionReportAssignmentsCollection.c_create({
							organization_id: req.body.organization_id,
							user_id: req.body.user_id,
							client_id: req.body.client_id,
							due_date: req.body.due_date,
						})
						
						res.send({
							executed: true,
							status: true,
							inspectionReportAssignment: rEObj.createdReportEvent,
							organization: oObj.organization,
							client: cObj.client
						})
					}
					else {
						res.send({
							executed: true,
							status: false,
							location: '/api/manager/inspection-report-assignments/create',
							message: 'No client found under this organization'
						})
					}
				}
				else { res.send(oObj) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/inspection-report-assignments/create',
					message: 'Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/inspection-report-assignments/create',
				message: `/api/manager/inspection-report-assignments/create: Error --> ${err}`,
			})
		}
	}
)


module.exports = router