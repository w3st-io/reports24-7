// [REQUIRE] //
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] //
const ClientModel = require('../s-models/ClientModel')


module.exports = {
	/******************* [CRUD] *******************/
	// [CREATE] //
	c_create: async ({ organization_id, name, phone, fax, email, url, notes, address, representative }) => {
		try {
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid organization_id',
				}
			}

			// [VALIDATE] name //
			if (!validator.isAscii(name)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid title',
				}
			}

			// [VALIDATE] phone //
			if (phone) {
				if (!validator.isAscii(phone)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid phone',
					}
				}
			}

			// [VALIDATE] fax //
			if (fax) {
				if (!validator.isAscii(fax)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid fax',
					}
				}
			}

			// [VALIDATE] email //
			if (email) {
				if (!validator.isAscii(email)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid email',
					}
				}
			}

			// [VALIDATE] url //
			if (url) {
				if (!validator.isURL(url)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid url',
					}
				}
			}

			// [VALIDATE] notes //
			if (notes) {
				if (!validator.isAscii(notes)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid notes',
					}
				}
			}

			// [VALIDATE] address.street //
			if (address.street) {
				if (!validator.isAscii(address.street)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid address street',
					}
				}
			}

			// [VALIDATE] address.unit //
			if (address.unit) {
				if (!validator.isAscii(address.unit)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid address unit',
					}
				}
			}

			// [VALIDATE] address.city //
			if (address.city) {
				if (!validator.isAscii(address.city)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid address city',
					}
				}
			}

			// [VALIDATE] address.state //
			if (address.state) {
				if (!validator.isAscii(address.state)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid address state',
					}
				}
			}

			// [VALIDATE] address.zip //
			if (address.zip) {
				if (!validator.isAscii(address.zip)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid address zip',
					}
				}
			}

			// [VALIDATE] address.country //
			if (address.country) {
				if (!validator.isAscii(address.country)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid address country',
					}
				}
			}

			// [VALIDATE] representative.first_name //
			if (representative.first_name) {
				if (!validator.isAscii(representative.first_name)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid representative first_name',
					}
				}
			}

			// [VALIDATE] representative.last_name //
			if (representative.last_name) {
				if (!validator.isAscii(representative.first_name)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid representative last_name',
					}
				}
			}

			// [VALIDATE] representative.email //
			if (representative.email) {
				if (!validator.isAscii(representative.email)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid representative email',
					}
				}
			}

			// [VALIDATE] representative.email2 //
			if (representative.email2) {
				if (!validator.isAscii(representative.email2)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid representative email2',
					}
				}
			}

			// [VALIDATE] representative.cell_phone //
			if (representative.cell_phone) {
				if (!validator.isAscii(representative.cell_phone)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid representative cell_phone',
					}
				}
			}

			// [VALIDATE] representative.alt_phone //
			if (representative.alt_phone) {
				if (!validator.isAscii(representative.alt_phone)) {
					return {
						executed: true,
						status: false,
						message: 'clientsCollection: Invalid representative alt_phone',
					}
				}
			}

			// [SAVE] //
			const createdClient = await new ClientModel({
				_id: mongoose.Types.ObjectId(),
				organization: organization_id,
				name: name,
				email: email,
				phone: phone,
				fax: fax,
				url: url,
				notes: '',
				address: address,
				representative: representative,

			}).save()

			return {
				executed: true,
				status: true,
				createdClient: createdClient,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `clientsCollection: Error --> ${err}`,
			}
		}
	},


	// [READ] _id //
	c_read: async ({ client_id }) => {
		try {
			// [VALIDATE] client_id //
			if (!mongoose.isValidObjectId(client_id)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid client_id',
				}
			}

			let client = await ClientModel.findById(client_id)
				.populate({ path: 'organization', })
				.exec()

			// No Client Found //	
			if (!client) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: No client found'
				}
			}
			
			return {
				executed: true,
				status: true,
				client: client
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `clientsCollection: Error --> ${err}`
			}
		}
	},


	/******************* [OTHER-CRUD] *******************/
	// [READ] _id & organization //
	c_readByIdAndOrganization: async ({ client_id, organization_id }) => {
		try {
			// [VALIDATE] client_id //
			if (!mongoose.isValidObjectId(client_id)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid client_id',
				}
			}

			const client = await ClientModel.findOne({
				_id: client_id,
				organization: organization_id,
			})
				.populate({ path: 'organization', })
				.exec()

			// No Client Found //	
			if (!client) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: No client found'
				}
			}
			
			return {
				executed: true,
				status: true,
				client: client
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `clientsCollection: Error --> ${err}`
			}
		}
	},


	// [READ-ALL-ALL] organization //
	c_readAllAllSortedByOrganization: async ({ organization_id }) => {
		try {
			// [VALIDATE] organization_id //
			if (!mongoose.isValidObjectId(organization_id)) {
				return {
					executed: true,
					status: false,
					message: 'clientsCollection: Invalid organization_id',
				}
			}
	
			const clients = await ClientModel.find({ organization: organization_id })
				.populate({ path: 'organization', })
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
				message: `clientsCollection: Error --> ${err}`,
			}
		}
	},


	// [READ-ALL-SORT] organization //
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
					message: 'clientsCollection: Invalid organization_id',
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
	
			const clients = await ClientModel.find({ organization: organization_id })
				.sort(sort)
				.limit(limit)
				.skip(skip)
				.populate({ path: 'organization', })
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
				message: `clientsCollection: Error --> ${err}`,
			}
		}
	},

	c_countByOrganization: async () => {
		return {
			count: 0
		}
	},
}