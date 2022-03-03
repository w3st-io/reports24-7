// [REQUIRE] //
const bcrypt = require('bcryptjs')
const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const validator = require('validator')


// [REQUIRE] Personal //
const config = require('../../../s-config')
const rateLimiters = require('../../../s-rate-limiters')
const activitiesCollection = require('../../../s-collections/activitiesCollection')
const managerPasswordRecoveriesCollection = require('../../../s-collections/managerPasswordRecoveriesCollection')
const managersCollection = require('../../../s-collections/managersCollection')
const managerVerificationCodesCollection = require('../../../s-collections/managerVerificationCodesCollection')
const Auth = require('../../../s-middleware/Auth')
const mailerUtil = require('../../../s-utils/mailerUtil')


// [INIT] //
const secretKey = config.SECRET_KEY


// [EXPRESS + USE] //
const router = express.Router().use(cors())


/******************* [CRUD] *******************/
// [UPDATE] Auth Required //
router.post(
	'/update',
	Auth.managerToken(),
	async (req, res) => {
		try {
			const managerObj = await managersCollection.c_update({
				manager_id: req.manager_decoded.manager_id,
				img_url: req.body.img_url,
				bio: req.body.bio
			})
	
			res.send(managerObj)
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/update: Error --> ${err}`,
			})
		}
	}
)


/******************* [LOGIN/REGISTER] *******************/
// [LOGIN] //
router.post(
	'/login',
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				validator.isAscii(req.body.email) &&
				validator.isAscii(req.body.password)
			) {
				// [VALIDATE] email //
				if (validator.isEmail(req.body.email)) {
					// [VALIDATE] password //
					if (validator.isAscii(req.body.password)) {
						const managerObj = await managersCollection.c_readByEmail(
							req.body.email
						)

						if (managerObj.manager) {
							// [VALIDATE-PASSWORD] //
							if (bcrypt.compareSync(req.body.password, managerObj.manager.password)) {
								const token = jwt.sign(
									{
										manager_id: managerObj.manager._id,
										email: managerObj.manager.email,
										username: managerObj.manager.username,
										first_name: managerObj.manager.first_name,
										last_name: managerObj.manager.last_name,
										verified: managerObj.manager.verified
									},
									secretKey,
									{/* expiresIn: 7200 */}
								)
						
								res.send({
									executed: true,
									status: true,
									message: 'success',
									validation: true,
									token: token,
								})
							}
							else {
								res.send({
									executed: true,
									status: true,
									location: '/api/manager/login',
									message: 'Invalid email or password',
									validation: false,
								})
							}
						}
						else {
							res.send({
								executed: true,
								status: true,
								location: '/api/manager/login',
								message: 'Invalid email or password',
								validation: false
							})
						}
					}
					else {
						res.send({
							executed: true,
							status: false,
							location: '/api/manager/login',
							message: '/api/manager/login: Invalid password',
						})
					}
				}
				else {
					res.send({
						executed: true,
						status: false,
						location: '/api/manager/login',
						message: '/api/manager/login: Invalid email',
					})
				}
			}
			else {
				res.send({
					executed: true,
					status: false,
					location: '/api/manager/login',
					message: '/api/manager/login: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				location: '/api/manager/login',
				message: `/api/manager/login: Error --> ${err}`,
			})
		}
	}
)


// [REGISTER] //
router.post(
	'/register',
	rateLimiters.registrationLimiter,
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				validator.isAscii(req.body.username) &&
				validator.isAscii(req.body.email) &&
				validator.isAscii(req.body.password)
			) {
			
				// [CREATE] Register Account //
				const manager = await managersCollection.c_register({
					username: req.body.username,
					email: req.body.email,
					first_name: '',
					last_name: '',
					password: req.body.password,
				})

				if (manager.status && manager.created) {
					// [CREATE] managerVerificationCode //
					const vCode = await managerVerificationCodesCollection.c_create(
						manager.manager._id
					)

					// [MAIL] Verification Email //
					await mailerUtil.sendManagerVerificationMail(
						manager.manager.email,
						manager.manager._id,
						vCode.verificationCode.verificationCode
					)

					// [CREATE] Activity //
					const activity = await activitiesCollection.c_create({
						user_id: undefined,
						type: 'manager',
						post_id: undefined,
						created_user_id: undefined,
						created_manager_id: manager.manager._id,
						created_post_id: undefined,
						created_comment_id: undefined,
					})

					if (activity.status) {
						res.send({
							executed: true,
							status: true,
							manager: manager.manager,
							created: true,
							activity: activity,
						})
					}
					else { res.send(activity) }
				}
				else { res.send(manager) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/api/manager/register: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/register: Error --> ${err}`,
			})
		}
	}
)


