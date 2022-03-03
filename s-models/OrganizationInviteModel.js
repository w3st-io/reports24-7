// [REQUIRE] //
const mongoose = require('mongoose')


module.exports = mongoose.model(
	'OrganizationInvite',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Organization',
			required: true,
		},

		read: {
			type: Boolean,
			default: false,
		},

		response: {
			type: String,
			default: null,
			enum: ['accepted', 'declined', null],
		},

		created_at: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},
	})
)