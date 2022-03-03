// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const Auth = require('../../../s-middleware/Auth')
const clientsCollection = require('../../../s-collections/clientsCollection')

// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:client_id/:sort/:limit/:page',
	Auth.managerToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				mongoose.isValidObjectId(req.params.client_id) &&
				Number.isInteger(parseInt(req.params.sort)) &&
				Number.isInteger(parseInt(req.params.limit)) &&
				Number.isInteger(parseInt(req.params.page))
			) {
				// [INIT] //
				const sort = parseInt(req.params.sort)
				const limit = parseInt(req.params.limit)
				const pageIndex = parseInt(req.params.page) - 1
				const skip = pageIndex * limit
			
				// [READ] Sort //
				const cObj = await clientsCollection.c_read({
					client_id: req.params.client_id
				})

				// [READ-ALL] Reports //
				// Code here..

				if (cObj.status) {
					res.send({
						executed: true,
						status: true,
						client: cObj.client,
					})
				}
				else {
					res.send({
						executed: true,
						status: false,
						message: cObj.message
					})
				}
			}
			else {
				res.send({
					executed: false,
					status: false,
					location: '/pages/client/view',
					message: '/pages/client/view: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/client/view',
				message: `/pages/client/view: Error --> ${err}`,
			})
		}
	},
)
	
	
module.exports = router