// [REQURIE] //
const crypto = require('crypto')
const multer = require('multer')
const MulterGridFsStorage = require('multer-gridfs-storage')
const path = require('path')


// [REQUIRE] Personal //
const config = require('../s-config')


module.exports = {
	// [MULTER] Create storage engine //
	upload: multer({
		storage: new MulterGridFsStorage({
			url: config.MONGO_URI,
	
			file: (req, file) => {
				return new Promise((resolve, reject) => {
					// Generate random crypto
					crypto.randomBytes(16, (err, buf) => {
						if (err) { return reject(err) }
						
						const filename = buf.toString('hex') + path.extname(
							file.originalname
						)
	
						resolve({
							filename: filename,
							bucketName: 'uploads'
						})
					})
				})
			},
		}),

		limits: { fileSize: 500000 }
	}),
}