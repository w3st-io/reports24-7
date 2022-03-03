// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const validator = require('validator')


// [REQUIRE] Personal //
const inspectionReportCollection = require('../../../../s-collections/inspectionReportCollection')
const Auth = require('../../../../s-middleware/Auth')


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

				const iRObj = await inspectionReportCollection.c_readAllSortedByOrganization({
					organization_id: req.params.organization_id,
					sort: sort,
					limit: limit,
					skip: skip,
				})

				res.send({
					executed: true,
					status: true,
					inspectionReports: iRObj.inspectionReports,
				})
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/pages/user/inspection-report/read-all: Invalid params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/user/inspection-report/read-all',
				message: `/pages/user/inspection-report/read-all: Error --> ${err}`,
			})
		}
	}
)


module.exports = router