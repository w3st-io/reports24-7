// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
const authAxios = async () => {
	return axios.create({
		baseURL: '/api/manager/organization-invites',
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

	
	s_create: async function ({ user_id, organization_id }) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post(
					'/create',
					{
						user_id: user_id,
						organization_id: organization_id
					}
				)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `/manager/OrganizationInviteService: Error --> ${err}`
			}
		}
	},
}