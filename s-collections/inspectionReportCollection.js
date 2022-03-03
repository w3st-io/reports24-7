// [REQUIRE] //
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const InspectionReportModel = require('../s-models/InspectionReportModel')


module.exports = {
	/******************* [CRUD] *******************/
	// [CREATE] //
	c_create: async ({
		inspectionReportAssignment_id,
		organization_id,
		user_id,
		client_id,
		general,
		general_image1_filename,
		pipe,
		fdc,
		heads,
		wetpipe,
		drypipe,
		tanks,
		foam,
		standpipe,
		pump,
		pump_image1_filename,
		pump_image2_filename,
		pump_image3_filename,
		pump_flowTest,
		pump_flowTestTable,
		pump_electricDrivenTable,
		pump_whilePumpIsRunning,
		pump_checkList,
		extinguisher,
	}) => {
		try {
			// [SAVE] //
			const inspectionReport = await new InspectionReportModel({
				_id: mongoose.Types.ObjectId(),
				inspectionReportAssignment: inspectionReportAssignment_id,
				organization: organization_id,
				user: user_id,
				client: client_id,
				general: general,
				general_image1_filename: general_image1_filename,
				pipe: pipe,
				fdc: fdc,
				heads: heads,
				wetpipe: wetpipe,
				drypipe: drypipe,
				tanks: tanks,
				foam: foam,
				standpipe: standpipe,
				pump: pump,
				pump_image1_filename: pump_image1_filename,
				pump_image2_filename: pump_image2_filename,
				pump_image3_filename: pump_image3_filename,
				pump_flowTest: pump_flowTest,
				pump_flowTestTable: pump_flowTestTable,
				pump_electricDrivenTable: pump_electricDrivenTable,
				pump_whilePumpIsRunning: pump_whilePumpIsRunning,
				pump_checkList: pump_checkList,
				extinguisher: extinguisher,
			}).save()
	
			return {
				executed: true,
				status: true,
				message: 'Created inspection Report',
				inspectionReport: inspectionReport
			}
		}
		catch (err) {
			console.log(err);
			return {
				executed: false,
				status: false,
				message: `inspectionReportCollection: Error --> ${err}`,
			}
		}
	},


	c_read: async ({ inspectionReport_id }) => {
		try {
			// [READ] //
			const inspectionReport = await InspectionReportModel.findOne({
				_id: inspectionReport_id
			})
				.populate({ path: 'inspectionReportAssignment', })
				.populate({ path: 'client', })
				.exec()

			return ({
				executed: true,
				status: true,
				inspectionReport: inspectionReport
			})
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportCollection: Error --> ${err}`,
			}
		}
	},


	/******************* [OTHER-CRUD] *******************/
	c_readByIdAndUser: async ({ inspectionReport_id, user_id }) => {
		try {
			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Invalid user_id',
				}
			}

			// [VALIDATE] inspectionReport_id //
			if (!mongoose.isValidObjectId(inspectionReport_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Invalid inspectionReport_id',
				}
			}

			// [READ] //
			const inspectionReport = await InspectionReportModel.findOne({
				_id: inspectionReport_id,
				user: user_id, 
			})
				.populate({ path: 'user', select: 'email username bio profile_img', })
				.populate({ path: 'client', })
				.populate({ path: 'organization', })
				.populate({ path: 'inspectionReportAssignment', })
				.exec()

			return({
				executed: true,
				status: true,
				inspectionReport: inspectionReport
			})

		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportCollection: Error --> ${err}`,
			}
		}
	},

	c_readAllSortedByOrganization: async ({ organization_id, sort = 0, limit, skip }) => {
		try {
			// [SANITIZE] //
			sort = parseInt(sort)
			limit = parseInt(limit)
			skip = parseInt(skip)
			
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Invalid organization_id',
				}
			}

			// [VALIDATE] sort //
			if (!Number.isInteger(sort)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Invalid sort',
				}
			}

			// [VALIDATE] limit //
			if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Invalid limit',
				}
			}

			// [VALIDATE] skip //
			if (!Number.isInteger(skip)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Invalid skip',
				}
			}

			// Set Sort //
			if (sort == 0) { sort = {} }
			else if (sort == 1) { sort = { created_at: -1 } }
			else {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportCollection: Unknown filter'
				}
			}

			// [READ-ALL] //
			const inspectionReports = await InspectionReportModel.find({
				organization: organization_id
			})
				.sort(sort)
				.limit(limit)
				.skip(skip)
				.populate({
					path: 'user',
					select: 'username bio profile_img',
				})
				.populate({ path: 'client', })
				.populate({
					path: 'inspectionReportAssignment',
					select: 'due_date',
				})
				.exec()

			return {
				executed: true,
				status: true,
				inspectionReports: inspectionReports,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportCollection: Error --> ${err}`,
			}
		}
	}
}