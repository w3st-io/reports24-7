// [REQUIRE] //
const mongoose = require('mongoose')


module.exports = mongoose.model(
	'ManagerPasswordRecovery',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		
		manager: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Manager',
			required: true,
		},

		verificationCode: {
			type: String,
			required: true,
			maxlength: 50,
		},

		created_at: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},
	})
)