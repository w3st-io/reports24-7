// [REQUIRE] //
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const geo = require('../s-defaults/geo')


module.exports = mongoose.model(
	'Organization',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,

		manager: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Manager',
			required: true,
		},

		name: {
			type: String,
			required: true,
			maxlength: 50,
		},

		email: {
			type: String,
			maxlength: 50,
		},

		phone: {
			type: Number,
			maxlength: 15,
		},

		fax: {
			type: Number,
			maxlength: 15,
		},

		url: {
			type: String,
			maxlength: 100,
		},

		logo_url: {
			type: String,
			maxlength: 100,
		},

		address: {
			street: {
				type: String,
				maxlength: 36,
			},

			unit: {
				type: String,
				maxlength: 10,
			},

			city: {
				type: String,
				maxlength: 100,
			},

			state: {
				type: String,
				enum: geo.states,
			},

			zip: {
				type: String,
				maxlength: 8,
			},

			country: {
				type: String,
				enum: geo.countries
			},
		},

		created_at: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},
	})
)