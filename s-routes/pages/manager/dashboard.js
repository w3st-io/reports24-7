// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../s-middleware/Auth')
const organizationsCollection = require('../../../s-collections/organizationsCollection')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:organization_id',
	Auth.managerToken(),
	async (req, res) => {
		try {
			const oObj = await organizationsCollection.c_readByManagerAndOrganization({
				manager_id: req.manager_decoded.manager_id,
				organization_id: req.params.organization_id
			})

			const month = new Date().getMonth()
			const year = new Date().getFullYear()

			const fake = [
				{
					customData: {
						address: {
							street: '',
							city: '',
							state: '',
							zip: '',
						},
						user: '',
						title: 'Create Report for 123 Main St. Newark',
					},
					dates: new Date(year, month, 1),
				},
				{
					customData: {
						title: 'Create Report for 64 Tree St. Hackensack',
					},
					dates: new Date(year, month, 2),
				},
				{
					customData: {
						title: 'Create Report for 232 Wood St. Teaneck',
					},
					dates: new Date(year, month, 5),
				},
				{
					customData: {
						title: 'Create Report for 34 Green St. New York',
					},
					dates: new Date(year, month, 5),
				},
				{
					customData: {
						title: 'Create Report for 645 Main St. Montclair',
					},
					dates: new Date(year, month, 7),
				},
				{
					customData: {
						title: 'Create Report for 123 Main St. Teaneck',
					},
					dates: new Date(year, month, 11),
				},
				{
					customData: {
						title: 'Create Report for 78 Hillcrest St. Newark',
					},
					dates: { months: 5, ordinalWeekdays: { 2: 1 } },
				},
				{
					customData: {
						title: 'Create Report for 673 Oak St. Teaneck',
					},
					dates: new Date(year, month, 22),
				},
				{
					customData: {
						title: 'Create Report for 153 Redwood St. Montclair',
					},
					dates: new Date(year, month, 25),
				},
			]

			const upcomingReports = [
				{
					address: '123 Main St. Newark',
					inspector: 'Nick Callow',
				},
				{
					address: '64 Tree St. Hackensack',
					inspector: 'Steve Rowen',
				},
				{
					address: '232 Wood St. Teaneck',
					inspector: 'Leore Berg',
				},
				{
					address: '34 Green St. New York',
					inspector: 'Even Wood',
				},
			]

			res.send({
				executed: true,
				status: true,
				reports: fake,
				upcomingReports: upcomingReports,
				organization: oObj.organization,
				message: 'Your Organization ID'
			})
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/pages/manager/dashboard: Error --> ${err}`
			})
		}
	},
)
	
	
module.exports = router