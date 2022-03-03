// [REQUIRE] //
const mongoose = require('mongoose')
const validator = require('validator')
const uuid = require('uuid')


// [REQUIRE] Personal //
const ManagerVerificationCodeModel = require('../s-models/ManagerVerificationCodeModel')


/******************* [CRUD] *******************/
// [CREATE] //
const c_create = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managerVerificationCodesCollection: Invalid manager_id',
			}
		}
	
		// [SAVE] //
		const verificationCode = await new ManagerVerificationCodeModel({
			_id: mongoose.Types.ObjectId(),
			manager: manager_id,
			verificationCode: uuid.v4(),
		}).save()

		return {
			executed: true,
			status: true,
			verificationCode: verificationCode,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerVerificationCodesCollection: Error --> ${err}`,
		}
	}
}


// [READ] //
const c_read = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managerVerificationCodesCollection: Invalid manager_id',
			}
		}

		const vCode = await ManagerVerificationCodeModel.findOne({ manager: manager_id })

		if (vCode) {
			return {
				executed: true,
				status: true,
				message: '',
				existance: true,
				verificationCode: vCode,
			}
		}
		
		return {
			executed: true,
			status: true,
			message: '',
			existance: false,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerVerificationCodesCollection: Error --> ${err}`,
		}
	}
}


/******************* [OTHER-CRUD] *******************/
// [DELETE] manager //
const c_deleteByManager = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managerVerificationCodesCollection: Invalid manager_id',
			}
		}
	
		const vCode = await ManagerVerificationCodeModel.deleteMany({ manager: manager_id })

		return {
			executed: true,
			status: true,
			verificationCode: vCode,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerVerificationCodesCollection: Error --> ${err}`,
		}
	}
}


/******************* [VALIDATE] *******************/
const c_validate = async (manager_id, verificationCode) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managerVerificationCodesCollection: Invalid manager_id',
			}
		}

		// [VALIDATE] verificationCode //
		if (!validator.isAscii(verificationCode)) {
			return {
				executed: true,
				status: false,
				message: 'managerVerificationCodesCollection: Invalid verificationCode',
			}
		}

		const vCode = await ManagerVerificationCodeModel.findOne({
			manager: manager_id,
			verificationCode: verificationCode,
		})

		if (vCode) {
			return {
				executed: true,
				status: true,
				message: 'Valid verification code',
				existance: true,
			}
		}

		return {
			executed: true,
			status: true,
			message: 'Invalid verification code',
			existance: false,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerVerificationCodesCollection: Error --> ${err}`,
		}
	}
}


/******************* [EXISTANCE] *******************/
const c_existance = async (manager_id) => {
	try {
		// [VALIDATE] manager_id //
		if (!mongoose.isValidObjectId(manager_id)) {
			return {
				executed: true,
				status: false,
				message: 'managerVerificationCodesCollection: Invalid manager_id',
			}
		}

		const vCode = await ManagerVerificationCodeModel.findOne({ manager: manager_id })

		if (vCode) {
			return {
				executed: true,
				status: true,
				message: 'Valid verification code',
				existance: true,
			}
		}

		return {
			executed: true,
			status: true,
			message: 'Invalid verification code',
			existance: false,
		}
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `managerVerificationCodesCollection: Error --> ${err}`,
		}
	}
}


module.exports = {
	c_create,
	c_read,
	c_deleteByManager,
	c_validate,
	c_existance,
}
