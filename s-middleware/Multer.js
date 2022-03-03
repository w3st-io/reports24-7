// [REQUIRE] //
const validator = require('validator')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const config = require('../s-config')
const e = require('cors')

// [INIT] //
let gfs


// [MONGOOSE] //
const conn = mongoose.createConnection(config.MONGO_URI)


// [GFS] //
conn.once('open', () => {
	// Init stream
	gfs = Grid(conn.db, mongoose.mongo)
	gfs.collection('uploads')
})


class Multer {
	static validateImageFiles() {
		return async (req, res, next) => {
			try {
				let status = true
				
				if (
					req.files.general_image1 !== undefined ||
					req.files.pump_image1 !== undefined ||
					req.files.pump_image2 !== undefined ||
					req.files.pump_image3 !== undefined
				) {
					// [VALIDATE] general_image1 //
					if (req.files.general_image1 !== undefined) {
						// [READ] //
						const foundFile = await gfs.files.findOne({
							_id: req.files.general_image1[0].id
						})
						
						if (
							foundFile.contentType !== 'image/png' &&
							foundFile.contentType !== 'image/jpeg'
						) { status = false }
					}

					// [VALIDATE] pump_image1 //
					if (req.files.pump_image1 !== undefined) {
						// [READ] //
						const foundFile = await gfs.files.findOne({
							_id: req.files.pump_image1[0].id
						})
						
						if (
							foundFile.contentType !== 'image/png' &&
							foundFile.contentType !== 'image/jpeg'
						) { status = false }
					}

					// [VALIDATE] pump_image2 //
					if (req.files.pump_image2 !== undefined) {
						// [READ] //
						const foundFile = await gfs.files.findOne({
							_id: req.files.pump_image2[0].id
						})
						
						if (
							foundFile.contentType !== 'image/png' &&
							foundFile.contentType !== 'image/jpeg'
						) { status = false }
					}

					// [VALIDATE] pump_image3 //
					if (req.files.pump_image3 !== undefined) {
						// [READ] //
						const foundFile = await gfs.files.findOne({
							_id: req.files.pump_image3[0].id
						})
						
						if (
							foundFile.contentType !== 'image/png' &&
							foundFile.contentType !== 'image/jpeg'
						) { status = false }
					}

					// [DELETE-ALL] //
					if (status == false) {
						if (req.files.general_image1 !== undefined) {
							// [READ] //
							const foundFile = await gfs.files.findOne({
								_id: req.files.general_image1[0].id
							})
							
							// [DELETE] //
							const removed = await gfs.remove({
								_id: foundFile._id,
								root: 'uploads'
							})
						}

						if (req.files.pump_image1 !== undefined) {
							// [READ] //
							const foundFile1 = await gfs.files.findOne({
								_id: req.files.pump_image1[0].id
							})
							
							// [DELETE] //
							const removed1 = await gfs.remove({
								_id: foundFile1._id,
								root: 'uploads'
							})
						}

						if (req.files.pump_image2 !== undefined) {
							// [READ] //
							const foundFile2 = await gfs.files.findOne({
								_id: req.files.pump_image2[0].id
							})
							
							// [DELETE] //
							const removed2 = await gfs.remove({
								_id: foundFile2._id,
								root: 'uploads'
							})
						}

						if (req.files.pump_image3 !== undefined) {
							// [READ] //
							const foundFile3 = await gfs.files.findOne({
								_id: req.files.pump_image3[0].id
							})
							
							// [DELETE] //
							const removed3 = await gfs.remove({
								_id: foundFile3._id,
								root: 'uploads'
							})
						}

						res.send({
							executed: true,
							status: false,
							location: '/middleware/Multer',
							message: 'You can only upload png or jpeg file',
						})
					}
					else { next() }
				}
				else { next() }
			}
			catch (err) {
				console.log('MULTER MIDDLEWARE:', err);
				res.send({
					executed: false,
					status: false,
					location: '/middleware/Multer',
					message: `Caught Error --> ${err}`	
				})
			}
		}
	}
}


module.exports = Multer
