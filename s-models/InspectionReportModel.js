// [REQUIRE] //
const mongoose = require('mongoose')


const inspectionReport = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,

	inspectionReportAssignment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'InspectionReportAssignment',
		required: true,
	},
	
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true,
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true,
	},

	// [GENERAL] //
	general: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	general_image1_filename: {
		type: String,
		default: '',
		required: false,
	},

	// [PIPE] //
	pipe: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},
			
			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [FDC] //
	fdc: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [HEADS] //
	heads: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [WET-PIPE] //
	wetpipe: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [DRY-PIPE] //
	drypipe: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [TANKS] //
	tanks: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [FOAM] //
	foam: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [STANDPIPE] //
	standpipe: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [PUMP] //
	pump: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	pump_image1_filename: {
		type: String,
		default: '',
		required: false,
	},

	pump_image2_filename: {
		type: String,
		default: '',
		required: false,
	},

	pump_image3_filename: {
		type: String,
		default: '',
		required: false
	},

	// [PUMP][FLOW-TEST] //
	pump_flowTest: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		},
	],

	pump_flowTestTable: [
		{
			type: String,
			required: true,
			maxlength: 200
		},
	],

	pump_electricDrivenTable: [
		{
			type: String,
			required: true,
			maxlength: 200
		},
	],

	// [PUMP][WHILE-PUMP-IS-RUNNING] //
	pump_whilePumpIsRunning: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [PUMP][CHECK-LIST] //
	pump_checkList: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	// [EXTINGUISHER] //
	extinguisher: [
		{
			type: {
				type: String,
				required: true,
				maxlength: 200
			},

			name: {
				type: String,
				required: true,
				maxlength: 200
			},

			text: {
				type: String,
				required: true,
				maxlength: 300
			},

			answer: {
				type: String,
				required: false,
				default: null,
				maxlength: 200
			},
		}
	],

	created_at: {
		type: Date,
		default: Date.now,
		maxlength: 50
	},
})


inspectionReport.pre('validate', function (next) {
	// [LENGTH-CHECK] general //
	if (this.general.length > 28) { throw ('Error: "general" section too large') }

	// [LENGTH-CHECK] pipe //
	if (this.pipe.length > 15) { throw ('Error: "pipe" section too large') }

	// [LENGTH-CHECK] pipe //
	if (this.fdc.length > 11) { throw ('Error: "fdc" section too large') }

	// [LENGTH-CHECK] heads //
	if (this.heads.length > 25) { throw ('Error: "heads" section too large') }

	// [LENGTH-CHECK] wetpipe //
	if (this.wetpipe.length > 38) { throw ('Error: "wetpipe" section too large') }

	// [LENGTH-CHECK] drypipe //
	if (this.drypipe.length > 49) { throw ('Error: "drypipe" section too large') }

	// [LENGTH-CHECK] tanks //
	if (this.tanks.length > 18) { throw ('Error: "tanks" section too large') }

	// [LENGTH-CHECK] foam //
	if (this.foam.length > 22) { throw ('Error: "foam" section too large') }

	// [LENGTH-CHECK] standpipe //
	if (this.standpipe.length > 24) {
		throw ('Error: "standpipe" section too large')
	}

	// [LENGTH-CHECK] pump //
	if (this.pump.length > 35) { throw ('Error: "pump" section too large') }

	// [LENGTH-CHECK] extinguisher //
	if (this.extinguisher.length > 18) {
		throw ('Error: "extinguisher" section too large')
	}
	
	// [EVERYTHING-ELSE] //
	// [LENGTH-CHECK] pump_flowTest //
	if (this.pump_flowTest.length > 9) {
		throw ('Error: "pump_flowTest" section too large')
	}

	// [LENGTH-CHECK] pump_electricDrivenTable //
	if (this.pump_electricDrivenTable.length > 9) {
		throw ('Error: "pump_electricDrivenTable" section too large')
	}

	next()
})


inspectionReport.pre('updateOne', function (next) {
	// [LENGTH-CHECK] general //
	if (this._update.$set.general.length > 28) {
		throw ('Error: "general" section too large')
	}

	// [LENGTH-CHECK] pipe //
	if (this._update.$set.pipe.length > 15) {
		throw ('Error: "pipe" section too large')
	}

	// [LENGTH-CHECK] pipe //
	if (this._update.$set.fdc.length > 11) {
		throw ('Error: "fdc" section too large')
	}

	// [LENGTH-CHECK] heads //
	if (this._update.$set.heads.length > 25) {
		throw ('Error: "heads" section too large')
	}

	// [LENGTH-CHECK] wetpipe //
	if (this._update.$set.wetpipe.length > 38) {
		throw ('Error: "wetpipe" section too large')
	}

	// [LENGTH-CHECK] drypipe //
	if (this._update.$set.drypipe.length > 49) {
		throw ('Error: "drypipe" section too large')
	}

	// [LENGTH-CHECK] tanks //
	if (this._update.$set.tanks.length > 18) {
		throw ('Error: "tanks" section too large')
	}

	// [LENGTH-CHECK] foam //
	if (this._update.$set.foam.length > 22) {
		throw ('Error: "foam" section too large')
	}

	// [LENGTH-CHECK] standpipe //
	if (this._update.$set.standpipe.length > 24) {
		throw ('Error: "standpipe" section too large')
	}

	// [LENGTH-CHECK] pump //
	if (this._update.$set.pump.length > 35) {
		throw ('Error: "pump" section too large')
	}

	// [LENGTH-CHECK] extinguisher //
	if (this._update.$set.extinguisher.length > 18) {
		throw ('Error: "extinguisher" section too large')
	}
	
	// [EVERYTHING-ELSE] //
	// [LENGTH-CHECK] pump_flowTest //
	if (this._update.$set.pump_flowTest.length > 9) {
		throw ('Error: "pump_flowTest" section too large')
	}

	// [LENGTH-CHECK] pump_electricDrivenTable //
	if (this._update.$set._update.$set.pump_electricDrivenTable.length > 9) {
		throw ('Error: "pump_electricDrivenTable" section too large')
	}

	next()
})


module.exports = mongoose.model('InspectionReport', inspectionReport)