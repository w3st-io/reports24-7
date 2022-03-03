// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../../s-middleware/Auth')
const inspectionReportQuestions = require('../../../../s-defaults/inspection-report-questions')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/',
	Auth.userToken(),
	async (req, res) => {
		try {
			res.send({
				executed: true,
				status: true,
				inspectionReportQuestions: inspectionReportQuestions,
			})
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