// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const validator = require('validator')


// [REQUIRE] Personal //
const usersCollection = require('../../../s-collections/usersCollection')
const Auth = require('../../../s-middleware/Auth')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [SEARCH] //
router.get(
	'/:query/:limit/:page',
	Auth.managerToken(),
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				validator.isAscii(req.params.query) &&
				Number.isInteger(parseInt(req.params.limit)) &&
				Number.isInteger(parseInt(req.params.page))
			) {
				// [INIT] //
				const limit = parseInt(req.params.limit)
				const pageIndex = parseInt(req.params.page) - 1
				const skip = pageIndex * limit
	
				// [READ] Users //
				const uObj = await usersCollection.c_fuzzySearch(
					undefined,
					req.params.query,
					limit,
					skip,
				)

				// [COUNT] Users //
				let { count: userCount } = await usersCollection.c_fuzzySearchCount(
					req.params.query
				)

				// If Exact Match add to count //
				if (uObj.exactMatch) { userCount++ }

				// [CALCULATE] Total Pages //
				const totalPages = Math.ceil(userCount / limit)
				
				res.send({
					executed: true,
					status: true,
					userResults: uObj.users,
					userCount: userCount,
					totalPages: totalPages,
				})
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/search-users',
					message: 'Invalid Params'
				})
			}
		}
		catch (err) {
			console.log(err);
			res.send({
				executed: true,
				status: false,
				location: '/api/manager/search-users',
				message: `Caught Error --> ${err}`
			})
		}
	}
)


module.exports = router