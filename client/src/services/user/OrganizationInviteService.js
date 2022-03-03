// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
async function authAxios() {
	return axios.create({
		baseURL: '/api/user/organization-invites',
		headers: {
			user_authorization: `Bearer ${localStorage.usertoken}`,
			manager_authorization: `Bearer ${localStorage.managertoken}`,
			admin_authorization: `Bearer ${localStorage.admintoken}`,
		}
	})
}


// [EXPORT] //
export default {
	authAxios,

	/******************* [OTHER-CRUD] *******************/
	s_readNotifications: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get(`/read-notifications`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: err
			}
		}
	},

	s_accept: async function ({ organizationInvite_id }) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.post(
					'/respond',
					{
						organizationInvite_id,
						response: 'accepted',
					}
				)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: err
			}
		}
	},

	s_decline: async function ({ organizationInvite_id }) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.post(
					'/respond',
					{
						organizationInvite_id,
						response: 'declined',
					}
				)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: err
			}
		}
	},
}