// [REQUIRE] //
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')


// [REQUIRE] Personal //
const ManagerModel = require('../s-models/ManagerModel')


/******************* [CRUD] *******************/
const c_read = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}
	
		const manager = await ManagerModel.findOne({ _id: manager_id })

		return {
			executed: true,
			status: true,
			manager: manager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


// [UPDATE] Profile Picture //
const c_update = async ({ manager_id, first_name, last_name, img_url, bio }) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}

		// [VALIDATE] first_name //
		if (!validator.isAscii(first_name)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid first_name'
			}
		}

		// [VALIDATE] last_name //
		if (!validator.isAscii(last_name)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid last_name'
			}
		}

		// [VALIDATE] img_url //
		if (!validator.isURL(img_url)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid URL (Must be URL)'
			}
		}

		// [VALIDATE] bio //
		if (bio.includes('<script') || bio.includes('</script>')) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: XSS not aloud',
			}
		}

		const updatedManager = await ManagerModel.findOneAndUpdate(
			{ _id: manager_id },
			{
				$set: {
					first_name: first_name,
					last_name: last_name,
					profile_img: img_url,
					bio: bio,
				}
			}
		)

		return {
			executed: true,
			status: true,
			message: 'Updated profile',
			updatedManager: updatedManager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


/******************* [OTHER-CRUD] *******************/
// [CREATE] manager (with password) //
const c_register = async ({ username, email, first_name, last_name, password }) => {
	try {
		// [VALIDATE] username //
		if (!validator.isAscii(username)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid username'
			}
		}

		// [VALIDATE] email //
		if (!validator.isEmail(email)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid email'
			}
		}

		// [VALIDATE] first_name //
		if (first_name) {
			if (!validator.isAscii(first_name)) {
				return {
					executed: true,
					status: false,
					message: 'managersCollection: Invalid first_name'
				}
			}
		}

		// [VALIDATE] last_name //
		if (last_name) {
			if (!validator.isAscii(last_name)) {
				return {
					executed: true,
					status: false,
					message: 'managersCollection: Invalid last_name'
				}
			}
		}

		// [VALIDATE] password //
		if (!validator.isAscii(password)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid password'
			}
		}

		// Username Check //
		if (await ManagerModel.findOne({ username })) {
			return {
				executed: true,
				status: true,
				message: 'That username is taken',
				created: false,
			}
		}

		// Email Check //
		if (await ManagerModel.findOne({ email })) {
			return {
				executed: true,
				status: true,
				message: 'That email is already registered',
				created: false,
			}
		}

		// Password Length //
		if (password.length < 8 || password.length > 50) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid password',
				created: false,
			}
		}

		// [ENCRYPT] Hash Password //
		const hashedPassword = await bcrypt.hash(password, 10)

		// [SAVE] //
		const manager = await new ManagerModel({
			_id: mongoose.Types.ObjectId(),
			username,
			email,
			first_name,
			last_name,
			password: hashedPassword,
		}).save()
		
		return {
			executed: true,
			status: true,
			message: 'Successfully created account',
			created: true,
			manager: manager,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`,
			created: false,
		}
	}
}


// [READ-ALL] Sorted (No password) //
const c_readSorted = async ({ sort = 0, limit, skip }) => {
	try {
		// [SANTIZE] //
		sort = parseInt(sort)
		limit = parseInt(limit)
		skip = parseInt(skip)

		// [VALIDATE] sort //
		if (!Number.isInteger(sort)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid sort',
			}
		}

		// [VALDIATE] limit //
		if (!Number.isInteger(limit) || limit >= 200 || limit <= -200) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid limit',
			}
		}

		// [VALIDATE] skip //
		if (!Number.isInteger(skip)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid skip',
			}
		}

		// Set Sort //
		if (sort == 0) { sort = {} }
		else if (sort == 1) { sort = { created_at: -1 } }
		else {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Unknown filter'
			}
		}


		const managers = await ManagerModel.find()
			.sort(sort)
			.limit(limit)
			.skip(skip)
			.select('-password')
			.exec()
		
		return {
			executed: true,
			status: true,
			managers: managers
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


// [READ-ALL] Sorted (No password) //
const c_readSelect = async ({ manager_id, select = undefined }) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}

		// [VALIDATE] manager_id //
		if (select != undefined) {
			if (!validator.isAscii(select)) {
				return {
					executed: true,
					status: false,
					message: 'managersCollection: Invalid select'
				}
			}
		}
	
		const manager = await ManagerModel.findOne({ _id: manager_id }).select(select)

		return {
			executed: true,
			status: true,
			manager: manager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


const c_readByEmail = async (email) => {
	try {
		// [VALIDATE] manager_id //
		if (!validator.isEmail(email)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid email'
			}
		}
	
		const manager = await ManagerModel.findOne({ email })

		return {
			executed: true,
			status: true,
			manager: manager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


const c_getIdByEmail = async (email) => {
	try {
		// [VALIDATE] Email //
		if (!validator.isEmail(email)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid email'
			}
		}

		const manager = await ManagerModel.findOne({ email })

		if (!manager) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: No manager found'
			}
		}

		return {
			executed: true,
			status: true,
			manager: manager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


const c_updatePassword = async (manager_id, password) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}
		
		// [VALIDATE] password //
		if (!validator.isAscii(password)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid password'
			}
		}

		// Password Length //
		if (password.length < 8 || password.length > 50) {
			return {
				executed: true,
				status: false,
				message: 'Invalid password (8 < password < 50)',
			}
		}
	
		// Hash Password //
		const hashedPassword = await bcrypt.hash(password, 10)
		
		// [UPDATE] Password for manager //
		const manager = await ManagerModel.findOneAndUpdate(
			{ _id: manager_id },
			{ $set: { password: hashedPassword } }
		)

		return {
			executed: true,
			status: true,
			message: 'managersCollection: Updated password',
			manager: manager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


/******************* [FUZZY-SEARCH] *******************/
const c_fuzzySearch = async (manager_id, query) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}
		
		// [VALIDATE] post_id //
		if (!validator.isAscii(query)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid query',
				existance: false,
			}
		}

		// [READ] //
		const managers = await ManagerModel.fuzzySearch({ query: query })
			.select('-password')
			.exec()

		return {
			executed: true,
			status: true,
			managers: managers,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`,
			existance: false,
		}
	}
}


