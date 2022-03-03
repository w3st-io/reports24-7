// [REQUIRE] //
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] Personal //
const InspectionReportAssignmentModel = require('../s-models/InspectionReportAssignmentModel')


module.exports = {
	/******************* [CRUD] *******************/
	// [CREATE] //
	c_create: async ({ organization_id, user_id, client_id, due_date }) => {
		try {
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid organization_id',
					updated: false,
				}
			}

			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid user_id',
					updated: false,
				}
			}
	
			// [VALIDATE] client_id //
			if (!mongoose.isValidObjectId(client_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid client_id',
					updated: false,
				}
			}

			// [VALIDATE] due_date //
			if (!due_date instanceof Date) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid due_date',
					updated: false,
				}
			}
	
			// [SAVE] //
			const createdReportEvent = await new InspectionReportAssignmentModel({
				_id: mongoose.Types.ObjectId(),
				organization: organization_id,
				user: user_id,
				client: client_id,
				due_date: due_date,
			}).save()
	
			return {
				executed: true,
				status: true,
				createdReportEvent: createdReportEvent,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportAssignmentsCollection: Error --> ${err}`,
			}
		}
	},


	/******************* [OTHER-CRUD] *******************/
	c_readByIdAndUser: async ({ inspectionReportAssignment_id, user_id }) => {
		try {
			// [VALIDATE] inspectionReportAssignment_id //
			if (!mongoose.isValidObjectId(inspectionReportAssignment_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid inspectionReportAssignment_id',
				}
			}

			const inspectionReportAssignment = await InspectionReportAssignmentModel.findOne({
				_id: inspectionReportAssignment_id,
				user: user_id
			})
				.exec()

			return {
				executed: true,
				status: true,
				inspectionReportAssignment: inspectionReportAssignment
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportAssignmentsCollection: Error --> ${err}`,
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
					message: 'inspectionReportAssignmentsCollection: Invalid organization_id',
				}
			}
	
			// [VALIDATE] sort //
			if (!Number.isInteger(sort)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid sort',
				}
			}
	
			// [VALIDATE] limit //
			if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid limit',
				}
			}
	
			// [VALIDATE] skip //
			if (!Number.isInteger(skip)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid skip',
				}
			}

			// Set Sort //
			if (sort == 0) { sort = {} }
			else if (sort == 1) { sort = { created_at: -1 } }
			else if (sort == 2) { sort = { likeCount: -1 } }
			else {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Unknown filter'
				}
			}

			const clients = await InspectionReportAssignmentModel.find({
				organization: organization_id
			})
				.sort(sort)
				.limit(limit)
				.skip(skip)
				.populate({ path: 'organization', })
				.populate({ path: 'user', })
				.populate({ path: 'client', })
				.exec()
	
			return {
				executed: true,
				status: true,
				clients: clients,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportAssignmentsCollection: Error --> ${err}`,
			}
		}
	},


	c_readAllSortedByUserAndOrganization: async ({ user_id, organization_id, sort = 0, limit, skip }) => {
		try {
			// [SANITIZE] //
			sort = parseInt(sort)
			limit = parseInt(limit)
			skip = parseInt(skip)

			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid user_id',
				}
			}

			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid organization_id',
				}
			}
	
			// [VALIDATE] sort //
			if (!Number.isInteger(sort)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid sort',
				}
			}
	
			// [VALIDATE] limit //
			if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid limit',
				}
			}
	
			// [VALIDATE] skip //
			if (!Number.isInteger(skip)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid skip',
				}
			}

			// Set Sort //
			if (sort == 0) { sort = {} }
			else if (sort == 1) { sort = { created_at: -1 } }
			else if (sort == 2) { sort = { likeCount: -1 } }
			else {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Unknown filter'
				}
			}

			const inspectionReportAssignments = await InspectionReportAssignmentModel.find({
				user: user_id,
				organization: organization_id,
			})
				.sort(sort)
				.limit(limit)
				.skip(skip)
				.populate({ path: 'organization', })
				.populate({ path: 'user', })
				.populate({ path: 'client', })
				.exec()
	
			return {
				executed: true,
				status: true,
				inspectionReportAssignments: inspectionReportAssignments,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportAssignmentsCollection: Error --> ${err}`,
			}
		}
	},


	/******************* [COUNT] *******************/
	c_countByUserAndOrganization: async ({ user_id, organization_id }) => {
		try {
			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid user_id'
				}
			}

			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'inspectionReportAssignmentsCollection: Invalid organization_id'
				}
			}
	
			const count = await InspectionReportAssignmentModel.countDocuments({
				user: user_id,
				organization: organization_id
			})
	
			return {
				executed: true,
				status: true,
				count: count
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `inspectionReportAssignmentsCollection: Error --> ${err}`
			}
		}
	}
}
