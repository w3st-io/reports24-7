// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const organizationInvitesCollection = require('../../../s-collections/organizationInvitesCollection')
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


router.get(
	'/:sort/:limit/:page',
	Auth.userToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				Number.isInteger(parseInt(req.params.sort)) &&
				Number.isInteger(parseInt(req.params.limit)) &&
				Number.isInteger(parseInt(req.params.page))
			) {
				// [INIT] //
				const sort = parseInt(req.params.sort)
				const limit = parseInt(req.params.limit)
				const pageIndex = parseInt(req.params.page) - 1
				const skip = pageIndex * limit

				const oIObj = await organizationInvitesCollection.c_readAllSortedByUserAndAccepted({
					user_id: req.user_decoded.user_id,
					sort: sort,
					limit: limit,
					skip: skip,
				})

				if (oIObj.status) {
					// [COUNT] Comments //
					const totalOrganizations = (
						await organizationInvitesCollection.c_countByUser({
							user_id: req.user_decoded.user_id,
						})
					).count

					// [COUNT] Calculate Total Pages //
					const totalPages = Math.ceil(totalOrganizations / limit)

					res.send({
						executed: true,
						status: true,
						totalOrganizations: totalOrganizations,
						totalPages: totalPages,
						organizationInvites: oIObj.organizationInvites,
					})
				}
				else { res.send(oIObj) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/pages/user',
					message: '/pages/user: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/pages/user',
				message: `/pages/user: Error --> ${err}`,
			})
		}
	}
)


module.exports = router