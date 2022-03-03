// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const Grid = require('gridfs-stream')
const mergePDFBuffers = require('merge-pdf-buffers')
const mongoose = require('mongoose')


// [REQUIRE] Personal //
const config = require('../../../s-config')
const inspectionReportsCollection = require('../../../s-collections/inspectionReportCollection')
const inspectionReportAssignmentsCollection = require('../../../s-collections/inspectionReportAssignmentsCollection')
const inspectionReportQuestions = require('../../../s-defaults/inspection-report-questions')
const Middlware_Multer = require('../../../s-middleware/Multer')
const Auth = require('../../../s-middleware/Auth')
const multer = require('../../../s-multer')
const pdf = require('../../../s-pdf')
const pdfCreator = require('../../../s-pdf/pdf-creator')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


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


router.post(
	'/create',
	Auth.userToken(),
	// [MULTER][UPLOAD] //
	async (req, res, next) => {
		multer.upload.fields(
			[
				{ name: 'general_image1', maxCount: 1 },
				{ name: 'pump_image1', maxCount: 1 },
				{ name: 'pump_image2', maxCount: 1 },
				{ name: 'pump_image3', maxCount: 1 },
			]
		)(req, res, (err) => {
			if (err) {
				res.send({
					executed: true,
					status: false,
					location: '/api/user/insepction-reports/create',
					message: `/api/user/insepction-reports/create: Caught --> ${err}`
				})
			}
			else { next() }
		})
	},
	Middlware_Multer.validateImageFiles(),
	async (req, res) => {
		try {
			// [INIT] Const //
			const general_image1 = (req.files.general_image1 !== undefined) ? req.files.general_image1[0] : ''
			const pump_image1 = (req.files.pump_image1 !== undefined) ? req.files.pump_image1[0] : ''
			const pump_image2 = (req.files.pump_image2 !== undefined) ? req.files.pump_image2[0] : ''
			const pump_image3 = (req.files.pump_image3 !== undefined) ? req.files.pump_image3[0] : ''
			
			// [INIT] //
			let inspectionReportData = []
			let pump_flowTest = []
			let pump_whilePumpIsRunning = []
			let pump_checkList = []

			// [CONVERT] String --> JSON //
			const inspectionReport = JSON.parse(req.body.inspectionReport)

			// [READ] inspectionReportAssignment //
			const iREObj = await inspectionReportAssignmentsCollection.c_readByIdAndUser({
				inspectionReportAssignment_id: req.body.inspectionReportAssignment_id,
				user_id: req.user_decoded.user_id
			})

			// [VALIDATE] Authorized //
			if (iREObj.status) {
				if (iREObj.inspectionReportAssignment !== null) {
					// For each inspectionReport.. //
					for (let i = 0; i < inspectionReport.length; i++) {
						// [INIT] Const //
						const iR = inspectionReport[i]

						// [INIT] //
						let tempArray = []
						
						for (let ii = 0; ii < iR.answers.length; ii++) {
							tempArray.push({
								name: inspectionReportQuestions[i].questions[ii].name,
								text: inspectionReportQuestions[i].questions[ii].text,
								type: inspectionReportQuestions[i].questions[ii].type,
								answer: iR.answers[ii]
							})
						}

						inspectionReportData.push(tempArray)
					}

					// pump_flowTest //
					for (let i = 0; i < inspectionReport[9].pump_flowTestAnswers.length; i++) {
						const answer = inspectionReport[9].pump_flowTestAnswers[i]

						pump_flowTest.push({
							name: inspectionReportQuestions[9].pump_flowTestQuestions[i].name,
							text: inspectionReportQuestions[9].pump_flowTestQuestions[i].text,
							type: inspectionReportQuestions[9].pump_flowTestQuestions[i].type,
							answer: answer,
						})
					}

					// pump_whilePumpIsRunningAnswers //
					for (let i = 0; i < inspectionReport[9].pump_whilePumpIsRunningAnswers.length; i++) {
						const answer = inspectionReport[9].pump_whilePumpIsRunningAnswers[i]

						pump_whilePumpIsRunning.push({
							name: inspectionReportQuestions[9].pump_whilePumpIsRunningQuestions[i].name,
							text: inspectionReportQuestions[9].pump_whilePumpIsRunningQuestions[i].text,
							type: inspectionReportQuestions[9].pump_whilePumpIsRunningQuestions[i].type,
							answer: answer,
						})
					}

					// pump_checkList //
					for (let i = 0; i < inspectionReport[9].pump_checkListAnswers.length; i++) {
						const answer = inspectionReport[9].pump_checkListAnswers[i]
						
						pump_checkList.push({
							name: inspectionReportQuestions[9].pump_checkListQuestions[i].name,
							text: inspectionReportQuestions[9].pump_checkListQuestions[i].text,
							type: inspectionReportQuestions[9].pump_checkListQuestions[i].type,
							answer: answer,
						})
					}

					// [CREATE] inspectionReport //
					const iRObj = await inspectionReportsCollection.c_create({
						inspectionReportAssignment_id: req.body.inspectionReportAssignment_id,
						organization_id: iREObj.inspectionReportAssignment.organization,
						user_id: req.user_decoded.user_id,
						client_id: iREObj.inspectionReportAssignment.client,
						general: inspectionReportData[0],
						general_image1_filename: general_image1.filename,
						pipe: inspectionReportData[1],
						fdc: inspectionReportData[2],
						heads: inspectionReportData[3],
						wetpipe: inspectionReportData[4],
						drypipe: inspectionReportData[5],
						tanks: inspectionReportData[6],
						foam: inspectionReportData[7],
						standpipe: inspectionReportData[8],
						pump: inspectionReportData[9],
						pump_image1_filename: pump_image1.filename,
						pump_image2_filename: pump_image2.filename,
						pump_image3_filename: pump_image3.filename,
						pump_flowTest: pump_flowTest,
						pump_flowTestTable: inspectionReport[9].pump_flowTestTable,
						pump_electricDrivenTable: inspectionReport[9].pump_electricDrivenTable,
						pump_whilePumpIsRunning: pump_whilePumpIsRunning,
						pump_checkList: pump_checkList,
						extinguisher: inspectionReportData[10],
					})

					if (iRObj.status == true) {
						res.send({
							executed: true,
							status: true,
							inspectionReport: iRObj.inspectionReport,
						})
					}
					else { res.send(iRObj) }
				}
				else {
					res.send({
						executed: true,
						status: false,
						message: 'No inspectionReportAssignment found'
					})
				}
			}
			else { res.send(iREObj) }
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/user/insepction-reports/create',
				message: `/api/user/inspection-reports: Error --> ${err}`,
			})
		}
	}
)


