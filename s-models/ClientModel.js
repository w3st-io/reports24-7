// [REQUIRE] //
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const geo = require('../s-defaults/geo')


module.exports = mongoose.model(
	'Client',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,

		// Organization that client belongs too
		organization: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Organization',
			required: true,
		},

		name: {
			type: String,
			maxlength: 50,
			required: true,
		},

		phone: {
			type: Number,
			maxlength: 15,
		},

		fax: {
			type: Number,
			maxlength: 15,
		},
		
		email: {
			type: String,
			maxlength: 50,
		},

		url: {
			type: String,
			maxlength: 100,
		},

		notes: {
			type: String,
			maxlength: 500,
		},

		address: {
			street: {
				type: String,
				maxlength: 36,
			},

			unit: {
				type: String,
				maxlength: 6,
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

		representative: {
			first_name: {
				type: String,
				default: '',
				maxlength: 24,
			},
			
			last_name: {
				type: String,
				default: '',
				maxlength: 24,
			},

			email: {
				type: String,
				maxlength: 50,
			},

			email2: {
				type: String,
				maxlength: 50,
			},

			cell_phone: {
				type: Number,
				maxlength: 15,
			},

			alt_phone: {
				type: Number,
				maxlength: 15,
			},
		},

		created_at: {
			type: Date,
			default: Date.now,
			maxlength: 50
		},
	})
)