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
	'/view/:inspectionreport_id',
	//Auth.userToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (validator.isAscii(req.params.inspectionreport_id)) {
				const iRObj = await inspectionReportCollection.c_read({
					inspectionReport_id: req.params.inspectionreport_id
				})
				
				res.send({
					executed: true,
					status: true,
					inspectionReport: iRObj.inspectionReport
				})
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/pages/user/inspection-report/read: Invalid params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/user/inspection-report/read',
				message: `/pages/user/inspection-report/read: Error --> ${err}`,
			})
		}
	}
)


module.exports = router