router.get(
	'/read-uploaded-image',
	Auth.userToken(),
	async (req, res) => {
		gfs.files.find().toArray((err, files) => {
			// Check if files
			if (!files || files.length === 0) {
				res.render('index', { files: false })
			}
			else {
				files.map(file => {
					if (
						file.contentType === 'image/jpeg' ||
						file.contentType === 'image/png'
					) { file.isImage = true }
					else { file.isImage = false }
				})

				console.log('files:', files)

				res.send({
					executed: true,
					status: true,
					files: files
				})
			}
		})
	}
)


router.get(
	'/uploaded-image/:uploaded_image',
	async (req, res) => {
		try {
			// name of file
			const readstream = gfs.createReadStream(req.params.uploaded_image)
			readstream.pipe(res)
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/user/insepction-reports/uploaded-image',
				message: err
			})
		}
	}
)



// [PDF] //
router.get(	
	'/generate-pdf/:inspectionreport_id',	
	Auth.userToken(),
	async (req, res) => {
		try {
			// [INIT] //
			let toBeMerged = []

			// [READ] //
			const iRObj = await inspectionReportsCollection.c_readByIdAndUser({
				user_id: req.user_decoded.user_id,
				inspectionReport_id: req.params.inspectionreport_id,
			})

			// [FRONT] //	
			const pdfHTML1 = pdfCreator.frontPage({
				inspectionReport: iRObj.inspectionReport
			})

			const pdfBuffer1 = await pdf.createBufferFromHTML(pdfHTML1)

			toBeMerged.push(pdfBuffer1)

			// [TERMS] //
			const pdfHTML2 = pdfCreator.inspectionAgreementPage({
				inspectionReport: iRObj.inspectionReport
			})

			const pdfBuffer2 = await pdf.createBufferFromHTML(pdfHTML2)

			toBeMerged.push(pdfBuffer2)

			// [GENERAL] //
			if (iRObj.inspectionReport.general.length > 0) {
				const pdfHTML3 = pdfCreator.sectionPage(
					'General',
					iRObj.inspectionReport.general
				)

				const pdfBuffer3 = await pdf.createBufferFromHTML(pdfHTML3)

				toBeMerged.push(pdfBuffer3)
			}

			// [PIPE] //
			if (iRObj.inspectionReport.pipe.length > 0) {
				const pdfHTML4 = pdfCreator.sectionPage(
					'Pipe',
					iRObj.inspectionReport.pipe
				)

				const pdfBuffer4 = await pdf.createBufferFromHTML(pdfHTML4)

				toBeMerged.push(pdfBuffer4)
			}

			// [FDC] //
			if (iRObj.inspectionReport.fdc.length > 0) {
				const pdfHTML5 = pdfCreator.sectionPage(
					'FDC',
					iRObj.inspectionReport.fdc
				)

				const pdfBuffer5 = await pdf.createBufferFromHTML(pdfHTML5)

				toBeMerged.push(pdfBuffer5)
			}

			// [HEADS] //
			if (iRObj.inspectionReport.heads.length > 0) {
				const pdfHTML6 = pdfCreator.sectionPage(
					'Heads',
					iRObj.inspectionReport.heads
				)

				const pdfBuffer6 = await pdf.createBufferFromHTML(pdfHTML6)

				toBeMerged.push(pdfBuffer6)
			}

			// [WET-PIPE] //
			if (iRObj.inspectionReport.wetpipe.length > 0) {
				const pdfHTML7 = pdfCreator.sectionPage(
					'Wet Pipe',
					iRObj.inspectionReport.wetpipe
				)

				const pdfBuffer7 = await pdf.createBufferFromHTML(pdfHTML7)

				toBeMerged.push(pdfBuffer7)
			}

			// [DRY-PIPE] //
			if (iRObj.inspectionReport.drypipe.length > 0) {
				const pdfHTML8 = pdfCreator.sectionPage(
					'Dry Pipe',
					iRObj.inspectionReport.drypipe
				)

				const pdfBuffer8 = await pdf.createBufferFromHTML(pdfHTML8)

				toBeMerged.push(pdfBuffer8)
			}

			// [TANKS] //
			if (iRObj.inspectionReport.tanks.length > 0) {
				const pdfHTML9 = pdfCreator.sectionPage(
					'Tanks',
					iRObj.inspectionReport.tanks
				)

				const pdfBuffer9 = await pdf.createBufferFromHTML(pdfHTML9)

				toBeMerged.push(pdfBuffer9)
			}


			// [FOAM] //
			if (iRObj.inspectionReport.foam.length > 0) {
				const pdfHTML10 = pdfCreator.sectionPage(
					'Foam',
					iRObj.inspectionReport.foam
				)

				const pdfBuffer10 = await pdf.createBufferFromHTML(pdfHTML10)

				toBeMerged.push(pdfBuffer10)
			}

			// [STAND-PIPE] //
			if (iRObj.inspectionReport.standpipe.length > 0) {
				const pdfHTML11 = pdfCreator.sectionPage(
					'Stand Pipe',
					iRObj.inspectionReport.standpipe
				)

				const pdfBuffer11 = await pdf.createBufferFromHTML(pdfHTML11)

				toBeMerged.push(pdfBuffer11)
			}

			// [PUMP] //
			if (iRObj.inspectionReport.pump.length > 0) {
				const pdfHTML12 = pdfCreator.sectionPage(
					'Pump',
					iRObj.inspectionReport.pump
				)

				const pdfBuffer12 = await pdf.createBufferFromHTML(pdfHTML12)

				toBeMerged.push(pdfBuffer12)
			}

			// [PUMP][FLOW-TEST] //
			if (iRObj.inspectionReport.pump_flowTest.length > 0) {
				const pdfHTML13 = pdfCreator.sectionPage(
					'Pump Flow Test',
					iRObj.inspectionReport.pump_flowTest,
					iRObj.inspectionReport.pump_flowTestTable,
					iRObj.inspectionReport.pump_electricDrivenTable,
				)

				const pdfBuffer13 = await pdf.createBufferFromHTML(pdfHTML13)

				toBeMerged.push(pdfBuffer13)
			}

			// [EXTINGUISHER] //
			if (iRObj.inspectionReport.extinguisher.length > 0) {
				const pdfHTML14 = pdfCreator.sectionPage(
					'Extinguisher',
					iRObj.inspectionReport.extinguisher,
				)

				const pdfBuffer14 = await pdf.createBufferFromHTML(pdfHTML14)

				toBeMerged.push(pdfBuffer14)
			}

			// [MERGE] //
			const mergedBuffer = await mergePDFBuffers.merge(toBeMerged)

			res.send(mergedBuffer)
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/user/insepction-reports/generate-pdf',
				message: `/api/user/insepction-reports/generate-pdf: Error --> ${err}`
			})
		}
	}
)


// [EXPORT] //
module.exports = router 