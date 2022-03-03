// [REQUIRE] //
const mongoose = require('mongoose')
const uuid = require('uuid')


// [REQUIRE] Personal //
const ManagerPasswordRecoveryModel = require('../s-models/ManagerPasswordRecoveryModel')


/******************* [CRUD] *******************/
// [CREATE] //
const c_create = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'Invalid manager_id',
			}
		}

		// [SAVE] //
		const managerPasswordRecovery = await new ManagerPasswordRecoveryModel({
			_id: mongoose.Types.ObjectId(),
			manager: manager_id,
			verificationCode: uuid.v4()
		}).save()

		return {
			executed: true,
			status: true,
			message: 'Created managerPasswordRecovery',
			managerPasswordRecovery: managerPasswordRecovery
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerPasswordRecoveriesCollection: Error --> ${err}`,
		}
	}
}


/******************* [OTHER-CRUD] *******************/
// [DELETE] Manager //
const c_deleteByManager = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'Invalid manager_id',
			}
		}

		await ManagerPasswordRecoveryModel.deleteMany({ manager: manager_id })

		return {
			executed: true,
			status: true,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerPasswordRecoveriesCollection: Error --> ${err}`,
		}
	}
}


// [DELETE] Custom //
const c_deleteCustom = async (filter) => {
	try {
		// [VALIDATE] filter //
		if (!filter || filter == {}) {
			return {
				executed: true,
				status: false,
				message: 'commentLikesCollection: No filter passed',
				updated: false,
			}
		}

		await ManagerPasswordRecoveryModel.deleteMany(filter)

		return {
			executed: true,
			status: true,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerPasswordRecoveriesCollection: Error --> ${err}`,
		}
	}
}


/******************* [EXISTANCE] *******************/
const c_existance = async (manager_id) => {
	try {
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'Invalid manager_id',
			}
		}

		if (!await ManagerPasswordRecoveryModel.findOne({ maanger: manager_id })) {
			return {
				executed: true,
				status: true,
				message: 'Password recovery does NOT exists',
				existance: false,
			}
		}

		return {
			executed: true,
			status: true,
			message: 'Password recovery exists',
			existance: true,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerPasswordRecoveriesCollection: Error --> ${err}`,
		}
	}
}


/******************* [VALIDATION] *******************/
const c_validateToken = async (manager_id, verificationCode) => {
	try {
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'Invalid manager_id',
			}
		}

		// [VALIDATE] manager_id //
		if (!verificationCode) {
			return {
				executed: true,
				status: false,
				message: 'No verificationCode passed',
			}
		}

		// [VALIDATE][EXISTANCE] //
		const existance = await c_existance(manager_id)

		if (!existance.status || !existance.existance) { return existance }

		// [VALIDATE] //
		const managerPasswordRecovery = await ManagerPasswordRecoveryModel.findOne({
			manager: manager_id,
			verificationCode: verificationCode
		})

		if (!managerPasswordRecovery) {
			return {
				executed: true,
				status: true,
				message: 'Password Recovery verificationCode invalid',
				valid: false,
			}
		}

		return {
			executed: true,
			status: true,
			message: 'Password Recovery verificationCode valid',
			managerPasswordRecovery: managerPasswordRecovery,
			valid: true,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerPasswordRecoveriesCollection: Error --> ${err}`,
		}
	}
}


module.exports = {
	c_create,
	c_deleteByManager,
	c_deleteCustom,
	c_existance,
	c_validateToken,
}