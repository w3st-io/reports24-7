// [REQUIRE] //
const mongoose = require('mongoose')


module.exports = mongoose.model(
	'ManagerVerificationCode',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
	
		manager: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Manager',
			required: true,
		},
	
		verificationCode: {
			type: String,
			required: [true, 'This is required'],
			maxlength: 50,
		},

		created_at: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},
	})
)