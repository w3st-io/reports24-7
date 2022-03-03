// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const config = require('../../s-config')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [MAIN-ROUTE] //
router.get(
	'/',
	async (req, res) => {
		res.send({
			executed: true,
			status: true,
			app_name: config.APP_NAME,
			node_env: config.NODE_ENV,
			client_base_url: config.CLIENT_BASE_URL,
			server_base_url: config.SERVER_BASE_URL,
		})
	}
)


module.exports = router