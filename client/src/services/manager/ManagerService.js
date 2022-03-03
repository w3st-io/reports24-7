// [IMPORT] //
import jwtDecode from 'jwt-decode'
import axios from 'axios'


// [IMPORT] Personal //
import { EventBus } from '@/main'


// [AUTH-TOKEN-SETUP] //
async function authAxios() {
	return axios.create({
		baseURL: '/api/manager',
		headers: {
			user_authorization: `Bearer ${localStorage.usertoken}`,
			manager_authorization: `Bearer ${localStorage.managertoken}`,
			admin_authorization: `Bearer ${localStorage.admintoken}`,
		}
	})
}


export default {
	authAxios,


	/******************* [TOKEN-DECODE] *******************/
	s_getManagerTokenDecodeData: async function () {
		if (localStorage.managertoken) {
			return jwtDecode(localStorage.managertoken)
		}
		else {
			return {
				_id: '',
				email: '',
				username: '',
			}
		}
	},

	
	/******************* [CRUD] *******************/
	// [UPDATE] Auth Required //
	s_update: async function (img_url, bio) {
		try {
			const authAxios = await this.authAxios()
			
			return (await authAxios.post('/update', { img_url, bio })).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}
		}
		
	},


	/******************* [MANAGER LOGIN/REGISTER] *******************/
	// [LOGIN] //
	s_login: async function (email, password) {
		try {
			const authAxios = await this.authAxios()
			
			const { data } = await authAxios.post('/login', { email, password })
			
			
			if (data.validation) {
				// [TOKEN] //
				localStorage.setItem('managertoken', data.token)
		
				// [EMIT] //
				EventBus.$emit('manager-logged-in')
			}

			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}
		}
	},


	// [LOGOUT] //
	s_logout: async function () {
		// [TOKEN] //
		localStorage.removeItem('managertoken')

		// [EMIT] //
		EventBus.$emit('manager-logged-out')
	},


	// [REGISTER] //
	s_register: async function ({ username, email, password }) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post('/register', { username, email, password })
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}
		}
	},


	/******************* [VERIFY] *******************/
	s_verify: async function (manager_id, verificationCode) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post('/verify', { manager_id, verificationCode })
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}
		}
	},


	s_resendVerificationEmail: async function (email) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post('/resend-verification-email', { email })
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}
		}
	},


	/******************* [PASSWORD] *******************/
	s_changePassword: async function (currentPassword, password) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post(
					'/change-password',
					{ currentPassword, password }
				)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}	
		}
	},


	s_requestResetPassword: async function (email) {
		try {
			const authAxios = await this.authAxios()
			
			return (await authAxios.post('/request-reset-password', { email })).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}	
		}
	},


	s_notLoggedResetPassword: async function (manager_id, verificationCode, password) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post('/reset-password', {
					manager_id,
					verificationCode,
					password
				})
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ManagerService: Error --> ${err}`
			}	
		}
	},
}