const c_fuzzySearchCount = async (query) => {
	try {
		// [VALIDATE] post_id //
		if (!validator.isAscii(query)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid query',
				existance: false,
			}
		}
		
		// [COUNT] //
		const count = await ManagerModel.fuzzySearch({ query: query }).countDocuments()

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
			message: `managersCollection: Error --> ${err}`,
			existance: false,
		}
	}
}


/******************* [VERIFY] *******************/
const c_verify = async (manager_id) => {
	try {
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}

		const manager = await ManagerModel.findOneAndUpdate(
			{ _id: manager_id },
			{ $set: { verified: true } }
		)

		return {
			executed: true,
			status: true,
			message: 'managersCollection: Verified profile',
			manager: manager
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`
		}
	}
}


const c_verifiedStatus = async (manager_id) => {
	try {
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managersCollection: Invalid manager_id'
			}
		}

		const manager = await ManagerModel.findOne({
			_id: manager_id,
			verified: true,
		})

		if (manager) {
			return {
				executed: true,
				status: true,
				message: 'manager verified',
				manager: manager,
			}
		}
		else {
			return {
				executed: true,
				status: false,
				message: 'manager NOT verified',
				manager: manager,
			}
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managersCollection: Error --> ${err}`,
		}
	}
}


/******************* [COUNT] *******************/
const c_count = async () => {
	try {
		const count = await ManagerModel.countDocuments()

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
			message: `managersCollection: Error --> ${err}`
		}
	}
}


module.exports = {
	c_read,
	c_update,
	c_register,
	c_readSorted,
	c_readSelect,
	c_readByEmail,
	c_getIdByEmail,
	c_updatePassword,
	c_fuzzySearch,
	c_fuzzySearchCount,
	c_verify,
	c_verifiedStatus,
	c_count,
}