/******************* [VERIFICATION] *******************/
router.post(
	'/verify',
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (
				validator.isAscii(req.body.manager_id) &&
				validator.isAscii(req.body.verificationCode)
			) {
				// [EXISTANCE] //
				const valid = await managerVerificationCodesCollection.c_validate(
					req.body.manager_id,
					req.body.verificationCode
				)

				if (valid.status && valid.existance) {
					// [UPDATE] Verify User //
					managersCollection.c_verify(req.body.manager_id)
				}

				res.send(valid)
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/api/manager/verify: Invalid params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/verify: Error --> ${err}`,
			})
		}
	}
)


router.post(
	'/resend-verification-email',
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (validator.isAscii(req.body.email)) {
				// [READ] Get User by Email //
				const manager = await managersCollection.c_getIdByEmail(req.body.email)

				// [READ] managerVerificationCode by manager._id //
				const vCode = await managerVerificationCodesCollection.c_read(
					manager.manager._id
				)
				
				// [SEND-MAIL] //
				mailerUtil.sendManagerVerificationMail(
					req.body.email,
					manager.manager._id,
					vCode.verificationCode.verificationCode
				)

				res.send({
					executed: true,
					status: true,
					message: 'Manager Verification email sent',
				})
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/api/manager/resend-verification-email: Invalid params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/resend-verification-email: Error --> ${err}`,
			})
		}
	}
)


/******************* [PASSWORD] *******************/
router.post(
	'/change-password',
	Auth.managerToken(),
	async (req, res) => {
		try {
			if (
				validator.isAscii(req.body.currentPassword) &&
				validator.isAscii(req.body.password)
			) {
				const managerObj = await managersCollection.c_read(
					req.manager_decoded.manager_id
				)
				
				if (managerObj.status) {
					// [VALIDATE-PASSWORD] //
					if (bcrypt.compareSync(req.body.currentPassword, managerObj.manager.password)) {		
						// [UPDATE] Password //
						const updatedPwd = await managersCollection.c_updatePassword(
							req.manager_decoded.manager_id,
							req.body.password
						)

						res.send(updatedPwd) 
					}
					else {
						res.send({
							executed: true,
							status: false,
							message: '/api/manager/change-password: Invalid password',
						})
					}
				}
				else { res.send(managerObj) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/api/manager/change-password: Invalid Params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/change-password: Error --> ${err}`,
			})
		}
	}
)


router.post(
	'/request-reset-password',
	async (req, res) => {
		try {
			// [VALIDATE] //
			if (validator.isAscii(req.body.email)) {
				const managerObj = await managersCollection.c_getIdByEmail(req.body.email)
				
				if (managerObj.status) {
					// [CREATE] Password Recovery //
					const passwordRecovery = await managerPasswordRecoveriesCollection.c_create(
						managerObj.manager._id
					)
					
					if (passwordRecovery.status && !passwordRecovery.existance) {
						// [SEND-MAIL] //
						const email = await mailerUtil.sendManagerPasswordResetEmail(
							req.body.email,
							managerObj.manager._id,
							passwordRecovery.passwordRecovery.verificationCode
						)
						
						res.send(email)
					}
					else { res.send(passwordRecovery) }
				}
				else { res.send(user) }
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: '/api/manager/reset-password-reset: Invalid params',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/reset-password-reset: Error --> ${err}`,
			})
		}
	}
)


router.post(
	'/reset-password',
	async (req, res) => {
		try {
			if (
				validator.isAscii(req.body.manager_id) &&
				validator.isAscii(req.body.verificationCode) &&
				validator.isAscii(req.body.password)
			) {
				// [EXISTANCE] PasswordRecovery //
				const existance = await managerPasswordRecoveriesCollection.c_existance(
					req.body.manager_id
				)

				if (existance.existance) {
					// [VALIDATE] passwordRecovery //
					const pwdRecovery = await managerPasswordRecoveriesCollection.c_validateToken(
						req.body.manager_id,
						req.body.verificationCode
					)

					if (pwdRecovery.status && pwdRecovery.valid) {
						// [UPDATE] Password //
						const updatedPwd = await managersCollection.c_updatePassword(
							req.body.manager_id,
							req.body.password
						)

						if (updatedPwd.status) {
							// [DELETE] passwordrecovery //
							const deletedPR = await managerPasswordRecoveriesCollection.c_deleteByManager(
								req.body.manager_id
							)

							if (deletedPR.status) {
								res.send({
									executed: true,
									status: true,
									message: 'Password reset'
								})
							}
						}
						else { res.send(updatedPwd) }
					}
					else { res.send(pwdRecovery) }
				}
				else {
					res.send({
						executed: true,
						status: false,
						message: '/api/manager/reset-password: Invalid params',
					})
				}
			}
			else {
				res.send({
					executed: true,
					status: false,
					message: 'You have not made a request to reset your password',
				})
			}
		}
		catch (err) {
			res.send({
				executed: false,
				status: false,
				message: `/api/manager/reset-password: Error --> ${err}`,
			})
		}
	}
)


module.exports = router