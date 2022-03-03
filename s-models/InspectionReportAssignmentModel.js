// [REQUIRE] //
const mongoose = require('mongoose')


module.exports = mongoose.model(
	'InspectionReportAssignment',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,

		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Organization',
			required: false,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},

		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Client',
			required: false,
		},

		due_date: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},

		created_at: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},
	})
)