// [REQUIRE] //
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const OrganizationInviteModel = require('../s-models/OrganizationInviteModel')


module.exports = {
	/******************* [CRUD] *******************/
	// [CREATE] //
	c_create: async ({ user_id, organization_id }) => {
		try {
			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid user_id',
				}
			}

			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid organization_id',
				}
			}

			// [SAVE] //
			const createdOrganizationInvite = await new OrganizationInviteModel({
				_id: mongoose.Types.ObjectId(),
				user: user_id,
				organization: organization_id,
			}).save()

			return {
				executed: true,
				status: true,
				createdOrganizationInvite: createdOrganizationInvite,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationInvitesCollection: Error --> ${err}`,
			}
		}
	},


	c_read: async ({ organizationInvite_id }) => {
		// [VALIDATE] organizationInvite_id //
		if (!mongoose.isValidObjectId(organizationInvite_id)) {
			return {
				executed: true,
				status: false,
				message: 'organizationInvitesCollection: Invalid organizationInvite_id',
			}
		}

		const organizationInvite = await OrganizationInviteModel.findOne({
			_id: organizationInvite_id
		})
			.populate({ path: 'organization' })

		return {
			executed: true,
			status: true,
			organizationInvite: organizationInvite,
		}
	},


	// [UPDATE] //
	c_update: async ({ organizationInvite_id, read, response }) => {
		try {
			// [VALIDATE] organizationInvite_id //
			if (!mongoose.isValidObjectId(organizationInvite_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid organizationInvite_id',
				}
			}

			// [VALIDATE] read //
			if (read != true && read != false) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid read',
				}
			}

			// [VALIDATE] response //
			if (response != 'accepted' && response != 'declined') {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid response',
				}
			}

			const updatedOrganizationInvite = await OrganizationInviteModel.findOneAndUpdate(
				{ _id: organizationInvite_id },
				{
					$set: {
						read: true,
						response: response,
					}
				}
			)

			return {
				executed: true,
				status: true,
				updatedOrganizationInvite: updatedOrganizationInvite,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationInvitesCollection: Error --> ${err}`,
			}
		}
	},
	

	/******************* [OTHER-CRUD] *******************/
	c_readNotifications: async ({ user_id }) => {
		try {
			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid user_id',
				}
			}

			const organizationInvites = await OrganizationInviteModel.find({
				user: user_id,
				read: false,
			})
				.sort({ created_at: -1 }) 
				.limit(5)
				.populate({ path: 'organization' })
				.exec()

			return {
				executed: true,
				status: true,
				organizationInvites: organizationInvites,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationInvitesCollection: Error --> ${err}`,
			}
		}
	},


	c_readByUserAndOrganization: async ({ user_id, organization_id }) => {
		try {
			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid user_id',
				}
			}

			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid organization_id',
				}
			}

			const organizationInvite = await OrganizationInviteModel.findOne({
				user: user_id,
				organization: organization_id,
			})
				.populate({ path: 'organization' })

			return {
				executed: true,
				status: true,
				organizationInvite: organizationInvite,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationInvitesCollection: Error --> ${err}`,
			}
		}
	},


	c_readAllSortedByUserAndAccepted: async ({ user_id, sort = 0, limit, skip }) => {
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
					message: 'organizationInvitesCollection: Invalid user_id',
				}
			}

			// [VALIDATE] sort //
			if (!Number.isInteger(sort)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid sort',
				}
			}
	
			// [VALIDATE] limit //
			if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid limit',
				}
			}
	
			// [VALIDATE] skip //
			if (!Number.isInteger(skip)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid skip',
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
					message: 'clientsCollection: Unknown filter'
				}
			}

			const organizationInvites = await OrganizationInviteModel.find({
				user: user_id,
				response: 'accepted',
			})
				.sort(sort)
				.limit(limit)
				.skip(skip)
				.populate({ path: 'organization' })
				.exec()

			return {
				executed: true,
				status: true,
				organizationInvites: organizationInvites,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationInvitesCollection: Error --> ${err}`,
			}
		}
	},


	c_readAllByOrganizationAndResponseAccepted: async ({ organization_id }) => {
		try {
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid organization_id',
				}
			}

			const organizationInvites = await OrganizationInviteModel.find({
				organization: organization_id,
				response: 'accepted',
			})
				.populate({ path: 'organization' })
				.populate({ path: 'user' })
				.exec()

			return {
				executed: true,
				status: true,
				organizationInvites: organizationInvites,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationInvitesCollection: Error --> ${err}`,
			}
		}
	},


	/******************* [COUNT] *******************/
	c_countByUser: async ({ user_id }) => {
		try {
			// [VALIDATE] user_id //
			if (!mongoose.isValidObjectId(user_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationInvitesCollection: Invalid user_id'
				}
			}
	
			const count = await OrganizationInviteModel.countDocuments({ user: user_id })
	
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
				message: `organizationInvitesCollection: Error --> ${err}`
			}
		}
	}
}