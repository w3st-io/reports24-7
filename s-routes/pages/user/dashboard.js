// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const validator = require('validator')


// [REQUIRE] Personal //
const inspectionReportAssignmentsCollection = require('../../../s-collections/inspectionReportAssignmentsCollection')
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:organization_id/:sort/:limit/:page',
	Auth.userToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				validator.isAscii(req.params.organization_id) &&
				Number.isInteger(parseInt(req.params.sort)) &&
				Number.isInteger(parseInt(req.params.limit)) &&
				Number.isInteger(parseInt(req.params.page))
			) {
				// [INIT] //
				const sort = parseInt(req.params.sort)
				const limit = parseInt(req.params.limit)
				const pageIndex = parseInt(req.params.page) - 1
				const skip = pageIndex * limit

				const iREObj = await inspectionReportAssignmentsCollection.c_readAllSortedByUserAndOrganization({
					user_id: req.user_decoded.user_id,
					organization_id: req.params.organization_id,
					sort: sort,
					limit: limit,
					skip: skip,
				})

				if (iREObj.status) {
					// [COUNT] Comments //
					const totalInspectionReportAssignments = (
						await inspectionReportAssignmentsCollection.c_countByUserAndOrganization({
							user_id: req.user_decoded.user_id,
							organization_id: req.params.organization_id
						})
					).count

					// [COUNT] Calculate Total Pages //
					const totalPages = Math.ceil(totalInspectionReportAssignments / limit)

					res.send({
						executed: true,
						status: true,
						totalInspectionReportAssignments: totalInspectionReportAssignments,
						totalPages: totalPages,
						inspectionReportAssignments: iREObj.inspectionReportAssignments,
					})
				}
				else { res.send(iREObj) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/pages/user/dashboard',
					message: '/pages/user/dashboard: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/user/dashboard',
				message: `/pages/user/dashboard: Error --> ${err}`,
			})
		}
	}
)


module.exports = router