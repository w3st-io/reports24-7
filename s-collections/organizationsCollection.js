// [REQUIRE] //
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] Personal //
const OrganizationModel = require('../s-models/OrganizationModel')


module.exports = {
	/******************* [CRUD] *******************/
	// [CREATE] //
	c_create: async ({ manager_id, name, email, phone, fax, url, logo_url, address }) => {
		try {
			// [VALIDATE] manager_id //
			if (!mongoose.isValidObjectId(manager_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager_id',
				}
			}

			// [VALIDATE] name //
			if (!validator.isAscii(name)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid name',
				}
			}

			// [VALIDATE] phone //
			if (phone) {
				if (!validator.isAscii(phone)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid phone',
					}
				}
			}

			// [VALIDATE] fax //
			if (fax) {
				if (!validator.isAscii(fax)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid fax',
					}
				}
			}

			// [VALIDATE] email //
			if (email) {
				if (!validator.isAscii(email)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid email',
					}
				}
			}

			// [VALIDATE] url //
			if (url) {
				if (!validator.isURL(url)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid url',
					}
				}
			}

			// [VALIDATE] logo_url //
			if (logo_url) {
				if (!validator.isURL(logo_url)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid logo_url',
					}
				}
			}

			// [VALIDATE] address.street //
			if (address.street) {
				if (!validator.isAscii(address.street)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid address street',
					}
				}
			}

			// [VALIDATE] address.unit //
			if (address.unit) {
				if (!validator.isAscii(address.unit)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid address unit',
					}
				}
			}

			// [VALIDATE] address.city //
			if (address.city) {
				if (!validator.isAscii(address.city)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid address city',
					}
				}
			}

			// [VALIDATE] address.state //
			if (address.state) {
				if (!validator.isAscii(address.state)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid address state',
					}
				}
			}

			// [VALIDATE] address.zip //
			if (address.zip) {
				if (!validator.isAscii(address.zip)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid address zip',
					}
				}
			}

			// [VALIDATE] address.country //
			if (address.country) {
				if (!validator.isAscii(address.country)) {
					return {
						executed: true,
						status: false,
						message: 'organizationsCollection: Invalid address country',
					}
				}
			}

			// [SAVE] //
			const createdOrganization = await new OrganizationModel({
				_id: mongoose.Types.ObjectId(),
				manager: manager_id,
				name: name,
				email: email,
				phone: phone,
				fax: fax,
				url: url,
				logo_url: logo_url,
				address: address,

			}).save()

			return {
				executed: true,
				status: true,
				createdOrganization: createdOrganization,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
			}
		}
	},


	// [DELETE] //
	c_delete: async ({ organization_id }) => {
		try {
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid organization_id',
					deleted: false,
				}
			}
	
			const deletedOrganization = await OrganizationModel.findByIdAndDelete(
				organization_id
			)
			
			return {
				executed: true,
				status: true,
				deleted: true,
				deletedOrganization: deletedOrganization,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
				deleted: false,
			}
		}
	},


	/******************* [OTHER-CRUD] *******************/
	// [READ] manager & organization //
	c_readByManagerAndOrganization: async ({ manager_id, organization_id }) => {
		try {
			// [VALIDATE] manager_id //
			if (!mongoose.isValidObjectId(manager_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager_id',
				}
			}
	
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid organization_id',
				}
			}
	
			const organization = await OrganizationModel.findOne({
				_id: organization_id,
				manager: manager_id,
			})
				.populate({
					path: 'manager',
					select: 'username email bio profile_img',
				})
				.exec()
	
			// Check if organization found //	
			if (!organization) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: No organization found'
				}
			}
			
			return {
				executed: true,
				status: true,
				organization: organization
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`
			}
		}
	},


	// [READ-ALL-SORT] manager //
	c_readAllSortedByManager: async ({ manager, sort = 0, limit, skip }) => {
		try {
			// [SANITIZE] //
			sort = parseInt(sort)
			limit = parseInt(limit)
			skip = parseInt(skip)

			// [VALIDATE] manager //
			if (!mongoose.isValidObjectId(manager)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager',
				}
			}

			// [VALIDATE] sort //
			if (!Number.isInteger(sort)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid sort',
				}
			}

			// [VALIDATE] limit //
			if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid limit',
				}
			}

			// [VALIDATE] skip //
			if (!Number.isInteger(skip)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid skip',
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
					message: 'organizationsCollection: Unknown filter'
				}
			}

			const organizations = await OrganizationModel.find({ manager: manager })
				.sort(sort)
				.limit(limit)
				.skip(skip)
				.populate({ path: 'manager', select: 'username bio profile_img', })
				.exec()

			return {
				executed: true,
				status: true,
				organizations: organizations,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
			}
		}
	},


	// [DELETE] _id & manager //
	c_deleteByIdAndUser: async ({ organization_id, manager_id }) => {
		try {
			// [VALIDATE] manager_id //
			if (!mongoose.isValidObjectId(manager_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager_id',
				}
			}

			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid organization_id',
					deleted: false,
				}
			}

			const deletedOrganization = await OrganizationModel.deleteOne({
				_id: organization_id,
				manager: manager_id
			})
			
			return {
				executed: true,
				status: true,
				deleted: true,
				deletedOrganization: deletedOrganization,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
				deleted: false,
			}
		}
	},


	/******************* [FUZZY-SEARCH] *******************/
	c_fuzzySearch: async ({ manager_id, limit = 5, skip, query }) => {
		try {
			// [SANITIZE] //
			limit = parseInt(limit)
			skip = parseInt(skip)
	
			// [VALIDATE] manager_id //
			if (!mongoose.isValidObjectId(manager_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager_id',
				}
			}
	
			// [VALIDATE] limit //
			if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid limit',
				}
			}
			
			// [VALIDATE] query //
			if (!validator.isAscii(query)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid query',
					existance: false,
				}
			}
	
			// [READ] //
			const organizations = await OrganizationModel.fuzzySearch({ query })
				.populate({
					path: 'manager',
					select: 'username bio profile_img'
				})
				.limit(limit)
				.skip(skip)
				.exec()
	
			return {
				executed: true,
				status: true,
				organizations: organizations,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
				existance: false,
			}
		}
	},
	

	c_fuzzySearchCount: async ({ query }) => {
		try {
			// [COUNT] //
			const count = await OrganizationModel.fuzzySearch({ query })
				.countDocuments()
	
			return {
				executed: true,
				status: true,
				count: count,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
				existance: false,
			}
		}
	},


	/******************* [OWNERSHIP] *******************/
	c_ownership: async ({ organization_id, manager_id }) => {
		try {
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid organization_id',
					updated: false,
				}
			}
	
			// [VALIDATE] manager_id //
			if (!mongoose.isValidObjectId(manager_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager_id',
					updated: false,
				}
			}
	
			const organization = await OrganizationModel.findOne({
				_id: organization_id,
				manager: manager_id
			})
	
			if (!organization) {
				return {
					executed: true,
					status: true,
					ownership: false,
					organization: organization,
				}
			}
	
			return {
				executed: true,
				status: true,
				ownership: true,
				organization: organization,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `organizationsCollection: Error --> ${err}`,
			}
		}
	},


	/******************* [COUNT] *******************/
	c_count: async () => {
		try {
			const count = await OrganizationModel.countDocuments()
	
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
				message: `organizationsCollection: Error --> ${err}`,
			}
		}
	},


	c_countByUser: async ({ manager_id }) => {
		try {
			// [VALIDATE] manager_id //
			if (!mongoose.isValidObjectId(manager_id)) {
				return {
					executed: true,
					status: false,
					message: 'organizationsCollection: Invalid manager_id',
					updated: false,
				}
			}
	
			const count = await OrganizationModel.countDocuments({
				manager: manager_id
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
				message: `organizationsCollection: Error --> ${err}`,
			}
		}
	},
}