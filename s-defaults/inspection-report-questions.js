module.exports = [
	// [GENERAL] //
	{
		name: 'general',

		questions: [
			{
				text: 'Report Number',
				name: 'general_report_internal_code',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Intro photo',
				name: 'intro_photo',
				type: 'image-upload',
				options: [],
				answer: '',
			},
			{
				text: 'Visual inspection of entire system',
				name: 'general_visual_entire',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Have there been any modifications to the system since the last inspection?',
				name: 'general_modifications',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All systems are in service at time of inspection.',
				name: 'general_in_service',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all areas accessible for inspection?',
				name: 'general_accessible',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All water filled piping is located in heated areas.',
				name: 'general_waterfill_in_heated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves are sealed in the open position.',
				name: 'general_valves_sealed_open',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves are monitored by tamper switches.',
				name: 'general_valves_monitored',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is the building occupied?',
				name: 'general_occupied',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is occupancy the same has last inspection?',
				name: 'general_same_occupy',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all new building changes and additions protected?',
				name: 'general_protected_changes',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are alarm systems in service?',
				name: 'general_alarm_inservice',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Has monitoring company been notified?',
				name: 'general_alarm_notified',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Name of alarm company',
				name: 'general_alarm_name',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Password if available',
				name: 'general_alarm_password',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Phone number of alarm company',
				name: 'general_alarm_phone',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Any fires reported since last inspection?',
				name: 'general_fire_reports',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is hydraulic calc card in place?',
				name: 'general_calc_card',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are system identification signs in place?',
				name: 'general_idcard_inplace',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are gauges in good working condition?',
				name: 'general_gauges_good',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Year of gauges',
				name: 'general_gauges_year',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Heat tape in good working condition?',
				name: 'general_heat_tape_good',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is condition of valve room in good condition?',
				name: 'general_valve_room_good',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is system a hydraulic calculated system?',
				name: 'general_hydrolic_calculated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is system a pipe schedule system?',
				name: 'general_pipe_schedule',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'general_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
		general_image1: '',
	},
	// [PIPE] //
	{
		name: 'pipe',

		questions: [
			{
				text: 'No indication of serious corrosion?',
				name: 'pipe_hangers_corrosion',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Non-system materials or equipment are not supported from sprinkler piping?',
				name: 'pipe_hangers_corrosion_nonsystem_supported',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Hangers are secured to piping and the building structure?',
				name: 'pipe_hangers_secured',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Sway bracing in good condition?',
				name: 'pipe_hangers_sway_good_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Sway bracing attached to pipe and to structure satisfactory?',
				name: 'pipe_hangers_sway_attached',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are conditions of sprinkler pipe satisfactory?',
				name: 'pipe_pipe_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Type of pipe',
				name: 'pipe_pipe_type',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are conditions of control valves satisfactory?',
				name: 'pipe_control_valves_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Type of control valves',
				name: 'pipe_control_valves_type',
				type: 'select',
				options: [
					'Water valve',
					'G x G butterfly',
					'G x G butterfly',
					'OSY valve',
					'Gate valve',
					'Gate valve',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Gate valve Are conditions of drain valves satisfactory?',
				name: 'pipe_drain_valves_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are conditions of strainers satisfactory?',
				name: 'pipe_strainer_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are check valves in good condition?',
				name: 'pipe_check_valves_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Piping free of leaks and corrosion?',
				name: 'pipe_piping_leaks',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Piping through floors and walls have correct clearance?',
				name: 'pipe_piping_clearance',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector Comment',
				name: 'pipe_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [FDC] //
	{
		name: 'fdc',

		questions: [
			{
				text: 'FDC is accessible & unobstructed?',
				name: 'fdc_accessible',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inlets are not obstructed by foreign material?',
				name: 'fdc_obstructed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Plugs or caps are in place?',
				name: 'fdc_plugs',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Swivel connections turn freely?',
				name: 'fdc_swivel',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is ball drip functioning satisfactory?',
				name: 'fdc_ball',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Is check valve holding tight?',
				name: 'fdc_check_valve',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are FDCs in good condition and properly maintained?',
				name: 'fdc_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'FDC gaskets in place and in good condition?',
				name: 'fdc_gasket_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'FDC name plate visible?',
				name: 'fdc_plate_visible',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Note location of FDC',
				name: 'fdc_location',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Inspector Comments',
				name: 'fdc_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [HEADS] //
	{
		name: 'heads',

		questions: [
			{
				text: 'Sprinklers are visually free of corrosion, paint or foreign materials?',
				name: 'heads_corrosion',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Sprinklers are less than 50 years old?',
				name: 'heads_less_50',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Residential & quick response sprinklers are less than 20 years old?',
				name: 'heads_r_qr_less_20',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Sprinklers are of proper temperature rating?',
				name: 'heads_propper_temp',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'The stock of spare sprinklers is of adequate number and type?',
				name: 'heads_spares',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Make of sprinklers',
				name: 'heads_make',
				type: 'select',
				options: [
					'Viking',
					'Tyco',
					'Central',
					'Reliable',
					'Globe',
					'Asco',
					'Victaulic',
					'Rasco',
					'Gem',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Temperature of sprinklers.',
				name: 'heads_temp',
				type: 'select',
				options: [
					'135 - 170',
					'175 - 225',
					'250 - 300',
					'325 - 375',
					'400 - 475',
					'500 - 575',
					'650',
					'other'
				],
				answer: '',
			},
			{
				text: 'Model of sprinklers.',
				name: 'heads_model',
				type: 'select',
				options: [
					'ssu',
					'ssp',
					'semi recessed',
					'concealed',
					'side wall',
					'other'
				],
				answer: '',
			},
			{
				text: 'Year of sprinklers',
				name: 'heads_year',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Approximately number of sprinklers.',
				name: 'heads_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Finish of sprinklers.',
				name: 'heads_finish',
				type: 'select',
				options: [
					'white',
					'chrome',
					'black',
					'brass',
					'other'
				],
				answer: '',
			},
			{
				text: 'Finish of escutcheons',
				name: 'heads_escutcheons_finish',
				type: 'select',
				options: [
					'white',
					'chrome',
					'black',
					'brass',
					'other'
				],
				answer: '',
			},
			{
				text: 'Spare head wrench available?',
				name: 'heads_wrench',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Sprinkler spray patterns are not obstructed?',
				name: 'heads_spray',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All protected areas have adequate sprinkler coverage?',
				name: 'heads_coverage',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Dry pendent sprinklers older than 10 years replaced?',
				name: 'heads_older_10_replaced',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Make of dry pendant',
				name: 'heads_dry_model',
				type: 'select',
				options: [
					'Viking',
					'Tyco',
					'Central',
					'Reliable',
					'Globe',
					'Asco',
					'Victaulic',
					'Rasco',
					'Gem',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Model of dry pendant',
				name: 'heads_dry_pendant_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Year of dry pendant',
				name: 'heads_dry_year',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Approximate number of dry pendant',
				name: 'heads_dry_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Finish of dry pendant',
				name: 'heads_dry_finish',
				type: 'select',
				options: [
					'white',
					'chrome',
					'black',
					'brass',
					'other'
				],
				answer: '',
			},
			{
				text: 'Sprinklers are not subject to recall?',
				name: 'heads_recall',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Sprinklers with glass bulbs look to be full of liquid?',
				name: 'heads_full',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all required sprinkler texts up to date?',
				name: 'heads_texts_updated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'heads_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [WETPIPE] //
	{
		name: 'wetpipe',

		questions: [
			{
				text: 'Alarm valves in satisfactory condition?',
				name: 'wetpipe_valves_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Retard chamber in satisfactory condition?',
				name: 'wetpipe_retard_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All flow indicators in good working condition?',
				name: 'wetpipe_flow_indicators_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Record time for flow switch in seconds',
				name: 'wetpipe_flow_time',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Were all sectional/floor control valves inspected?',
				name: 'wetpipe_all_valves_inspected',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Number of valves',
				name: 'wetpipe_valves_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Were all sectional/floor flow switches inspected?',
				name: 'wetpipe_floor_switch_inspected',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Flow switch average times in seconds',
				name: 'wetpipe_floor_switch_flow_time',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Are all other valves in good condition?',
				name: 'wetpipe_other_valves_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are cold weather valves open or closed as needed?',
				name: 'wetpipe_cold_valve_open',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Antifreeze systems satisfactorily texted?',
				name: 'wetpipe_antifreeze_texted',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Type of Antifreeze solution',
				name: 'wetpipe_antifreeze_type',
				type: 'select',
				options: [
					'Propylene glycol',
					'Glycerin',
					'Ethylene glycol',
					'alcohol',
					'other'
				],
				answer: '',
			},
			{
				text: 'Antifreeze solution texted @ [degrees]',
				name: 'wetpipe_antifreeze_solution_temperature_text',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'at what percent',
				name: 'wetpipe_antifreeze_solution_percentage',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Approximate volume',
				name: 'wetpipe_antifreeze_gallons',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Are valve room heaters operating properly?',
				name: 'wetpipe_room_heaters',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Backflow tested as required?',
				name: 'wetpipe_backflow_texted',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Forward flow test performed as required?',
				name: 'wetpipe_forwardflow_texted',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are valve rooms accessible with adequate clearance?',
				name: 'wetpipe_rooms_clearance',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Was a main drain text performed with satisfactory results?',
				name: 'wetpipe_maindrain_satisfactory',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Static pressure',
				name: 'wetpipe_maindrain_pressure_static',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Residual pressure',
				name: 'wetpipe_maindrain_pressure_residual',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Size of main drain',
				name: 'wetpipe_maindrain_size',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Main drain fully open and flow observed?',
				name: 'wetpipe_maindrain_fullopen',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'If no main drain text was performed state explanation',
				name: 'wetpipe_maindrain_notext',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Gauges replaced or calibrated?',
				name: 'wetpipe_gauges_calibrated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all other valves open or closed as required?',
				name: 'wetpipe_other_valves_operated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Alarm valve identification',
				name: 'wetpipe_alarm_valve_id',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Make of alarm valve',
				name: 'wetpipe_alarm_valve_make',
				type: 'select',
				options: [
					'Viking',
					'Tyco',
					'Central',
					'Reliable',
					'Globe',
					'Asco',
					'Victaulic',
					'Rasco',
					'Gem',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Model of alarm valve',
				name: 'wetpipe_alarm_valve_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Size of alarm valve',
				name: 'wetpipe_alarm_valve_size',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Year of alarm valve',
				name: 'wetpipe_alarm_valve_year',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Has internal investigation been performed in last 5 years?',
				name: 'wetpipe_alarm_investigated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last inspection',
				name: 'wetpipe_alarm_valve_insp_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Alarm panel reset and clear of alarms?',
				name: 'wetpipe_alarm_panel_reset',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Was system tagged?',
				name: 'wetpipe_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'If Tagged what color',
				name: 'wetpipe_tagged_color',
				type: 'select',
				options: [
					'Red',
					'Green',
					'white'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'wetpipe_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [DRYPIPE] //
	{
		name: 'drypipe',

		questions: [
			{
				text: 'Type of system',
				name: 'drypipe_type',
				type: 'select',
				options: [
					'Dry valve',
					'Preaction valve',
					'Preaction Dual interlock',
					'Preaction Single interlock',
					'Preaction Pneumatic release',
					'Deluge valve',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Dry valve in service and in good condition?',
				name: 'drypipe_valve_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Dry valve identification',
				name: 'drypipe_valve_id',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Make of dry valve',
				name: 'drypipe_valve_make',
				type: 'select',
				options: [
					'Viking',
					'Tyco',
					'Central',
					'Reliable',
					'Globe',
					'Asco',
					'Victaulic',
					'Rasco',
					'Gem',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Model of dry valve',
				name: 'drypipe_valve_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Size of dry valve in inches',
				name: 'drypipe_valve_size',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Year of dry valve',
				name: 'drypipe_valve_year',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Main drain text performed with satisfactory results?',
				name: 'drypipe_maindrain_satisfactory',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Static pressure',
				name: 'drypipe_maindrain_static_pressure',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Residual pressure',
				name: 'drypipe_maindrain_residual_pressure',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Gauges replaced or calibrated?',
				name: 'drypipe_gauges_calibrated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Air pressure set at correct level?',
				name: 'drypipe_air_pressure_correct',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Cut off pressure',
				name: 'drypipe_air_pressure_cutoff',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Cut in pressure',
				name: 'drypipe_air_pressure_cutin',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Low air pressure switch activates at',
				name: 'drypipe_air_pressure_low',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Date of last trip text',
				name: 'drypipe_trip_text_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Dry valve successfully trip texted and returned to service?',
				name: 'drypipe_trip_text_success',
				type: 'ynan',
				options: [],
				answer: '',
			},
			{
				text: 'Pressures before texting air #',
				name: 'drypipe_pre_text_pressure',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Water #',
				name: 'drypipe_pre_text_water_pressure',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Control valve fully open?',
				name: 'drypipe_control_open',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Operated @ air pressure',
				name: 'drypipe_air_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Time it took to trip [seconds]',
				name: 'drypipe_trip_time',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Time for water to reach inspectors text [seconds]',
				name: 'drypipe_water_time',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Interior of dry valve was satisfactory including all moving parts?',
				name: 'drypipe_interior_dry_valve_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Trip text performed without repairs?',
				name: 'drypipe_tets_repairs_required',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Did alarms work during text?',
				name: 'drypipe_alarm_function',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Quick opening devices operate properly and reset?',
				name: 'drypipe_quick_open',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Make of quick opening device',
				name: 'drypipe_quick_open_device',
				type: 'select',
				options: [
					'Viking',
					'Tyco',
					'Central',
					'Reliable',
					'Globe',
					'Asco',
					'Victaulic',
					'Rasco',
					'Gem',
					'Other'
				],
				answer: '',
			},
			{
				text: 'Model of quick opening device',
				name: 'drypipe_quick_open_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Year of quick opening device',
				name: 'drypipe_quick_open_year',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Condition of quick opening device',
				name: 'drypipe_quick_open_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Valve reset dry?',
				name: 'drypipe_valve_reset',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All supervisory devices successfully texted?',
				name: 'drypipe_devices_successfull',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All automatic release devices texted?',
				name: 'drypipe_auto_release',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Manual release devices texted?',
				name: 'drypipe_manual_release',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Quick-opening devices successfully texted?',
				name: 'drypipe_quick_open_texted',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Priming water level is normal?',
				name: 'drypipe_priming_water_level',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All low points drained at fall inspection?',
				name: 'drypipe_drained',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Number of auxiliary drains',
				name: 'drypipe_drain_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Has an assessment of the internal condition of piping been performed during the past 5 years',
				name: 'drypipe_obstruction_text',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last inspection',
				name: 'drypipe_last_inspection_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Has piping been checked for proper slope in the last 10 years?',
				name: 'drypipe_pipe_slope_check',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last inspection',
				name: 'drypipe_pipe_slope_check_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Is valve room adequately heated?',
				name: 'drypipe_valve_room_heat',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all other valves in their proper position?',
				name: 'drypipe_other_valve_position',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Alarm panels reset and clear of alarms?',
				name: 'drypipe_alarm_reset',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Was System Tagged?',
				name: 'drypipe_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Tag color?',
				name: 'drypipe_tagged_color',
				type: 'select',
				options: [
					'Red',
					'Green',
					'White'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'drypipe_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [TANKS] //
	{
		name: 'tanks',

		questions: [
			{
				text: 'Water temperature- low temperature alarms texted?',
				name: 'tanks_temp',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Heating system texted and in satisfactory condition?',
				name: 'tanks_heat',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Tank fill valve in satisfactory condition?',
				name: 'tanks_fill_valve',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves in normal position?',
				name: 'tanks_control_valve',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Water level alarms texted?',
				name: 'tanks_level',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Air pressure in tank normal?',
				name: 'tanks_air_psi',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Condition of exterior of tank satisfactory?',
				name: 'tanks_condition_exterior',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Tank support structure appears to be in good condition?',
				name: 'tanks_condition_support',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Catwalks and ladders in satisfactory condition?',
				name: 'tanks_condition_ladder',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Interior of tank in satisfactory condition?',
				name: 'tanks_condition_interior',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Area around tank in satisfactory condition?',
				name: 'tanks_condition_area',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: '3 year inspections completed as required?',
				name: 'tanks_three_year',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last inspection',
				name: 'tanks_three_year_date',
				type: 'input-date',
				options: [],
				answer: '',
			},
			{
				text: '5 year inspections completed as required?',
				name: 'tanks_five_year',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last inspection',
				name: 'tanks_five_year_date',
				type: 'input-date',
				options: [],
				answer: '',
			},
			{
				text: 'Was System Tagged?',
				name: 'tanks_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'If Tagged Tag Color',
				name: 'tanks_tagged_color',
				type: 'select',
				options: [
					'Red',
					'Green',
					'White'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'tanks_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [FOAM] //
	{
		name: 'foam',

		questions: [
			{
				text: 'Discharge device location (Sprinkler)',
				name: 'foam_discharge_location',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Discharge device location (Spray nozzle)',
				name: 'foam_discharge_location_nozzle',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Discharge device position (Sprinkler)',
				name: 'foam_discharge_position',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Discharge device position (Spray nozzle)',
				name: 'foam_discharge_position_nozzle',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Foam concentrate strainers inspected as required?',
				name: 'foam_strainer_inspected',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Proportioning systems inspected as required?',
				name: 'foam_proportioning_inspected',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pipe corrosion investigated as required?',
				name: 'foam_pipe_corrosion',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pipe system in satisfactory condition?',
				name: 'foam_pipe_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Storage tanks for foam supply in satisfactory condition?',
				name: 'foam_tank_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Capacity of tank',
				name: 'foam_tank_capacity',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Type of foam used in system',
				name: 'foam_type',
				type: 'select',
				options: [
					'AFFF',
					'Protein-foam',
					'Flouro-protien foam',
					'Film-forming foam',
					'Alchohol-resistant foam',
					'other'
				],
				answer: '',
			},
			{
				text: 'Number of tanks in system',
				name: 'foam_tank_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Foam concentrate texted and in satisfactory condition?',
				name: 'foam_concentrate',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Actuation devices texted and in satisfactory condition?',
				name: 'foam_activation',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Detection devices texted as required?',
				name: 'foam_detection',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: '5 year maintenance completed as required?',
				name: 'foam_five_year',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last 5 year maintenance',
				name: 'foam_five_year_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: '10 year maintenance completed as required',
				name: 'foam_ten_year',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last 10 year maintenance',
				name: 'foam_ten_year_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Was System Tagged?',
				name: 'foam_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'If Tagged what color',
				name: 'foam_tagged_color',
				type: 'select',
				options: [
					'Red',
					'Green',
					'White'
				],
				answer: '',
			},
			{
				text: 'Foam comments',
				name: 'foam_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [STANDPIPE] //
	{
		name: 'standpipe',

		questions: [
			{
				text: 'Visual inspection of entire system?',
				name: 'stand_visual',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'There have been no modifications since the last inspection?',
				name: 'stand_mods',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'All systems are in service?',
				name: 'stand_in_service',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves are in the open position?',
				name: 'stand_control_valves_open',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves are locked open or have tamper switches?',
				name: 'stand_control_valves_locked',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'No indication of serious corrosion?',
				name: 'stand_corrosion',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Hangers and supports are secured to pipe and building structure?',
				name: 'stand_hangers_secure',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'FDC is accessible and unobstructed?',
				name: 'stand_fdc_access',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'FDC inlets are not obstructed by foreign material?',
				name: 'stand_fdc_inlets_unobstructed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'FDC plugs and caps are in place?',
				name: 'stand_fdc_caps',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'FDC swivel connections turn freely?',
				name: 'stand_fdc_swivel',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Hose valves are operable and have caps?',
				name: 'stand_hose_valves',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are hoses in service as required?',
				name: 'stand_hose_in_service',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Hose in racks have been texted in last 5 years and have adjustable nozzles?',
				name: 'stand_hose_racks_texted',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last text',
				name: 'stand_hose_racks_text_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Number of hose racks',
				name: 'stand_hose_racks_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Standpipe classification.',
				name: 'stand_class',
				type: 'select',
				options: [
					'Dry standpipe',
					'Class I standpipe',
					'Class II standpipe',
					'Class III standpipe',
					'Manual standpipe',
					'Wet standpipe',
					'other'
				],
				answer: '',
			},
			{
				text: 'Was 5 year flow test performed as required?',
				name: 'stand_flow_text',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last flow test inspection',
				name: 'stand_flow_text_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Was 5 year hydrostatic text performed as required',
				name: 'stand_hydrostate_text',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last hydrostatic text inspection',
				name: 'stand_hydrostate_text_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Was system tagged?',
				name: 'stand_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'If tagged, what color?',
				name: 'stand_tagged_color',
				type: 'select',
				options: [
					'Red',
					'Green',
					'White'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'stand_comment',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [PUMP] //
	{
		name: 'pump',

		questions: [
			{
				text: 'Type of pump',
				name: 'pump_type',
				type: 'select',
				options: [
					'horizontal',
					'split case',
					'vertical in line',
					'vertical shaft',
					'temuri',
					'other'
				],
				answer: '',
			},
			{
				text: 'Pump Manufacturer',
				name: 'pump_manufacture',
				type: 'select',
				options: [
					'DD peerless',
					'Aurora',
					'Waterous',
					'SPP',
					'AC Fire Pump',
					'other'
				],
				answer: '',
			},
			{
				text: 'Serial number',
				name: 'pump_serial',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Model number',
				name: 'pump_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Pump Label',
				name: 'pump_label',
				type: 'image-upload',
				options: [],
				answer: '',
			},
			{
				text: 'Rated volume',
				name: 'pump_rated_gpm',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Rated pressure',
				name: 'pump_rated_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Rated rpm',
				name: 'pump_rated_rpm',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Supply from',
				name: 'pump_supply',
				type: 'select',
				options: [
					'city water',
					'well water',
					'storage tank',
					'other'
				],
				answer: '',
			},
			{
				text: 'Driver',
				name: 'pump_driver',
				type: 'select',
				options: [
					'Diesel',
					'Combustion engine',
					'Steam turbine drive',
					'Electric',
					'other'
				],
				answer: '',
			},
			{
				text: 'Driver Manufacturer',
				name: 'pump_driver_manufactur',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Driver Serial number',
				name: 'pump_driver_serial',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Driver Model number',
				name: 'pump_driver_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Driver Rated horse power',
				name: 'pump_driver_rated_power',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Driver Rated speed',
				name: 'pump_driver_rated_speed',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'If electric motor: Driver rated voltage',
				name: 'pump_driver_rated_voltage',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Driver Operating voltage',
				name: 'pump_driver_operating_voltage',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Rated amps',
				name: 'pump_driver_rated_amps',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Phase cycles',
				name: 'pump_driver_cycles',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Controller: manufacturer',
				name: 'pump_controller_manufactur',
				type: 'select',
				options: [
					'Firetrol',
					'Metron Sylvania GE',
					'Hubble',
					'Torntech',
					'Joslyn Clark',
					'Eaton Cutler Hammer',
					'Master Controls',
					'other'
				],
				answer: '',
			},
			{
				text: 'Controller Serial number',
				name: 'pump_controller_serial',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Model number',
				name: 'pump_controller_model',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Controller Label',
				name: 'pump_controller_label',
				type: 'image-upload',
				options: [],
				answer: '',
			},
			{
				text: 'Jockey pump on system?',
				name: 'pump_jockey',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'JOCKEY PUMP settings: on pressure',
				name: 'pump_jockey_on_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Off pressure',
				name: 'pump_jockey_off_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Jockey Label',
				name: 'pump_jockey_label',
				type: 'image-upload',
				options: [],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'pump_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
		pump_image1: '',
		pump_image2: '',
		pump_image3: '',

		// [FLOW-TEST] //
		pump_flowTestQuestions: [
			{
				text: 'Flow Test table',
				name: 'flow_test_table',
				type: 'flow-test-table',
				options: [],
				answer: '',
			},
			{
				text: 'For electric driven fire pump record voltage and amps',
				name: 'electric_driven_table',
				type: 'electric-driven-table',
				options: [],
				answer: '',
			},
			{
				text: 'Flow test completed with the use of # of pitot tubes',
				name: 'pump_flow_text_pitot_num',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Flow Meter is functional',
				name: 'pump_flow_pitot_meter',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pitot pressure used to measure flow',
				name: 'pump_pitot_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Main drain text static',
				name: 'pump_main_drain_static_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Residual presure',
				name: 'pump_main_drain_residual_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Time for supply to reach normal pressure',
				name: 'pump_supply_normal_psi',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Adequate drainage provided before flow testing?',
				name: 'pump_drainage',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pump suction and discharge pressures and flow measurements at each hose stream used to determine total pump output where hose streams used in texting?',
				name: 'pump_suction_drainage_psi',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Care taken to prevent water damage by verifying adequate drainage?',
				name: 'pump_adequate_drainage',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Flow test conducted under minimum, rated and peak fire pump flows?',
				name: 'pump_flowtext_under_min',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Flow test conducted by controlling quantity of water discharged through text devices?',
				name: 'pump_flowtext_water_quantity',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Fire pump operated at maximum allowable discharge?',
				name: 'pump_max_operation',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Fire pump suction supply provided required flow at 0 pressure or higher gauge pressure at pump suction flange?',
				name: 'pump_suction_supply',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electric fire pump driver did not overload beyond rating while delivering necessary brake horsepower?',
				name: 'pump_electric_overload',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pump suction and discharge pressures and flow- meter measurements used to determine total pump output where flow meter used in texting?',
				name: 'pump_suction_discharge_flowmeter',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Flow meter adjusted immediately prior to texting in accordance with mfg. instructions?',
				name: 'pump_flow_meter_adjusted',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'text results using flow meter consistent with previous annual text results (IF no, complete flow test using hose streams OR calibrate flow meter)',
				name: 'pump_flow_meter_text_consistant',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector Comments',
				name: 'pump_flow_meter_text_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		pump_flowTestTable: [],
		pump_electricDrivenTable: [],
		pump_flowTestAnswers: [],

		// [WHILE-PUMP-IS-RUNNING] //
		pump_whilePumpIsRunningQuestions: [
			{
				text: 'At churn, circulation relief valve checked for operation and water discharge?',
				name: 'runningpump_relief_valve_operate',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'At churn, pressure relief valve checked for proper operation?',
				name: 'runningpump_relief_at_churn',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'At churn, pressure control valve checked for proper operation?',
				name: 'runningpump_psi_valve_operation_churn',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'At churn, text continued for minimum of [Minutes]',
				name: 'runningpump_churn_text_time',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'At each flow condition, electric motor voltage and current in all lines recorded?',
				name: 'runningpump_atflow_motor_amp_voltage',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'At each flow condition, pump speed recorded?',
				name: 'runningpump_flow_condition_recorded',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'At each flow condition, simultaneous readings of pump suction and discharge pressures and pump discharge flow recorded?',
				name: 'runningpump_simultaneous_readings',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure relief valve closely observed during each flow condition?',
				name: 'runningpump_relief_vlave_observed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure control valve closely observed during each flow condition?',
				name: 'runningpump_control_vlave_observed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure relief valve functioning properly?',
				name: 'runningpump_relief_vlave_function',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure control valve functioning properly?',
				name: 'runningpump_control_vlave_function',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure relief valve closed by pilot adjustment during flow conditions?',
				name: 'runningpump_relief_vlave_pilot_closed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure relief valve reset to normal position at pump text conclusion?',
				name: 'runningpump_relief_vlave_normal_reset',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'runningpump_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		pump_whilePumpIsRunningAnswers: [],

		// [CHECKLIST] //
		pump_checkListQuestions: [
			{
				text: 'System in service on arrival?',
				name: 'pump_chk_list_in_service',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Responsible parties notified before texting?',
				name: 'pump_chk_list_parties_notified',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Alarm company notified before texting?',
				name: 'pump_chk_list_alarm_notified',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves in normally open or normally closed position?',
				name: 'pump_chk_list_control_valve_normal',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves properly locked or supervised?',
				name: 'pump_chk_list_control_valve_locked',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valve supervisory switches initiate signal properly?',
				name: 'pump_chk_list_control_valve_supervise_switch',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Signal restored only when valve returned to normal position?',
				name: 'pump_chk_list_signal_restored',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Operating stems of OS&Y valves lubricated?',
				name: 'pump_chk_list_valve_lubed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves operated through full range and returned to normal position?',
				name: 'pump_chk_list_control_valve_full_range',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valves are free from external leaks?',
				name: 'pump_chk_list_control_valve_leaks',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Control valve identification signs in place?',
				name: 'pump_chk_list_control_valve_ID_sign',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Battery systems in satisfactory condition?',
				name: 'pump_chk_list_battery_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Battery system charger and charge rate operational, normal and equalized?',
				name: 'pump_chk_list_charger',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Circuit breakers or fuses checked?',
				name: 'pump_chk_list_breakers',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Isolating switch exercised?',
				name: 'pump_chk_list_isolator',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Circuit breakers exercised?',
				name: 'pump_chk_list_breakers_operated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'crankcase breather inspected and in good condition?',
				name: 'pump_chk_list_crank_breather_cond',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Engine exhaust system inspected and in satisfactory condition?',
				name: 'pump_chk_list_exhaust',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electrical wiring subject to movement free from chafing?',
				name: 'pump_chk_list_wiring_free',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Strainer, filter or dirt leg (or combination thereof) cleaned?',
				name: 'pump_chk_list_filter_cleaned',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Crankcase breather cleaned or changed (as necessary)?',
				name: 'pump_chk_list_crank_breather_cleaned',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Water strainer cleaned?',
				name: 'pump_chk_list_water_strainer_cleaned',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Manual starting means of electrically driven pumps operated?',
				name: 'pump_chk_list_manual_starting_operated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Antifreeze protection level texted and adjusted as necessary?',
				name: 'pump_chk_list_antifreeze',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electrical system safety devices and alarms operated?',
				name: 'pump_chk_list_safety_alarm',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electrical system boxes, panels and cabinets cleaned?',
				name: 'pump_chk_list_electrical_panel_cleaned',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Hangers and seismic bracing appear undamaged and tightly attached?',
				name: 'pump_chk_list_hangers',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Piping appears free of mechanical damage and in satisfactory condition?',
				name: 'pump_chk_list_pipping',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Building is secure such as not to expose piping to freezing conditions?',
				name: 'pump_chk_list_building_secure',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Adequate heat is provided maintaining temp at 40°F / 4.4°C or higher?',
				name: 'pump_chk_list_heat',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pump shaft end play with specified tolerances?',
				name: 'pump_chk_list_shaft_tolerance',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure gauge and sensor accuracy verified to be within 5%?',
				name: 'pump_chk_list_psi_gauge_accurate',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pump coupling alignment within specified tolerances?',
				name: 'pump_chk_list_coupling_alignment',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electrical connections tightened as necessary?',
				name: 'pump_chk_list_electrical_connections',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Mechanical moving parts lubrication verified?',
				name: 'pump_chk_list_mechanical_lubed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pressure switch setting calibration verified?',
				name: 'pump_chk_list_psi_switch_calibrated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Fuel tank vents and overflow piping free from obstructions?',
				name: 'pump_chk_list_tank_vent_unobstructed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Fuel piping in good condition?',
				name: 'pump_chk_list_fuwl_pipe_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Combustion air ductwork and louvers in good condition?',
				name: 'pump_chk_list_duct_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electrical control and power wiring connections checked for tightness?',
				name: 'pump_chk_list_electric_connection_tight',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'pump bearing lubricated?',
				name: 'pump_chk_list_pump_bearing_lubed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Gauges recalibrated or changed?',
				name: 'pump_chk_list_gauges_calibrated',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Wet pit suction screens checked (cleaned as necessary) after every operation?',
				name: 'pump_chk_list_suction_screens_cleaned',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Mechanical transmission coupling lubricated?',
				name: 'pump_chk_list_trans_coupling_lubed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Mechanical transmission right-angle gear drive lubricated?',
				name: 'pump_chk_list_trans_anglegear_lubed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electric drive motor bearings lubricated?',
				name: 'pump_chk_list_motor_bearing_lubed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Diesel engine maintenance schedule up to date as required?',
				name: 'pump_chk_list_fuel_water',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Diesel engine cooling system antifreeze checked?',
				name: 'pump_chk_list_diesel_antifreeze',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Electrical system circuit breakers or fuses changed (every 2 years)?',
				name: 'pump_chk_list_electric_breakers_changed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector Comments',
				name: 'pump_chk_list_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		pump_checkListAnswers: [],
	},
	// [TRANSFER-SWITCH] //
	{
		name: 'transferSwitch',

		questions: [
			{
				text: 'Power failure condition simulated while pump operating at peak load?',
				name: 'transfer_power_fail_text',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Transfer switch transfer of power to alternate power source verified?',
				name: 'transfer_power_alternate',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pump maintenance of peak load performance verified?',
				name: 'transfer_maintanance',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Power failure condition removed?',
				name: 'transfer_power_fail_removed',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Pump reconnected to normal power source after a time delay?',
				name: 'transfer_power_reconnected',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Was system tagged?',
				name: 'transfer_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'If tagged what color?',
				name: 'transfer_tagged_color',
				type: 'select',
				options: [
					'red',
					'green',
					'white'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'transfer_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
	// [EXTINGUISHER] //
	{
		name: 'extinguisher',

		questions: [
			{
				text: 'Total number of extinguishers inspected.',
				name: 'extinguisher_number',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Are all extinguishers visible?',
				name: 'extinguisher_visible',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all extinguishers accessible?',
				name: 'extinguisher_accessible',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all extinguishers in good condition?',
				name: 'extinguisher_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are extinguisher cabinets in good condition?',
				name: 'extinguisher_cabinets_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all pressure gauges and pull pins in good condition?',
				name: 'extinguisher_gauges_pins_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all extinguishers of the proper class?',
				name: 'extinguisher_proper_class',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Do extinguishers cover the proper square footage for the hazard protected?',
				name: 'extinguisher_coverage',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Are all extinguisher labels in place?',
				name: 'extinguisher_labels',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Have all maintenance intervals been performed?',
				name: 'extinguisher_maintatnace_intervals',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Date of last maintenance interval',
				name: 'extinguisher_last_date',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: '6 year maintenance',
				name: 'extinguisher_6year_mait',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: '12 year hydro text',
				name: 'extinguisher_12year_hydro',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: '5 year hydro text',
				name: 'extinguisher_5year_hydro',
				type: 'date-input',
				options: [],
				answer: '',
			},
			{
				text: 'Other',
				name: 'extinguisher_maitanacne_other',
				type: 'text-input',
				options: [],
				answer: '',
			},
			{
				text: 'Are all hoses and nozzles in good condition?',
				name: 'extinguisher_hoses_condition',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Was system tagged?',
				name: 'extinguisher_tagged',
				type: 'ynan',
				options: [
					'Yes',
					'NA',
					'No'
				],
				answer: '',
			},
			{
				text: 'Inspector comments',
				name: 'extinguisher_comments',
				type: 'text-box',
				options: [],
				answer: '',
			}
		],

		answers: [],
	},
]